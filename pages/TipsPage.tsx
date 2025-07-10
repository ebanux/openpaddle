

import React, { useState, useEffect } from 'react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { CURRENCY_SYMBOLS } from '../constants';
import { TipsPageProps, StripeLineItem, MonetizationUseCase, StripeCustomField } from '../types'; 

const TipsPage: React.FC<TipsPageProps> = ({ onAddToCart, initialData, isLivePreview, theme, environment, adminData }) => {
  const [currentData, setCurrentData] = useState<TipsPageProps['initialData']>(initialData);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [amountError, setAmountError] = useState<string | null>(null);
  const [customFieldValues, setCustomFieldValues] = useState<{ [key: string]: string | number }>({});
  
  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [appliedPromotion, setAppliedPromotion] = useState<{ code: string; discountAmount: number } | null>(null);
  const [promoMessage, setPromoMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const currencySymbol = CURRENCY_SYMBOLS[currentData.currency] || '$';

  useEffect(() => {
    setCurrentData(initialData);
    setCustomAmount('');
    setSelectedAmount(null);
    setAmountError(null);
    setCustomFieldValues({});
    setPromoCodeInput('');
    setAppliedPromotion(null);
    setPromoMessage(null);
  }, [initialData]);

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount(amount.toString());
    setAmountError(null);
    setAppliedPromotion(null);
    setPromoMessage(null);
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*\.?\d{0,2}$/.test(value)) { 
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
  
  const handleCustomFieldChange = (key: string, value: string | number) => {
    setCustomFieldValues(prev => ({ ...prev, [key]: value }));
  };

  const originalTotal = parseFloat(customAmount) || 0;
  const finalTotal = appliedPromotion ? Math.max(0, originalTotal - appliedPromotion.discountAmount) : originalTotal;
  
  const handleApplyPromoCode = () => {
    setPromoMessage(null);
    if (!promoCodeInput) return;
    
    const currentTotal = parseFloat(customAmount);
    if (isNaN(currentTotal) || currentTotal <= 0) {
        setPromoMessage({ type: 'error', text: 'Please enter a valid tip amount first.' });
        return;
    }
    
    const coupon = (adminData.coupons || []).find(c => c.id.toUpperCase() === promoCodeInput.toUpperCase() && c.valid);

    if (coupon) {
      let discountAmount = 0;
      if (coupon.percent_off) {
        discountAmount = currentTotal * (coupon.percent_off / 100);
      } else if (coupon.amount_off && coupon.currency?.toLowerCase() === currentData.currency.toLowerCase()) {
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

  const handleSendTip = () => {
    const amountToTip = parseFloat(customAmount);
    if (isNaN(amountToTip) || amountToTip <= 0) {
      setAmountError("Please enter a valid tip amount.");
      return;
    }
    setAmountError(null);
    
    for (const field of currentData.custom_fields || []) {
        if (!field.optional && !customFieldValues[field.key]) {
            alert(`Please fill out the required field: ${field.label.custom}`);
            return;
        }
    }
    
    const primaryNoteFieldKey = currentData.custom_fields?.find(f => f.key === 'tip_note')?.key;
    const noteValue = primaryNoteFieldKey ? String(customFieldValues[primaryNoteFieldKey] || '') : '';
    const itemName = noteValue ? `Tip (Note: ${noteValue.substring(0,30)}${noteValue.length > 30 ? '...' : ''})` : "Tip";
    
    const lineItemForCart: StripeLineItem = {
        price_data: {
            currency: currentData.currency,
            unit_amount: Math.round(finalTotal * 100),
            product_data: {
                name: itemName,
                description: currentData.pageTitle
            },
        },
        quantity: 1
    };
    
    onAddToCart(lineItemForCart, { customFieldsData: customFieldValues });

    setCustomAmount('');
    setSelectedAmount(null);
    setCustomFieldValues({});
    setPromoCodeInput('');
    setAppliedPromotion(null);
    setPromoMessage(null);
  };
  
  if (!currentData || !currentData.pageTitle) {
     return (
      <div className="p-6 text-center opacity-75">
        Tips page data is not available.
        {isLivePreview && " Try selecting a template or editing."}
      </div>
    );
  }

  const inputClasses = `w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg ${theme.inputBgClass || 'bg-slate-50'} ${theme.inputTextClass || ''} ${amountError ? 'border-red-500' : (theme.inputBorderClass || 'border-slate-300')}`;
  const textareaClasses = `w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 ${theme.inputBgClass || 'bg-slate-50'} ${theme.inputTextClass || ''} ${theme.inputBorderClass || 'border-slate-300'}`;

  return (
    <div className="space-y-6 max-w-lg mx-auto">
      <Card className={theme.cardBgClass}>
        <div className="p-6">
          {currentData.header_image_url && <img src={currentData.header_image_url} alt={`${currentData.pageTitle} header`} className="w-full h-40 object-cover rounded-lg mb-4 shadow-md" />}
          <h2 className="text-2xl font-semibold mb-2 text-center">{currentData.pageTitle}</h2>
          <p className="opacity-90 text-center mb-6">
            {currentData.page_description}
          </p>
          
          <div className="mb-4">
            <label htmlFor="customTipAmount" className="block text-sm font-medium opacity-90 mb-1">
              Enter tip amount ({currencySymbol}) or select below:
            </label>
            <input
              type="text"
              id="customTipAmount"
              name="customTipAmount"
              value={customAmount}
              onChange={handleCustomAmountChange}
              placeholder="e.g., 5.00"
              className={inputClasses}
              aria-describedby="tip-amount-error-text"
              inputMode="decimal"
              aria-invalid={!!amountError}
            />
            {amountError && (
              <p id="tip-amount-error-text" className="mt-2 text-sm text-red-500" role="alert">
                {amountError}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6" role="group" aria-label="Predefined tip amounts">
            {(currentData.predefinedAmounts || []).map((amount) => (
              <Button
                key={amount}
                type="button"
                variant={selectedAmount === amount ? 'primary' : 'secondary'}
                className={selectedAmount === amount ? theme.buttonPrimaryClass : theme.buttonSecondaryClass}
                onClick={() => handleAmountSelect(amount)}
                fullWidth
                aria-pressed={selectedAmount === amount}
              >
                {currencySymbol}{amount}
              </Button>
            ))}
             {(currentData.predefinedAmounts || []).length === 0 && (
                <p className="opacity-75 col-span-full text-center py-2">No predefined amounts set.</p>
             )}
          </div>

          {currentData.custom_fields && currentData.custom_fields.map((field: StripeCustomField) => (
            <div key={field.key} className="mb-4">
              <label htmlFor={field.key} className="block text-sm font-medium opacity-90 mb-1">
                {field.label.custom} {!field.optional && <span className="text-red-500">*</span>}
              </label>
              {field.type === 'dropdown' && field.dropdown?.options ? (
                <select
                  id={field.key}
                  value={customFieldValues[field.key] || ''}
                  onChange={(e) => handleCustomFieldChange(field.key, e.target.value)}
                  className={textareaClasses.replace('text-lg','')}
                  required={!field.optional}
                >
                  <option value="">Select {field.label.custom}</option>
                  {field.dropdown.options.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              ) : (
                 <textarea
                  id={field.key}
                  value={customFieldValues[field.key] as string || ''}
                  onChange={(e) => handleCustomFieldChange(field.key, e.target.value)}
                  className={textareaClasses}
                  required={!field.optional}
                  placeholder={field.label.custom}
                  minLength={field.text?.minimum_length}
                  maxLength={field.text?.maximum_length}
                  rows={2}
                />
              )}
            </div>
          ))}

          {currentData.allow_promotion_codes && (
            <div className={`p-4 rounded-lg mb-6 ${theme.inputBgClass || 'bg-slate-50'}`}>
                <label htmlFor="promoCode" className="block text-sm font-medium opacity-90 mb-2">Promotion Code</label>
                <div className="flex space-x-2">
                    <input
                        type="text"
                        id="promoCode"
                        value={promoCodeInput}
                        onChange={(e) => setPromoCodeInput(e.target.value)}
                        placeholder="Enter code"
                        className={`${inputClasses} text-base`}
                    />
                    <Button type="button" onClick={handleApplyPromoCode} variant="secondary" className={theme.buttonSecondaryClass}>Apply</Button>
                </div>
                {promoMessage && (
                    <p className={`mt-2 text-sm ${promoMessage.type === 'success' ? 'text-green-600' : 'text-red-500'}`}>
                        {promoMessage.text}
                    </p>
                )}
            </div>
           )}
          
          <Button onClick={handleSendTip} fullWidth size="lg" className={theme.buttonPrimaryClass} disabled={finalTotal <= 0}>
            {appliedPromotion ? `Send ${currencySymbol}${finalTotal.toFixed(2)} Tip` : 'Send Tip'}
          </Button>
        </div>
      </Card>
      {currentData.whyTipText && (
        <Card className={`mt-4 ${theme.cardBgClass}`}>
            <div className="p-6">
            <p className="opacity-90">
                {currentData.whyTipText}
            </p>
            </div>
        </Card>
      )}
    </div>
  );
};

export default TipsPage;
