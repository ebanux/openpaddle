import React from 'react';
import { CustomerPortalConfig } from '../../types';
import { ThemeDefinition, CURRENCY_SYMBOLS } from '../../constants';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

interface MockSubscription {
  id: string;
  planName: string;
  status: 'active' | 'canceled';
  amount: number;
  currency: string;
  nextBillingDate: string;
}

interface MockPayment {
  id: string;
  date: string;
  description: string;
  amount: number;
  currency: string;
  status: 'succeeded' | 'failed';
}

interface MockCustomerData {
  customer: {
    name: string;
    email: string;
  };
  subscriptions: MockSubscription[];
  paymentHistory: MockPayment[];
}

interface CustomerPortalPageProps {
  config: CustomerPortalConfig;
  customerData: MockCustomerData;
  theme: ThemeDefinition;
}

const CustomerPortalPage: React.FC<CustomerPortalPageProps> = ({ config, customerData, theme }) => {

  const accentColorClass = theme.buttonPrimaryClass.includes('sky') ? 'text-sky-500' :
                         theme.buttonPrimaryClass.includes('cyan') ? 'text-cyan-500' :
                         theme.buttonPrimaryClass.includes('red') ? 'text-red-500' :
                         theme.buttonPrimaryClass.includes('lime') ? 'text-lime-400' :
                         'text-blue-600';

  const handleCancelSubscription = (subId: string) => {
    alert(`(Simulated) Request to cancel subscription ${subId}.`);
  };

  const handleUpdatePaymentMethod = () => {
    alert("(Simulated) Opening a secure page to update payment method.");
  }
  
  const formatDate = (dateString: string) => new Date(dateString + 'T00:00:00Z').toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
  const currencySymbol = (currency: string) => CURRENCY_SYMBOLS[currency] || '$';

  return (
    <div className="p-4 space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-1">{config.portalTitle}</h2>
        <p className="opacity-80 text-sm max-w-xl mx-auto">{config.welcomeMessage}</p>
      </div>

      <Card className={theme.cardBgClass}>
        <div className="p-4">
          <h3 className={`text-lg font-semibold mb-3 ${accentColorClass}`}>My Subscriptions</h3>
          <div className="space-y-3">
            {customerData.subscriptions.map(sub => (
              <div key={sub.id} className={`p-3 rounded-md ${theme.inputBgClass || 'bg-slate-100'} border ${theme.inputBorderClass || 'border-slate-300'}`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold">{sub.planName}</p>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${sub.status === 'active' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200' : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200'}`}>
                        {sub.status}
                      </span>
                    </div>
                    <p className="font-semibold">{currencySymbol(sub.currency)}{sub.amount.toFixed(2)}</p>
                  </div>
                   <p className="text-xs opacity-70 mt-1">
                      {sub.status === 'active' ? `Next billing on: ${formatDate(sub.nextBillingDate)}` : `Canceled on: ${formatDate(sub.nextBillingDate)}`}
                    </p>
                  {sub.status === 'active' && config.allowSubscriptionCancellation && (
                    <div className="mt-2 text-right">
                       <Button size="sm" variant="danger" className="!px-2 !py-1 !text-xs" onClick={() => handleCancelSubscription(sub.id)}>Cancel</Button>
                    </div>
                  )}
              </div>
            ))}
             {customerData.subscriptions.length === 0 && <p className="text-sm opacity-70 text-center py-2">No subscriptions found.</p>}
          </div>
        </div>
      </Card>

      {config.showPaymentHistory && (
         <Card className={theme.cardBgClass}>
            <div className="p-4">
            <h3 className={`text-lg font-semibold mb-3 ${accentColorClass}`}>Payment History</h3>
            <div className="space-y-2 text-sm">
                {customerData.paymentHistory.map(payment => (
                  <div key={payment.id} className={`flex justify-between items-center p-2 rounded ${theme.inputBgClass || 'bg-slate-100'}`}>
                      <div>
                        <p className="font-medium">{payment.description}</p>
                        <p className="text-xs opacity-70">{formatDate(payment.date)}</p>
                      </div>
                       <p className="font-semibold">{currencySymbol(payment.currency)}{payment.amount.toFixed(2)}</p>
                  </div>
                ))}
                {customerData.paymentHistory.length === 0 && <p className="text-sm opacity-70 text-center py-2">No payment history found.</p>}
            </div>
            </div>
        </Card>
      )}

      <Card className={theme.cardBgClass}>
        <div className="p-4">
          <h3 className={`text-lg font-semibold mb-3 ${accentColorClass}`}>My Details</h3>
           <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <p className="opacity-80">Name:</p>
                <p className="font-medium">{customerData.customer.name}</p>
              </div>
              <div className="flex justify-between">
                <p className="opacity-80">Email:</p>
                <p className="font-medium">{customerData.customer.email}</p>
              </div>
              {config.allowPaymentMethodUpdate && (
                <div className="pt-2 text-right">
                   <Button size="sm" variant="secondary" className={theme.buttonSecondaryClass} onClick={handleUpdatePaymentMethod}>Update Payment Method</Button>
                </div>
              )}
           </div>
        </div>
      </Card>

       <div className="text-center text-xs opacity-70 pt-4">
          <p>{config.supportContactInfo}</p>
      </div>

    </div>
  );
};

export default CustomerPortalPage;