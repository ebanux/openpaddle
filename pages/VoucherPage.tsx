

import React, { useState, useEffect } from 'react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { CURRENCY_SYMBOLS } from '../constants';
import { VoucherPageProps, StripeLineItem, MonetizationUseCase } from '../types';

const VoucherPage: React.FC<VoucherPageProps> = ({ onAddToCart, initialData, isLivePreview, theme, environment, adminData }) => {
  const [currentData, setCurrentData] = useState(initialData);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);

  useEffect(() => {
    setCurrentData(initialData);
    if (initialData.line_items?.[0]?.price_data?.custom_unit_amount?.preset_amounts?.[0]) {
      setSelectedAmount(initialData.line_items[0].price_data.custom_unit_amount.preset_amounts[0] / 100);
    } else {
      setSelectedAmount(null);
    }
  }, [initialData]);

  const currencySymbol = CURRENCY_SYMBOLS[currentData.currency] || '$';
  const predefinedAmounts = currentData.line_items?.[0]?.price_data?.custom_unit_amount?.preset_amounts || [];

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount / 100);
  };

  const handleBuyNow = () => {
    if (!selectedAmount || selectedAmount <= 0) {
      alert("Please select a gift card value.");
      return;
    }

    const lineItemForCart: StripeLineItem = {
      price_data: {
        currency: currentData.currency,
        unit_amount: selectedAmount * 100,
        product_data: {
          name: `${currentData.pageTitle} - ${currencySymbol}${selectedAmount}`,
          description: currentData.pageDescription,
        },
      },
      quantity: 1,
    };
  
    onAddToCart(lineItemForCart, {});
  };
  
  if (!currentData || !currentData.pageTitle) {
     return <div className="p-6 text-center">Voucher page data is not available.</div>;
  }
  
  return (
    <div className="space-y-6 max-w-lg mx-auto">
      <Card className={theme.cardBgClass}>
        <div className="p-6 text-center">
          <h2 className="text-3xl font-bold mb-2">{currentData.pageTitle}</h2>
          <p className="opacity-90 mb-6">{currentData.pageDescription}</p>
          
          <div className="mb-6">
            <label className="block text-sm font-medium opacity-90 mb-2">
              Choose an amount:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {predefinedAmounts.map((amount) => (
                <Button
                  key={amount}
                  variant={selectedAmount === amount / 100 ? 'primary' : 'secondary'}
                  className={selectedAmount === amount / 100 ? theme.buttonPrimaryClass : theme.buttonSecondaryClass}
                  onClick={() => handleAmountSelect(amount)}
                  fullWidth
                >
                  {currencySymbol}{amount / 100}
                </Button>
              ))}
            </div>
          </div>
          
          <Button onClick={handleBuyNow} fullWidth size="lg" className={theme.buttonPrimaryClass} disabled={!selectedAmount}>
             Add to Cart
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default VoucherPage;
