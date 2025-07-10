

import React from 'react';
import { BaseAfterPaymentPageProps, ProductOrderConfirmedTrackingAPData, StripeCustomField, BasePageLinkConfig } from '../../types';
import { CURRENCY_SYMBOLS } from '../../constants';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

const ProductOrderConfirmedTrackingDisplay: React.FC<BaseAfterPaymentPageProps<ProductOrderConfirmedTrackingAPData>> = ({ sessionData, templateData, theme, environment }) => {
  const currencySymbol = CURRENCY_SYMBOLS[sessionData.paymentDetails.currency] || '$';
  const purchasedItem = sessionData.paymentDetails.items[0]; // Assuming one primary item for display simplicity
  const cardTitle = templateData.title || "Order Confirmation";
  const pageConfig = sessionData.pageConfig as BasePageLinkConfig;

  const {
      totalAmount,
      originalTotalAmount,
      appliedPromotionCode,
      discountAmountApplied,
      shippingAmount,
      taxAmount
  } = sessionData.paymentDetails;
  const hasDiscount = appliedPromotionCode && originalTotalAmount !== undefined && discountAmountApplied !== undefined;
  
  const subtotal = (hasDiscount ? originalTotalAmount : totalAmount) - (shippingAmount || 0) - (taxAmount || 0);


  const accentBgColor = theme.buttonPrimaryClass.includes('lime') ? 'bg-lime-100 dark:bg-lime-900' : 
                        theme.buttonPrimaryClass.includes('sky') ? 'bg-sky-100 dark:bg-sky-900' :
                        theme.buttonPrimaryClass.includes('cyan') ? 'bg-cyan-100 dark:bg-cyan-900' :
                        theme.buttonPrimaryClass.includes('red') ? 'bg-red-100 dark:bg-red-900' :
                        'bg-green-100 dark:bg-green-900';
  const accentTextColor = theme.buttonPrimaryClass.includes('lime') ? 'text-lime-600 dark:text-lime-300' :
                          theme.buttonPrimaryClass.includes('sky') ? 'text-sky-600 dark:text-sky-300' :
                          theme.buttonPrimaryClass.includes('cyan') ? 'text-cyan-600 dark:text-cyan-300' :
                          theme.buttonPrimaryClass.includes('red') ? 'text-red-600 dark:text-red-300' :
                          'text-green-600 dark:text-green-300';

  return (
    <div className={`min-h-screen ${theme.bgClass} ${theme.textClass} py-8 px-4 flex flex-col items-center`}>
      <Card className={`${theme.cardBgClass} p-6 sm:p-8 shadow-2xl max-w-lg w-full`}>
        <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mb-5 sm:mb-6 mx-auto ${accentBgColor}`}>
            <i className={`material-icons-round !text-4xl ${accentTextColor}`}>check_circle</i>
        </div>
        <h1 className={`text-2xl sm:text-3xl font-bold mb-4 text-center`}>{cardTitle}</h1>
        
        <p className="text-center opacity-90 mb-6 whitespace-pre-line">{templateData.mainMessage}</p>

        <div className={`space-y-2 mb-6 p-4 rounded-md ${theme.inputBgClass || 'bg-slate-50'} border ${theme.inputBorderClass || 'border-slate-200'}`}>
          
           <div className="flex justify-between text-sm">
              <span>{purchasedItem.name} {purchasedItem.quantity && purchasedItem.quantity > 1 ? `(x${purchasedItem.quantity})` : ''}</span>
              <span>{currencySymbol}{subtotal.toFixed(2)}</span>
            </div>

            {hasDiscount && (
                 <div className="flex justify-between text-sm text-green-600">
                    <span>Discount ({appliedPromotionCode}):</span>
                    <span>-{currencySymbol}{discountAmountApplied!.toFixed(2)}</span>
                </div>
            )}
            
            {shippingAmount !== undefined && shippingAmount > 0 && (
                 <div className="flex justify-between text-sm">
                    <span>Shipping:</span>
                    <span>{currencySymbol}{shippingAmount.toFixed(2)}</span>
                </div>
            )}

            {taxAmount !== undefined && taxAmount > 0 && (
                 <div className="flex justify-between text-sm">
                    <span>Tax:</span>
                    <span>{currencySymbol}{taxAmount.toFixed(2)}</span>
                </div>
            )}
           
           <div className={`flex justify-between items-center font-bold pt-2 mt-2 border-t text-lg ${theme.inputBorderClass || 'border-slate-300'}`}>
              <span className="font-medium">Order Total:</span>
              <span className="font-semibold">{currencySymbol}{totalAmount.toFixed(2)}</span>
            </div>
          {templateData.showEstimatedDelivery && templateData.estimatedDeliveryText && (
            <div className="flex justify-between items-center text-sm mt-1">
              <span className="font-medium opacity-80">Estimated Delivery:</span>
              <span className="font-semibold">{templateData.estimatedDeliveryText}</span>
            </div>
          )}
        </div>

        {/* Display Custom Fields if enabled */}
        {templateData.showSubmittedCustomFields && sessionData.submittedCustomFields && Object.keys(sessionData.submittedCustomFields).length > 0 && (
          <div className={`mb-6 pt-4 border-t ${theme.inputBorderClass || 'border-slate-300'}`}>
            <h3 className="text-md font-semibold opacity-90 mb-2">Order Details:</h3>
            <div className="space-y-1 text-sm">
              {Object.entries(sessionData.submittedCustomFields).map(([key, value]) => {
                const fieldConfig = pageConfig.custom_fields?.find(f => f.key === key);
                const label = fieldConfig?.label?.custom || key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                return (
                  <div key={key} className="flex justify-between">
                    <span className="font-medium opacity-80">{label}:</span>
                    <span className="font-semibold text-right">{String(value)}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {templateData.mockTrackingLink && (
          <div className="text-center mb-6">
            <a 
              href={templateData.mockTrackingLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className={`inline-block px-6 py-3 rounded-md ${theme.buttonPrimaryClass}`}
            >
              {templateData.trackingLinkButtonText || "Track Your Order"}
            </a>
          </div>
        )}
        
        <p className="text-xs opacity-60 text-center mt-6">
          Order ID (Simulated): {sessionData.sessionId} (Mode: {environment.toUpperCase()})
        </p>
      </Card>
    </div>
  );
};

export default ProductOrderConfirmedTrackingDisplay;