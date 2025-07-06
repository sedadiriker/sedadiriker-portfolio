"use client";

import { useState, useEffect, useRef } from "react";

function Counter({ target }: { target: number }) {
  const [count, setCount] = useState(0);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (count >= target) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = window.setInterval(() => {
      setCount((prev) => {
        if (prev >= target) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          return prev;
        }
        const step = Math.ceil(target / 50);
        return Math.min(prev + step, target);
      });
    }, 20);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [count, target]);

  return (
    <h3 className="text-5xl font-extrabold text-[#E38422] mb-2">{count}+</h3>
  );
}

export default function About() {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);
  const metricsRef = useRef<HTMLDivElement | null>(null);

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
      { threshold: 0.3 }
    );

    if (metricsRef.current) {
      observer.observe(metricsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const buttons = [
    {
      id: 1,
      href: "#iletisim",
      text: "İletişime Geç",
      isDownload: false,
      className: "text-[#E38422] font-semibold",
      hoverTextColor: "hover:text-white hover:bg-[#47586F]",
    },
    // {
    //   id: 2,
    //   href: "/CV-Seda-Diriker.pdf",
    //   text: "CV İndir",
    //   isDownload: true,
    //   className: "text-[#E38422] font-semibold",
    //   hoverTextColor: "hover:text-white hover:bg-[#47586F]",
    // },
  ];

  return (
    <div className="md:h-screen flex flex-col justify-between items-center px-4 md:px-6 max-w-7xl py-8 md:py-36 w-full">
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1D204A] mb-2">
        Hakkımda
      </h2>
      <div
        className={`h-1 rounded-full bg-[#E38422] mb-10 transition-all duration-1000 ${
          visible ? "w-24 opacity-100" : "w-0 opacity-0"
        }`}
      />
      </div>

      <div className="w-full max-w-3xl text-justify">
        <p className="text-base sm:text-lg text-gray-600 mb-6 leading-relaxed">
          Merhaba, ben{" "}
          <span className="font-semibold text-[#E38422]">Seda Diriker</span>. 3
          yılı aşkın süredir Full Stack ve Mobil geliştirici olarak, modern
          teknolojilerle kullanıcı odaklı, yenilikçi ve performanslı dijital
          çözümler üretiyorum.
        </p>

        <p className="text-base sm:text-lg text-gray-600 mb-10 leading-relaxed">
          İşimde en büyük motivasyonum; kullanıcı deneyimini ön planda tutan,
          işlevsel ve estetik ürünler ortaya koymak. Takım çalışmasına inanıyor,
          yeni teknolojileri takip ederek kendimi sürekli geliştiriyorum.
        </p>
      </div>

      {/* Butonlar */}
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-3xl mb-20 justify-center md:justify-end">
        {buttons.map(
          ({ id, href, text, isDownload, className, hoverTextColor }) => (
            <a
              key={id}
              href={href}
              download={isDownload}
              onMouseEnter={() => setHoverIndex(id)}
              onMouseLeave={() => setHoverIndex(null)}
              className={`relative inline-block px-6 py-3 font-medium rounded-md overflow-hidden cursor-pointer transition-colors duration-300 ${className} ${hoverTextColor}`}
              aria-label={text}
            >
              {text}
              {/* Border lines */}
              <span
                className={`absolute top-0 left-0 h-[2px] bg-[#E38422] transition-all duration-700 ease-in-out origin-left ${
                  hoverIndex === id ? "w-0" : "w-full"
                }`}
              />
              <span
                className={`absolute top-0 right-0 w-[2px] bg-[#E38422] transition-all duration-700 ease-in-out origin-top delay-200 ${
                  hoverIndex === id ? "h-0" : "h-full"
                }`}
              />
              <span
                className={`absolute bottom-0 right-0 h-[2px] bg-[#E38422] transition-all duration-700 ease-in-out origin-right delay-400 ${
                  hoverIndex === id ? "w-[80%] h-[3px]" : "w-full"
                }`}
              />
              <span
                className={`absolute bottom-0 left-0 w-[2px] bg-[#E38422] transition-all duration-700 ease-in-out origin-bottom delay-600 ${
                  hoverIndex === id ? "h-0" : "h-full"
                }`}
              />
            </a>
          )
        )}
      </div>

      {/* Metrikler */}
      <div
        ref={metricsRef}
        className={`w-full max-w-3xl grid grid-cols-1 sm:grid-cols-3 gap-6 text-center mt-14 md:mt-0`}
      >
        {[3, 30, 100].map((target, idx) => (
          <div
            key={target}
            className={`bg-white shadow-lg rounded-lg p-6 transition-transform transition-opacity duration-1000 ease-out ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
            }`}
            style={{
              transitionDelay: visible ? `${idx * 200}ms` : "0ms",
            }}
          >
            {visible && <Counter target={target} />}
            <p className="text-sm sm:text-base text-gray-700 font-semibold">
              {target === 3
                ? "Yıl Deneyim"
                : target === 30
                ? "Tamamlanan Proje"
                : "Müşteri Memnuniyeti"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
