import { useState, useEffect } from "react";
import type { NavbarProps } from "../../interfaces";

export default function Navbar({ openModal }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`w-full px-6 md:px-12 py-4 sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-sm"
          : "bg-white/95 backdrop-blur-sm border-b border-gray-100/50"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <a
          href="/"
          className="text-2xl font-bold text-black tracking-tight hover:opacity-70 transition-opacity"
        >
          spotly.
        </a>

        <div className="hidden md:flex items-center gap-8 lg:gap-10">
          <a
            href="/how-it-works"
            className="text-gray-600 hover:text-black transition-colors text-[15px] font-medium"
          >
            How it works
          </a>
          <a
            href="/safety"
            className="text-gray-600 hover:text-black transition-colors text-[15px] font-medium"
          >
            Safety
          </a>
          <a
            href="/community"
            className="text-gray-600 hover:text-black transition-colors text-[15px] font-medium"
          >
            Community
          </a>
          <a
            href="/blog"
            className="text-gray-600 hover:text-black transition-colors text-[15px] font-medium"
          >
            Blog
          </a>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => openModal("login")}
            className="text-gray-600 hover:text-black transition-colors hidden sm:block text-[15px] font-medium"
          >
            Log in
          </button>
          <button
            onClick={() => openModal("signup")}
            className="bg-[#EBF934] hover:from-[#FFD000] hover:to-[#FFC000] text-black font-semibold px-6 py-2.5 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 text-[15px]"
          >
            Get Started
          </button>
        </div>
      </div>
    </nav>

    // vo

    //  <nav className="fixed top-0 w-full bg-white border-b border-gray-100 z-50">
    //   <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
    //     {/* Logo */}
    //     <div className="text-2xl font-bold tracking-tight text-black">nearby.</div>

    //     {/* Links */}
    //     <div className="hidden md:flex gap-8 items-center">
    //       <a href="#" className="text-sm text-gray-700 hover:text-black transition">
    //         How it works
    //       </a>
    //       <a href="#" className="text-sm text-gray-700 hover:text-black transition">
    //         Safety
    //       </a>
    //       <a href="#" className="text-sm text-gray-700 hover:text-black transition">
    //         Community
    //       </a>
    //       <a href="#" className="text-sm text-gray-700 hover:text-black transition">
    //         Blog
    //       </a>
    //     </div>

    //     {/* Auth Buttons */}
    //     <div className="flex gap-3 items-center">
    //       <button className="text-sm text-gray-700 hover:text-black transition hidden sm:block">Log in</button>
    //       <button className="px-6 py-2 bg-lime-400 text-black text-sm font-semibold rounded-full hover:bg-lime-300 transition">
    //         Get Started
    //       </button>
    //     </div>
    //   </div>
    // </nav>
  );
}
