import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiArrowDown } from "react-icons/fi";

export default function Hero() {
  const [animate, setAnimate] = useState(false);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <div className="h-screen flex flex-col-reverse md:flex-row items-center justify-center px-4 md:px-6 gap-10 max-w-7xl mx-auto">
      <div className="flex-1 text-center md:text-left">
        <h1
          className={`text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 tracking-tight ${
            animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          } transition-all duration-1000 text-[#1D204A]`}
        >
          Merhaba, ben <span className="text-[#E38422]">Seda Diriker</span>
        </h1>

        <p
          className={`text-base sm:text-lg md:text-xl text-gray-700 mb-8 max-w-lg mx-auto md:mx-0 ${
            animate ? "opacity-100" : "opacity-0"
          } transition-opacity delay-300 duration-1000`}
        >
          Kullanıcı odaklı, yüksek performanslı web ve mobil uygulamalar
          geliştiriyorum.
        </p>

        {/* Buton */}
        <div className="flex w-full justify-center md:justify-end">
          <Link
            href="/#about"
            className="relative inline-block px-10 py-3 text-[#E38422] font-semibold rounded-md bg-transparent overflow-hidden cursor-pointer hover:text-white hover:bg-[#47586F] me-5"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            tabIndex={0}
            aria-label="Hakkımda Daha Fazlası"
          >
            Hakkımda Daha Fazlası
            {/* Üst */}
            <span
              className={`absolute top-0 left-0 h-[2px] bg-[#E38422] transition-all duration-700 ease-in-out origin-left ${
                hover ? "w-0" : "w-full"
              }`}
            ></span>
            {/* Sağ */}
            <span
              className={`absolute top-0 right-0 w-[2px] bg-[#E38422] transition-all duration-700 ease-in-out origin-top delay-200 ${
                hover ? "h-0" : "h-full"
              }`}
            ></span>
            {/* Alt */}
            <span
              className={`absolute bottom-0 right-0 h-[2px] bg-[#E38422] transition-all duration-700 ease-in-out origin-right delay-400 ${
                hover ? "w-[80%] h-[2px]" : "w-full"
              }`}
            ></span>
            {/* Sol */}
            <span
              className={`absolute bottom-0 left-0 w-[2px] bg-[#E38422] transition-all duration-700 ease-in-out origin-bottom delay-600 ${
                hover ? "h-0" : "h-full"
              }`}
            ></span>
            <FiArrowDown
              size={24}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-[#E38422] animate-bounce"
              aria-label="Scroll down"
            />
          </Link>
        </div>
      </div>

      {/* Görsel kısmı */}
      <div className="flex-1 flex justify-center md:justify-end">
        <Image
          src="https://github.com/arsentieva/arsentieva/blob/main/code.gif?raw=true"
          alt="Seda Diriker coding animation"
          width={600}
          height={500}
          priority
          className="max-w-full h-auto rounded-lg"
          style={{ maxWidth: "100%", height: "auto" }}
        />
      </div>
    </div>
  );
}
