

import React, { useState } from 'react';
import Button from '../components/common/Button';
import { MonetizationUseCase, Template, ThemeDefinition } from '../types';
import { NAV_ITEMS, THEMES, DEFAULT_PAGE_STYLE, generateMockDataForTenant, CURRENCY_SYMBOLS } from '../constants';
import { APP_TEMPLATES } from '../templates';
import TemplateBrowser from '../components/editor/TemplateBrowser';
import { useTranslation } from '../i18n/I18nContext';

// Import all page components for preview rendering
import DonationPage from './DonationPage';
import FundraisingPage from './FundraisingPage';
import ProductPage from './ProductPage';
import SubscriptionRentalPage from './SubscriptionRentalPage';
import TimedRentalPage from './TimedRentalPage';
import ParkingSessionPage from './ParkingSessionPage';
import RestaurantBillPage from './RestaurantBillPage';
import TipsPage from './TipsPage';
import EventTicketSalesPage from './EventTicketSalesPage'; 
import AppointmentBookingPage from './AppointmentBookingPage';
import DigitalContentAccessPage from './DigitalContentAccessPage';
import SimpleInvoicePage from './SimpleInvoicePage';
import MembershipPage from './MembershipPage';
import VoucherPage from './VoucherPage';
import PaymentLinkPage from './PaymentLinkPage';
import CatalogPage from './CatalogPage';


