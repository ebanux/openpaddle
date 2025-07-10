

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { CURRENCY_SYMBOLS } from '../constants';
import { FundraisingPageLinkConfig, FundraisingPageProps, StripeLineItem, MonetizationUseCase, StripeCustomField } from '../types'; 

const Countdown: React.FC<{ endDate: string }> = ({ endDate }) => {
    const [timeLeft, setTimeLeft] = useState<{ days?: number; hours?: number }>({});

    useEffect(() => {
        const updateTimer = () => {
            const difference = +new Date(endDate) - +new Date();
            let newTimeLeft: { days?: number; hours?: number } = {};
            if (difference > 0) {
                newTimeLeft = {
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                };
            }
            setTimeLeft(newTimeLeft);
        };
        
        updateTimer(); // Set initial time
        const timerId = setInterval(updateTimer, 60000); // update every minute

        return () => clearInterval(timerId);
    }, [endDate]); // Only re-run the effect if the endDate prop changes

    const timerComponents = Object.entries(timeLeft).map(([interval, value]) => {
        if (value === undefined || value === null) return null;
        return <span key={interval} className="font-bold">{value} {interval}</span>
    }).filter(Boolean);

    if (!timerComponents.length) {
        return <span>Campaign Ended</span>;
    }

    return (
        <span>
            {timerComponents.map((component, index) => (
              <React.Fragment key={index}>
                {component}
                {index < timerComponents.length - 1 && ' '}
              </React.Fragment>
            ))} left to donate
        </span>
    );
};


