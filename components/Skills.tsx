"use client";

import { useState, useEffect, useRef } from "react";

export default function Skills() {
  const [visible, setVisible] = useState(false);
  const metricsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect(); // Sadece bir kere tetikle
          }
        });
      },
      { threshold: 0.3 }
    );

    if (metricsRef.current) {
      observer.observe(metricsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const categories = [
    {
      name: "Frontend",
      skills: [
        { name: "React", level: 95 },
        { name: "Next.js", level: 85 },
        { name: "React Native", level: 55 },
        { name: "TypeScript", level: 85 },
        { name: "Tailwind CSS", level: 80 },
      ],
    },
    {
      name: "Backend",
      skills: [
        { name: "Django", level: 90 },
        { name: "Node.js", level: 85 },
        { name: "Express", level: 50 },
        { name: "JavaScript", level: 90 },
      ],
    },
    {
      name: "Veritabanı",
      skills: [
        { name: "PostgreSQL", level: 85 },
        { name: "PostGIS", level: 70 },
      ],
    },
    {
      name: "Versiyon Kontrol",
      skills: [
        { name: "Git", level: 95 },
        { name: "GitHub", level: 95 },
      ],
    },
    {
      name: "DevOps",
      skills: [
        { name: "Docker", level: 85 },
        { name: "NGINX", level: 50 },
        { name: "GitHub Actions", level: 85 },
        { name: "Netlify / Vercel ", level: 80 },
      ],
    },
  ];

  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(false);
    const timeout = setTimeout(() => setAnimate(true), 100); // Kategori değişince animasyon
    return () => clearTimeout(timeout);
  }, [activeCategory]);

  return (
    <div className="md:h-screen flex flex-col gap-24 items-center px-4 md:px-6 max-w-7xl py-36 md:pt-52 w-full">
      <div className="flex flex-col justify-center items-center">
        <h2
          ref={metricsRef}
          className="text-3xl sm:text-4xl font-extrabold text-[#1D204A] mb-2"
        >
          Yeteneklerim
        </h2>

        <div
          className={`h-1 rounded-full bg-[#E38422]  transition-all duration-1000 ${
            visible ? "w-24 opacity-100" : "w-0 opacity-0"
          }`}
        />
      </div>

     <div>
       {/* Kategoriler */}
      <div className="flex flex-wrap justify-center gap-4 mb-10 w-full">
        {categories.map(({ name }, idx) => {
          const isActive = activeCategory.name === name;
          return (
            <a
              key={name}
              onClick={() => setActiveCategory(categories[idx])}
              className={`
          relative inline-block px-5 py-2 text-sm sm:text-base font-medium rounded-md overflow-hidden cursor-pointer
          transition-colors duration-300
          ${
            isActive
              ? "text-white bg-[#47586F]"
              : "text-[#E38422] bg-white hover:text-white hover:bg-[#47586F]"
          }
        `}
            >
              {name}
              {/* Border çizgileri */}
              <span
                className={`absolute top-0 left-0 h-[2px] bg-[#E38422] transition-all duration-700 ease-in-out origin-left ${
                  isActive ? "w-0" : "w-full"
                }`}
              />
              <span
                className={`absolute top-0 right-0 w-[2px] bg-[#E38422] transition-all duration-700 ease-in-out origin-top delay-200 ${
                  isActive ? "h-0" : "h-full"
                }`}
              />
              <span
                className={`absolute bottom-0 right-0 h-[2px] bg-[#E38422] transition-all duration-700 ease-in-out origin-right delay-400 ${
                  isActive ? "w-[80%] h-[2px]" : "w-full"
                }`}
              />
              <span
                className={`absolute bottom-0 left-0 w-[2px] bg-[#E38422] transition-all duration-700 ease-in-out origin-bottom delay-600 ${
                  isActive ? "h-0" : "h-full"
                }`}
              />
            </a>
          );
        })}
      </div>

      {/* Skill Barlar */}
      <div
        className={`w-full space-y-6 transition-opacity duration-500 ${
          animate ? "opacity-100" : "opacity-0"
        }`}
      >
        {activeCategory.skills.map((skill, index) => (
          <div key={index}>
            <div className="flex justify-between mb-1 text-sm sm:text-base">
              <span className="font-medium text-gray-700">{skill.name}</span>
              <span className="font-medium text-gray-700">{skill.level}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 sm:h-4 overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#E38422] to-[#f5b261] h-full rounded-full transition-[width] duration-1000 ease-out"
                style={{
                  width: visible && animate ? `${skill.level}%` : "0%",
                }}
              />
            </div>
          </div>
        ))}
      </div>
     </div>
    </div>
  );
}
