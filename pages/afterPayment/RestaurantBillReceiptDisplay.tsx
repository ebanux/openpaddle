

import React, { useMemo } from 'react';
import { BaseAfterPaymentPageProps, RestaurantBillReceiptAPData, BillItem, RestaurantBillPageLinkConfig } from '../../types';
import { CURRENCY_SYMBOLS } from '../../constants';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

const RestaurantBillReceiptDisplay: React.FC<BaseAfterPaymentPageProps<RestaurantBillReceiptAPData>> = ({ sessionData, templateData, theme, environment }) => {
  const currencySymbol = CURRENCY_SYMBOLS[sessionData.paymentDetails.currency] || '$';
  const cardTitle = templateData.title || "Payment Receipt";
  const pageConfig = sessionData.pageConfig as RestaurantBillPageLinkConfig;

  // Attempt to extract itemized list and tip from session if available
  // This is a simplified example; a real app might store more structured bill data in PageSessionData
  const billItems = useMemo((): BillItem[] => {
    if (!pageConfig?.line_items) return [];
    return pageConfig.line_items.map(li => ({
      id: li.id || li.price || `price_${li.price_data?.product_data?.name}`,
      name: li.price_data?.product_data?.name || 'Item',
      price: (li.price_data?.unit_amount || 0) / 100,
      quantity: li.quantity || 1,
    }));
  }, [pageConfig?.line_items]);
  
  const tipItem = sessionData.paymentDetails.items.find(item => item.name.toLowerCase().includes('tip'));
  const subtotal = billItems.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
  const taxAmount = (pageConfig?.defaultTaxRate || 0) * subtotal;
  
  const accentColorClass = theme.buttonPrimaryClass.includes('sky') ? 'text-sky-500' : 
                         theme.buttonPrimaryClass.includes('cyan') ? 'text-cyan-500' :
                         theme.buttonPrimaryClass.includes('red') ? 'text-red-500' :
                         theme.buttonPrimaryClass.includes('lime') ? 'text-lime-400' :
                         'text-blue-600';

  return (
    <div className={`min-h-screen ${theme.bgClass} ${theme.textClass} py-8 px-4 flex flex-col items-center`}>
      <Card className={`${theme.cardBgClass} p-6 sm:p-8 shadow-2xl max-w-lg w-full`}>
         <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mb-5 sm:mb-6 mx-auto ${theme.buttonPrimaryClass.replace('text-white','bg-opacity-20').replace('text-slate-900','bg-opacity-20').replace('text-green-900','bg-opacity-20')} ${accentColorClass.replace('text-','bg-')} bg-opacity-20`}>
            <i className={`material-icons-round !text-4xl ${accentColorClass}`}>check_circle</i>
        </div>
        <h1 className={`text-2xl sm:text-3xl font-bold mb-2 text-center`}>{cardTitle}</h1>
        <p className="text-center opacity-90 mb-6 whitespace-pre-line">{templateData.mainMessage}</p>

        <div className={`p-4 rounded-md mb-6 ${theme.inputBgClass || 'bg-slate-50'} border ${theme.inputBorderClass || 'border-slate-200'}`}>
          {templateData.showItemizedList && billItems.length > 0 && (
            <div className="mb-3">
              <h3 className="font-semibold opacity-90 text-sm mb-1">Itemized Summary:</h3>
              {billItems.map(item => (
                <div key={item.id} className="flex justify-between text-xs opacity-80">
                  <span>{item.name} (x{item.quantity || 1})</span>
                  <span>{currencySymbol}{(item.price * (item.quantity || 1)).toFixed(2)}</span>
                </div>
              ))}
              <div className="flex justify-between text-xs opacity-80 mt-1 pt-1 border-t border-dashed">
                  <span>Subtotal:</span>
                  <span>{currencySymbol}{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs opacity-80">
                  <span>Tax:</span>
                  <span>{currencySymbol}{taxAmount.toFixed(2)}</span>
              </div>
            </div>
          )}
          {templateData.showTipAmount && tipItem && (
            <div className="flex justify-between text-sm font-medium opacity-90 my-1">
              <span>Tip Amount:</span>
              <span>{currencySymbol}{tipItem.price.toFixed(2)}</span>
            </div>
          )}
          <div className={`flex justify-between text-lg font-bold mt-2 pt-2 border-t ${theme.inputBorderClass || 'border-slate-300'} ${accentColorClass}`}>
            <span>Total Paid:</span>
            <span>{currencySymbol}{sessionData.paymentDetails.totalAmount.toFixed(2)}</span>
          </div>
        </div>

        {templateData.feedbackPrompt && (
          <p className="text-sm opacity-80 italic text-center mb-4">{templateData.feedbackPrompt}</p>
        )}
        
        {templateData.loyaltyProgramLink && (
          <div className="text-center mb-6">
            <a 
              href={templateData.loyaltyProgramLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className={`inline-block px-4 py-2 rounded-md ${theme.buttonSecondaryClass}`}
            >
              Join Our Loyalty Program
            </a>
          </div>
        )}
        
        <p className="text-xs opacity-60 text-center mt-6">
          Transaction ID (Simulated): {sessionData.sessionId} (Mode: {environment.toUpperCase()})
        </p>
      </Card>
    </div>
  );
};

export default RestaurantBillReceiptDisplay;