import React, { useState } from 'react';
import { PaddleIcon, MenuIcon, XIcon } from './icons';

const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        { href: '#mission', label: 'Mission' },
        { href: '#specs', label: 'Specs' },
        { href: '#why', label: 'Why It Matters' },
        { href: '#scale', label: 'Scale' },
        { href: '#process', label: 'Process' },
        { href: '#community', label: 'Community' },
    ];

    return (
        <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200/50">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex justify-between items-center h-20">
                    <a href="#home" className="flex items-center gap-2 text-2xl font-bold text-slate-900">
                        <PaddleIcon />
                        <span>OpenPaddle</span>
                    </a>

                    <nav className="hidden md:flex items-center space-x-6">
                        {navLinks.map(link => (
                            <a key={link.href} href={link.href} className="text-slate-600 font-medium hover:text-teal-500 transition-colors">
                                {link.label}
                            </a>
                        ))}
                    </nav>

                    <div className="hidden md:flex items-center">
                        <a href="#community" className="ml-6 px-5 py-2 bg-teal-500 text-white font-semibold rounded-lg shadow-sm hover:bg-teal-600 transition-colors duration-300">
                            Join Waitlist
                        </a>
                    </div>

                    <div className="md:hidden">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-600 hover:text-teal-500">
                            {isMenuOpen ? <XIcon /> : <MenuIcon />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-t border-slate-200">
                    <div className="px-4 py-4 flex flex-col space-y-4">
                        {navLinks.map(link => (
                            <a key={link.href} href={link.href} onClick={() => setIsMenuOpen(false)} className="text-slate-600 font-medium hover:text-teal-500 transition-colors">
                                {link.label}
                            </a>
                        ))}
                        <a href="#community" onClick={() => setIsMenuOpen(false)} className="w-full text-center px-5 py-3 bg-teal-500 text-white font-semibold rounded-lg shadow-sm hover:bg-teal-600 transition-colors duration-300">
                            Join Waitlist
                        </a>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;