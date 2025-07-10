import React from 'react';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import { APP_TEMPLATES, APP_AFTER_PAYMENT_TEMPLATES } from '../../templates';
import { THEMES } from '../../constants';
import EventTicketSalesPage from '../EventTicketSalesPage';
import CheckoutPreview from '../../components/editor/CheckoutPreview';
import EventTicketConfirmedQRDisplay from '../afterPayment/EventTicketConfirmedQRDisplay';
import { MonetizationUseCase, SessionStatus, PageSessionData, EventTicketSalesPageLinkConfig, Template, EventTicketSalesPageProps, AdminDashboardData } from '../../types';
import { useTranslation } from '../../i18n/I18nContext';


interface EventTicketsSolutionPageOldProps {
  onBack: () => void;
  onStartBuildingWithTemplate: () => void;
  onSeeLiveExample: () => void;
}

const Step: React.FC<{ num: string; title: string; children: React.ReactNode; }> = ({ num, title, children }) => (
    <div className="relative pl-12">
        <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-slate-200 text-slate-600 font-bold flex items-center justify-center">{num}</div>
        <h4 className="font-bold text-lg text-slate-800 mb-1">{title}</h4>
        <p className="text-slate-600 text-sm">{children}</p>
    </div>
);

const Feature: React.FC<{ title: string; children: React.ReactNode; }> = ({ title, children }) => (
    <div className="bg-white p-4 rounded-lg border border-slate-200">
        <h5 className="font-semibold text-slate-800">🧾 {title}</h5>
        <p className="text-sm text-slate-600 mt-1">{children}</p>
    </div>
);

const EventTicketsSolutionPageOld: React.FC<EventTicketsSolutionPageOldProps> = ({ onBack, onStartBuildingWithTemplate, onSeeLiveExample }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-slate-50 min-h-screen font-sans">
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-slate-200">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
             <i className="material-icons-round text-3xl text-purple-600">local_activity</i>
             <span>{t('solutionEventTickets.title')} (Old Version)</span>
          </h1>
          <Button onClick={onBack} variant="outline">
              <i className="material-icons-round mr-2 text-lg">arrow_back</i>
              {t('common.goBack')}
            </Button>
        </div>
      </header>
      
      <main className="container mx-auto px-6">
        {/* Hero Section */}
        <section className="text-center py-16 sm:py-24">
            <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
                A simpler, older version of event ticket sales.
            </h2>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
                This is a placeholder for the old solution page.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={onStartBuildingWithTemplate} size="lg" className="!bg-purple-600 hover:!bg-purple-700 !text-white shadow-lg">
                {t('solutionEventTickets.hero.cta')}
              </Button>
            </div>
        </section>
      </main>
    </div>
  );
};

export default EventTicketsSolutionPageOld;
