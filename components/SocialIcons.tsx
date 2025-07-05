import { FaLinkedinIn, FaGithub } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";

export default function SocialIcons() {
  const icons = [
    {
      href: "https://www.linkedin.com/in/seda-diriker/",
      label: "LinkedIn",
      icon: <FaLinkedinIn size={20} className="text-blue-700" />,
      isButton: false,
    },
    {
      href: "https://github.com/sedadiriker",
      label: "GitHub",
      icon: <FaGithub size={20} className="text-gray-800" />,
      isButton: false,
    },
    {
      href: null,
      label: "Paylaş",
      icon: <FiShare2 size={20} className="text-gray-800" />,
      isButton: true,
    },
  ];

  function handleShare() {
    const shareUrl = window.location.href;
    if (navigator.share) {
      navigator.share({
        title: "Seda Diriker Portfolio",
        url: shareUrl,
      });
    } else {
      navigator.clipboard.writeText(shareUrl);
      alert("Link panoya kopyalandı!");
    }
  }

  return (
    <>
     <style>{`
  @keyframes slideDownFadeInStayFadeOut {
    0% {
      transform: translateY(-60px);
      opacity: 0;
    }
    10% {
      transform: translateY(0);
      opacity: 1;
    }
    40% {
      transform: translateY(0);
      opacity: 1;
    }
    70% {
      transform: translateY(0);
      opacity: 1;
    }
    100% {
      transform: translateY(60px);
      opacity: 0;
    }
  }
`}</style>

<div className="fixed top-0 right-4 h-screen flex flex-col items-center justify-center gap-6 z-50">
  {icons.map(({ href, label, icon, }, index) =>
    href ? (
      <a
        key={label}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className="bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-md cursor-pointer transition transform hover:scale-110 hover:shadow-lg"
        style={{
          animation: `slideDownFadeInStayFadeOut 12s ease-in-out infinite`,
          animationFillMode: "forwards",
          animationDelay: `${index * 2}s`, // ikonların animasyonları 2 saniye aralıkla başlasın
        }}
      >
        {icon}
      </a>
    ) : (
      <button
        key={label}
        onClick={handleShare}
        aria-label={label}
        className="bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-md cursor-pointer transition transform hover:scale-110 hover:shadow-lg"
        style={{
          animation: `slideDownFadeInStayFadeOut 12s ease-in-out infinite`,
          animationFillMode: "forwards",
          animationDelay: `${index * 2}s`,
        }}
      >
        {icon}
      </button>
    )
  )}
</div>

    </>
  );
}
