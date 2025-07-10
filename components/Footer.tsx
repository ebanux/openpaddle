import React from 'react';
import { GitHubIcon, TwitterIcon, PaddleIcon } from './icons';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-100 border-t border-slate-200">
      <div className="max-w-6xl mx-auto py-12 px-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          <div className="flex items-center gap-2">
            <PaddleIcon />
            <span className="font-bold text-xl text-slate-800">OpenPaddle</span>
          </div>
          <div className="flex items-center space-x-6">
            <a href="https://github.com/ebanux/openpaddle" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-teal-500 transition-colors">
              <span className="sr-only">GitHub</span>
              <GitHubIcon />
            </a>
            <a href="https://x.com/OpenPaddle" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-teal-500 transition-colors">
              <span className="sr-only">Twitter / X</span>
              <TwitterIcon />
            </a>
          </div>
        </div>
        <div className="mt-8 text-center text-slate-500 text-sm">
          <p>&copy; {new Date().getFullYear()} OpenPaddle Project. All rights reserved.</p>
          <p className="mt-1">A community-driven open hardware initiative.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;