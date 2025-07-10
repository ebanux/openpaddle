
import React, { useState } from 'react';

interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({ title, children, defaultOpen = true }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-slate-200 rounded-lg bg-white shadow-sm">
      <h2 className="mb-0 text-md">
        <button
          type="button"
          className="flex items-center justify-between w-full p-3 font-semibold text-slate-700 text-left transition-colors duration-150 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
        >
          <span>{title}</span>
          <svg
            className={`w-5 h-5 shrink-0 transition-transform duration-200 ${isOpen ? '' : '-rotate-90'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </h2>
      {isOpen && (
        <div className="p-3 border-t border-slate-200">
          {children}
        </div>
      )}
    </div>
  );
};

export default CollapsibleSection;
