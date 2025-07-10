

import React from 'react';
import { APP_TITLE } from '../../constants';
import Button from '../common/Button';
import { useTranslation } from '../../i18n/I18nContext';
import CartIcon from '../cart/CartIcon';

interface HeaderProps {
  title?: string;
  activeView?: 'editor' | 'admin';
  isLoggedIn?: boolean;
  onViewChange?: (view: 'editor' | 'admin') => void;
  onNavigateToHowItWorks?: () => void;
  
  // New props for global context
  currentUser: string | null;
  isGhostUser: boolean;
  environment: 'test' | 'live';
  onEnvironmentChange: (newEnv: 'test' | 'live') => void;
  onLogout: () => void;
  onLogin: () => void;
  language: 'en' | 'es';
  onLanguageChange: (lang: 'en' | 'es') => void;
  cartItemCount: number;
  onCartClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
    title, activeView, isLoggedIn, onViewChange, onNavigateToHowItWorks,
    currentUser, isGhostUser, environment, onEnvironmentChange, onLogout, onLogin,
    language, onLanguageChange, cartItemCount, onCartClick
}) => {
  const { t } = useTranslation();

  return (
    <header className="bg-white text-slate-800 shadow-sm sticky top-0 z-40 border-b border-slate-200">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        
        <div className="flex items-center space-x-4">
            <h1 className="text-xl sm:text-2xl font-bold">{title || APP_TITLE}</h1>
             {onNavigateToHowItWorks && (
                <Button variant="secondary" size="sm" onClick={onNavigateToHowItWorks} className="!hidden sm:!flex items-center space-x-1.5 !border-none">
                    <i className="material-icons-round text-lg text-slate-500">help_outline</i>
                    <span className="hidden sm:inline text-slate-600">{t('header.howItWorks')}</span>
                </Button>
            )}
            {isLoggedIn && onViewChange && activeView && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onViewChange(activeView === 'editor' ? 'admin' : 'editor')}
                className="hidden sm:flex items-center space-x-2"
              >
                {activeView === 'editor' ? (
                    <>
                        <i className="material-icons-round text-lg">dashboard</i>
                        <span>{t('header.dashboard')}</span>
                    </>
                ) : (
                    <>
                        <i className="material-icons-round text-lg">edit</i>
                        <span>{t('header.editor')}</span>
                    </>
                )}
              </Button>
            )}
        </div>
        
        <div className="flex items-center space-x-3">
          {isLoggedIn && !isGhostUser && (
              <div className="hidden md:flex items-center space-x-3">
                  <span className="text-sm text-slate-500">
                    {t('header.user', { name: currentUser })}
                  </span>
                  <div className="w-px h-5 bg-slate-300"></div>
                  <div className="flex items-center space-x-1 bg-slate-200 p-1 rounded-lg">
                    <button type="button" onClick={() => onEnvironmentChange('test')} className={`px-2 py-0.5 rounded text-xs font-semibold ${environment === 'test' ? 'bg-white text-slate-700 shadow' : 'bg-transparent text-slate-500 hover:bg-slate-300/50'}`}>{t('header.test')}</button>
                    <button type="button" onClick={() => onEnvironmentChange('live')} className={`px-2 py-0.5 rounded text-xs font-semibold ${environment === 'live' ? 'bg-white text-slate-700 shadow' : 'bg-transparent text-slate-500 hover:bg-slate-300/50'}`}>{t('header.live')}</button>
                  </div>
                   <div className="flex items-center space-x-1 bg-slate-200 p-1 rounded-lg">
                    <button type="button" onClick={() => onLanguageChange('en')} className={`px-2 py-0.5 rounded text-xs font-semibold ${language === 'en' ? 'bg-white text-slate-700 shadow' : 'bg-transparent text-slate-500 hover:bg-slate-300/50'}`}>EN</button>
                    <button type="button" onClick={() => onLanguageChange('es')} className={`px-2 py-0.5 rounded text-xs font-semibold ${language === 'es' ? 'bg-white text-slate-700 shadow' : 'bg-transparent text-slate-500 hover:bg-slate-300/50'}`}>ES</button>
                  </div>
              </div>
          )}
          <CartIcon itemCount={cartItemCount} onClick={onCartClick} />
          {isLoggedIn ? (
            <Button variant="secondary" size="sm" onClick={onLogout}>{t('header.logout')}</Button>
          ) : (
             <Button variant="primary" size="sm" onClick={onLogin}>{t('header.login')}</Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
