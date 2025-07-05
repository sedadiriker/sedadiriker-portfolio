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
  const [hover, setHover] = useState(false);
  const [lineVisible, setLineVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const lineRef = useRef<HTMLDivElement | null>(null);
interface FormspreeError {
  message: string;
}
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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const form = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        form.append(key, value);
      });

      const res = await fetch("https://formspree.io/f/mrbkvejy", {
        method: "POST",
        body: form,
        headers: {
          Accept: "application/json",
        },
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(true);
        setFormData({
          name: "",
          surname: "",
          email: "",
          subject: "",
          message: "",
        });
      } else if (data.errors) {
  setError(data.errors.map((err: FormspreeError) => err.message).join(", "));
      } else {
        setError("Mesaj gönderilirken hata oluştu.");
      }
    } catch {
      setError("Mesaj gönderilirken hata oluştu.");
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
        <div className="flex flex-col md:flex-row gap-4">
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Adınız"
            value={formData.name}
            onChange={handleChange}
            className="p-3 rounded bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E38422] focus:border-transparent transition w-full"
            required
            disabled={loading}
          />
          <input
            id="surname"
            name="surname"
            type="text"
            placeholder="Soyadınız"
            value={formData.surname}
            onChange={handleChange}
            className="p-3 rounded bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E38422] focus:border-transparent transition w-full"
            required
            disabled={loading}
          />
          <input
            id="subject"
            name="subject"
            type="text"
            placeholder="Konu"
            value={formData.subject}
            onChange={handleChange}
            className="p-3 rounded bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E38422] focus:border-transparent transition w-full"
            disabled={loading}
          />
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email adresiniz"
            value={formData.email}
            onChange={handleChange}
            className="p-3 rounded bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E38422] focus:border-transparent transition w-full"
            required
            disabled={loading}
          />
        </div>

        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="Mesajınızı yazın"
          value={formData.message}
          onChange={handleChange}
          className="p-3 rounded bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E38422] focus:border-transparent transition resize-none"
          required
          disabled={loading}
        />

        {error && (
          <p className="text-red-600 font-medium text-sm mt-2">{error}</p>
        )}
        {success && (
          <p className="text-green-600 font-medium text-sm mt-2">
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
