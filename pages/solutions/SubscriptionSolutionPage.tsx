

import React from 'react';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import { APP_TEMPLATES, APP_AFTER_PAYMENT_TEMPLATES } from '../../templates';
import { THEMES, MOCK_CUSTOMER_PORTAL_DATA } from '../../constants';
import SubscriptionRentalPage from '../SubscriptionRentalPage';
import CheckoutPreview from '../../components/editor/CheckoutPreview';
import CustomerPortalPage from '../customerPortal/CustomerPortalPage';
import { MonetizationUseCase, SessionStatus, PageSessionData, SubscriptionPageLinkConfig, Template, SubscriptionRentalPageProps, AdminDashboardData } from '../../types';
import { useTranslation } from '../../i18n/I18nContext';

interface SubscriptionSolutionPageProps {
  onBack: () => void;
  onStartBuildingWithTemplate: () => void;
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
        <h5 className="font-semibold text-slate-800">🌟 {title}</h5>
        <p className="text-sm text-slate-600 mt-1">{children}</p>
    </div>
);

export const SubscriptionSolutionPage: React.FC<SubscriptionSolutionPageProps> = ({ onBack, onStartBuildingWithTemplate }) => {
  const { t, language, setLanguage } = useTranslation();
    
  const subscriptionTemplate = APP_TEMPLATES.find(t => t.id === 'sub-software') as Template<SubscriptionPageLinkConfig> | undefined;
  const theme = THEMES.find(t => t.id === subscriptionTemplate?.initialData.pageStyle.theme) || THEMES[0];

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

  const renderSelectPlanStep = () => {
    if (!subscriptionTemplate) return null;
    const props: SubscriptionRentalPageProps = {
        initialData: subscriptionTemplate.initialData,
        isLivePreview: false,
        onInitiateCheckout: () => {},
        onAddToCart: () => {},
        theme: theme,
        environment: "test",
        adminData: { summaryStats: { totalRevenue: 0, activeSubscriptions: 0, totalCustomers: 0, totalTransactions: 0 }, pages: [], products: [], shopProducts:[], collections: [], prices: [], coupons: [], taxRates: [], shippingRates: [], customers: [], subscriptions: [], transactions: [], sessions: [], dailyMetrics:[], emailTemplates: [], digitalAssets: [], donations: [], vouchers: [], users: [] }
    }
    return <SubscriptionRentalPage {...props} />;
  };

  const renderCheckoutStep = () => {
    if (!subscriptionTemplate) return null;
    const proPlan = subscriptionTemplate.initialData.line_items[1]; // Pro Plan
    return (
      <div className="p-2">
        <CheckoutPreview
            title="Checkout"
            items={[{ name: proPlan.price_data?.product_data.name || '', price: (proPlan.price_data?.unit_amount || 0) / 100, quantity: 1 }]} // Simplified for preview
            totalAmount={(proPlan.price_data?.unit_amount || 0) / 100}
            currency={subscriptionTemplate.initialData.currency}
            environment="test"
        />
      </div>
    );
  };
  
  const renderPortalStep = () => {
    if (!subscriptionTemplate) return null;
    return (
        <CustomerPortalPage 
            config={{ 
                portalTitle: "My Account", 
                welcomeMessage: "Manage your subscriptions and billing info.", 
                theme: theme.id, 
                showPaymentHistory: true, 
                allowSubscriptionCancellation: true, 
                allowPaymentMethodUpdate: true, 
                supportContactInfo: 'support@example.com',
                tenantId: 'demo_tenant'
            }}
            customerData={MOCK_CUSTOMER_PORTAL_DATA}
            theme={theme}
        />
    );
  };


  return (
    <div className="bg-slate-50 min-h-screen font-sans">
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-slate-200">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
             <i className="material-icons-round text-3xl text-indigo-600">autorenew</i>
             <span>{t('solutionSubscriptions.title')}</span>
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
                {t('solutionSubscriptions.hero.title')}
            </h2>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
                {t('solutionSubscriptions.hero.description')}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={onStartBuildingWithTemplate} size="lg" className="!bg-indigo-600 hover:!bg-indigo-700 !text-white shadow-lg">
                {t('solutionSubscriptions.hero.cta')}
              </Button>
            </div>
        </section>

        {/* Who It’s For */}
        <section className="pb-16 sm:pb-24">
            <h3 className="text-2xl font-bold text-center text-slate-800 mb-8">{t('solutionSubscriptions.idealFor.title')}</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 text-center">
                {t('solutionSubscriptions.idealFor.items', { returnObjects: true }).map((who: string) => (
                    <div key={who} className="bg-white p-4 rounded-lg shadow border border-slate-200/50">
                        <p className="font-semibold text-sm text-slate-700">{who}</p>
                    </div>
                ))}
            </div>
        </section>

        {/* How It Works */}
        <section className="pb-16 sm:pb-24">
            <div className="text-center max-w-2xl mx-auto">
                <h3 className="text-3xl font-extrabold text-slate-900">{t('solutionSubscriptions.flow.title')}</h3>
            </div>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 items-center">
                <div className="space-y-10">
                    {t('solutionSubscriptions.flow.steps', { returnObjects: true }).map((step: {title: string, description: string}, index: number) => (
                      <Step key={index} num={`${index + 1}`} title={step.title}>{step.description}</Step>
                    ))}
                </div>
                <div className="flex items-center justify-center">
                     <PhoneMockup>{renderPortalStep()}</PhoneMockup>
                </div>
            </div>
        </section>

        {/* Advanced Features */}
        <section className="pb-16 sm:pb-24">
            <div className="text-center max-w-2xl mx-auto">
                <h3 className="text-3xl font-extrabold text-slate-900">{t('solutionSubscriptions.features.title')}</h3>
            </div>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Feature title={t('solutionSubscriptions.features.items.multiplePlans.title')}>{t('solutionSubscriptions.features.items.multiplePlans.description')}</Feature>
                <Feature title={t('solutionSubscriptions.features.items.billingCycles.title')}>{t('solutionSubscriptions.features.items.billingCycles.description')}</Feature>
                <Feature title={t('solutionSubscriptions.features.items.securePayments.title')}>{t('solutionSubscriptions.features.items.securePayments.description')}</Feature>
                <Feature title={t('solutionSubscriptions.features.items.customerPortal.title')}>{t('solutionSubscriptions.features.items.customerPortal.description')}</Feature>
                <Feature title={t('solutionSubscriptions.features.items.promoCodes.title')}>{t('solutionSubscriptions.features.items.promoCodes.description')}</Feature>
                <Feature title={t('solutionSubscriptions.features.items.webhookReady.title')}>{t('solutionSubscriptions.features.items.webhookReady.description')}</Feature>
            </div>
        </section>

        {/* Preview / Demo */}
        <section className="pb-16 sm:pb-24">
            <div className="text-center max-w-2xl mx-auto">
                <h3 className="text-3xl font-extrabold text-slate-900">{t('solutionSubscriptions.demo.title')}</h3>
            </div>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                <div className="text-center">
                    <PhoneMockup>{renderSelectPlanStep()}</PhoneMockup>
                    <h4 className="font-bold mt-4 text-slate-800">{t('solutionSubscriptions.demo.steps.0.title')}</h4>
                    <p className="text-sm text-slate-500">{t('solutionSubscriptions.demo.steps.0.description')}</p>
                </div>
                <div className="text-center">
                    <PhoneMockup>{renderCheckoutStep()}</PhoneMockup>
                    <h4 className="font-bold mt-4 text-slate-800">{t('solutionSubscriptions.demo.steps.1.title')}</h4>
                    <p className="text-sm text-slate-500">{t('solutionSubscriptions.demo.steps.1.description')}</p>
                </div>
                <div className="text-center">
                    <PhoneMockup>{renderPortalStep()}</PhoneMockup>
                    <h4 className="font-bold mt-4 text-slate-800">{t('solutionSubscriptions.demo.steps.2.title')}</h4>
                    <p className="text-sm text-slate-500">{t('solutionSubscriptions.demo.steps.2.description')}</p>
                </div>
            </div>
        </section>
      </main>
    </div>
  );
};
