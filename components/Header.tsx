"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi"; // Hamburger ve kapatma ikonları

interface NavItem {
  id: string;
  label: string;
}

const navItems: NavItem[] = [
  { id: "home", label: "Ana Sayfa" },
  { id: "about", label: "Hakkımda" },
  { id: "skills", label: "Yeteneklerim" },
  { id: "work", label: "Projeler" },
  { id: "contact", label: "İletişim" },
];

export default function Header() {
  const [activeSection, setActiveSection] = useState<string>("home");
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 50);

      let current = "home";
      navItems.forEach((item) => {
        const section = document.getElementById(item.id);
        if (section && section.offsetTop - 100 <= scrollY) {
          current = item.id;
        }
      });
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Menü öğesine tıklanınca menüyü kapat
  function handleNavClick(id: string) {
    setActiveSection(id);
    setMenuOpen(false);
  }

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 py-3 ${
        scrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* LOGO */}
        <Link href="#home" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Logo"
            width={60}
            height={60}
            className="rounded-full shadow-[0_8px_15px_rgba(0,0,0,0.25)] transition-transform duration-300 hover:scale-105"
          />

          <span className="text-lg font-bold text-[#1C1E48] hidden sm:inline">
            Seda Diriker
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-12">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`text-sm font-medium transition-colors ${
                activeSection === item.id
                  ? "text-[#E38422]"
                  : "text-gray-700 hover:text-[#E38422]"
              }`}
              onClick={() => handleNavClick(item.id)}
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-3xl text-[#E38422]"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menüyü aç/kapat"
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </nav>

      {/* Mobile Menü */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md fixed top-[64px] left-0 right-0 z-40 flex flex-col items-center py-6 space-y-6 border-t border-gray-200">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => handleNavClick(item.id)}
              className={`text-lg font-semibold ${
                activeSection === item.id
                  ? "text-[#E38422]"
                  : "text-gray-700 hover:text-[#E38422]"
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
