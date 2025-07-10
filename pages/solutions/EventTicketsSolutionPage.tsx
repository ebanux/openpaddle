

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


interface EventTicketsSolutionPageProps {
  onBack: () => void;
  onStartBuildingWithTemplate: () => void;
  onSeeLiveExample: () => void;
  onNavigateToOldPage: () => void; // For debugging
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

const EventTicketsSolutionPage: React.FC<EventTicketsSolutionPageProps> = ({ onBack, onStartBuildingWithTemplate, onSeeLiveExample, onNavigateToOldPage }) => {
  const { t, language, setLanguage } = useTranslation();
    
  // Mockup rendering logic
  const ticketTemplate = APP_TEMPLATES.find(t => t.id === 'event-music-fest') as Template<EventTicketSalesPageLinkConfig> | undefined;
  const afterPaymentTemplate = APP_AFTER_PAYMENT_TEMPLATES.find(t => t.id === 'ap-event-qr-v1');
  const theme = THEMES.find(t => t.id === ticketTemplate?.initialData.pageStyle.theme) || THEMES[0];

  const PhoneMockup: React.FC<{children: React.ReactNode}> = ({ children }) => (
    <div className="w-[300px] h-[600px] bg-slate-800 rounded-[40px] p-2 shadow-2xl overflow-hidden ring-2 ring-slate-700/50 mx-auto">
      <div className={`w-full h-full ${theme.bgClass} rounded-[30px] overflow-hidden relative`}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-slate-800 rounded-b-lg z-10"></div>
        <div className="h-full overflow-y-auto no-scrollbar pt-8">
          {children}
        </div>
      </div>
    </div>
  );

  // This is the complete, correct adminData structure needed by child components.
  const mockAdminData: AdminDashboardData = {
    summaryStats: { totalRevenue: 0, activeSubscriptions: 0, totalCustomers: 0, totalTransactions: 0 },
    pages: [], products: [], shopProducts: [], collections: [], prices: [], coupons: [], taxRates: [], shippingRates: [],
    customers: [], subscriptions: [], transactions: [], sessions: [], dailyMetrics: [], emailTemplates: [], digitalAssets: [], donations: [], vouchers: [], users: []
  };

  const renderCreateStep = () => {
    if (!ticketTemplate) return null;
    const props: EventTicketSalesPageProps = {
        initialData: ticketTemplate.initialData,
        isLivePreview: false,
        onInitiateCheckout: () => { alert("This is a simulated checkout for the demo page."); },
        onAddToCart: () => {},
        theme: theme,
        environment: "test",
        adminData: mockAdminData
    }
    return (
      <EventTicketSalesPage {...props} />
    );
  };

  const renderPurchaseStep = () => {
    if (!ticketTemplate) return null;
    const ticketLineItem = ticketTemplate.initialData.line_items[1]; // VIP Pass
    return (
      <div className="p-2">
        <CheckoutPreview
            title={ticketTemplate.initialData.eventTitle}
            items={[{ name: ticketLineItem.price_data?.product_data.name || '', price: (ticketLineItem.price_data?.unit_amount || 0) / 100, quantity: 1 }]}
            totalAmount={(ticketLineItem.price_data?.unit_amount || 0) / 100}
            currency={ticketTemplate.initialData.currency}
            environment="test"
        />
      </div>
    );
  };
  
  const renderValidateStep = () => {
    if (!ticketTemplate || !afterPaymentTemplate) return null;
    
    // This mock data is complete and valid, which likely fixes the previous error.
    const mockSessionData: PageSessionData = {
      id: "SESS_DEMO_TICKET",
      sessionId: "SESS_DEMO_TICKET",
      tenantId: "demo_tenant",
      useCase: MonetizationUseCase.EVENT_TICKET_SALES,
      status: SessionStatus.PAID,
      pageConfig: ticketTemplate.initialData,
      paymentDetails: {
        items: [{ name: "VIP Pass", price: 150.00, quantity: 1 }],
        totalAmount: 150.00,
        currency: 'USD',
        paymentTimestamp: new Date().toISOString(),
      },
      afterPaymentConfig: {
        templateDefinitionId: afterPaymentTemplate.id,
        templateData: afterPaymentTemplate.initialData,
      },
      verificationStatus: 'verified', // Required field
      verificationHistory: [],
      submittedCustomFields: {
          'attendee_name': 'Alex Johnson',
      }
    };

    return (
      <EventTicketConfirmedQRDisplay
        sessionData={mockSessionData}
        templateData={afterPaymentTemplate.initialData}
        theme={theme}
        environment="test"
      />
    );
  };


  return (
    <div className="bg-slate-50 min-h-screen font-sans">
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-slate-200">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
             <i className="material-icons-round text-3xl text-purple-600">local_activity</i>
             <span>{t('solutionEventTickets.title')}</span>
          </h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center space-x-1 bg-slate-200 p-1 rounded-lg">
                <button onClick={() => setLanguage('en')} className={`px-2 py-0.5 rounded text-xs font-semibold ${language === 'en' ? 'bg-white text-slate-700 shadow' : 'bg-transparent text-slate-500 hover:bg-slate-300/50'}`}>EN</button>
                <button onClick={() => setLanguage('es')} className={`px-2 py-0.5 rounded text-xs font-semibold ${language === 'es' ? 'bg-white text-slate-700 shadow' : 'bg-transparent text-slate-500 hover:bg-slate-300/50'}`}>ES</button>
            </div>
            <Button onClick={onBack} variant="outline">
              <i className="material-icons-round mr-2 text-lg">arrow_back</i>
              {t('common.goBack')}
            </Button>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-6">
        {/* Hero Section */}
        <section className="text-center py-16 sm:py-24">
            <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
                {t('solutionEventTickets.hero.title')}
            </h2>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
                {t('solutionEventTickets.hero.description')}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={onStartBuildingWithTemplate} size="lg" className="!bg-purple-600 hover:!bg-purple-700 !text-white shadow-lg">
                {t('solutionEventTickets.hero.cta')}
              </Button>
            </div>
        </section>

        {/* How It Works */}
        <section className="pb-16 sm:pb-24">
            <div className="text-center max-w-2xl mx-auto">
                <h3 className="text-3xl font-extrabold text-slate-900">{t('solutionEventTickets.flow.title')}</h3>
            </div>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 items-center">
                <div className="space-y-10">
                    {t('solutionEventTickets.flow.steps', { returnObjects: true }).map((step: {title: string, description: string}, index: number) => (
                      <Step key={index} num={`${index + 1}`} title={step.title}>
                        {step.description}
                      </Step>
                    ))}
                </div>
                <div className="flex items-center justify-center">
                    <PhoneMockup>{renderValidateStep()}</PhoneMockup>
                </div>
            </div>
        </section>

        {/* Advanced Features */}
        <section className="pb-16 sm:pb-24">
            <div className="text-center max-w-2xl mx-auto">
                <h3 className="text-3xl font-extrabold text-slate-900">{t('solutionEventTickets.features.title')}</h3>
            </div>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Feature title={t('solutionEventTickets.features.items.preGenerated.title')}>{t('solutionEventTickets.features.items.preGenerated.description')}</Feature>
                <Feature title={t('solutionEventTickets.features.items.status.title')}>{t('solutionEventTickets.features.items.status.description')}</Feature>
                <Feature title={t('solutionEventTickets.features.items.customFields.title')}>{t('solutionEventTickets.features.items.customFields.description')}</Feature>
                <Feature title={t('solutionEventTickets.features.items.multiChannel.title')}>{t('solutionEventTickets.features.items.multiChannel.description')}</Feature>
                <Feature title={t('solutionEventTickets.features.items.testMode.title')}>{t('solutionEventTickets.features.items.testMode.description')}</Feature>
                <Feature title={t('solutionEventTickets.features.items.validation.title')}>{t('solutionEventTickets.features.items.validation.description')}</Feature>
            </div>
        </section>

        {/* Preview / Demo */}
        <section className="pb-16 sm:pb-24">
            <div className="text-center max-w-2xl mx-auto">
                <h3 className="text-3xl font-extrabold text-slate-900">{t('solutionEventTickets.demo.title')}</h3>
            </div>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                <div className="text-center">
                    <PhoneMockup>{renderCreateStep()}</PhoneMockup>
                    <h4 className="font-bold mt-4 text-slate-800">{t('solutionEventTickets.demo.steps.0.title')}</h4>
                    <p className="text-sm text-slate-500">{t('solutionEventTickets.demo.steps.0.description')}</p>
                </div>
                <div className="text-center">
                    <PhoneMockup>{renderPurchaseStep()}</PhoneMockup>
                    <h4 className="font-bold mt-4 text-slate-800">{t('solutionEventTickets.demo.steps.1.title')}</h4>
                    <p className="text-sm text-slate-500">{t('solutionEventTickets.demo.steps.1.description')}</p>
                </div>
                <div className="text-center">
                    <PhoneMockup>{renderValidateStep()}</PhoneMockup>
                    <h4 className="font-bold mt-4 text-slate-800">{t('solutionEventTickets.demo.steps.2.title')}</h4>
                    <p className="text-sm text-slate-500">{t('solutionEventTickets.demo.steps.2.description')}</p>
                </div>
            </div>
        </section>
        
        {/* Debug Button */}
        <div className="text-center my-8">
            <Button onClick={onNavigateToOldPage} variant="danger" size="sm">
                View Old Page (for debugging)
            </Button>
        </div>
      </main>
    </div>
  );
};

export default EventTicketsSolutionPage;
