

import React, { useState, useEffect, useMemo } from 'react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { CURRENCY_SYMBOLS, ThemeDefinition } from '../constants'; 
import { RentableItem, TimedRentalPageLinkConfig, TimedRentalPageProps, StripeLineItem, MonetizationUseCase, StripeCustomField } from '../types'; 

interface RentableItemCardProps {
  item: RentableItem; 
  onRent: (item: RentableItem, hours: number) => void;
  theme: ThemeDefinition; 
}

const RentableItemCard: React.FC<RentableItemCardProps> = ({ item, onRent, theme }) => {
  const [hours, setHours] = useState(1);
  const currencySymbol = CURRENCY_SYMBOLS[item.currency] || '$';
  const totalCost = item.ratePerHour * hours;

  const handleHoursChange = (delta: number) => {
    setHours((prev) => Math.max(1, prev + delta));
  };

  const accentColorClass = theme.buttonPrimaryClass.includes('sky') ? 'text-sky-500' : 
                         theme.buttonPrimaryClass.includes('cyan') ? 'text-cyan-500' :
                         theme.buttonPrimaryClass.includes('red') ? 'text-red-500' :
                         theme.buttonPrimaryClass.includes('lime') ? 'text-lime-400' :
                         'text-blue-600';

  return (
    <Card className={`flex flex-col ${theme.cardBgClass}`}>
      <img src={item.imageUrl || 'https://picsum.photos/seed/tool/600/400'} alt={item.name} className="w-full h-48 object-cover" />
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold mb-1">{item.name}</h3>
        <p className={`${accentColorClass} font-medium mb-3`}>
          {currencySymbol}{item.ratePerHour.toFixed(2)} / hour
        </p>
        
        <div className="flex flex-col items-start space-y-2 sm:flex-row sm:items-center sm:justify-between my-3">
          <label htmlFor={`hours-${item.id}`} className="opacity-90">Duration (hours):</label>
          <div className="flex items-center space-x-2 self-start sm:self-center" role="group"> 
            <Button size="sm" onClick={() => handleHoursChange(-1)} disabled={hours <= 1} className={`!p-1.5 w-8 h-8 ${theme.buttonSecondaryClass}`} aria-label={`Decrease hours for ${item.name}`}>-</Button>
            <span id={`hours-${item.id}`} className="text-lg font-medium w-8 text-center opacity-90" aria-live="polite" aria-atomic="true">{hours}</span>
            <Button size="sm" onClick={() => handleHoursChange(1)} className={`!p-1.5 w-8 h-8 ${theme.buttonSecondaryClass}`} aria-label={`Increase hours for ${item.name}`}>+</Button>
          </div>
        </div>

        <p className="text-lg font-semibold opacity-95 my-2 text-right" aria-live="polite">
          Total: {currencySymbol}{totalCost.toFixed(2)}
        </p>
        
        <Button onClick={() => onRent(item, hours)} fullWidth className={`mt-auto ${theme.buttonPrimaryClass}`}>
          Add to Cart
        </Button>
      </div>
    </Card>
  );
};

const TimedRentalPage: React.FC<TimedRentalPageProps> = ({ onAddToCart, initialData, isLivePreview, theme, environment, adminData }) => {
  const [currentData, setCurrentData] = useState<TimedRentalPageLinkConfig>(initialData);
  const [customFieldValues, setCustomFieldValues] = useState<{ [key: string]: string | number }>({});

  const items = useMemo((): RentableItem[] => {
    if (!currentData.line_items) return [];

    return currentData.line_items.map(li => {
        if (li.price_data) {
            return {
                id: li.id || `price_${li.price_data.product_data.name}`,
                name: li.price_data.product_data.name || '',
                ratePerHour: (li.price_data.unit_amount || 0) / 100,
                imageUrl: li.price_data.product_data.images?.[0] || '',
                currency: (li.price_data.currency || 'usd').toUpperCase(),
            };
        } else if (li.price && adminData) {
            const priceInfo = adminData.prices.find(p => p.id === li.price);
            if (priceInfo) {
                const productInfo = adminData.products.find(p => p.id === priceInfo.product);
                return {
                    id: priceInfo.id,
                    name: productInfo?.name || '',
                    ratePerHour: (priceInfo.unit_amount || 0) / 100,
                    imageUrl: productInfo?.images?.[0] || '',
                    currency: (priceInfo.currency || 'usd').toUpperCase(),
                };
            }
        }
        return null;
    }).filter((p): p is RentableItem => p !== null);
  }, [currentData.line_items, adminData]);


  useEffect(() => {
    setCurrentData(initialData);
    setCustomFieldValues({});
  }, [initialData]);

  const handleCustomFieldChange = (key: string, value: string | number) => {
    setCustomFieldValues(prev => ({ ...prev, [key]: value }));
  };

  const handleRentItem = (itemFromUI: RentableItem, hours: number) => {
    const totalAmountInCents = itemFromUI.ratePerHour * 100 * hours;

    const lineItemForCart: StripeLineItem = {
        price_data: {
            currency: currentData.currency,
            unit_amount: totalAmountInCents, 
            product_data: {
                name: `${itemFromUI.name} (${hours}hr rental)`,
                description: itemFromUI.name, 
                images: [itemFromUI.imageUrl]
            }
        },
        quantity: 1 
    };

    onAddToCart(lineItemForCart, { itemId: itemFromUI.id, hours, customFieldsData: customFieldValues });
  };
  
  if (!currentData || !currentData.pageTitle) {
     return (
      <div className="p-6 text-center opacity-75">
        Timed rental page data is not available.
        {isLivePreview && " Try selecting a template or editing."}
      </div>
    );
  }
  
  const gridLayoutClasses = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6';

  const inputClasses = `w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 ${theme.inputBgClass || 'bg-slate-50'} ${theme.inputTextClass || ''} ${theme.inputBorderClass || 'border-slate-300'}`;

  return (
    <div className="space-y-6">
       <div className="text-center">
        {currentData.header_image_url && <img src={currentData.header_image_url} alt={`${currentData.pageTitle} header`} className="w-full h-48 object-cover rounded-lg mb-4 shadow-md" />}
        <h2 className="text-3xl font-bold mb-2">{currentData.pageTitle}</h2>
        <p className="opacity-90 max-w-xl mx-auto">
          {currentData.page_description || currentData.pageDescription}
        </p>
      </div>
      <div className={gridLayoutClasses}>
        {items.map((item) => (
          <RentableItemCard key={item.id} item={item} onRent={handleRentItem} theme={theme} />
        ))}
      </div>
       {items.length === 0 && (
        <Card className={`p-6 text-center opacity-75 sm:col-span-2 lg:col-span-3 ${theme.cardBgClass}`}>
            No rentable items available for this template.
        </Card>
      )}
    </div>
  );
};

export default TimedRentalPage;
