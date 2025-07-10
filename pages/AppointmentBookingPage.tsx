

import React, { useState, useEffect, useMemo } from 'react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { CURRENCY_SYMBOLS } from '../constants';
import { AppointmentBookingPageProps, DurationOption, StripeLineItem, MonetizationUseCase, StripeCustomField } from '../types';

const AppointmentBookingPage: React.FC<AppointmentBookingPageProps> = ({ onAddToCart, initialData, isLivePreview, theme, environment, adminData }) => {
  const [currentData, setCurrentData] = useState<AppointmentBookingPageProps['initialData']>(initialData);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [customFieldValues, setCustomFieldValues] = useState<{ [key: string]: string | number }>({});

  const durationOptions = useMemo((): DurationOption[] => {
    if (!currentData.line_items || currentData.line_items.length <= 1) return [];

    return currentData.line_items.map(li => {
        if (li.price_data) {
            return {
                id: li.id || `price_${li.price_data.product_data.name}`,
                label: li.price_data.product_data.name || '',
                price: (li.price_data.unit_amount || 0) / 100,
                description: li.price_data.product_data.description || '',
            };
        } else if (li.price && adminData) {
            const priceInfo = adminData.prices.find(p => p.id === li.price);
            if (priceInfo) {
                const productInfo = adminData.products.find(p => p.id === priceInfo.product);
                return {
                    id: priceInfo.id,
                    label: productInfo?.name || '',
                    price: (priceInfo.unit_amount || 0) / 100,
                    description: productInfo?.description || '',
                };
            }
        }
        return null;
    }).filter((p): p is DurationOption => p !== null);
  }, [currentData.line_items, adminData]);
  
  const pricePerServiceOrSlot = useMemo(() => {
    if (!currentData.line_items || currentData.line_items.length !== 1) return undefined;
    
    const lineItem = currentData.line_items[0];
    if (lineItem.price_data) {
        return (lineItem.price_data.unit_amount || 0) / 100;
    } else if (lineItem.price && adminData) {
        const priceInfo = adminData.prices.find(p => p.id === lineItem.price);
        return priceInfo ? (priceInfo.unit_amount || 0) / 100 : undefined;
    }
    return undefined;
  }, [currentData.line_items, adminData]);


  useEffect(() => {
    setCurrentData(initialData);
    if (durationOptions && durationOptions.length > 0) {
      setSelectedOptionId(durationOptions[0].id);
    } else if (pricePerServiceOrSlot !== undefined) {
      setSelectedOptionId(null); 
    } else {
        setSelectedOptionId(null);
    }
    setCustomFieldValues({});
  }, [initialData, durationOptions, pricePerServiceOrSlot]);

  const currencySymbol = CURRENCY_SYMBOLS[currentData.currency] || '$';

  const handleCustomFieldChange = (key: string, value: string | number) => {
    setCustomFieldValues(prev => ({ ...prev, [key]: value }));
  };

  const handleBookNow = () => {
    let lineItemToPurchase: StripeLineItem | undefined;

    if (durationOptions && durationOptions.length > 0 && selectedOptionId) {
      const selectedFullOption = durationOptions.find(opt => opt.id === selectedOptionId);
      if (selectedFullOption) {
        lineItemToPurchase = currentData.line_items.find(
          li => li.price === selectedFullOption.id || (li.price_data && (li.id === selectedFullOption.id || li.price_data.product_data.name === selectedFullOption.label))
        );
      }
    } else if (pricePerServiceOrSlot !== undefined) {
      lineItemToPurchase = currentData.line_items[0];
    }

    if (!lineItemToPurchase) {
      alert("Please select a service option or ensure the service is correctly configured.");
      return;
    }
     // Validate custom fields
    for (const field of currentData.custom_fields || []) {
        if (!field.optional && !customFieldValues[field.key]) {
            alert(`Please fill out the required field: ${field.label.custom}`);
            return;
        }
    }
    
    onAddToCart({ ...lineItemToPurchase, quantity: 1 }, { customFieldsData: customFieldValues });
  };

  if (!currentData || !currentData.serviceTitle) {
    return (
      <div className="p-6 text-center opacity-75">
        Appointment/Service data is not available.
        {isLivePreview && " Try selecting a template or editing."}
      </div>
    );
  }
  
  const baseAccentColorClass = theme.buttonPrimaryClass.includes('sky') ? 'text-sky-500' : 
                           theme.buttonPrimaryClass.includes('cyan') ? 'text-cyan-500' :
                           theme.buttonPrimaryClass.includes('red') ? 'text-red-500' :
                           theme.buttonPrimaryClass.includes('lime') ? 'text-lime-400' :
                           'text-blue-600';
  
  let selectedOptionInnerTextClass = baseAccentColorClass;
  if (theme.id === 'forest_canopy') {
    selectedOptionInnerTextClass = 'text-green-700'; 
  } else if (theme.id === 'midnight_tech') {
    selectedOptionInnerTextClass = 'text-sky-700'; 
  }
  
  const selectedOptionDetails = durationOptions?.find(opt => opt.id === selectedOptionId);
  const displayPrice = selectedOptionDetails?.price ?? pricePerServiceOrSlot ?? 0;
  const canBook = (durationOptions && selectedOptionId) || (!durationOptions.length && pricePerServiceOrSlot !== undefined);
  const inputClasses = `w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 ${theme.inputBgClass || 'bg-slate-50'} ${theme.inputTextClass || ''} ${theme.inputBorderClass || 'border-slate-300'}`;


  return (
    <div className="max-w-xl mx-auto space-y-6">
      {(currentData.serviceImageUrl || currentData.header_image_url) && (
        <Card className={`overflow-hidden ${theme.cardBgClass}`}>
          <img 
            src={currentData.serviceImageUrl || currentData.header_image_url} 
            alt={`${currentData.serviceTitle} illustration`} 
            className="w-full h-56 sm:h-72 object-cover" 
          />
        </Card>
      )}

      <Card className={theme.cardBgClass}>
        <div className="p-6">
          <h2 className="text-3xl font-bold mb-2">{currentData.serviceTitle}</h2>
          {currentData.providerName && (
            <p className={`text-md font-medium ${baseAccentColorClass} mb-3`}>By {currentData.providerName}</p>
          )}
          <p className="opacity-90 mb-6 whitespace-pre-line">{currentData.page_description || currentData.serviceDescription}</p>

          {durationOptions && durationOptions.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold opacity-95 mb-3">Select Option:</h3>
              <div className="space-y-3" role="radiogroup" aria-labelledby="service-options-label">
                {durationOptions.map((option) => {
                  const isSelected = selectedOptionId === option.id;
                  let wrapperTextColor = theme.textClass; 
                  if (isSelected) {
                      const primaryClasses = theme.buttonPrimaryClass.split(' ');
                      const textClassFromPrimary = primaryClasses.find(c => c.startsWith('text-'));
                      if (textClassFromPrimary) wrapperTextColor = textClassFromPrimary;
                  }

                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setSelectedOptionId(option.id)}
                      role="radio"
                      aria-checked={isSelected}
                      className={`w-full text-left p-4 border rounded-lg transition-all duration-150
                                  ${isSelected 
                                    ? `${theme.buttonPrimaryClass.replace(/bg-\w+-\d+/,'')} ${wrapperTextColor} border-2 ${theme.buttonPrimaryClass.includes('sky') ? 'border-sky-500': theme.buttonPrimaryClass.includes('cyan') ? 'border-cyan-500' : theme.buttonPrimaryClass.includes('red') ? 'border-red-500' : theme.buttonPrimaryClass.includes('lime') ? 'border-lime-500' : 'border-blue-500'} bg-opacity-10 shadow-lg` 
                                    : `${theme.inputBgClass || 'bg-slate-50'} ${theme.inputBorderClass || 'border-slate-200'} hover:border-slate-400`}
                      `}
                    >
                      <div className="flex justify-between items-center">
                        <span className={`font-medium ${isSelected ? selectedOptionInnerTextClass : 'opacity-90'}`}>{option.label}</span>
                        <span className={`font-semibold ${isSelected ? selectedOptionInnerTextClass : 'opacity-95'}`}>
                          {currencySymbol}{option.price.toFixed(2)}
                        </span>
                      </div>
                      {option.description && <p className={`text-sm opacity-75 mt-1 ${isSelected ? selectedOptionInnerTextClass : ''}`}>{option.description}</p>}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
          
          <div className={`${theme.inputBgClass || 'bg-slate-50'} p-4 rounded-lg my-6 text-center shadow-inner`}>
            <p className={`text-2xl font-bold ${baseAccentColorClass}`}>
              Price: {currencySymbol}{displayPrice.toFixed(2)}
            </p>
          </div>
          
          <Button 
            onClick={handleBookNow} 
            fullWidth 
            size="lg" 
            className={`${theme.buttonPrimaryClass} mt-6`}
            disabled={!canBook}
          >
            Add to Cart
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default AppointmentBookingPage;
