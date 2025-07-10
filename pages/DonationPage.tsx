

import React, { useState, useEffect } from 'react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { CURRENCY_SYMBOLS } from '../constants';
import { DonationPageLinkConfig, DonationPageProps, StripeLineItem, MonetizationUseCase } from '../types'; 

const DonationPage: React.FC<DonationPageProps> = ({ onAddToCart, initialData, isLivePreview, theme, environment, adminData }) => {
  const [currentData, setCurrentData] = useState<DonationPageLinkConfig>(initialData);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [amountError, setAmountError] = useState<string | null>(null);

  useEffect(() => {
    setCurrentData(initialData);
    setCustomAmount('');
    setSelectedAmount(null);
    setAmountError(null);
  }, [initialData]);

  const currencySymbol = CURRENCY_SYMBOLS[currentData.currency] || '$';

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount(amount.toString());
    setAmountError(null); 
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) { 
      setCustomAmount(value);
      setSelectedAmount(null); 
      setAmountError(null);
    } else if (value === '') {
      setCustomAmount('');
      setAmountError(null);
    }
  };

  const handleDonate = () => {
    const amountToDonate = parseFloat(customAmount);
    if (isNaN(amountToDonate) || amountToDonate <= 0) {
      setAmountError("Please enter a valid donation amount.");
      return;
    }
    setAmountError(null); 

    const lineItemForCheckout: StripeLineItem = {
      price_data: {
        currency: currentData.currency,
        unit_amount: Math.round(amountToDonate * 100), 
        product_data: {
          name: currentData.pageTitle || "Donation",
          description: `Donation to ${currentData.recipientName || 'the creator'}.`,
        },
      },
      quantity: 1,
    };
  
    const specificData = { 
        amountToDonate,
    };
  
    onAddToCart(lineItemForCheckout, specificData);

    setCustomAmount('');
    setSelectedAmount(null);
  };
  
  if (!currentData || !currentData.pageTitle) {
     return (
      <div className="p-6 text-center">
        Donation page data is not available.
        {isLivePreview && " Try selecting a template or editing."}
      </div>
    );
  }
  
  const inputClasses = `w-full px-4 py-2 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg ${theme.inputBgClass || 'bg-slate-50'} ${theme.inputTextClass || ''} ${amountError ? 'border-red-500' : (theme.inputBorderClass || 'border-slate-300')}`;

  return (
    <div className="space-y-6 max-w-lg mx-auto">
      <Card className={theme.cardBgClass}>
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-2 text-center">{currentData.pageTitle}</h2>
          <p className="opacity-90 text-center mb-6">
            {currentData.pageDescription}
          </p>
          
          <div className="mb-4">
            <label htmlFor="customAmount" className="block text-sm font-medium opacity-90 mb-1">
              Enter amount ({currencySymbol}) or select below:
            </label>
            <input
              type="text"
              id="customAmount"
              name="customAmount"
              value={customAmount}
              onChange={handleCustomAmountChange}
              placeholder="e.g., 5"
              className={inputClasses}
              inputMode="decimal"
              aria-invalid={!!amountError}
            />
            {amountError && (
              <p className="mt-2 text-sm text-red-500" role="alert">
                {amountError}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6" role="group" aria-label="Predefined donation amounts">
            {(currentData.predefinedAmounts || []).map((amount) => (
              <Button
                key={amount}
                variant={selectedAmount === amount ? 'primary' : 'secondary'}
                className={selectedAmount === amount ? theme.buttonPrimaryClass : theme.buttonSecondaryClass}
                onClick={() => handleAmountSelect(amount)}
                fullWidth
                aria-pressed={selectedAmount === amount}
              >
                {currencySymbol}{amount}
              </Button>
            ))}
          </div>
          
          <Button onClick={handleDonate} fullWidth size="lg" className={theme.buttonPrimaryClass} disabled={(parseFloat(customAmount) || 0) <= 0}>
             Donate {currencySymbol}{customAmount || '0.00'}
          </Button>
        </div>
      </Card>
       {currentData.recipientName && (
          <p className="text-center text-sm opacity-80">Your donation will go to {currentData.recipientName}.</p>
       )}
    </div>
  );
};

export default DonationPage;
