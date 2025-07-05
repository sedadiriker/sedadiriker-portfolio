"use client";

import { useState, useEffect, useRef } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [hover, setHover] = useState(false);

  const lineRef = useRef<HTMLDivElement | null>(null);
  const [lineVisible, setLineVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setLineVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );

    if (lineRef.current) {
      observer.observe(lineRef.current);
    }

    return () => observer.disconnect();
  }, []);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function validateEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!formData.name.trim()) {
      setError("Lütfen adınızı girin.");
      return;
    }
    if (!formData.surname.trim()) {
      setError("Lütfen soyadınızı girin.");
      return;
    }
    if (!validateEmail(formData.email)) {
      setError("Geçerli bir e-posta adresi girin.");
      return;
    }
    if (!formData.message.trim()) {
      setError("Lütfen mesajınızı yazın.");
      return;
    }

    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setSuccess(true);
      setFormData({
        name: "",
        surname: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch {
      setError("Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="h-screen flex flex-col justify-center items-center px-6 w-7xl max-w-7xl text-center">
      <h2
        className="text-4xl font-bold mb-2 text-gray-900 relative inline-block"
        ref={lineRef}
      >
        İletişim
      </h2>
      {/* Animasyonlu çizgi */}
      <div
        className={`h-1 bg-[#E38422] rounded-full mx-auto mb-8 transition-all duration-1000 ease-in-out ${
          lineVisible ? "w-24 opacity-100" : "w-0 opacity-0"
        }`}
      />

      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col gap-5 text-left"
        noValidate
      >
        {/* Ad ve Soyad yan yana */}
        <div className="flex flex-col md:flex-row gap-4">
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Adınız"
            value={formData.name}
            onChange={handleChange}
            disabled={loading}
            className="p-3 rounded bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E38422] focus:border-transparent transition w-full"
            required
          />
          <input
            id="surname"
            name="surname"
            type="text"
            placeholder="Soyadınız"
            value={formData.surname}
            onChange={handleChange}
            disabled={loading}
            className="p-3 rounded bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E38422] focus:border-transparent transition w-full"
            required
          />
          <input
            id="subject"
            name="subject"
            type="text"
            placeholder="Konu"
            value={formData.subject}
            onChange={handleChange}
            disabled={loading}
            className="p-3 rounded bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E38422] focus:border-transparent transition w-full"
          />
        </div>

        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="Mesajınızı yazın"
          value={formData.message}
          onChange={handleChange}
          disabled={loading}
          className="p-3 rounded bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E38422] focus:border-transparent transition resize-none"
          required
        />

        {error && <p className="text-red-600 font-medium text-sm">{error}</p>}
        {success && (
          <p className="text-green-600 font-medium text-sm">
            Mesajınız başarıyla gönderildi!
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          className={`relative inline-block px-6 py-3 font-semibold rounded-md overflow-hidden cursor-pointer
    text-[#E38422] bg-transparent
    hover:text-white hover:bg-[#47586F]
    disabled:opacity-60 disabled:cursor-not-allowed
    transition-colors duration-300 w-[30%] mx-auto
  `}
          aria-label="Mesajı Gönder"
        >
          {loading ? "Gönderiliyor..." : "Gönder"}

          {/* Border lines */}
          <span
            className={`absolute top-0 left-0 h-[2px] bg-[#E38422] transition-all duration-700 ease-in-out origin-left ${
              hover ? "w-0" : "w-full"
            }`}
          />
          <span
            className={`absolute top-0 right-0 w-[2px] bg-[#E38422] transition-all duration-700 ease-in-out origin-top delay-200 ${
              hover ? "h-0" : "h-full"
            }`}
          />
          <span
            className={`absolute bottom-0 right-0 h-[2px] bg-[#E38422] transition-all duration-700 ease-in-out origin-right delay-400 ${
              hover ? "w-[80%] h-[3px]" : "w-full"
            }`}
          />
          <span
            className={`absolute bottom-0 left-0 w-[2px] bg-[#E38422] transition-all duration-700 ease-in-out origin-bottom delay-600 ${
              hover ? "h-0" : "h-full"
            }`}
          />
        </button>
      </form>
    </div>
  );
}
