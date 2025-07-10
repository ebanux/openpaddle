
import React from 'react';
import { BaseAfterPaymentPageProps, FundraisingThankYouAPData, BasePageLinkConfig } from '../../types';
import { CURRENCY_SYMBOLS } from '../../constants';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

const FundraisingThankYouDisplay: React.FC<BaseAfterPaymentPageProps<FundraisingThankYouAPData>> = ({ sessionData, templateData, theme, environment }) => {
  const currencySymbol = CURRENCY_SYMBOLS[sessionData.paymentDetails.currency] || '$';
  const cardTitle = templateData.title || "Thank You for Your Donation!";
  const pageConfig = sessionData.pageConfig as BasePageLinkConfig;
  
   const {
      totalAmount,
      originalTotalAmount,
      appliedPromotionCode,
      discountAmountApplied,
  } = sessionData.paymentDetails;
  const hasDiscount = appliedPromotionCode && originalTotalAmount !== undefined && discountAmountApplied !== undefined;

  const accentColorClass = theme.buttonPrimaryClass.includes('sky') ? 'text-sky-500' : 
                         theme.buttonPrimaryClass.includes('cyan') ? 'text-cyan-500' :
                         theme.buttonPrimaryClass.includes('red') ? 'text-red-500' :
                         theme.buttonPrimaryClass.includes('lime') ? 'text-lime-400' :
                         'text-blue-600';

  return (
    <div className={`min-h-screen ${theme.bgClass} ${theme.textClass} py-8 px-4 flex flex-col items-center justify-center`}>
      <Card className={`${theme.cardBgClass} p-6 sm:p-8 shadow-2xl max-w-lg w-full text-center`}>
        <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mb-5 sm:mb-6 mx-auto ${theme.buttonPrimaryClass.replace('text-white','bg-opacity-20').replace('text-slate-900','bg-opacity-20').replace('text-green-900','bg-opacity-20')} ${accentColorClass.replace('text-','bg-')} bg-opacity-20`}>
          <i className={`material-icons-round !text-4xl ${accentColorClass}`}>favorite</i>
        </div>
        <h1 className={`text-2xl sm:text-3xl font-bold mb-2`}>{cardTitle}</h1>
        <p className="opacity-90 mb-6 whitespace-pre-line">{templateData.mainMessage}</p>

        <p className={`text-lg opacity-95 mb-4 ${accentColorClass}`}>{templateData.thankYouMessage}</p>

        {templateData.showDonationAmount && (
          <div className={`p-3 rounded-md mb-6 ${theme.inputBgClass || 'bg-slate-50'} border ${theme.inputBorderClass || 'border-slate-200'}`}>
            {hasDiscount ? (
                 <div className="text-sm space-y-1">
                    <div className="flex justify-between">
                        <span>Original Donation:</span>
                        <span>{currencySymbol}{originalTotalAmount!.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-green-600">
                        <span>Discount ({appliedPromotionCode}):</span>
                        <span>-{currencySymbol}{discountAmountApplied!.toFixed(2)}</span>
                    </div>
                    <div className={`flex justify-between font-semibold pt-1 mt-1 border-t ${theme.inputBorderClass || 'border-slate-300'}`}>
                        <span>Final Amount:</span>
                        <span className={accentColorClass}>{currencySymbol}{totalAmount.toFixed(2)}</span>
                    </div>
                </div>
            ) : (
                <p className="text-md font-medium">
                You generously donated: <strong className={accentColorClass}>{currencySymbol}{totalAmount.toFixed(2)}</strong>
                </p>
            )}
          </div>
        )}

        {/* Display Custom Fields if enabled */}
        {templateData.showSubmittedCustomFields && sessionData.submittedCustomFields && Object.keys(sessionData.submittedCustomFields).length > 0 && (
          <div className={`mb-6 pt-4 border-t ${theme.inputBorderClass || 'border-slate-300'}`}>
            <h3 className="text-md font-semibold opacity-90 mb-2">Your Details:</h3>
            <div className="space-y-1 text-sm text-left">
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

        {templateData.socialSharePrompt && (
          <p className="text-sm opacity-80 italic mb-2">{templateData.socialSharePrompt}</p>
        )}
        {templateData.socialShareLink && (
          <div className="mb-6">
            <a 
              href={templateData.socialShareLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className={`inline-block px-4 py-2 text-sm rounded-md ${theme.buttonSecondaryClass} mr-2`}
            >
              Share Campaign
            </a>
            {/* Add more social share buttons if needed */}
          </div>
        )}
        
        {templateData.furtherSupportMessage && (
          <p className="text-sm opacity-80 mt-4">{templateData.furtherSupportMessage}</p>
        )}
        {templateData.furtherSupportLink && (
           <div className="mt-2">
            <a 
              href={templateData.furtherSupportLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className={`inline-block px-4 py-2 text-sm rounded-md ${theme.buttonPrimaryClass}`}
            >
              Learn More
            </a>
          </div>
        )}
        
        <p className="text-xs opacity-60 text-center mt-8">
          Transaction ID (Simulated): {sessionData.sessionId} (Mode: {environment.toUpperCase()})
        </p>
      </Card>
    </div>
  );
};

export default FundraisingThankYouDisplay;