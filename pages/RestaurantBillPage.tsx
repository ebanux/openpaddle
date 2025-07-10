

import React, { useState, useMemo, useEffect } from 'react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { CURRENCY_SYMBOLS } from '../constants';
import { RestaurantBillPageProps, StripeLineItem, MonetizationUseCase, BillItem } from '../types'; 

const RestaurantBillPage: React.FC<RestaurantBillPageProps> = ({ onAddToCart, initialData, isLivePreview, theme, environment, adminData }) => {
  const [currentData, setCurrentData] = useState<RestaurantBillPageProps['initialData']>(initialData);
  const [splitCount, setSplitCount] = useState<number>(1);
  const [selectedTipPercentage, setSelectedTipPercentage] = useState<number>(initialData.predefinedTipPercentages?.[1] || 0.15);
  const [customTipAmount, setCustomTipAmount] = useState<string>('');
  const [tipType, setTipType] = useState<'percentage' | 'custom' | 'none'>('percentage');

  const currencySymbol = CURRENCY_SYMBOLS[currentData.currency] || '$';

  const billItems = useMemo((): BillItem[] => {
    if (!currentData.line_items) return [];

    return currentData.line_items.map(li => {
        if (li.price_data) {
            return {
                id: li.id || `price_${li.price_data.product_data.name}`,
                name: li.price_data.product_data.name || 'Item',
                price: (li.price_data.unit_amount || 0) / 100,
                quantity: li.quantity || 1,
            };
        } else if (li.price && adminData) {
            const priceInfo = adminData.prices.find(p => p.id === li.price);
            if (priceInfo) {
                const productInfo = adminData.products.find(p => p.id === priceInfo.product);
                return {
                    id: priceInfo.id,
                    name: productInfo?.name || 'Item',
                    price: (priceInfo.unit_amount || 0) / 100,
                    quantity: li.quantity || 1,
                };
            }
        }
        return null;
    }).filter((p): p is BillItem => p !== null);
  }, [currentData.line_items, adminData]);

  useEffect(() => {
    setCurrentData(initialData);
    setSplitCount(1);
    setSelectedTipPercentage(initialData.predefinedTipPercentages?.[1] || 0.15);
    setCustomTipAmount('');
    setTipType('percentage');
  }, [initialData]);

  const subtotal = useMemo(() => {
    return billItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [billItems]);

  const taxAmount = useMemo(() => {
    return subtotal * (currentData.defaultTaxRate || 0);
  }, [subtotal, currentData.defaultTaxRate]);

  const totalWithTax = useMemo(() => {
    return subtotal + taxAmount;
  }, [subtotal, taxAmount]);

  const tipAmountCalculated = useMemo(() => {
    if (tipType === 'percentage') {
      return totalWithTax * selectedTipPercentage;
    }
    if (tipType === 'custom') {
      const custom = parseFloat(customTipAmount);
      return isNaN(custom) || custom < 0 ? 0 : custom;
    }
    return 0; 
  }, [totalWithTax, selectedTipPercentage, customTipAmount, tipType]);

  const grandTotal = useMemo(() => {
    return totalWithTax + tipAmountCalculated;
  }, [totalWithTax, tipAmountCalculated]);

  const amountPerPerson = useMemo(() => {
    return grandTotal / Math.max(1, splitCount);
  }, [grandTotal, splitCount]);

  const handleSplitCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const count = parseInt(e.target.value, 10);
    setSplitCount(isNaN(count) || count < 1 ? 1 : count);
  };

  const handleTipPercentageSelect = (percentage: number) => {
    setSelectedTipPercentage(percentage);
    setTipType('percentage');
    setCustomTipAmount('');
  };

  const handleCustomTipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
     if (/^\d*\.?\d{0,2}$/.test(value)) { 
        setCustomTipAmount(value);
        setTipType('custom');
    }
  };
  
  const handleNoTip = () => {
    setTipType('none');
    setCustomTipAmount('');
  }

  const handlePayBill = () => {
    if (tipType === 'custom' && (isNaN(parseFloat(customTipAmount)) || parseFloat(customTipAmount) < 0)) {
        alert("Please enter a valid custom tip amount or select a percentage.");
        return;
    }

    const paymentAmount = splitCount > 1 ? amountPerPerson : grandTotal;
    const itemName = splitCount > 1 ? `${currentData.pageTitle} (1/${splitCount} Share)` : currentData.pageTitle;

    const lineItemForCart: StripeLineItem = {
        price_data: {
            currency: currentData.currency,
            unit_amount: Math.round(paymentAmount * 100), // Convert to cents
            product_data: {
                name: itemName,
                description: `Payment for ${currentData.pageTitle}`
            }
        },
        quantity: 1
    };

    onAddToCart(lineItemForCart, {});
  };

  const formatCurrency = (amount: number) => `${currencySymbol}${amount.toFixed(2)}`;
  
  if (!currentData || !currentData.pageTitle) {
     return (
      <div className="p-6 text-center opacity-75">
        Restaurant bill page data is not available.
        {isLivePreview && " Try selecting a template or editing."}
      </div>
    );
  }
  
  const inputClasses = `w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 ${theme.inputBgClass || 'bg-slate-50'} ${theme.inputTextClass || ''} ${theme.inputBorderClass || 'border-slate-300'}`;
  
  const baseAccentColorClass = theme.buttonPrimaryClass.includes('sky') ? 'text-sky-500' : 
                           theme.buttonPrimaryClass.includes('cyan') ? 'text-cyan-500' :
                           theme.buttonPrimaryClass.includes('red') ? 'text-red-500' :
                           theme.buttonPrimaryClass.includes('lime') ? 'text-lime-400' :
                           'text-blue-600';
  const accentBgClass = theme.buttonPrimaryClass.includes('sky') ? 'bg-sky-50' : 
                         theme.buttonPrimaryClass.includes('cyan') ? 'bg-cyan-50' :
                         theme.buttonPrimaryClass.includes('red') ? 'bg-red-50' :
                         theme.buttonPrimaryClass.includes('lime') ? 'bg-lime-50' :
                         'bg-blue-50';

  let contrastingAccentTextColorClass = baseAccentColorClass;
  if (theme.id === 'forest_canopy' && accentBgClass === 'bg-lime-50') {
    contrastingAccentTextColorClass = 'text-green-700';
  } else if (theme.id === 'midnight_tech' && accentBgClass === 'bg-sky-50') {
    contrastingAccentTextColorClass = 'text-sky-700';
  }


  return (
    <div className="max-w-lg mx-auto space-y-6">
      <Card className={theme.cardBgClass}>
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4 text-center">{currentData.pageTitle}</h2>
          
          {billItems.length > 0 ? (
            <div className={`space-y-2 mb-4 border-b pb-4 ${theme.inputBorderClass || 'border-slate-200'}`}>
              {billItems.map(item => (
                <div key={item.id} className="flex justify-between items-center text-sm">
                  <div>
                    <p className="font-medium opacity-95">{item.name} {item.quantity > 1 ? `(x${item.quantity})` : ''}</p>
                    <p className="text-xs opacity-75">{formatCurrency(item.price)} each</p>
                  </div>
                  <p className="opacity-95">{formatCurrency(item.price * item.quantity)}</p>
                </div>
              ))}
            </div>
          ) : <p className="opacity-75 text-center mb-4">No items on this bill.</p>}


          <div className="space-y-1 mb-4 text-sm">
            <div className="flex justify-between"><p className="opacity-80">Subtotal:</p><p className="font-medium opacity-95">{formatCurrency(subtotal)}</p></div>
            <div className="flex justify-between"><p className="opacity-80">Tax ({(currentData.defaultTaxRate || 0) * 100}%):</p><p className="font-medium opacity-95">{formatCurrency(taxAmount)}</p></div>
            <div className="flex justify-between font-semibold"><p className="opacity-90">Total (before tip):</p><p className="opacity-95">{formatCurrency(totalWithTax)}</p></div>
          </div>

          <div className="mb-6">
            <label htmlFor="splitCount" className="block text-sm font-medium opacity-90 mb-1">
              Split by how many people?
            </label>
            <input
              type="number"
              id="splitCount"
              name="splitCount"
              value={splitCount}
              onChange={handleSplitCountChange}
              min="1"
              className={inputClasses}
              inputMode="numeric"
            />
          </div>

          <div className="mb-6">
            <p className="block text-sm font-medium opacity-90 mb-2">Add a Tip:</p>
            <div className="grid grid-cols-2 gap-2 mb-2 sm:grid-cols-4">
              {(currentData.predefinedTipPercentages || []).map(percentage => (
                <Button
                  key={percentage}
                  type="button"
                  variant={tipType === 'percentage' && selectedTipPercentage === percentage ? 'primary' : 'secondary'}
                  className={tipType === 'percentage' && selectedTipPercentage === percentage ? theme.buttonPrimaryClass : theme.buttonSecondaryClass}
                  onClick={() => handleTipPercentageSelect(percentage)}
                  aria-pressed={tipType === 'percentage' && selectedTipPercentage === percentage}
                >
                  {percentage * 100}%
                </Button>
              ))}
               <Button
                type="button"
                onClick={() => { setTipType('custom'); setTimeout(() => document.getElementById('customTipAmount')?.focus(), 0); }}
                aria-pressed={tipType === 'custom'}
                variant={tipType === 'custom' ? 'primary' : 'secondary'}
                className={`col-span-2 sm:col-span-1 ${tipType === 'custom' ? theme.buttonPrimaryClass : theme.buttonSecondaryClass}`}
                >
                Custom
              </Button>
              <Button
                type="button"
                onClick={handleNoTip}
                aria-pressed={tipType === 'none'}
                variant={tipType === 'none' ? 'primary' : 'secondary'}
                className={`col-span-2 sm:col-span-1 ${tipType === 'none' ? theme.buttonPrimaryClass : theme.buttonSecondaryClass}`}
              >
                No Tip
              </Button>
            </div>
            {tipType === 'custom' && (
              <div className="mt-2">
                <label htmlFor="customTipAmount" className="sr-only">Custom tip amount</label>
                <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="opacity-75 sm:text-sm">{currencySymbol}</span>
                    </div>
                    <input
                    type="text"
                    id="customTipAmount"
                    name="customTipAmount"
                    value={customTipAmount}
                    onChange={handleCustomTipChange}
                    placeholder="Enter amount"
                    className={`${inputClasses} pl-7 pr-12`}
                    inputMode="decimal"
                    aria-label="Custom tip amount"
                    />
                </div>
              </div>
            )}
            {tipAmountCalculated > 0 && <p className="text-sm opacity-80 mt-2">Tip Amount: {formatCurrency(tipAmountCalculated)}</p>}
          </div>
          
          <div className={`${accentBgClass} bg-opacity-70 p-4 rounded-lg mb-6 text-center space-y-1`} aria-live="polite">
            <p className={`text-xl font-semibold ${contrastingAccentTextColorClass}`}>
              Grand Total: {formatCurrency(grandTotal)}
            </p>
            {splitCount > 1 && (
              <p className={`text-md ${contrastingAccentTextColorClass} opacity-90`}>
                Amount per person: {formatCurrency(amountPerPerson)}
              </p>
            )}
          </div>

          <Button onClick={handlePayBill} fullWidth size="lg" disabled={grandTotal <=0 && billItems.length > 0} className={theme.buttonPrimaryClass}>
            Add to Cart
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default RestaurantBillPage;
