

import React from 'react';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import { APP_TEMPLATES, APP_AFTER_PAYMENT_TEMPLATES } from '../../templates';
import { THEMES, MOCK_PARKING_RATES } from '../../constants';
import ParkingSessionPage from '../ParkingSessionPage';
import CheckoutPreview from '../../components/editor/CheckoutPreview';
import ParkingActiveInfoDisplay from '../afterPayment/ParkingActiveInfoDisplay';
import { MonetizationUseCase, SessionStatus, PageSessionData, ParkingPageLinkConfig, Template, ParkingSessionPageProps, AdminDashboardData, ParkingRate } from '../../types';
import { useTranslation } from '../../i18n/I18nContext';

interface ParkingSolutionPageProps {
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
        <h5 className="font-semibold text-slate-800">🅿️ {title}</h5>
        <p className="text-sm text-slate-600 mt-1">{children}</p>
    </div>
);

const ParkingSolutionPage: React.FC<ParkingSolutionPageProps> = ({ onBack, onStartBuildingWithTemplate }) => {
  const { t, language, setLanguage } = useTranslation();
    
  // Mockup rendering logic
  const parkingTemplate = APP_TEMPLATES.find(t => t.id === 'park-city-center') as Template<ParkingPageLinkConfig> | undefined;
  const afterPaymentTemplate = APP_AFTER_PAYMENT_TEMPLATES.find(t => t.id === 'ap-park-active-info-v1');
  const theme = THEMES.find(t => t.id === parkingTemplate?.initialData.pageStyle.theme) || THEMES[0];

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

  const mockAdminData: AdminDashboardData = {
    summaryStats: { totalRevenue: 0, activeSubscriptions: 0, totalCustomers: 0, totalTransactions: 0 },
    pages: [], products: [], shopProducts: [], collections: [], prices: [], coupons: [], taxRates: [], shippingRates: [],
    customers: [], subscriptions: [], transactions: [], sessions: [], dailyMetrics: [], emailTemplates: [], digitalAssets: [], donations: [], vouchers: [], users: []
  };

  const renderCreateStep = () => {
    if (!parkingTemplate) return null;
    const props: ParkingSessionPageProps = {
        initialData: parkingTemplate.initialData,
        isLivePreview: false,
        onInitiateCheckout: () => {},
        onAddToCart: () => {},
        getParkingSpecificData: () => {},
        theme: theme,
        environment: "test",
        adminData: mockAdminData
    }
    return <ParkingSessionPage {...props} />;
  };

  const renderPurchaseStep = () => {
    if (!parkingTemplate) return null;
    const oneHourRate = parkingTemplate.initialData.line_items[0];
    return (
      <div className="p-2">
        <CheckoutPreview
            title="Pay for Parking"
            items={[{ name: oneHourRate.price_data?.product_data.name || '', price: (oneHourRate.price_data?.unit_amount || 0) / 100, quantity: 1 }]}
            totalAmount={(oneHourRate.price_data?.unit_amount || 0) / 100}
            currency={parkingTemplate.initialData.currency}
            environment="test"
        />
      </div>
    );
  };
  
  const renderValidateStep = () => {
    if (!parkingTemplate || !afterPaymentTemplate) return null;
    
    const mockParkingRate: ParkingRate = MOCK_PARKING_RATES[0];
    
    const mockSessionData: PageSessionData = {
      id: "SESS_DEMO_PARKING",
      sessionId: "SESS_DEMO_PARKING",
      tenantId: "demo_tenant",
      useCase: MonetizationUseCase.PARKING_SESSION,
      status: SessionStatus.ACTIVE,
      pageConfig: parkingTemplate.initialData,
      paymentDetails: {
        items: [{ name: "Parking - 1 Hour", price: 3.00, quantity: 1 }],
        totalAmount: 3.00,
        currency: 'USD',
        paymentTimestamp: new Date().toISOString(),
      },
      afterPaymentConfig: {
        templateDefinitionId: afterPaymentTemplate.id,
        templateData: afterPaymentTemplate.initialData,
      },
      parking: {
          licensePlate: "DEMO-123",
          selectedRate: mockParkingRate,
          phoneNumber: '555-123-4567'
      },
      timer: {
          expiresAt: new Date(Date.now() + 1 * 60 * 60 * 1000).toISOString(), // 1 hour from now
      },
      verificationStatus: 'unverified',
      verificationHistory: [],
      submittedCustomFields: {
          'licensePlate': 'DEMO-123',
          'phoneNumber': '555-123-4567',
      }
    };

    return (
      <ParkingActiveInfoDisplay
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
             <i className="material-icons-round text-3xl text-blue-600">local_parking</i>
             <span>{t('solutionParking.title')}</span>
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
        <section className="text-center py-16 sm:py-24">
            <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
                {t('solutionParking.hero.title')}
            </h2>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
                {t('solutionParking.hero.description')}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={onStartBuildingWithTemplate} size="lg" className="!bg-blue-600 hover:!bg-blue-700 !text-white shadow-lg">
                {t('solutionParking.hero.cta')}
              </Button>
            </div>
        </section>

        <section className="pb-16 sm:pb-24">
            <div className="text-center max-w-2xl mx-auto">
                <h3 className="text-3xl font-extrabold text-slate-900">{t('solutionParking.flow.title')}</h3>
            </div>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 items-center">
                <div className="space-y-10">
                    {t('solutionParking.flow.steps', { returnObjects: true }).map((step: {title: string, description: string}, index: number) => (
                      <Step key={index} num={`${index + 1}`} title={step.title}>{step.description}</Step>
                    ))}
                </div>
                <div className="flex items-center justify-center">
                    <PhoneMockup>{renderValidateStep()}</PhoneMockup>
                </div>
            </div>
        </section>

        <section className="pb-16 sm:pb-24">
            <div className="text-center max-w-2xl mx-auto">
                <h3 className="text-3xl font-extrabold text-slate-900">{t('solutionParking.features.title')}</h3>
            </div>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Feature title={t('solutionParking.features.items.zoneManagement.title')}>{t('solutionParking.features.items.zoneManagement.description')}</Feature>
                <Feature title={t('solutionParking.features.items.dynamicPricing.title')}>{t('solutionParking.features.items.dynamicPricing.description')}</Feature>
                <Feature title={t('solutionParking.features.items.payByText.title')}>{t('solutionParking.features.items.payByText.description')}</Feature>
                <Feature title={t('solutionParking.features.items.serviceFees.title')}>{t('solutionParking.features.items.serviceFees.description')}</Feature>
                <Feature title={t('solutionParking.features.items.dashboard.title')}>{t('solutionParking.features.items.dashboard.description')}</Feature>
                <Feature title={t('solutionParking.features.items.noApp.title')}>{t('solutionParking.features.items.noApp.description')}</Feature>
            </div>
        </section>

        <section className="pb-16 sm:pb-24">
            <div className="text-center max-w-2xl mx-auto">
                <h3 className="text-3xl font-extrabold text-slate-900">{t('solutionParking.demo.title')}</h3>
            </div>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                <div className="text-center">
                    <PhoneMockup>{renderCreateStep()}</PhoneMockup>
                    <h4 className="font-bold mt-4 text-slate-800">{t('solutionParking.demo.steps.0.title')}</h4>
                    <p className="text-sm text-slate-500">{t('solutionParking.demo.steps.0.description')}</p>
                </div>
                <div className="text-center">
                    <PhoneMockup>{renderPurchaseStep()}</PhoneMockup>
                    <h4 className="font-bold mt-4 text-slate-800">{t('solutionParking.demo.steps.1.title')}</h4>
                    <p className="text-sm text-slate-500">{t('solutionParking.demo.steps.1.description')}</p>
                </div>
                <div className="text-center">
                    <PhoneMockup>{renderValidateStep()}</PhoneMockup>
                    <h4 className="font-bold mt-4 text-slate-800">{t('solutionParking.demo.steps.2.title')}</h4>
                    <p className="text-sm text-slate-500">{t('solutionParking.demo.steps.2.description')}</p>
                </div>
            </div>
        </section>
      </main>
    </div>
  );
};

export default ParkingSolutionPage;
