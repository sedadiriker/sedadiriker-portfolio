"use client";

import { useEffect, useRef, useState } from "react";
import { FaGithub } from "react-icons/fa";

export default function Work() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const projects = [
    {
      title: "DSİ Kurum Yönetim Paneli (KYP)",
      description:
        "Kurumların makine parkı, saha faaliyetleri ve operasyon süreçlerini yönetmelerini sağlayan web tabanlı bir panel geliştirdim. Frontend'de React ve Redux Toolkit, backend'de Django REST Framework kullandım. Harita modülleri için OpenLayers ile gelişmiş etkileşimli görselleştirme sağladım.",
      stack: [
        "React 18",
        "Redux Toolkit",
        "Ant Design",
        "OpenLayers",
        "TailwindCSS",
        "Django",
        "DRF",
        "PostgreSQL",
        "PostGIS",
        "JWT",
        "numpy",
        "scikit-learn",
      ],
      date: "2024 - Devam",
    },
    {
      title: "DSİ TAMBİS Web ",
      description:
        "Taşkın Bilgi Sistemi (TAMBİS) web uygulamasında, Django REST Framework ile veri yönetimi, sorgulama ve analiz modüllerinin geliştirilmesinde aktif rol aldım. PostgreSQL + PostGIS altyapısı ve harita tabanlı işlevler üzerinde yoğun şekilde çalıştım.",

      stack: [
        "Django",
        "DRF",
        "PostgreSQL",
        "PostGIS",
        "OpenLayers",
        "Celery",
        "WeasyPrint",
        "Matplotlib",
        "GeoPandas",
        "Redis",
        "Zeep",
        "scikit-learn",
      ],
      date: "2024 - Devam",
    },
    {
      title: "DSİ TAMBİS Mobil Uygulaması",
      description:
        "Taşkın Bilgi Sistemi (TAMBİS) mobil uygulamasında React Native ve Expo kullanarak harita entegrasyonu, offline ihbar kaydı, medya yükleme ve konum servisleri gibi temel modüllerin geliştirilmesinde etkin rol aldım.",
      stack: [
        "React Native",
        "Expo",
        "Redux Toolkit",
        "Offline Storage",
        "React Native Maps",
        "Axios",
        "AsyncStorage",
        "Expo Location",
        "Media Upload",
      ],
      date: "2024 - Devam",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="flex flex-col items-center justify-center px-4 sm:px-6 max-w-7xl w-full pt-26"
    >
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-2 text-[#1D204A] text-center">
          Projeler
        </h2>
        <div
          className={`h-1 rounded-full bg-[#E38422] mb-10 transition-all duration-1000 ${
            visible ? "w-24 opacity-100" : "w-0 opacity-0"
          }`}
        ></div>
      </div>

      {/* Proje Kartları */}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 w-full">
        {projects.map((proj, i) => (
          <div
            key={i}
            style={{
              transitionDelay: `${i * 150}ms`,
            }}
            className={`bg-white rounded-2xl p-6 shadow-md border-l-4 border-[#E38422] transform transition-all duration-700 ease-out ${
              visible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <h3 className="text-lg sm:text-xl font-semibold text-[#1D204A] mb-2">
              {proj.title}
            </h3>
            <p className="text-gray-700 mb-3 text-sm sm:text-base">
              {proj.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-3">
              {proj.stack.map((tech, idx) => (
                <span
                  key={idx}
                  className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="text-sm text-gray-500">{proj.date}</div>
          </div>
        ))}
      </div>

      {/* GitHub Link */}
      <div className="mt-12 flex items-center gap-3 justify-center md:justify-end w-full">
        <p className="text-gray-600 text-sm text-center md:text-right">
          Daha fazla proje için GitHub sayfama göz atabilirsiniz.
        </p>
        <a
          href="https://github.com/sedadiriker"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center w-10 h-10 bg-[#E38422] text-white rounded-3xl hover:bg-[#c97218] transition"
          aria-label="GitHub Profilim"
        >
          <FaGithub size={24} />
        </a>
      </div>
    </div>
  );
}
