

import React, { useState, useEffect, useMemo } from 'react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { CURRENCY_SYMBOLS } from '../constants';
import { SimpleInvoicePageProps, StripeLineItem, MonetizationUseCase, StripeCustomField } from '../types';

const SimpleInvoicePage: React.FC<SimpleInvoicePageProps> = ({ onAddToCart, initialData, isLivePreview, theme, environment, adminData }) => {
  const [currentData, setCurrentData] = useState<SimpleInvoicePageProps['initialData']>(initialData);
  const [customFieldValues, setCustomFieldValues] = useState<{ [key: string]: string | number }>({});

  const amountDue = useMemo(() => {
    if (!initialData.line_items || initialData.line_items.length === 0) return 0;
    const lineItem = initialData.line_items[0];

    if (lineItem.price_data) {
        return (lineItem.price_data.unit_amount || 0) / 100;
    } else if (lineItem.price && adminData) {
        const priceInfo = adminData.prices.find(p => p.id === lineItem.price);
        return priceInfo ? (priceInfo.unit_amount || 0) / 100 : 0;
    }
    return 0;
  }, [initialData.line_items, adminData]);


  useEffect(() => {
    setCurrentData(initialData);
    setCustomFieldValues({});
  }, [initialData]);

  const currencySymbol = CURRENCY_SYMBOLS[currentData.currency] || '$';

  const handleCustomFieldChange = (key: string, value: string | number) => {
    setCustomFieldValues(prev => ({ ...prev, [key]: value }));
  };

  const handlePayInvoice = () => {
    if (!currentData || amountDue === undefined) return;

    const lineItemToPurchase = currentData.line_items[0]; 
    if (!lineItemToPurchase) {
        alert("Invoice configuration error. Please check settings.");
        return;
    }
    
    onAddToCart({ ...lineItemToPurchase, quantity: 1 }, { customFieldsData: customFieldValues });
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Not specified';
    try {
      return new Date(dateString + 'T00:00:00Z').toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
    } catch (e) {
      return dateString; 
    }
  };
  
  if (!currentData || !currentData.requestTitle) {
    return (
      <div className="p-6 text-center opacity-75">
        Invoice data is not available.
        {isLivePreview && " Try selecting a template or editing."}
      </div>
    );
  }
  
  const accentColorClass = theme.buttonPrimaryClass.includes('sky') ? 'text-sky-500' : 
                         theme.buttonPrimaryClass.includes('cyan') ? 'text-cyan-500' :
                         theme.buttonPrimaryClass.includes('red') ? 'text-red-500' :
                         theme.buttonPrimaryClass.includes('lime') ? 'text-lime-400' :
                         theme.buttonPrimaryClass.includes('purple') ? 'text-purple-500' :
                         'text-blue-600';
  const inputClasses = `w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 ${theme.inputBgClass || 'bg-slate-50'} ${theme.inputTextClass || ''} ${theme.inputBorderClass || 'border-slate-300'}`;

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <Card className={theme.cardBgClass}>
        <div className="p-6">
          {currentData.yourNameOrBusinessName && (
            <p className={`text-sm font-medium ${accentColorClass} mb-1 text-right`}>
              From: {currentData.yourNameOrBusinessName}
            </p>
          )}
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">{currentData.requestTitle}</h2>
          
          <div className={`flex flex-col items-start space-y-1 pt-3 border-t ${theme.inputBorderClass || 'border-slate-300'} sm:flex-row sm:justify-between sm:items-center sm:space-y-0`}>
                <p className={`text-xl font-bold ${accentColorClass}`}>Amount Due:</p>
                <p className={`text-2xl font-bold ${accentColorClass} self-start sm:self-auto sm:text-right`}>
                {currencySymbol}{amountDue.toFixed(2)}
                </p>
            </div>
          
          <Button 
            onClick={handlePayInvoice} 
            fullWidth 
            size="lg" 
            className={`mt-8 ${theme.buttonPrimaryClass}`}
            disabled={amountDue <= 0}
          >
            Add to Cart
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default SimpleInvoicePage;
