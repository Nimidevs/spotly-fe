import { useState, useEffect, useRef } from "react";
import modalImage from "../../assets/modal-image.png";
import { X } from "lucide-react";
import type { OnboardModalProps, ModalType } from "../../interfaces";
import SignUp from "./signUp";
import LogIn from "./logIn";

const OnboardModal = ({ modalType, onClose }: OnboardModalProps) => {
  const [currentType, setCurrentType] = useState<ModalType>(modalType);

  const modalref = useRef(null)

  // Update current type when modalType prop changes
  useEffect(() => {
    setCurrentType(modalType);
    // const handleClick = (e: MouseEvent) => {
    //   if(modalref.current && !(modalref.current as HTMLElement).contains(e.target as Node)) {
    //     onClose();
    //   }
    // };
    // window.addEventListener("mousedown", handleClick);
    // return () => window.removeEventListener("mousedown", handleClick);
  }, [modalType]);

  const switchTo = (type: ModalType) => {
    setCurrentType(type);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div ref={modalref}  className="relative w-full h-full max-w-6xl max-h-[90vh] bg-white rounded-lg overflow-hidden flex shadow-2xl p-1">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/80 hover:bg-white transition-colors shadow-md"
        >
          <X className="w-5 h-5 text-gray-700" />
        </button>

        {/* Left Side - Image */}
        <div className="hidden md:flex md:w-1/2 bg-gray-50 relative overflow-hidden">
          <img 
            src={modalImage} 
            alt="" 
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        {/* Right Side - Content */}
        {currentType === "signup" ? (
          <SignUp onSwitch={switchTo} />
        ) : (
          <LogIn onSwitch={switchTo} />
        )}
      </div>
    </div>
  );
};

export default OnboardModal;
