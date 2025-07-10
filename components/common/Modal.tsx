
import React, { useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
  size?: 'md' | 'lg' | 'xl' | '2xl';
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title, size = 'md' }) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }
  
  const sizeClasses: Record<string, string> = {
      md: 'max-w-md',
      lg: 'max-w-lg',
      xl: 'max-w-xl',
      '2xl': 'max-w-2xl',
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-start justify-center p-4 z-50 transition-opacity duration-300 ease-in-out overflow-y-auto">
      <div className={`bg-white rounded-lg shadow-xl p-6 w-full ${sizeClasses[size]} transform transition-all duration-300 ease-in-out scale-100 opacity-100 my-8`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-slate-800">{title}</h2>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-700 text-2xl"
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