interface LandingPageProps {
  onStartBuilding: () => void;
  onApplyTemplateAndStart: (template: Template<any>) => void;
  onNavigateToHowItWorks: () => void;
  onNavigateToSolutionPage: (solution: 'event-tickets' | 'subscriptions' | 'parking') => void;
  onRequestTemplatePreview: (template: Template<any>) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStartBuilding, onApplyTemplateAndStart, onNavigateToHowItWorks, onNavigateToSolutionPage, onRequestTemplatePreview }) => {
  const [selectedUseCase, setSelectedUseCase] = useState<MonetizationUseCase>(MonetizationUseCase.PAYMENT_LINK);
  const [isSolutionsMenuOpen, setIsSolutionsMenuOpen] = useState(false);
  const { t, language, setLanguage } = useTranslation();
  
  const selectedTemplate = APP_TEMPLATES.find(t => t.useCase === selectedUseCase);

  const advantages = [
    { icon: 'construction', title: t('landing.advantages.items.flexibility.title'), description: t('landing.advantages.items.flexibility.description') },
    { icon: 'devices', title: t('landing.advantages.items.mobile.title'), description: t('landing.advantages.items.mobile.description') },
    { icon: 'smart_toy', title: t('landing.advantages.items.logic.title'), description: t('landing.advantages.items.logic.description') },
    { icon: 'palette', title: t('landing.advantages.items.design.title'), description: t('landing.advantages.items.design.description') },
    { icon: 'bolt', title: t('landing.advantages.items.performance.title'), description: t('landing.advantages.items.performance.description') },
    { icon: 'verified_user', title: t('landing.advantages.items.security.title'), description: t('landing.advantages.items.security.description') },
  ];
  
  const getTemplateFeatures = (template: typeof selectedTemplate) => {
    if (!template) return [];
    const features = [];
    switch (template.useCase) {
        case MonetizationUseCase.FUNDRAISING:
            features.push('Accept custom donations');
            features.push('Set predefined amounts');
            features.push('Encourage social sharing');
            break;
        case MonetizationUseCase.PRODUCT_SALE:
            features.push('Sell physical or digital goods');
            features.push('Enable adjustable quantity');
            features.push('Collect shipping addresses');
            break;
        case MonetizationUseCase.SUBSCRIPTION_RENTAL:
            features.push('Offer multiple subscription tiers');
            features.push('Set monthly or yearly billing');
            features.push('Customer portal for management');
            break;
        case MonetizationUseCase.PARKING_SESSION:
            features.push('Set timed parking rates');
            features.push('Collect license plate numbers');
            features.push('Enable "Pay by Text"');
            break;
        default:
            features.push('Simple, secure checkout');
            features.push('Customizable fields');
            features.push('QR code & link sharing');
            break;
    }
    return features;
  };

  const FaqItem: React.FC<{ q: string; a: string }> = ({ q, a }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div className="border-b border-slate-200 py-4">
        <button
          type="button"
          className="w-full flex justify-between items-center text-left font-semibold text-slate-800"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{q}</span>
          <i className={`material-icons-round text-slate-500 transition-transform ${isOpen ? 'transform rotate-180' : ''}`}>expand_more</i>
        </button>
        {isOpen && <p className="mt-2 text-slate-600">{a}</p>}
      </div>
    );
  };
  
  const Checkmark: React.FC<{ className?: string }> = ({ className = 'text-green-500' }) => <i className={`material-icons-round ${className} mr-2 flex-shrink-0`}>check_circle</i>;
  
  const renderTemplateInPhone = () => {
    if (!selectedTemplate) return null;

    const templateThemeId = selectedTemplate.initialData?.pageStyle?.theme || DEFAULT_PAGE_STYLE.theme;
    const activeThemeForPreview: ThemeDefinition = THEMES.find(t => t.id === templateThemeId) || THEMES[0];

    // Mock checkout function
    const mockInitiateCheckout = () => {
        alert("This is an interactive preview! This button would open the checkout modal.");
    };

    const basePageProps = {
      initialData: selectedTemplate.initialData,
      isLivePreview: true, 
      onInitiateCheckout: mockInitiateCheckout,
      theme: activeThemeForPreview,
      environment: 'test' as 'test' | 'live', 
      adminData: generateMockDataForTenant('preview_tenant'),
      onAddToCart: () => {}
    };
    
    const pageComponentMap: { [key in MonetizationUseCase]?: React.FC<any> } = {
        [MonetizationUseCase.PAYMENT_LINK]: PaymentLinkPage,
        [MonetizationUseCase.DONATION]: DonationPage,
        [MonetizationUseCase.FUNDRAISING]: FundraisingPage,
        [MonetizationUseCase.PRODUCT_SALE]: ProductPage,
        [MonetizationUseCase.SUBSCRIPTION_RENTAL]: SubscriptionRentalPage,
        [MonetizationUseCase.MEMBERSHIP_ACCESS]: MembershipPage,
        [MonetizationUseCase.VOUCHER]: VoucherPage,
        [MonetizationUseCase.TIMED_RENTAL]: TimedRentalPage,
        [MonetizationUseCase.PARKING_SESSION]: ParkingSessionPage,
        [MonetizationUseCase.RESTAURANT_BILL]: RestaurantBillPage,
        [MonetizationUseCase.TIPS]: TipsPage,
        [MonetizationUseCase.EVENT_TICKET_SALES]: EventTicketSalesPage,
        [MonetizationUseCase.APPOINTMENT_BOOKING]: AppointmentBookingPage,
        [MonetizationUseCase.DIGITAL_CONTENT_ACCESS]: DigitalContentAccessPage,
        [MonetizationUseCase.SIMPLE_INVOICE]: SimpleInvoicePage,
        [MonetizationUseCase.CATALOG]: CatalogPage,
    };

    const PageComponent = pageComponentMap[selectedTemplate.useCase];
    
    if (PageComponent) {
        // Special case for ParkingSessionPage
        if (selectedTemplate.useCase === MonetizationUseCase.PARKING_SESSION) {
            return <ParkingSessionPage {...basePageProps as any} getParkingSpecificData={() => {}} />;
        }
        return <PageComponent {...basePageProps as any} />;
    }

    return <div className="p-4 text-slate-500">Preview not available for this template type.</div>;
  }

  return (
    <div className="bg-slate-50 font-sans text-slate-800">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-6 py-3 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-slate-900">MonetizePro</h1>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-semibold">
            <a href="#features" className="text-slate-700 hover:text-orange-500">{t('nav.features')}</a>
            <a href="#templates" className="text-slate-700 hover:text-orange-500">{t('nav.useCases')}</a>
             <div 
                className="relative"
                onMouseEnter={() => setIsSolutionsMenuOpen(true)}
                onMouseLeave={() => setIsSolutionsMenuOpen(false)}
            >
                <button type="button" className="text-slate-700 hover:text-orange-500 flex items-center">
                    {t('nav.solutions')}
                    <i className="material-icons-round text-base">arrow_drop_down</i>
                </button>
                {isSolutionsMenuOpen && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 bg-white rounded-lg shadow-xl py-2 z-50 border border-slate-100">
                        <button 
                            type="button" 
                            onClick={() => onNavigateToSolutionPage('event-tickets')}
                            className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                        >
                            {t('nav.eventTickets')}
                        </button>
                        <button 
                            type="button" 
                            onClick={() => onNavigateToSolutionPage('subscriptions')}
                            className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                        >
                            {t('nav.subscriptions')}
                        </button>
                        <button 
                            type="button" 
                            onClick={() => onNavigateToSolutionPage('parking')}
                            className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                        >
                            {t('nav.parking')}
                        </button>
                    </div>
                )}
            </div>
            <button type="button" onClick={onNavigateToHowItWorks} className="text-slate-700 hover:text-orange-500">{t('nav.howItWorks')}</button>
            <a href="#pricing" className="text-slate-700 hover:text-orange-500">{t('nav.pricing')}</a>
            <a href="#global" className="text-slate-700 hover:text-orange-500">{t('nav.global')}</a>
            <a href="#faq" className="text-slate-700 hover:text-orange-500">{t('nav.faq')}</a>
          </nav>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1 bg-slate-200 p-1 rounded-lg">
                <button onClick={() => setLanguage('en')} className={`px-2 py-0.5 rounded text-xs font-semibold ${language === 'en' ? 'bg-white text-slate-700 shadow' : 'bg-transparent text-slate-500 hover:bg-slate-300/50'}`}>EN</button>
                <button onClick={() => setLanguage('es')} className={`px-2 py-0.5 rounded text-xs font-semibold ${language === 'es' ? 'bg-white text-slate-700 shadow' : 'bg-transparent text-slate-500 hover:bg-slate-300/50'}`}>ES</button>
            </div>
            <Button onClick={onStartBuilding} className="!bg-orange-500 hover:!bg-orange-600 !text-white" size="sm">
              {t('common.getStartedFree')}
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white overflow-hidden">
         <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-slate-900 to-purple-900 opacity-80"></div>
         <div className="absolute -top-24 -left-24 w-72 h-72 bg-purple-500 rounded-full opacity-20 filter blur-3xl animate-pulse"></div>
         <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-orange-500 rounded-full opacity-20 filter blur-3xl animate-pulse delay-2000"></div>
        <div className="container mx-auto px-6 py-24 sm:py-32 relative z-10 flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-4xl lg:text-6xl font-extrabold tracking-tight">
              {t('landing.hero.title')} <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-500">{t('landing.hero.subtitle')}</span>
            </h2>
            <p className="mt-4 text-lg text-slate-300">
              {t('landing.hero.description')}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button onClick={onStartBuilding} size="lg" className="!bg-orange-500 hover:!bg-orange-600 !text-white shadow-lg">
                {t('landing.hero.cta')}
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="w-[300px] h-[600px] bg-slate-800 rounded-[40px] p-2 shadow-2xl overflow-hidden ring-2 ring-slate-700/50 mx-auto">
              <div className="w-full h-full bg-white rounded-[30px] overflow-hidden relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-slate-800 rounded-b-lg z-10"></div>
                <div className="h-full overflow-y-auto no-scrollbar pt-8 p-4 text-slate-900 text-sm">
                  <div className="flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full bg-slate-200 mb-2 border-4 border-white shadow-md bg-cover" style={{backgroundImage: 'url(https://picsum.photos/seed/artist/200/200)'}}></div>
                    <h3 className="font-bold">The Weekend Band</h3>
                    <p className="text-xs text-slate-500">Live Music & Events</p>
                  </div>
                  <div className="mt-6 space-y-3">
                    <div className="bg-purple-500 text-white text-center font-semibold p-3 rounded-lg w-full">Buy Tickets to Next Show</div>
                    <div className="bg-pink-500 text-white text-center font-semibold p-3 rounded-lg w-full">Digital Tip Jar</div>
                    <div className="bg-indigo-500 text-white text-center font-semibold p-3 rounded-lg w-full">Shop Merch</div>
                  </div>
                  <p className="text-center text-xs text-slate-400 mt-24">Powered by MonetizePro</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Advantages */}
      <section id="features" className="py-16 sm:py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900">{t('landing.advantages.title')}</h3>
            <p className="mt-3 text-lg text-slate-600">{t('landing.advantages.description')}</p>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
            {advantages.map((adv) => (
              <div key={adv.title} className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-orange-100 text-orange-500 rounded-lg flex items-center justify-center text-2xl">
                  <i className="material-icons-round">{adv.icon}</i>
                </div>
                <div>
                  <h4 className="font-bold text-lg text-slate-900">{adv.title}</h4>
                  <p className="mt-1 text-slate-600">{adv.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Diverse Page Templates Section */}
      <section id="templates" className="py-16 sm:py-24 bg-slate-900 text-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h3 className="text-3xl sm:text-4xl font-extrabold">{t('landing.templates.title')}</h3>
            <p className="mt-3 text-lg text-slate-300">{t('landing.templates.description')}</p>
          </div>
          <div className="mt-12 bg-slate-800/50 border border-slate-700 p-4 sm:p-8 rounded-2xl flex flex-col md:flex-row gap-8">
            {/* Left side: list of use cases */}
            <div className="md:w-1/3 space-y-2">
              {NAV_ITEMS.map(item => {
                const isSolutionPage = [MonetizationUseCase.EVENT_TICKET_SALES, MonetizationUseCase.SUBSCRIPTION_RENTAL, MonetizationUseCase.PARKING_SESSION].includes(item.id);
                return (
                    <button
                    type="button"
                    key={item.id}
                    onClick={() => {
                        if (item.id === MonetizationUseCase.EVENT_TICKET_SALES) {
                            onNavigateToSolutionPage('event-tickets');
                        } else if (item.id === MonetizationUseCase.SUBSCRIPTION_RENTAL) {
                            onNavigateToSolutionPage('subscriptions');
                        } else if (item.id === MonetizationUseCase.PARKING_SESSION) {
                            onNavigateToSolutionPage('parking');
                        } else {
                            setSelectedUseCase(item.id);
                        }
                    }}
                    className={`w-full text-left p-3 rounded-lg flex items-center gap-4 transition-colors duration-200 ${selectedUseCase === item.id && !isSolutionPage ? 'bg-orange-500 text-white shadow-lg' : 'bg-slate-700/50 hover:bg-slate-700'}`}
                    >
                    <i className="material-icons-round text-2xl">{item.icon}</i>
                    <span className="font-semibold">{item.label}</span>
                    </button>
                )
              })}
            </div>
            {/* Right side: preview */}
            <div className="md:w-2/3 flex flex-col sm:flex-row gap-8 bg-slate-800 p-6 rounded-lg">
              {selectedTemplate ? (
                <>
                  <div className="sm:w-1/2 flex flex-col">
                    <h4 className="text-2xl font-bold text-orange-400">{selectedTemplate.name}</h4>
                    <p className="mt-2 text-slate-300 text-sm flex-grow">{selectedTemplate.description}</p>
                    <ul className="mt-4 space-y-2 text-sm">
                      {getTemplateFeatures(selectedTemplate).map(feature => (
                        <li key={feature} className="flex items-center gap-2"><Checkmark className="text-orange-400"/><span>{feature}</span></li>
                      ))}
                    </ul>
                    <Button onClick={() => selectedTemplate && onApplyTemplateAndStart(selectedTemplate)} className="mt-6 !bg-orange-500 hover:!bg-orange-600 !text-white w-full sm:w-auto" disabled={!selectedTemplate}>
                      {t('common.createThisPage')}
                    </Button>
                  </div>
                  <div className="sm:w-1/2 flex items-center justify-center">
                    <div className="w-[280px] h-[560px] bg-slate-900 rounded-[30px] p-2 shadow-2xl ring-2 ring-slate-700">
                         <div className="w-full h-full rounded-[22px] overflow-hidden relative">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-slate-900 rounded-b-xl z-20"></div>
                            <div className="h-full overflow-y-auto no-scrollbar"> 
                               {renderTemplateInPhone()}
                            </div>
                        </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="w-full flex items-center justify-center">
                    <p className="text-slate-400">Select a page type to see details.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      
       {/* NEW Interactive Template Browser Section */}
      <section id="start-building" className="py-16 sm:py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900">{t('landing.interactive.title')}</h3>
            <p className="mt-3 text-lg text-slate-600">{t('landing.interactive.description')}</p>
          </div>
          <div className="mt-12 max-w-4xl mx-auto bg-slate-100 p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xl">
             <TemplateBrowser
                allTemplates={APP_TEMPLATES}
                onRequestTemplatePreview={onRequestTemplatePreview}
             />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 sm:py-24 bg-indigo-700 text-white">
          <div className="container mx-auto px-6 text-center">
              <h3 className="text-3xl font-bold">{t('landing.testimonials.title')}</h3>
              <div className="mt-8 max-w-2xl mx-auto">
                  <p className="text-xl italic">{t('landing.testimonials.quote')}</p>
                  <p className="mt-4 font-semibold">{t('landing.testimonials.author')}</p>
                  <p className="text-sm text-indigo-200">{t('landing.testimonials.authorRole')}</p>
              </div>
          </div>
      </section>
      
      {/* Pricing - UPDATED */}
      <section id="pricing" className="py-16 sm:py-24 bg-white">
        <div className="container mx-auto px-6">
           <div className="text-center max-w-3xl mx-auto">
            <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900">{t('landing.pricing.title')}</h3>
            <p className="mt-3 text-lg text-slate-600">{t('landing.pricing.description')}</p>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Quick Start Card */}
            <div className="bg-slate-100 p-8 rounded-2xl border border-slate-200 shadow-lg flex flex-col">
                <h4 className="text-xl font-bold text-slate-800">{t('landing.pricing.quickStart.title')}</h4>
                <p className="text-sm text-slate-500 mb-4">{t('landing.pricing.quickStart.description')}</p>
                <p className="text-4xl font-extrabold text-slate-900">{t('landing.pricing.quickStart.fee')} <span className="text-2xl font-semibold text-slate-600"></span></p>
                <p className="text-sm font-semibold text-slate-600">{t('landing.pricing.quickStart.perTransaction')}</p>
                <ul className="my-6 space-y-3 text-sm flex-grow">
                    {t('landing.pricing.quickStart.features', { returnObjects: true }).map((feature: string, index: number) => (
                      <li key={index} className="flex items-start gap-2"><Checkmark /><span>{feature}</span></li>
                    ))}
                </ul>
                <Button onClick={onStartBuilding} variant="secondary" className="w-full">
                    {t('landing.pricing.quickStart.cta')}
                </Button>
            </div>
            {/* Stripe Connect Card */}
            <div className="bg-orange-50 p-8 rounded-2xl border-2 border-orange-500 shadow-2xl flex flex-col">
                 <div className="flex justify-between items-center">
                    <h4 className="text-xl font-bold text-slate-800">{t('landing.pricing.stripeConnect.title')}</h4>
                    <span className="text-xs font-bold bg-orange-500 text-white px-3 py-1 rounded-full">{t('landing.pricing.stripeConnect.recommended')}</span>
                </div>
                <p className="text-sm text-slate-500 mb-4">{t('landing.pricing.stripeConnect.description')}</p>
                <p className="text-4xl font-extrabold text-orange-600">{t('landing.pricing.stripeConnect.fee')} <span className="text-2xl font-semibold"></span></p>
                <p className="text-sm font-semibold text-slate-600">{t('landing.pricing.stripeConnect.perTransaction')}</p>
                <ul className="my-6 space-y-3 text-sm flex-grow">
                    {t('landing.pricing.stripeConnect.features', { returnObjects: true }).map((feature: string, index: number) => (
                      <li key={index} className="flex items-start gap-2"><Checkmark /><span>{feature}</span></li>
                    ))}
                </ul>
                <Button onClick={onStartBuilding} className="!bg-orange-500 hover:!bg-orange-600 !text-white w-full">
                    {t('landing.pricing.stripeConnect.cta')}
                </Button>
            </div>
          </div>
           <p className="text-xs text-slate-500 mt-6 text-center max-w-4xl mx-auto">
                {t('landing.pricing.footnote')}
            </p>
        </div>
      </section>

      {/* Global Ready Section */}
      <section id="global" className="py-16 sm:py-24 bg-slate-100">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900">{t('landing.global.title')}</h3>
            <p className="mt-3 text-lg text-slate-600">{t('landing.global.description')}</p>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md border border-slate-200">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 text-indigo-500 rounded-lg flex items-center justify-center text-2xl">
                  <i className="material-icons-round">public</i>
                </div>
                <h4 className="font-bold text-lg text-slate-900">{t('landing.global.currencies.title')}</h4>
              </div>
              <p className="mt-3 text-sm text-slate-600">{t('landing.global.currencies.description')}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border border-slate-200">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 text-indigo-500 rounded-lg flex items-center justify-center text-2xl">
                  <i className="material-icons-round">translate</i>
                </div>
                <h4 className="font-bold text-lg text-slate-900">{t('landing.global.languages.title')}</h4>
              </div>
              <p className="mt-3 text-sm text-slate-600">{t('landing.global.languages.description')}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border border-slate-200">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 text-indigo-500 rounded-lg flex items-center justify-center text-2xl">
                  <i className="material-icons-round">credit_card</i>
                </div>
                <h4 className="font-bold text-lg text-slate-900">{t('landing.global.methods.title')}</h4>
              </div>
              <p className="mt-3 text-sm text-slate-600">{t('landing.global.methods.description')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 sm:py-24 bg-white">
        <div className="container mx-auto px-6 max-w-3xl">
          <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 text-center">{t('landing.faq.title')}</h3>
           <div className="mt-10 p-6 rounded-lg shadow-md border border-slate-200">
            {t('landing.faq.items', { returnObjects: true }).map((item: { q: string, a: string }, index: number) => (
              <FaqItem key={index} q={item.q} a={item.a} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 text-slate-300">
        <div className="container mx-auto px-6 py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div>
                    <h5 className="font-bold text-white mb-3">{t('landing.footer.solutions')}</h5>
                    <ul className="space-y-2">
                        <li><button type="button" onClick={() => onNavigateToSolutionPage('event-tickets')} className="text-sm hover:text-white transition-colors">{t('nav.eventTickets')}</button></li>
                        <li><button type="button" onClick={() => onNavigateToSolutionPage('subscriptions')} className="text-sm hover:text-white transition-colors">{t('nav.subscriptions')}</button></li>
                        <li><button type="button" onClick={() => onNavigateToSolutionPage('parking')} className="text-sm hover:text-white transition-colors">{t('nav.parking')}</button></li>
                    </ul>
                </div>
                 <div>
                    <h5 className="font-bold text-white mb-3">{t('landing.footer.product')}</h5>
                    <ul className="space-y-2">
                        <li><a href="#features" className="text-sm hover:text-white transition-colors">{t('nav.features')}</a></li>
                        <li><a href="#templates" className="text-sm hover:text-white transition-colors">{t('nav.useCases')}</a></li>
                        <li><a href="#pricing" className="text-sm hover:text-white transition-colors">{t('nav.pricing')}</a></li>
                    </ul>
                </div>
                 <div>
                    <h5 className="font-bold text-white mb-3">{t('landing.footer.company')}</h5>
                    <ul className="space-y-2">
                        <li><button type="button" onClick={onNavigateToHowItWorks} className="text-sm hover:text-white transition-colors">{t('nav.howItWorks')}</button></li>
                        <li><a href="#faq" className="text-sm hover:text-white transition-colors">{t('nav.faq')}</a></li>
                    </ul>
                </div>
            </div>
            <div className="mt-12 pt-8 border-t border-slate-700 text-center text-sm">
                <p>&copy; {new Date().getFullYear()} MonetizePro. All rights reserved.</p>
            </div>
        </div>
      </footer>
    </div>
  );
};