export const FundraisingPage: React.FC<FundraisingPageProps> = ({ onAddToCart, initialData, isLivePreview, theme, environment, adminData }) => {
  const [currentData, setCurrentData] = useState<FundraisingPageLinkConfig>(initialData);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [amountError, setAmountError] = useState<string | null>(null);

  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [appliedPromotion, setAppliedPromotion] = useState<{ code: string; discountAmount: number } | null>(null);
  const [promoMessage, setPromoMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [customFieldValues, setCustomFieldValues] = useState<{ [key: string]: string }>({});

  const { currentAmount, recentDonors } = useMemo(() => {
    if (!adminData || !adminData.donations || !initialData.id) {
      return { currentAmount: 0, recentDonors: [] };
    }
    const pageDonations = adminData.donations.filter(d => d.pageId === initialData.id);
    const total = pageDonations.reduce((sum, donation) => sum + donation.amount, 0);
    const sortedDonors = [...pageDonations]
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 10)
      .map(d => ({ name: d.donorName, amount: d.amount }));

    return { currentAmount: total, recentDonors: sortedDonors };
  }, [adminData, initialData.id]);


  useEffect(() => {
    setCurrentData(initialData);
    setCustomAmount('');
    setSelectedAmount(null);
    setAmountError(null);
    setPromoCodeInput('');
    setAppliedPromotion(null);
    setPromoMessage(null);
    setCustomFieldValues({});
  }, [initialData]);

  const currencySymbol = CURRENCY_SYMBOLS[currentData.currency] || '$';

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount(amount.toString());
    setAmountError(null); 
    setAppliedPromotion(null);
    setPromoMessage(null);
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) { 
      setCustomAmount(value);
      setSelectedAmount(null); 
      setAmountError(null);
      setAppliedPromotion(null);
      setPromoMessage(null);
    } else if (value === '') {
      setCustomAmount('');
      setAmountError(null);
    }
  };

  const originalTotal = parseFloat(customAmount) || 0;
  const finalTotal = appliedPromotion ? Math.max(0, originalTotal - appliedPromotion.discountAmount) : originalTotal;
  
  const handleCustomFieldChange = (key: string, value: string) => {
    setCustomFieldValues(prev => ({...prev, [key]: value }));
  };

  const handleApplyPromoCode = () => {
    setPromoMessage(null);
    if (!promoCodeInput) return;
    
    const currentTotal = parseFloat(customAmount);
    if (isNaN(currentTotal) || currentTotal <= 0) {
        setPromoMessage({ type: 'error', text: 'Please enter a valid donation amount first.' });
        return;
    }
    
    const coupon = (adminData.coupons || []).find(c => c.id.toUpperCase() === promoCodeInput.toUpperCase() && c.valid);

    if (coupon) {
      let discountAmount = 0;
      if (coupon.percent_off) {
        discountAmount = currentTotal * (coupon.percent_off / 100);
      } else if (coupon.amount_off && coupon.currency?.toLowerCase() === currentData.currency.toLowerCase()) {
        // convert amount_off from cents
        discountAmount = coupon.amount_off / 100;
      }

      if (discountAmount > 0) {
        setAppliedPromotion({ code: coupon.id, discountAmount });
        setPromoMessage({ type: 'success', text: `Code "${coupon.id}" applied! You saved ${currencySymbol}${discountAmount.toFixed(2)}.` });
      } else {
        setAppliedPromotion(null);
        setPromoMessage({ type: 'error', text: 'This coupon is not valid for this purchase.' });
      }
    } else {
      setAppliedPromotion(null);
      setPromoMessage({ type: 'error', text: 'Invalid promotion code.' });
    }
  };


  const handleDonate = () => {
    const amountToDonate = parseFloat(customAmount);
    if (isNaN(amountToDonate) || amountToDonate <= 0) {
      setAmountError("Please enter a valid donation amount.");
      return;
    }
    setAmountError(null); 

    for (const field of currentData.custom_fields || []) {
      if (!field.optional && !customFieldValues[field.key]) {
          alert(`Please fill out the required field: ${field.label.custom}`);
          return;
      }
    }

    const lineItemForCheckout: StripeLineItem = {
      price_data: {
        currency: currentData.currency,
        unit_amount: Math.round(finalTotal * 100),
        product_data: {
          name: currentData.pageTitle || "Donation",
          description: currentData.pageDescription || "Thank you for your support.",
        },
      },
      quantity: 1,
    };
  
    onAddToCart(lineItemForCheckout, { customFieldsData: customFieldValues });

    setCustomAmount('');
    setSelectedAmount(null);
    setCustomFieldValues({});
  };
  
  if (!currentData || !currentData.pageTitle) {
     return (
      <div className="p-6 text-center">
        Fundraising campaign data is not available.
        {isLivePreview && " Try selecting a template or editing."}
      </div>
    );
  }
  
  const inputClasses = `w-full px-4 py-2 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg ${theme.inputBgClass || 'bg-slate-50'} ${theme.inputTextClass || ''} ${amountError ? 'border-red-500' : (theme.inputBorderClass || 'border-slate-300')}`;
  const progressBgClass = theme.buttonPrimaryClass.replace('hover:', '').split(' ').find(c => c.startsWith('bg-')) || 'bg-blue-600';


  return (
    <div className="space-y-6 max-w-lg mx-auto">
        <Card className={theme.cardBgClass}>
            <div className="p-6">
                <h2 className="text-2xl font-semibold mb-2 text-center">{currentData.pageTitle}</h2>
                <p className="opacity-90 text-center mb-6 whitespace-pre-line">{currentData.pageDescription}</p>
                <div className="mb-4">
                    <label htmlFor="customAmount" className="block text-sm font-medium opacity-90 mb-1">Enter donation amount ({currencySymbol}) or select below:</label>
                    <input type="text" id="customAmount" value={customAmount} onChange={handleCustomAmountChange} placeholder="e.g., 25" className={inputClasses} inputMode="decimal" aria-invalid={!!amountError} />
                    {amountError && <p className="mt-2 text-sm text-red-500">{amountError}</p>}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                    {(currentData.predefinedAmounts || []).map(amount => (
                        <Button key={amount} variant={selectedAmount === amount ? 'primary' : 'secondary'} className={selectedAmount === amount ? theme.buttonPrimaryClass : theme.buttonSecondaryClass} onClick={() => handleAmountSelect(amount)} fullWidth>{currencySymbol}{amount}</Button>
                    ))}
                </div>
                {(currentData.custom_fields || []).map(field => (
                  <div key={field.key} className="mb-4">
                    <label htmlFor={field.key} className="block text-sm font-medium opacity-90 mb-1">{field.label.custom}{!field.optional && ' *'}</label>
                    <input type={field.type} id={field.key} value={customFieldValues[field.key] || ''} onChange={e => handleCustomFieldChange(field.key, e.target.value)} className={inputClasses.replace('text-lg','')} required={!field.optional} />
                  </div>
                ))}
                <Button onClick={handleDonate} fullWidth size="lg" className={theme.buttonPrimaryClass} disabled={finalTotal <= 0}>Donate Now</Button>
            </div>
        </Card>

      {currentData.targetAmount && (
        <Card className={`${theme.cardBgClass}`}>
          <div className="p-4">
            <div className="flex justify-between items-end mb-1">
              <h3 className="text-lg font-semibold">
                <span className="opacity-90">Raised:</span> {currencySymbol}{currentAmount.toLocaleString()}
              </h3>
              <p className="text-sm font-medium opacity-80">Goal: {currencySymbol}{currentData.targetAmount.toLocaleString()}</p>
            </div>
            <div className={`w-full ${theme.inputBgClass || 'bg-slate-200'} rounded-full h-4 shadow-inner`}>
              <div 
                className={`${progressBgClass} h-4 rounded-full transition-all duration-500`} 
                style={{ width: `${(currentAmount / currentData.targetAmount) * 100}%` }}
              ></div>
            </div>
          </div>
        </Card>
      )}

      {currentData.endDate && (
        <Card className={`${theme.cardBgClass} p-3 text-center`}>
            <div className="flex items-center justify-center space-x-2">
              <i className="material-icons-round text-lg opacity-80">timer</i>
              <span className="text-sm opacity-90">
                 <Countdown endDate={currentData.endDate} />
              </span>
            </div>
        </Card>
      )}

      {currentData.whyDonatePoints && currentData.whyDonatePoints.length > 0 && (
          <Card className={`${theme.cardBgClass} p-6`}>
              <h3 className="text-lg font-semibold mb-3">Why Donate?</h3>
              <ul className="space-y-2">
                  {currentData.whyDonatePoints.map((point, index) => (
                      <li key={index} className="flex items-start">
                          <i className="material-icons-round text-green-500 mr-2">check_circle</i>
                          <span className="opacity-90">{point}</span>
                      </li>
                  ))}
              </ul>
          </Card>
      )}

      {currentData.showDonorList && recentDonors.length > 0 && (
          <Card className={`${theme.cardBgClass} p-6`}>
              <h3 className="text-lg font-semibold mb-3">Recent Donors</h3>
              <div className="space-y-2">
                  {recentDonors.map((donor, index) => (
                      <div key={index} className="flex justify-between items-center text-sm p-2 bg-white/50 rounded-md">
                          <span className="font-medium opacity-90">{donor.name}</span>
                          <span className="font-semibold opacity-95">{currencySymbol}{donor.amount}</span>
                      </div>
                  ))}
              </div>
          </Card>
      )}
    </div>
  );
};

export default FundraisingPage;