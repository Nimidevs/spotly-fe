// Modal type definitions
export type ModalType = 'login' | 'signup';

// Navbar props - only needs to open modal, not close it
export interface NavbarProps {
  openModal: (type: ModalType) => void;
}

// OnboardModal props - receives initial type and close handler
export interface OnboardModalProps {
  modalType: ModalType;
  onClose: () => void;
}

// Props for SignUp and LogIn components - only need to switch between modals
export interface OnboardFormProps {
  onSwitch: (type: ModalType) => void;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  bio: string;
  avatarUrl: string;
  joinReason: string;
  onboardingStatus: string;
  onboardingStep: number;
  location_permission: string;
}