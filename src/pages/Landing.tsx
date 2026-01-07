import { useState } from "react";
import Navbar from "../components/Landing/Navbar";
import Hero from "../components/Landing/Hero";
import HowItWorks from "../components/Landing/HowItWorks";
import NearbyActivity from "../components/Landing/NearbyActivity";
import Vibes from "../components/Landing/Vibes";
import Safety from "../components/Landing/Safety";
import FinalCTA from "../components/Landing/FinalCTA";
import Footer from "../components/Landing/Footer";
import OnboardModal from "../components/auth/AuthModal";
import type { ModalType } from "../interfaces";

export default function Landing() {
  const [modalType, setModalType] = useState<ModalType | null>(null);

  const openModal = (type: ModalType) => {
    setModalType(type);
  };

  const closeModal = () => {
    setModalType(null);
  };

  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      <Navbar openModal={openModal} />
      <Hero />
      <HowItWorks />
      <NearbyActivity />
      <Vibes />
      <Safety />
      <FinalCTA />
      <Footer />

      {modalType && (
        <OnboardModal modalType={modalType} onClose={closeModal} />
      )}
    </div>
  );
}
