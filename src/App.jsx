import { Suspense, lazy, useEffect } from 'react';
import { Routes, Route, Navigate, useParams, Outlet, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import CommandPalette from './components/CommandPalette';
import ReactLenis from 'lenis/react';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Projects = lazy(() => import('./pages/Projects'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Contact = lazy(() => import('./pages/Contact'));
const Links = lazy(() => import('./pages/Links'));

const SUPPORTED_LANGS = ['tr', 'en'];

function getDefaultLang() {
  try {
    const saved = localStorage.getItem('i18nextLng');
    if (saved && (saved === 'tr' || saved === 'en')) return saved;
    if (saved?.startsWith('en')) return 'en';
    if (saved?.startsWith('tr')) return 'tr';
  } catch {
    // Ignore localStorage errors
  }
  return 'tr';
}

function PageLoader() {
  return (
    <div className="w-full min-h-[60vh] flex items-center justify-center">
      <div className="h-8 w-8 rounded-full border-2 border-brand/30 border-t-brand animate-spin" />
    </div>
  );
}

function LanguageWrapper() {
  const { lang } = useParams();
  const { i18n } = useTranslation();
  const location = useLocation();

  const isSupported = lang && SUPPORTED_LANGS.includes(lang);

  useEffect(() => {
    if (isSupported) {
      if (i18n.language !== lang) {
        i18n.changeLanguage(lang);
      }
      try {
        localStorage.setItem('i18nextLng', lang);
      } catch {
        // Ignore localStorage errors
      }
      document.documentElement.lang = lang;
    }
  }, [lang, isSupported, i18n]);

  // If the lang in URL is not supported, redirect to default lang with rest of the path
  if (!isSupported) {
    const defaultLang = getDefaultLang();
    const cleanPath = location.pathname.replace(/^\/[^/]+/, '') || '';
    return <Navigate to={`/${defaultLang}${cleanPath}${location.search}${location.hash}`} replace />;
  }

  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden bg-primary text-textMain">
      <Navbar />
      <main className="flex-grow w-full">
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}

function RootRedirect() {
  const defaultLang = getDefaultLang();
  return <Navigate to={`/${defaultLang}`} replace />;
}

function LegacyRedirect({ to }) {
  const defaultLang = getDefaultLang();
  return <Navigate to={`/${defaultLang}/${to}`} replace />;
}

function App() {
  return (
    <ReactLenis root>
      <CommandPalette />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Standalone link-in-bio page — intentionally outside the site shell */}
          <Route path="/links" element={<Links />} />

          {/* Root redirect */}
          <Route path="/" element={<RootRedirect />} />

          {/* Legacy / Direct paths without lang prefix redirect */}
          <Route path="/about" element={<LegacyRedirect to="about" />} />
          <Route path="/projects" element={<LegacyRedirect to="projects" />} />
          <Route path="/gallery" element={<LegacyRedirect to="gallery" />} />
          <Route path="/contact" element={<LegacyRedirect to="contact" />} />

          {/* Language-prefixed routes */}
          <Route path="/:lang" element={<LanguageWrapper />}>
            <Route index element={<Home />} />
            <Route
              path="about"
              element={
                <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
                  <About />
                </div>
              }
            />
            <Route
              path="projects"
              element={
                <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
                  <Projects />
                </div>
              }
            />
            <Route path="gallery" element={<Gallery />} />
            <Route
              path="contact"
              element={
                <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
                  <Contact />
                </div>
              }
            />
            {/* Catch-all inside /:lang */}
            <Route path="*" element={<RootRedirect />} />
          </Route>

          {/* Catch-all global route */}
          <Route path="*" element={<RootRedirect />} />
        </Routes>
      </Suspense>
    </ReactLenis>
  );
}

export default App;
