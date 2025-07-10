
import React from 'react';
import Button from '../common/Button';

interface SandboxBannerProps {
  onCreateAccount: () => void;
}

const SandboxBanner: React.FC<SandboxBannerProps> = ({ onCreateAccount }) => {
  return (
    <div className="bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-400 text-slate-900 text-sm font-semibold px-4 py-2 flex items-center justify-center text-center shadow-md z-50 sticky top-0 border-b border-black/10">
      <i className="material-icons-round mr-2">science</i>
      <span className="hidden sm:inline">You are in Sandbox Mode – your changes are temporary.</span>
      <span className="inline sm:hidden">Sandbox Mode: Changes are temporary.</span>
      <Button 
        onClick={onCreateAccount}
        size="sm"
        className="ml-4 flex-shrink-0 !px-4 !py-1.5 !text-xs !font-bold bg-white/90 hover:bg-white text-amber-900 shadow-md hover:shadow-lg transition-all duration-200 rounded-full border border-black/10"
      >
        Create Account to Save
      </Button>
    </div>
  );
};

export default SandboxBanner;