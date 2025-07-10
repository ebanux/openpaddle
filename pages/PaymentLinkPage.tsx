
import React, { useState, useEffect, useMemo } from 'react';
import { PaymentLinkPageProps, StripeLineItem, MonetizationUseCase, StripePriceData } from '../types';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { CURRENCY_SYMBOLS } from '../constants';

const PaymentLinkPage: React.FC<PaymentLinkPageProps> = ({ onAddToCart, initialData, isLivePreview, theme, environment, adminData }) => {
  const [currentData, setCurrentData] = useState(initialData);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [customAmounts, setCustomAmounts] = useState<Record<string, string>>({});
  const [customFieldValues, setCustomFieldValues] = useState<{ [key: string]: string }>({});
  
  const currencySymbol = CURRENCY_SYMBOLS[currentData.currency] || '$';

  useEffect(() => {
    setCurrentData(initialData);
    const initialQuantities: Record<string, number> = {};
    initialData.line_items.forEach((item, index) => {
      const id = item.id || `item-${index}`;
      initialQuantities[id] = item.quantity || 1;
    });
    setQuantities(initialQuantities);
    setCustomAmounts({});
    setCustomFieldValues({});
  }, [initialData]);

  const handleQuantityChange = (itemId: string, delta: number) => {
    setQuantities(prev => {
      const itemConfig = initialData.line_items.find((li, i) => (li.id || `item-${i}`) === itemId);
      const min = itemConfig?.adjustable_quantity?.minimum || 1;
      const max = itemConfig?.adjustable_quantity?.maximum || 99;
      const newQuantity = Math.max(min, Math.min(max, (prev[itemId] || 1) + delta));
      return { ...prev, [itemId]: newQuantity };
    });
  };
  
  const handleCustomAmountChange = (itemId: string, value: string) => {
    if (/^\d*\.?\d{0,2}$/.test(value)) {
      setCustomAmounts(prev => ({ ...prev, [itemId]: value }));
    }
  };

  const totalAmount = useMemo(() => {
    return initialData.line_items.reduce((total, item, index) => {
      const id = item.id || `item-${index}`;
      const quantity = quantities[id] || 1;
      let price = 0;
      if (item.price_data?.custom_unit_amount?.enabled) {
        price = parseFloat(customAmounts[id]) || 0;
      } else if (item.price_data?.unit_amount) {
        price = item.price_data.unit_amount / 100;
      }
      return total + price * quantity;
    }, 0);
  }, [initialData.line_items, quantities, customAmounts]);

  const handleAddToCartClick = () => {
    const lineItemsForCheckout = initialData.line_items.map((item, index): StripeLineItem | null => {
      const id = item.id || `item-${index}`;
      const quantity = quantities[id] || 1;
      
      if (!item.price_data) {
        if (item.price) {
            return { ...item, quantity };
        }
        return null;
      }

      const finalPriceData = JSON.parse(JSON.stringify(item.price_data)) as StripePriceData;

      if (item.price_data.custom_unit_amount?.enabled) {
        const customAmountValue = parseFloat(customAmounts[id]);
        if (isNaN(customAmountValue) || customAmountValue <= 0) {
            return null; 
        }
        finalPriceData.unit_amount = Math.round(customAmountValue * 100);
      }
      
      const newLineItem: StripeLineItem = {
          price_data: finalPriceData,
          quantity: quantity
      }
      if(item.adjustable_quantity) {
          newLineItem.adjustable_quantity = item.adjustable_quantity;
      }
      if(item.id) {
          newLineItem.id = item.id;
      }

      return newLineItem;
    }).filter((item): item is StripeLineItem => item !== null);

    if (lineItemsForCheckout.length === 0 && initialData.line_items.length > 0) {
        alert("Please enter a valid amount for all custom amount fields.");
        return;
    }

    if (lineItemsForCheckout.length !== initialData.line_items.length) {
        alert("An error occurred processing items. Please check your inputs.");
        return;
    }
    
    lineItemsForCheckout.forEach(item => {
        onAddToCart(item, {});
    });
  };
  
  if (!currentData) {
     return <div className="p-6 text-center">Payment link is not configured.</div>;
  }

  return (
    <div className="space-y-6 max-w-lg mx-auto">
      <Card className={theme.cardBgClass}>
        <div className="p-6">
          {currentData.header_image_url && <img src={currentData.header_image_url} alt="Header" className="w-full h-40 object-cover rounded-lg mb-4" />}
          <h2 className="text-2xl font-semibold mb-2 text-center">{currentData.page_description || 'Payment Link'}</h2>
          
          <div className="space-y-4 my-6">
            {currentData.line_items.map((item, index) => {
              const id = item.id || `item-${index}`;
              const quantity = quantities[id] || 1;
              const isAdjustable = item.adjustable_quantity?.enabled;
              const isCustomAmount = item.price_data?.custom_unit_amount?.enabled;

              return (
                <div key={id} className={`p-3 rounded-md ${theme.inputBgClass || 'bg-slate-50'} border ${theme.inputBorderClass || 'border-slate-200'}`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{item.price_data?.product_data?.name}</p>
                      {item.price_data?.product_data?.description && <p className="text-xs opacity-70">{item.price_data.product_data.description}</p>}
                    </div>
                    {!isCustomAmount && <p className="font-semibold">{currencySymbol}{((item.price_data?.unit_amount || 0) / 100).toFixed(2)}</p>}
                  </div>
                  <div className="flex justify-end items-center gap-4 mt-2">
                    {isCustomAmount && (
                      <div className="flex-grow">
                        <label htmlFor={`custom-amount-${id}`} className="sr-only">Custom Amount</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">{currencySymbol}</div>
                          <input
                            type="text"
                            id={`custom-amount-${id}`}
                            value={customAmounts[id] || ''}
                            onChange={(e) => handleCustomAmountChange(id, e.target.value)}
                            placeholder="Enter amount"
                            className={`w-full p-2 pl-7 border rounded-md ${theme.inputBorderClass}`}
                            inputMode="decimal"
                          />
                        </div>
                      </div>
                    )}
                    {isAdjustable && (
                      <div className="flex items-center gap-2">
                        <Button size="sm" onClick={() => handleQuantityChange(id, -1)} disabled={quantity <= (item.adjustable_quantity?.minimum || 1)} className={`!p-1.5 w-8 h-8 ${theme.buttonSecondaryClass}`}>-</Button>
                        <span className="font-medium w-6 text-center">{quantity}</span>
                        <Button size="sm" onClick={() => handleQuantityChange(id, 1)} disabled={quantity >= (item.adjustable_quantity?.maximum || 99)} className={`!p-1.5 w-8 h-8 ${theme.buttonSecondaryClass}`}>+</Button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-right text-xl font-bold my-4">
            Total: {currencySymbol}{totalAmount.toFixed(2)}
          </div>

          <Button onClick={handleAddToCartClick} fullWidth size="lg" className={theme.buttonPrimaryClass} disabled={totalAmount <= 0}>
            Add to Cart
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default PaymentLinkPage;
