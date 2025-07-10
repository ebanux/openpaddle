

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { CURRENCY_SYMBOLS } from '../constants';
import { ParkingPageLinkConfig, ParkingSessionPageProps, ParkingRate, StripeLineItem, MonetizationUseCase, StripeCustomField } from '../types'; 


const ParkingSessionPage: React.FC<ParkingSessionPageProps> = ({ onAddToCart, initialData, isLivePreview, theme, environment, getParkingSpecificData, adminData }) => {
  const [currentData, setCurrentData] = useState<ParkingPageLinkConfig>(initialData);
  const [licensePlate, setLicensePlate] = useState<string>('');
  const [selectedRateId, setSelectedRateId] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [customFieldValues, setCustomFieldValues] = useState<{ [key: string]: string | number }>({});
  
  const currencySymbol = CURRENCY_SYMBOLS[currentData.currency] || '$';

  const rates = useMemo((): ParkingRate[] => {
    if (!currentData.line_items) return [];

    return currentData.line_items.map(li => {
        if (li.price_data) {
            return {
                id: li.id || li.price || `price_${li.price_data.product_data.name}`,
                duration: (li.price_data.product_data.name || '').replace('Parking - ', ''),
                price: (li.price_data.unit_amount || 0) / 100,
                hours: (li.price_data.product_data.metadata?.hours as number) || 0,
            };
        } else if (li.price && adminData) {
            const priceInfo = adminData.prices.find(p => p.id === li.price);
            if (priceInfo) {
                const productInfo = adminData.products.find(p => p.id === priceInfo.product);
                return {
                    id: priceInfo.id,
                    duration: (productInfo?.name || '').replace('Parking - ', ''),
                    price: (priceInfo.unit_amount || 0) / 100,
                    hours: (productInfo?.metadata?.hours as number) || 0,
                };
            }
        }
        return null;
    }).filter((p): p is ParkingRate => p !== null);
  }, [currentData.line_items, adminData]);

  const selectedRateDetailsForUI = useMemo(() => {
    return rates.find(rate => rate.id === selectedRateId);
  }, [rates, selectedRateId]);

  useEffect(() => {
    setCurrentData(initialData);
    if (rates && rates.length > 0) {
      setSelectedRateId(rates[0].id);
    } else {
      setSelectedRateId(null);
    }
    setLicensePlate('');
    setPhoneNumber('');
    setCustomFieldValues({});
  }, [initialData, rates]);
  
  useEffect(() => {
    if (getParkingSpecificData) {
      getParkingSpecificData(() => ({
        licensePlate,
        selectedRate: selectedRateDetailsForUI,
        phoneNumber: currentData.phone_number_collection?.enabled ? phoneNumber : undefined,
      }));
    }
  }, [getParkingSpecificData, licensePlate, selectedRateDetailsForUI, phoneNumber, currentData.phone_number_collection?.enabled]);

  const handleCustomFieldChange = (key: string, value: string | number) => {
    setCustomFieldValues(prev => ({ ...prev, [key]: value }));
  };

  const handlePayForParking = () => {
    if (!licensePlate.trim()) {
      alert("Please enter your license plate number.");
      return;
    }
    if (!selectedRateId || !selectedRateDetailsForUI) {
      alert("Please select a parking duration. If none are available, check the template configuration.");
      return;
    }
    if (currentData.phone_number_collection?.enabled && !phoneNumber.trim()){
        alert("Please enter your phone number.");
        return;
    }

    // Validate custom fields
    for (const field of currentData.custom_fields || []) {
        if (!field.optional && !customFieldValues[field.key]) {
            alert(`Please fill out the required field: ${field.label.custom}`);
            return;
        }
    }

    const lineItemToPurchase = currentData.line_items.find(li => 
      li.price === selectedRateId || (li.price_data && (li.price_data.product_data.name.includes(selectedRateDetailsForUI!.duration) || li.id === selectedRateId))
    );

    if (!lineItemToPurchase) {
        alert("Selected parking rate configuration is missing or incomplete.");
        return;
    }
    
    const lineItemForCart: StripeLineItem = {
        ...lineItemToPurchase, 
        price_data: {
            ...lineItemToPurchase.price_data!,
            product_data: {
                ...lineItemToPurchase.price_data!.product_data,
                name: `${lineItemToPurchase.price_data!.product_data.name} (${licensePlate})` 
            }
        }
    };
    
    const specificData = {
        licensePlate: licensePlate,
        selectedRate: selectedRateDetailsForUI, 
        phoneNumber: currentData.phone_number_collection?.enabled ? phoneNumber : undefined,
        customFieldsData: customFieldValues,
    };

    onAddToCart(lineItemForCart, specificData);
  };

  if (!currentData || !currentData.pageTitle) {
     return (
      <div className="p-6 text-center opacity-75">
        Parking page data is not available.
        {isLivePreview && " Try selecting a template or editing."}
      </div>
    );
  }

  const inputClasses = `w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 ${theme.inputBgClass || 'bg-slate-50'} ${theme.inputTextClass || ''} ${theme.inputBorderClass || 'border-slate-300'}`;
  
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
  const accentBorderClass = theme.buttonPrimaryClass.includes('sky') ? 'border-sky-500 ring-sky-500' :
                            theme.buttonPrimaryClass.includes('cyan') ? 'border-cyan-500 ring-cyan-500' :
                            theme.buttonPrimaryClass.includes('red') ? 'border-red-500 ring-red-500' :
                            theme.buttonPrimaryClass.includes('lime') ? 'border-lime-500 ring-lime-500' :
                            'border-blue-500 ring-blue-500';

  let contrastingAccentTextColorClass = baseAccentColorClass;
  if (theme.id === 'forest_canopy' && accentBgClass === 'bg-lime-50') {
    contrastingAccentTextColorClass = 'text-green-700';
  } else if (theme.id === 'midnight_tech' && accentBgClass === 'bg-sky-50') {
    contrastingAccentTextColorClass = 'text-sky-700'; 
  }

  return (
    <div className="max-w-md mx-auto space-y-6">
      <Card className={theme.cardBgClass}>
        <div className="p-6">
          {currentData.header_image_url && <img src={currentData.header_image_url} alt={`${currentData.pageTitle} header`} className="w-full h-40 object-cover rounded-lg mb-4 shadow-md" />}
          <h2 className="text-2xl font-semibold mb-2 text-center">{currentData.pageTitle}</h2>
          <p className="opacity-90 text-center mb-6">{currentData.page_description}</p>
          
          <div className="mb-4">
            <label htmlFor="licensePlate" className="block text-sm font-medium opacity-90 mb-1">
              License Plate Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="licensePlate"
              name="licensePlate"
              value={licensePlate}
              onChange={(e) => setLicensePlate(e.target.value.toUpperCase())}
              placeholder="e.g., ABC-123"
              className={inputClasses}
              aria-label="License Plate Number"
              required
            />
          </div>
           {currentData.phone_number_collection?.enabled && (
            <div className="mb-4">
                <label htmlFor="phoneNumber" className="block text-sm font-medium opacity-90 mb-1">
                Phone Number {currentData.phone_number_collection?.enabled ? <span className="text-red-500">*</span> : '(Optional for alerts)'}
                </label>
                <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="e.g., 555-123-4567"
                className={inputClasses}
                aria-label="Phone Number"
                required={currentData.phone_number_collection?.enabled}
                />
            </div>
            )}

          {currentData.custom_fields && currentData.custom_fields.filter(f => f.key !== 'license_plate' && f.key !== 'phone_number').map((field: StripeCustomField) => (
            <div key={field.key} className="mb-4">
              <label htmlFor={field.key} className="block text-sm font-medium opacity-90 mb-1">
                {field.label.custom} {!field.optional && <span className="text-red-500">*</span>}
              </label>
              {field.type === 'dropdown' && field.dropdown?.options ? (
                <select
                  id={field.key}
                  value={customFieldValues[field.key] || ''}
                  onChange={(e) => handleCustomFieldChange(field.key, e.target.value)}
                  className={inputClasses}
                  required={!field.optional}
                >
                  <option value="">Select {field.label.custom}</option>
                  {field.dropdown.options.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type === 'numeric' ? 'number' : 'text'}
                  id={field.key}
                  value={customFieldValues[field.key] || ''}
                  onChange={(e) => handleCustomFieldChange(field.key, e.target.value)}
                  className={inputClasses}
                  required={!field.optional}
                  placeholder={field.label.custom}
                  minLength={field.text?.minimum_length}
                  maxLength={field.text?.maximum_length}
                />
              )}
            </div>
          ))}


          <div className="mb-6">
            <p className="block text-sm font-medium opacity-90 mb-2" id="parking-duration-label">Select Duration:</p>
            {rates.length > 0 ? (
              <div className="space-y-3" role="radiogroup" aria-labelledby="parking-duration-label">
                {rates.map((rate) => (
                  <button
                    key={rate.id}
                    type="button"
                    onClick={() => setSelectedRateId(rate.id)}
                    role="radio"
                    aria-checked={selectedRateId === rate.id}
                    className={`w-full flex justify-between items-center p-4 border rounded-lg transition-all duration-150
                                ${selectedRateId === rate.id 
                                  ? `${accentBgClass} ${accentBorderClass} ring-2` 
                                  : `${theme.inputBgClass || 'bg-slate-50'} ${theme.inputBorderClass || 'border-slate-200'} hover:border-slate-400 hover:bg-opacity-80`}`}
                  >
                    <span className={`font-medium ${selectedRateId === rate.id ? contrastingAccentTextColorClass : 'opacity-90'}`}>{rate.duration}</span>
                    <span className={`font-semibold ${selectedRateId === rate.id ? contrastingAccentTextColorClass : 'opacity-95'}`}>
                      {currencySymbol}{rate.price.toFixed(2)}
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              <p className="opacity-75 text-sm">No parking rates available for this template.</p>
            )}
          </div>
          <Button onClick={handlePayForParking} fullWidth size="lg" className={theme.buttonPrimaryClass}>
            Pay {selectedRateDetailsForUI ? `${currencySymbol}${selectedRateDetailsForUI.price.toFixed(2)}` : ''} For Parking
          </Button>
        </div>
      </Card>
      
      {(currentData.infoPoints && currentData.infoPoints.length > 0) && (
        <Card className={`mt-4 ${theme.cardBgClass}`}>
            <div className="p-6">
                <h3 className="text-lg font-semibold opacity-95 mb-2">Important Information</h3>
                <ul className="list-disc list-inside opacity-90 space-y-1 text-sm">
                    {currentData.infoPoints.map((point, index) => (
                        <li key={index}>{point}</li>
                    ))}
                </ul>
            </div>
        </Card>
      )}
    </div>
  );
};

export default ParkingSessionPage;
