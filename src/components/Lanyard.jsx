"use client";
import { useEffect, useRef, useState, useMemo } from "react";
import { Canvas, extend, useFrame } from "@react-three/fiber";
import {
  useGLTF,
  Environment,
  Lightformer,
  useTexture,
} from "@react-three/drei";
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
} from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import * as THREE from "three";

extend({ MeshLineGeometry, MeshLineMaterial });

const UP_AXIS = new THREE.Vector3(0, 1, 0);

export default function Lanyard({
  position = [0, 2, 30],
  gravity = [0, -40, 0],
  fov = 2,
  transparent = true,
  anchorX = 0,
}) {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth < 768,
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative z-0 w-full h-screen flex justify-center items-center transform scale-100 origin-center">
      <Canvas
        camera={{ position, fov }}
        dpr={[1, isMobile ? 1.5 : 2]}
        gl={{ alpha: transparent }}
        onCreated={({ gl }) =>
          gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)
        }
      >
        <ambientLight intensity={Math.PI} />
        <Physics gravity={gravity} timeStep={isMobile ? 1 / 30 : 1 / 60}>
          <Band isMobile={isMobile} anchorX={anchorX} />
        </Physics>
        <Environment blur={0.75}>
          <Lightformer
            intensity={2}
            color="white"
            position={[0, -1, 5]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[-1, -1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[1, 1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={10}
            color="white"
            position={[-10, 0, 14]}
            rotation={[0, Math.PI / 2, Math.PI / 3]}
            scale={[100, 10, 1]}
          />
        </Environment>
      </Canvas>
    </div>
  );
}

function Band({ maxSpeed = 50, minSpeed = 0, isMobile = false, anchorX = 0 }) {
  const band = useRef(null);
  const fixed = useRef(null);
  const j1 = useRef(null);
  const j2 = useRef(null);
  const j3 = useRef(null);
  const card = useRef(null);
  const clipGroup = useRef(null);

  // Pre-allocated scratch vectors/quaternions to avoid GC pressure inside useFrame (60fps)
  const scratch = useMemo(
    () => ({
      vec: new THREE.Vector3(),
      ang: new THREE.Vector3(),
      rot: new THREE.Vector3(),
      dir: new THREE.Vector3(),
      clipQuat: new THREE.Quaternion(),
      cardUp: new THREE.Vector3(),
      alignQuat: new THREE.Quaternion(),
    }),
    [],
  );

  const segmentProps = {
    type: "dynamic",
    canSleep: true,
    colliders: false,
    angularDamping: 4,
    linearDamping: 4,
  };

  const { nodes, materials } = useGLTF("/models/card.glb");
  const baseTexture = useTexture("/img/resim1.png");

  const frontTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = baseTexture.image.width * 2;
    canvas.height = baseTexture.image.height;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#3f3f3f";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // KENDİ AYARLARINIZI BURADAN YAPABİLİRSİNİZ:
    // offsetX: Resmin yatay (sağ/sol) konumu (pozitif sağa, negatif sola kaydırır)
    // offsetY: Resmin dikey (aşağı/yukarı) konumu (pozitif aşağı, negatif yukarı kaydırır)
    // scaleX: Resmin yatay (genişlik) boyutu (1 orijinal, 1.2 daha geniş vs.)
    // scaleY: Resmin dikey (yükseklik) boyutu (1 orijinal, 1.2 daha uzun vs.)
    const offsetX = 27;
    const offsetY = 10;
    const scaleX = 0.8;
    const scaleY = 0.6;

    const drawWidth = baseTexture.image.width * scaleX;
    const drawHeight = baseTexture.image.height * scaleY;
    const radius = 10; // Border radius miktarını buradan ayarlayabilirsiniz

    ctx.save();
    ctx.beginPath();
    // Modern tarayıcılarda roundRect ile yuvarlatılmış dikdörtgen çizebiliyoruz
    ctx.roundRect(offsetX, offsetY, drawWidth, drawHeight, radius);
    ctx.clip();

    ctx.drawImage(baseTexture.image, offsetX, offsetY, drawWidth, drawHeight);

    ctx.restore(); // Clip işlemini kapatıyoruz ki yazılar vs. kesilmesin

    // KARTIN ÜZERİNE (RESMİN ALTINA) YAZI EKLEME
    ctx.fillStyle = "#ffffff"; // Yazı rengi (beyaz)
    ctx.font = "bold 20px Arial"; // Yazının boyutu ve fontu
    ctx.textAlign = "center";

    // Yazının x konumu: resmin tam ortası
    const textX = offsetX + drawWidth / 5;
    // Yazının y konumu: resmin alt sınırından 50 piksel aşağısı
    const textY = offsetY + drawHeight + 30;

    // Buradaki "Yiğit Arda Kıdıman" yazısını istediğiniz gibi değiştirebilirsiniz
    ctx.fillText("JustKıdı", textX, textY);

    // KARTIN ARKA YÜZÜNE ÇAPRAZ YAZI EKLEME
    ctx.save();
    // Arka yüzün merkezi: Sağ yarının ortası
    const backCenterX = (canvas.width / 4) * 3;
    // Yazıyı biraz daha yukarı almak için merkezden 50 piksel çıkarıyoruz
    const backCenterY = canvas.height / 2 - 50;

    ctx.translate(backCenterX, backCenterY);
    // Yazıyı çapraz yapmak için yaklaşık 35 derece (-Math.PI / 5) döndürüyoruz
    ctx.rotate(-Math.PI / 5);

    ctx.fillStyle = "rgba(255, 255, 255, 0.3)"; // Hafif transparan ve silik beyaz
    ctx.font = "bold 30px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Bug değil, feature", 0, 0);
    ctx.restore();

    const tex = new THREE.CanvasTexture(canvas);
    tex.flipY = false;
    tex.anisotropy = 16;
    return tex;
  }, [baseTexture]);

  const [curve] = useState(() => {
    const c = new THREE.CatmullRomCurve3([
      new THREE.Vector3(),
      new THREE.Vector3(),
      new THREE.Vector3(),
      new THREE.Vector3(),
    ]);
    c.curveType = "chordal";
    return c;
  });
  const [dragged, drag] = useState(false);
  const [hovered, hover] = useState(false);

  const [texture] = useState(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 128;
    const ctx = canvas.getContext("2d");

    // Background color of the lanyard
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Text "YK."
    ctx.fillStyle = "#ffffff";
    ctx.font = "900 80px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("YK.", 256, canvas.height / 2);

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.anisotropy = 16;
    return tex;
  });

  // Dispose dynamic CanvasTextures on unmount to prevent WebGL memory leaks
  useEffect(() => {
    return () => {
      frontTexture.dispose();
    };
  }, [frontTexture]);

  useEffect(() => {
    return () => {
      texture.dispose();
    };
  }, [texture]);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, 1.45, 0],
  ]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? "grabbing" : "grab";
      return () => {
        document.body.style.cursor = "auto";
      };
    }
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    const { vec, ang, rot, dir, clipQuat, cardUp, alignQuat } = scratch;

    if (dragged && typeof dragged !== "boolean") {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z,
      });
    }
    if (fixed.current) {
      [j1, j2].forEach((ref) => {
        if (!ref.current.lerped)
          ref.current.lerped = new THREE.Vector3().copy(
            ref.current.translation(),
          );
        const clampedDistance = Math.max(
          0.1,
          Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())),
        );
        ref.current.lerped.lerp(
          ref.current.translation(),
          delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed)),
        );
      });
      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(fixed.current.translation());
      band.current.geometry.setPoints(curve.getPoints(isMobile ? 16 : 32));
      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });

      clipQuat.copy(card.current.rotation());

      // Kartın yukarı bakan (Y) eksenini bul
      cardUp.copy(UP_AXIS).applyQuaternion(clipQuat);

      // Clip'i sadece bu Y eksenine eğilecek şekilde döndür (kendi etrafında Y dönüşü (spin) yapma)
      alignQuat.setFromUnitVectors(UP_AXIS, cardUp);

      if (clipGroup.current) {
        clipGroup.current.position.copy(card.current.translation());
        clipGroup.current.quaternion.copy(alignQuat);
      }
    }
  });

  return (
    <>
      <group position={[isMobile ? 0 : anchorX, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type={"fixed"} />
        <RigidBody
          position={[0.5, 0, 0]}
          ref={j1}
          {...segmentProps}
          type={"dynamic"}
        >
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          position={[1, 0, 0]}
          ref={j2}
          {...segmentProps}
          type={"dynamic"}
        >
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          position={[1.5, 0, 0]}
          ref={j3}
          {...segmentProps}
          type={"dynamic"}
        >
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          position={[2, 0, 0]}
          ref={card}
          {...segmentProps}
          type={dragged ? "kinematicPosition" : "dynamic"}
        >
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={2.25}
            position={[0, -1.2, 0]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e) => {
              e.target.releasePointerCapture(e.pointerId);
              drag(false);
            }}
            onPointerDown={(e) => {
              e.target.setPointerCapture(e.pointerId);
              drag(
                new THREE.Vector3()
                  .copy(e.point)
                  .sub(scratch.vec.copy(card.current.translation())),
              );
            }}
          >
            <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial
                map={frontTexture}
                map-anisotropy={16}
                color="#ffffff"
                clearcoat={isMobile ? 0 : 1}
                clearcoatRoughness={0.15}
                roughness={0.9}
                metalness={0.8}
              />
            </mesh>
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>
      <group ref={clipGroup}>
        <group scale={2.25} position={[0, -1.2, -0.05]}>
          <mesh
            geometry={nodes.clip.geometry}
            material={materials.metal}
            material-roughness={0.3}
          />
        </group>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="white"
          depthTest={false}
          resolution={isMobile ? [1000, 2000] : [1000, 1000]}
          useMap
          map={texture}
          repeat={[-4, 1]}
          lineWidth={0.5}
        />
      </mesh>
    </>
  );
}

useGLTF.preload("/models/card.glb");
