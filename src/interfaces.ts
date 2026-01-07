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