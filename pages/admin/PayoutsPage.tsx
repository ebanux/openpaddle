
import React, { useState, useMemo } from 'react';
import { TenantSettings, PlatformPayoutDetails } from '../../types';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import { useTranslation } from '../../i18n/I18nContext';

interface PayoutsPageProps {
  settings: TenantSettings;
  onSelectStripeConnect: () => void;
  onSavePlatformPayoutDetails: (details: PlatformPayoutDetails) => void;
}

const SavingsCalculator = () => {
    const { t } = useTranslation();
    const [monthlyVolume, setMonthlyVolume] = useState(5000);
    const averageTransactionSize = 25; // An assumption for calculation

    const { quickStartFee, stripeConnectFee, savings } = useMemo(() => {
        if (monthlyVolume <= 0) return { quickStartFee: 0, stripeConnectFee: 0, savings: 0 };
        const numTransactions = Math.max(1, monthlyVolume / averageTransactionSize);

        // Fee: 0.75% + $0.15 per transaction
        const quickStartFee = (monthlyVolume * 0.0075) + (numTransactions * 0.15);
        // Fee: 0.50% + $0.10 per transaction
        const stripeConnectFee = (monthlyVolume * 0.0050) + (numTransactions * 0.10);

        const savings = quickStartFee - stripeConnectFee;

        return { quickStartFee, stripeConnectFee, savings };
    }, [monthlyVolume]);

    return (
        <Card className="bg-white p-6 shadow-lg mt-8 border-t-4 border-orange-500">
            <h3 className="font-bold text-slate-800 mb-2 text-lg">{t('payoutsPage.savingsCalculator.title')}</h3>
            <p className="text-sm text-slate-600 mb-4">{t('payoutsPage.savingsCalculator.description')}</p>
            
            <div>
                <label htmlFor="volume-slider" className="block text-sm font-medium text-slate-700">
                    {t('payoutsPage.savingsCalculator.volumeLabel')} <span className="font-bold text-orange-600">${monthlyVolume.toLocaleString()}</span>
                </label>
                <input
                    id="volume-slider"
                    type="range"
                    min="100"
                    max="50000"
                    step="100"
                    value={monthlyVolume}
                    onChange={(e) => setMonthlyVolume(parseInt(e.target.value, 10))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer mt-2"
                />
            </div>
            
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="p-3 bg-slate-100 rounded-lg">
                    <p className="text-xs text-slate-500 font-semibold">{t('payoutsPage.savingsCalculator.quickStartFees')}</p>
                    <p className="text-lg font-bold text-slate-700">${quickStartFee.toFixed(2)}</p>
                </div>
                <div className="p-3 bg-slate-100 rounded-lg">
                    <p className="text-xs text-slate-500 font-semibold">{t('payoutsPage.savingsCalculator.stripeConnectFees')}</p>
                    <p className="text-lg font-bold text-slate-700">${stripeConnectFee.toFixed(2)}</p>
                </div>
                <div className="p-3 bg-green-100 rounded-lg">
                    <p className="text-xs text-green-700 font-semibold">{t('payoutsPage.savingsCalculator.savings')}</p>
                    <p className="text-lg font-bold text-green-800">${savings.toFixed(2)}</p>
                </div>
            </div>
             <p className="text-xs text-slate-500 text-center mt-3">{t('payoutsPage.savingsCalculator.footnote', { avg_txn_size: averageTransactionSize })}</p>
        </Card>
    );
};


const PayoutsPage: React.FC<PayoutsPageProps> = ({ settings, onSelectStripeConnect, onSavePlatformPayoutDetails }) => {
  const { t } = useTranslation();
  
  const OnboardingView = () => {
    const [beneficiaryName, setBeneficiaryName] = useState('');
    const [payoutEmail, setPayoutEmail] = useState('');

    const handleSavePlatformDetails = (e: React.FormEvent) => {
      e.preventDefault();
      if (beneficiaryName && payoutEmail) {
        onSavePlatformPayoutDetails({ beneficiaryName, payoutEmail });
      } else {
        alert("Please fill in both beneficiary name and email.");
      }
    };
    
    return (
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">{t('payoutsPage.title')}</h2>
          <p className="mt-2 text-slate-600">{t('payoutsPage.description')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="bg-white p-6 shadow-lg">
            <h3 className="font-bold text-slate-800 mb-2 text-lg">{t('payoutsPage.option1.title')}</h3>
            <p className="text-sm text-slate-600 mb-1">{t('payoutsPage.option1.description')}</p>
            <p className="text-sm text-slate-600 mb-4">
              <strong className="block">{t('payoutsPage.option1.fee')}</strong>
              <span className="text-xs opacity-80">{t('payoutsPage.option1.limits')}</span>
            </p>
            <form onSubmit={handleSavePlatformDetails} className="space-y-4">
              <div>
                <label htmlFor="beneficiaryName" className="block text-sm font-medium text-slate-700">{t('payoutsPage.option1.beneficiary')}</label>
                <input type="text" id="beneficiaryName" value={beneficiaryName} onChange={(e) => setBeneficiaryName(e.target.value)} className="mt-1 w-full p-2 border border-slate-300 rounded-md shadow-sm" required />
              </div>
              <div>
                <label htmlFor="payoutEmail" className="block text-sm font-medium text-slate-700">{t('payoutsPage.option1.payoutEmail')}</label>
                <input type="email" id="payoutEmail" value={payoutEmail} onChange={(e) => setPayoutEmail(e.target.value)} className="mt-1 w-full p-2 border border-slate-300 rounded-md shadow-sm" required />
              </div>
              <Button type="submit" fullWidth>{t('payoutsPage.option1.cta')}</Button>
            </form>
          </Card>
          
          <Card className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-6 shadow-lg flex flex-col items-center justify-center text-center">
            <h3 className="font-bold text-xl mb-2">{t('payoutsPage.option2.title')}</h3>
            <p className="text-sm opacity-90 mb-4">{t('payoutsPage.option2.description')}</p>
            <Button onClick={onSelectStripeConnect} className="!bg-white !text-blue-600 hover:!bg-slate-100 shadow-xl">
                 {t('payoutsPage.option2.cta')}
            </Button>
          </Card>
        </div>
        <SavingsCalculator />
      </div>
    );
  };
  
  const PlatformPayoutView = () => (
    <Card className="bg-white p-8 shadow-lg max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-slate-800 text-center">{t('payoutsPage.activePlatform.title')}</h2>
        <p className="mt-2 text-slate-600 text-center">{t('payoutsPage.activePlatform.description')} <strong className="block">{t('payoutsPage.activePlatform.limits')}</strong></p>
        <div className="mt-6 p-4 bg-slate-100 border border-slate-200 rounded-md text-sm space-y-2">
            <div>
                <p className="text-slate-500">{t('payoutsPage.activePlatform.beneficiaryName')}</p>
                <p className="font-semibold text-slate-700">{settings.platformPayoutDetails?.beneficiaryName}</p>
            </div>
             <div>
                <p className="text-slate-500">{t('payoutsPage.activePlatform.payoutEmail')}</p>
                <p className="font-semibold text-slate-700">{settings.platformPayoutDetails?.payoutEmail}</p>
            </div>
        </div>
        <div className="mt-8 text-center bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
             <h4 className="font-bold text-blue-800">{t('payoutsPage.activePlatform.upgradePrompt')}</h4>
             <p className="text-sm text-blue-700 mt-1">{t('payoutsPage.activePlatform.upgradeDescription')}</p>
             <Button onClick={onSelectStripeConnect} className="mt-4">{t('payoutsPage.activePlatform.upgradeCta')}</Button>
        </div>
    </Card>
  );

  const OnboardedView = () => (
    <Card className="bg-white p-8 shadow-lg text-center max-w-lg mx-auto">
        <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-4">
            <i className="material-icons-round text-4xl">check_circle</i>
        </div>
        <h2 className="text-2xl font-bold text-slate-800">{t('payoutsPage.activeStripe.title')}</h2>
        <p className="mt-2 text-slate-600">{t('payoutsPage.activeStripe.description')} <strong className="block">{t('payoutsPage.activeStripe.limits')}</strong></p>
        <div className="mt-4 p-3 bg-slate-100 border border-slate-200 rounded-md text-sm">
            <p className="text-slate-500">{t('payoutsPage.activeStripe.accountId')}</p>
            <p className="font-mono font-semibold text-slate-700">{settings.stripeAccountId}</p>
        </div>
        <div className="mt-6">
            <Button variant="outline" onClick={() => alert('This would redirect to your Stripe Express dashboard.')}>
                {t('payoutsPage.activeStripe.cta')}
            </Button>
        </div>
    </Card>
  );

  switch (settings.payoutMethod) {
    case 'unselected':
        return <OnboardingView />;
    case 'payoneer_wise':
        return <PlatformPayoutView />;
    case 'stripe_connect':
        return <OnboardedView />;
    default:
        return <div>Invalid payout settings state.</div>;
  }
};

export default PayoutsPage;
