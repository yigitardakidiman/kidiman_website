import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "home": {
        "heading": "Hi, I'm Yiğit Arda Kıdıman",
        "subtitle": "Passionate Student and Developer...",
        "exploreProjects": "Explore Projects",
        "aboutMe": "About Me",
        "viewGallery": "View Gallery",
        "getInTouch": "Get in Touch",
        "dragHint": "Grab & drag the 3D badge",
        "aboutMore": "More About Me & CV",
        "aboutTeaserBadge": "Volinor Defense • Software Developer",
        "moreTechBadge": "+12 more skills & experience →",
        "allProjects": "View All Projects",
        "githubTeaserTitle": "Live GitHub Activity & All Repositories",
        "githubTeaserSub": "Click to view my real-time contribution heatmap and other open-source works.",
        "galleryHeading": "Gallery & Moments",
        "gallerySubtitle": "Snapshots from hackathons, tech events, and my engineering journey.",
        "allGallery": "View Full Gallery",
        "morePhotos": "+{{count}} More Photos",
        "allContact": "Contact Details",
        "projectsHeading": "Featured Projects",
        "projectsSubtitle": "A selection of recent works and open source projects I've built.",
        "contactHeading": "Let's Build Together",
        "contactSubtitle": "Feel free to reach out for collaborations, project inquiries, or just to say hi.",
        "contactPageBtn": "Go to Contact Page"
      },
      "nav": {
        "home": "Home",
        "about": "About",
        "projects": "Projects",
        "gallery": "Gallery",
        "contact": "Contact"
      },
      "gallery": {
        "heading": "Gallery",
        "subtitle": "Moments, events, and memories.",
        "photoAlt": "Yiğit Arda Kıdıman — Gallery Moment {{index}}",
        "swipeHint": "Swipe or use arrow keys to navigate"
      },
      "about": {
        "heading": "About Me",
        "subtitle": "Learn about my background, skills and journey.",
        "whoAmI": "Who Am I?",
        "whoAmIDesc": "I'm a passionate student and developer who has been interested in coding since high school. With a growing foundation in both frontend and backend technologies, I enjoy turning ideas into beautiful and functional projects.",
        "myResume": "My Resume",
        "education": "Education",
        "ostim": "OSTIM Technical University",
        "softwareEng": "Software Engineering",
        "duration": "2024 - Present",
        "experience": "Experience",
        "workPlace1": "Volinor Defense & Tech Inc.",
        "workRole1": "Software Developer",
        "workType1": "Part-time",
        "workDuration1": "07/2026 - Present",
        "workRole2": "Software Engineering Intern",
        "workType2": "Intern",
        "workDuration2": "06/2026 - 07/2026 | Ankara",
        "skills": "Skills & Technologies",
        "backend": "Backend",
        "frontend": "Frontend",
        "tools": "Tools & Databases",
        "programmingLanguages": "Programming Languages"
      },
      "projects": {
        "heading": "Projects",
        "embedded_systems_lab": "Embedded Systems Lab",
        "embedded_systems_labDesc": "Comprehensive multi-architecture embedded systems engineering lab & portfolio covering Bare-Metal, FreeRTOS, Embedded Linux, and FPGA across 11 dev boards.",
        "volinor": "Volinor Defense Website",
        "volinorDesc": "Corporate web platform built for Volinor Defense featuring React, Three.js 3D model visualization, and Django REST API integration.",
        "microsoft_rag": "Offline Local RAG Assistant",
        "microsoft_ragDesc": "An offline question-answering assistant built with Python, Microsoft Foundry Local, and the RAG pattern for local document retrieval without an internet connection.",
        "kidimusic_generator": "KıdıMusic Generator",
        "kidimusic_generatorDesc": "A web application that generates custom music tracks from text prompts and allows easy audio export.",
        "gitfetch_generator": "GitFetch README Generator",
        "gitfetch_generatorDesc": "A modern web application to generate stylish and interactive GitHub profile READMEs easily.",
        "simple_banking_system": "Simple Banking System",
        "simple_banking_systemDesc": "A console-based banking application built with Python using Object-Oriented Programming (OOP) principles and data structures.",
        "comingSoon": "Coming Soon...",
        "liveDemo": "Live Demo",
        "tags": {
          "React": "React",
          "ThreeJS": "Three.js",
          "Django": "Django",
          "CSS": "CSS",
          "JavaScript": "JavaScript",
          "Typescript": "Typescript",
          "Python": "Python",
          "Tailwind": "Tailwind CSS",
          "FileManagement": "File Management",
          "OOP": "OOP",
          "DataStructures": "Data Structures",
          "C": "C / C++",
          "EmbeddedSystems": "Embedded Systems",
          "FreeRTOS": "FreeRTOS",
          "BareMetal": "Bare-Metal",
          "FPGA": "FPGA",
          "RAG": "RAG",
          "LocalAI": "Local AI"
        },
        "badges": {
          "openSource": "Open Source",
          "educationArchive": "Educational Archive • 12 Modules",
          "courseArchive": "University Coursework • CENG 215"
        },
        "folders": {
          "close": "Close Folder",
          "embedded": {
            "title": "Embedded Systems",
            "desc": "Microcontroller architectures, Bare-Metal C, FreeRTOS, and hardware engineering works."
          },
          "software": {
            "title": "Web & Software",
            "desc": "Corporate platforms, end-to-end web products, and core software applications."
          },
          "guides": {
            "title": "Guides & Notes",
            "desc": "Open-source educational archives and structured lecture notes on engineering fundamentals."
          }
        },
        "knowledgeBase": {
          "heading": "Open Source Guides & Lecture Notes",
          "subtitle": "Structured technical documentation, curriculum notes, and engineering study archives.",
          "exploreBtn": "Read Notes",
          "embedded101": {
            "title": "Embedded 101: Hardware & Embedded Software Fundamentals",
            "desc": "Step-by-step educational archive starting from electronics and logic gates to bare-metal Embedded C, microcontroller architecture, communication protocols (UART, I2C, SPI), interrupts, and datasheet analysis.",
            "modules": [
              "01. Bits & Logic Gates",
              "02. Electrical Signals",
              "03. Embedded C & Algorithms",
              "04. MCU Architecture",
              "05. UART • I2C • SPI",
              "06. Pointers & Interrupts",
              "07. Timers & Datasheet Debug"
            ]
          },
          "ceng215": {
            "title": "CENG 215: Object-Oriented Programming & Course Lab Archive",
            "desc": "Structured collection of university coursework, laboratory implementations, and object-oriented programming (OOP) exercises developed for the CENG 215 curriculum.",
            "modules": [
              "01. Classes & Objects",
              "02. Encapsulation & Abstraction",
              "03. Inheritance & Polymorphism",
              "04. Interfaces & Exception Handling",
              "05. Lab & Algorithm Solutions"
            ]
          }
        }
      },
      "contact": {
        "heading": "Connections",
        "subtitle": "Addresses where you can reach me",
        "email": "E-mail",
        "linkedin": "LinkedIn",
        "instagram": "Instagram",
        "copyEmail": "Copy e-mail",
        "sendEmail": "Send e-mail",
        "copied": "Copied to clipboard!"
      },
      "commandPalette": {
        "placeholder": "Type a command or search...",
        "noResults": "No matching commands found.",
        "sections": {
          "navigation": "Navigation",
          "actions": "Quick Actions",
          "social": "Social & Links"
        },
        "items": {
          "links": "Link-in-Bio (/links)",
          "resume": "View Resume (PDF)",
          "copyEmail": "Copy E-mail Address",
          "switchLang": "Switch Language to Türkçe",
          "github": "Open GitHub Profile",
          "linkedin": "Open LinkedIn Profile",
          "instagram": "Open Instagram (@codewithkidiman)"
        },
        "footer": {
          "navigate": "Navigate",
          "select": "Select",
          "close": "Close"
        }
      },
      "footer": {
        "rights": "All rights reserved."
      },
      "spotify": {
        "nowPlaying": "Listening on Spotify",
        "recentlyPlayed": "Recently Played on Spotify",
        "offline": "Not listening to Spotify right now",
        "loading": "Loading...",
        "listen": "Listen",
        "recent": "Recent",
        "title": "What I'm Listening To",
        "live": "LIVE"
      },
      "github": {
        "liveActivity": "Live GitHub Activity",
        "publicRepos": "Public Repos",
        "followers": "Followers",
        "latestPushed": "Latest Push",
        "recentRepos": "Latest Active Repositories",
        "viewProfile": "View Profile",
        "viewRepo": "View Repo",
        "featuredProjects": "Featured Projects",
        "contributionsYear": "{{count}} contributions in the last year",
        "contributionsCount": "{{date}}: {{count}} contributions",
        "hoverHint": "Hover or tap squares to see details",
        "less": "Less",
        "more": "More",
        "publicRepoDesc": "Public repository",
        "updated": "Updated",
        "justNow": "Just now",
        "hoursAgo": "hours ago",
        "daysAgo": "days ago",
        "loading": "Loading GitHub activity..."
      },
      "seo": {
        "home": {
          "title": "Yiğit Arda Kıdıman | Software Developer & Engineering Student",
          "description": "Personal portfolio of Yiğit Arda Kıdıman — engineering modern full-stack architectures, AI-driven systems, and interactive digital experiences.",
          "keywords": "Yiğit Arda Kıdıman, Software Developer, Full-stack, Artificial Intelligence, React, Three.js, Django, TypeScript, Portfolio, Web Development, Frontend, Backend, OSTIM Technical University"
        },
        "about": {
          "title": "About Me | Yiğit Arda Kıdıman",
          "description": "Learn more about Yiğit Arda Kıdıman, his education in Software Engineering at OSTIM Technical University, work experience at Volinor Defense, and technical skills.",
          "keywords": "About Yiğit Arda Kıdıman, Software Engineer, Volinor Defense, OSTIM, Experience, Resume, Skills"
        },
        "projects": {
          "title": "Projects & Open Source | Yiğit Arda Kıdıman",
          "description": "Explore featured projects, live demos, and open source contributions by Yiğit Arda Kıdıman, including Embedded Systems Lab, Volinor Defense, KıdıMusic Generator, and GitFetch.",
          "keywords": "Yiğit Arda Kıdıman Projects, Embedded Systems, FreeRTOS, Bare-Metal, Volinor, KıdıMusic, GitFetch, Open Source, React Projects, Three.js 3D"
        },
        "gallery": {
          "title": "Gallery & Moments | Yiğit Arda Kıdıman",
          "description": "Photography, events, hackathons, and moments captured throughout Yiğit Arda Kıdıman's journey in software and technology.",
          "keywords": "Yiğit Arda Kıdıman Gallery, Tech Events, Photography, Memories, Hackathons"
        },
        "contact": {
          "title": "Contact & Connect | Yiğit Arda Kıdıman",
          "description": "Get in touch with Yiğit Arda Kıdıman for freelance work, software engineering collaborations, inquiries, or social networking via LinkedIn, GitHub, or Email.",
          "keywords": "Contact Yiğit Arda Kıdıman, Email, LinkedIn, Instagram, Hire Software Developer"
        }
      }
    }
  },
  tr: {
    translation: {
      "home": {
        "heading": "Merhaba, Ben Yiğit Arda Kıdıman",
        "subtitle": "Tutkulu bir öğrenci ve geliştirici...",
        "exploreProjects": "Projeleri İncele",
        "aboutMe": "Hakkımda",
        "viewGallery": "Galeriyi Gör",
        "getInTouch": "İletişime Geç",
        "dragHint": "3D kartı tutup sürükleyebilirsin",
        "aboutMore": "Hakkımda & Özgeçmişim",
        "aboutTeaserBadge": "Volinor Savunma • Software Developer",
        "moreTechBadge": "+12 yetenek, deneyim & CV →",
        "allProjects": "Tüm Projeleri Gör",
        "githubTeaserTitle": "Canlı GitHub Aktivitesi & Tüm Repolar",
        "githubTeaserSub": "Son 1 yıldaki canlı katkı haritamı (heatmap) ve diğer açık kaynak projelerimi görmek için tıklayın.",
        "galleryHeading": "Galeri & Anılar",
        "gallerySubtitle": "Etkinliklerden, hackathonlardan ve yazılım yolculuğumdan kareler.",
        "allGallery": "Tüm Galeriyi Gör",
        "morePhotos": "+{{count}} Fotoğraf Daha",
        "allContact": "İletişim Detayları",
        "projectsHeading": "Öne Çıkan Projeler",
        "projectsSubtitle": "Geliştirdiğim güncel çalışmalar ve açık kaynaklı projeler.",
        "contactHeading": "Bana Ulaşın",
        "contactSubtitle": "Projeleriniz, iş birliği teklifleriniz veya sorularınız için bana dilediğiniz zaman ulaşabilirsiniz.",
        "contactPageBtn": "İletişim Sayfasına Git"
      },
      "nav": {
        "home": "Ana Sayfa",
        "about": "Hakkımda",
        "projects": "Projeler",
        "gallery": "Galeri",
        "contact": "İletişim"
      },
      "gallery": {
        "heading": "Galeri",
        "subtitle": "Anlar, etkinlikler ve anılar.",
        "photoAlt": "Yiğit Arda Kıdıman — Galeri Anısı {{index}}",
        "swipeHint": "Gezinmek için kaydırın veya yön tuşlarını kullanın"
      },
      "about": {
        "heading": "Hakkımda",
        "subtitle": "Geçmişim, yeteneklerim ve yolculuğum hakkında bilgi edinin.",
        "whoAmI": "Ben Kimim?",
        "whoAmIDesc": "Liseden beri kodlamaya ilgi duyan tutkulu bir öğrenci ve geliştiriciyim. Hem frontend hem de backend teknolojilerinde gelişen temelimle fikirleri güzel ve işlevsel projelere dönüştürmekten keyif alıyorum.",
        "myResume": "Özgeçmişim",
        "education": "Eğitim",
        "ostim": "OSTİM Teknik Üniversitesi",
        "softwareEng": "Yazılım Mühendisliği",
        "duration": "2024 - Günümüz",
        "experience": "Deneyim",
        "workPlace1": "Volinor Savunma ve Teknoloji A.Ş.",
        "workRole1": "Software Developer",
        "workType1": "Yarı zamanlı",
        "workDuration1": "Tem 2026 - Günümüz",
        "workRole2": "Yazılım Mühendisliği Stajyeri",
        "workType2": "Stajyer",
        "workDuration2": "Haz 2026 - 1 ay | Ankara",
        "skills": "Yetenekler & Teknolojiler",
        "backend": "Arka Yüz",
        "frontend": "Ön Yüz",
        "tools": "Araçlar & Veritabanları",
        "programmingLanguages": "Programlama Dilleri"
      },
      "projects": {
        "heading": "Projeler",
        "embedded_systems_lab": "Embedded Systems Lab",
        "embedded_systems_labDesc": "11 farklı geliştirme kartı üzerinde Bare-Metal, FreeRTOS, Gömülü Linux ve FPGA mimarilerini kapsayan kapsamlı uygulamalı gömülü sistemler laboratuvarı ve portföyü.",
        "volinor": "Volinor Savunma Web Sitesi",
        "volinorDesc": "Volinor Savunma ve Teknoloji için React, Three.js ve Django REST API entegrasyonuyla geliştirilmiş 3D model destekli kurumsal web platformu.",
        "microsoft_rag": "Offline Local RAG Asistanı",
        "microsoft_ragDesc": "Microsoft Foundry Local ve RAG mimarisi kullanılarak, internet bağlantısı olmadan yerel dokümanlar üzerinden soru-cevap yapabilen çevrimdışı yapay zeka asistanı.",
        "kidimusic_generator": "KıdıMusic Generator",
        "kidimusic_generatorDesc": "Yapay zeka yönlendirmeleri (prompt) ile özgün müzik parçaları oluşturan ve ses dosyalarını dışa aktaran web uygulaması.",
        "gitfetch_generator": "GitFetch README Generator",
        "gitfetch_generatorDesc": "GitHub profiliniz için şık ve etkileşimli README dosyalarını kolayca oluşturmanızı sağlayan modern web uygulaması.",
        "simple_banking_system": "Simple Banking System",
        "simple_banking_systemDesc": "Python, Nesne Yönelimli Programlama (OOP) prensipleri ve temel veri yapıları kullanılarak geliştirilmiş konsol tabanlı bankacılık uygulaması.",
        "comingSoon": "Çok Yakında...",
        "liveDemo": "Canlı Demo",
        "tags": {
          "React": "React",
          "ThreeJS": "Three.js",
          "Django": "Django",
          "CSS": "CSS",
          "JavaScript": "JavaScript",
          "Typescript": "Typescript",
          "Python": "Python",
          "Tailwind": "Tailwind CSS",
          "FileManagement": "Dosya Yönetimi",
          "OOP": "OOP",
          "DataStructures": "Veri Yapıları",
          "C": "C / C++",
          "EmbeddedSystems": "Gömülü Sistemler",
          "FreeRTOS": "FreeRTOS",
          "BareMetal": "Bare-Metal",
          "FPGA": "FPGA",
          "RAG": "RAG",
          "LocalAI": "Yerel Yapay Zeka"
        },
        "badges": {
          "openSource": "Açık Kaynak",
          "educationArchive": "Eğitim Arşivi • 12 Modül",
          "courseArchive": "Ders & Lab Arşivi • CENG 215"
        },
        "folders": {
          "close": "Klasörü Kapat",
          "embedded": {
            "title": "Gömülü Sistemler",
            "desc": "Mikrodenetleyici mimarileri, Bare-Metal C, FreeRTOS ve donanım mühendisliği çalışmaları."
          },
          "software": {
            "title": "Web & Yazılım",
            "desc": "Kurumsal platformlar, fikirden yayına geliştirdiğim web ürünleri ve yazılım uygulamaları."
          },
          "guides": {
            "title": "Rehberler & Notlar",
            "desc": "Mühendislik ve gömülü yazılım temellerini adım adım belgeleyen açık kaynak eğitim arşivleri."
          }
        },
        "knowledgeBase": {
          "heading": "Açık Kaynak Rehberler & Ders Notları",
          "subtitle": "Mühendislik temellerini adım adım belgelediğim yapılandırılmış teknik dokümantasyon ve ders arşivleri.",
          "exploreBtn": "Notları İncele",
          "embedded101": {
            "title": "Embedded 101: Gömülü Yazılım ve Donanım Temelleri",
            "desc": "Elektrik-elektronik ve programlama temellerinden başlayarak mikrodenetleyici mimarisi, haberleşme protokolleri (UART, I2C, SPI), kesmeler (interrupt) ve güvenli gömülü C geliştirme sürecini adım adım belgeleyen kapsamlı eğitim arşivi.",
            "modules": [
              "01. Bit, Byte & Lojik Kapılar",
              "02. Elektriksel Sinyaller",
              "03. Gömülü C & Algoritma",
              "04. Mikrodenetleyici Mimarisi",
              "05. UART • I2C • SPI",
              "06. Pointer, Struct & Kesmeler",
              "07. Timer & Datasheet Okuma"
            ]
          },
          "ceng215": {
            "title": "CENG 215: Nesneye Dayalı Programlama & Ders Kod Arşivi",
            "desc": "CENG 215 müfredatı kapsamında geliştirilen nesne yönelimli programlama (OOP) uygulamalarını, laboratuvar çözümlerini ve algoritma örneklerini içeren akademik kod arşivi.",
            "modules": [
              "01. Sınıflar & Nesneler",
              "02. Kapsülleme & Soyutlama",
              "03. Kalıtım & Çok Biçimlilik",
              "04. Arayüzler & Hata Yönetimi",
              "05. Lab & Algoritma Çözümleri"
            ]
          }
        }
      },
      "contact": {
        "heading": "İletişim",
        "subtitle": "Bana ulaşabileceğiniz adresler",
        "email": "E-posta",
        "linkedin": "LinkedIn",
        "instagram": "Instagram",
        "copyEmail": "Adresi kopyala",
        "sendEmail": "E-posta gönder",
        "copied": "Panoya kopyalandı!"
      },
      "commandPalette": {
        "placeholder": "Bir komut yazın veya sayfa arayın...",
        "noResults": "Eşleşen sonuç bulunamadı.",
        "sections": {
          "navigation": "Sayfalar",
          "actions": "Hızlı İşlemler",
          "social": "Sosyal & Bağlantılar"
        },
        "items": {
          "links": "Hızlı Bağlantılar (/links)",
          "resume": "Özgeçmişi Görüntüle (PDF)",
          "copyEmail": "E-posta Adresini Kopyala",
          "switchLang": "Dili İngilizce'ye (EN) Çevir",
          "github": "GitHub Profilini Aç",
          "linkedin": "LinkedIn Profilini Aç",
          "instagram": "Instagram (@codewithkidiman)"
        },
        "footer": {
          "navigate": "Gezin",
          "select": "Seç",
          "close": "Kapat"
        }
      },
      "footer": {
        "rights": "Tüm hakları saklıdır."
      },
      "spotify": {
        "nowPlaying": "Spotify'da Çalıyor",
        "recentlyPlayed": "Spotify'da Son Dinlenen",
        "offline": "Şu an Spotify'da bir şey dinlemiyor",
        "loading": "Yükleniyor...",
        "listen": "Dinle",
        "recent": "Son",
        "title": "Ne Dinliyorum?",
        "live": "CANLI"
      },
      "github": {
        "liveActivity": "Canlı GitHub Aktivitesi",
        "publicRepos": "Açık Kaynak Repo",
        "followers": "Takipçi",
        "latestPushed": "Son Push",
        "recentRepos": "Son Aktif Repolar",
        "viewProfile": "Profili Gör",
        "viewRepo": "Repoyu İncele",
        "featuredProjects": "Öne Çıkan Projeler",
        "contributionsYear": "Son 1 yılda {{count}} katkı",
        "contributionsCount": "{{date}}: {{count}} katkı",
        "hoverHint": "Detaylar için karelerin üzerine gelin veya dokunun",
        "less": "Az",
        "more": "Çok",
        "publicRepoDesc": "Açık kaynak repo",
        "updated": "Güncellendi",
        "justNow": "Az önce",
        "hoursAgo": "saat önce",
        "daysAgo": "gün önce",
        "loading": "GitHub aktiviteleri yükleniyor..."
      },
      "seo": {
        "home": {
          "title": "Yiğit Arda Kıdıman | Yazılım Geliştirici & Mühendislik Öğrencisi",
          "description": "Modern full-stack web mimarileri, yapay zeka odaklı sistemler ve etkileşimli dijital deneyimler geliştiren Yiğit Arda Kıdıman'ın kişisel portfolyosu.",
          "keywords": "Yiğit Arda Kıdıman, Yazılım Geliştirici, Full-stack, Yapay Zeka, Software Developer, React, Three.js, Django, TypeScript, Portfolyo, OSTİM Teknik Üniversitesi, Web Geliştirme"
        },
        "about": {
          "title": "Hakkımda | Yiğit Arda Kıdıman",
          "description": "Yiğit Arda Kıdıman hakkında bilgi edinin. OSTİM Teknik Üniversitesi Yazılım Mühendisliği eğitimi, Volinor Savunma iş deneyimi ve teknik yetenekler.",
          "keywords": "Yiğit Arda Kıdıman Kimdir, Hakkımda, Volinor Savunma, OSTİM, Özgeçmiş, Yetenekler, Yazılım Mühendisi"
        },
        "projects": {
          "title": "Projeler & Açık Kaynak | Yiğit Arda Kıdıman",
          "description": "Yiğit Arda Kıdıman tarafından geliştirilen projeler ve açık kaynaklı çalışmalar: Embedded Systems Lab, Volinor Savunma, KıdıMusic Generator, GitFetch ve daha fazlası.",
          "keywords": "Yiğit Arda Kıdıman Projeleri, Gömülü Sistemler, Embedded Systems, FreeRTOS, Bare-Metal, Volinor, KıdıMusic, GitFetch, Açık Kaynak, React Projeleri, Three.js"
        },
        "gallery": {
          "title": "Galeri & Anılar | Yiğit Arda Kıdıman",
          "description": "Yiğit Arda Kıdıman'ın teknoloji yolculuğundan, etkinliklerden ve özel anlardan oluşan fotoğraf galerisi.",
          "keywords": "Yiğit Arda Kıdıman Galeri, Etkinlikler, Fotoğraflar, Anılar, Yazılım"
        },
        "contact": {
          "title": "İletişim & Bağlantılar | Yiğit Arda Kıdıman",
          "description": "İş birlikleri, projeler, sorularınız veya sosyal medya iletişimi için Yiğit Arda Kıdıman ile LinkedIn, GitHub, Instagram veya E-posta üzerinden iletişime geçin.",
          "keywords": "Yiğit Arda Kıdıman İletişim, E-posta, LinkedIn, Instagram, Yazılımcı İletişim"
        }
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "tr",
    fallbackLng: "tr",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
