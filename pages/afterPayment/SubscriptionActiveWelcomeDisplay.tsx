
import React from 'react';
import { BaseAfterPaymentPageProps, SubscriptionActiveWelcomeAPData, SubscriptionPageLinkConfig } from '../../types';
import { CURRENCY_SYMBOLS } from '../../constants';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

const SubscriptionActiveWelcomeDisplay: React.FC<BaseAfterPaymentPageProps<SubscriptionActiveWelcomeAPData>> = ({ sessionData, templateData, theme, environment }) => {
  const currencySymbol = CURRENCY_SYMBOLS[sessionData.paymentDetails.currency] || '$';
  const cardTitle = templateData.title || "Subscription Active";
  
  // Attempt to get plan name from payment details or fallback
  const planName = sessionData.paymentDetails.items[0]?.name || "Your Plan";
  const pageConfig = sessionData.pageConfig as SubscriptionPageLinkConfig;

  const {
      totalAmount,
      originalTotalAmount,
      appliedPromotionCode,
      discountAmountApplied,
  } = sessionData.paymentDetails;
  const hasDiscount = appliedPromotionCode && originalTotalAmount !== undefined && discountAmountApplied !== undefined;

  // Mock next billing date (e.g., one month from payment)
  const nextBillingDate = new Date(sessionData.paymentDetails.paymentTimestamp);
  const billingCycle = pageConfig?.line_items?.[0]?.price_data?.recurring?.interval || 'month';
  if (billingCycle === 'month') {
    nextBillingDate.setMonth(nextBillingDate.getMonth() + 1);
  } else if (billingCycle === 'year') {
    nextBillingDate.setFullYear(nextBillingDate.getFullYear() + 1);
  }


  const accentColorClass = theme.buttonPrimaryClass.includes('sky') ? 'text-sky-500' : 
                         theme.buttonPrimaryClass.includes('cyan') ? 'text-cyan-500' :
                         theme.buttonPrimaryClass.includes('red') ? 'text-red-500' :
                         theme.buttonPrimaryClass.includes('lime') ? 'text-lime-400' :
                         'text-blue-600';

  return (
    <div className={`min-h-screen ${theme.bgClass} ${theme.textClass} py-8 px-4 flex flex-col items-center`}>
      <Card className={`${theme.cardBgClass} p-6 sm:p-8 shadow-2xl max-w-lg w-full`}>
        <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mb-5 sm:mb-6 mx-auto ${theme.buttonPrimaryClass.replace('text-white','bg-opacity-20').replace('text-slate-900','bg-opacity-20').replace('text-green-900','bg-opacity-20')} ${accentColorClass.replace('text-','bg-')} bg-opacity-20`}>
             <i className={`material-icons-round !text-4xl ${accentColorClass}`}>card_membership</i>
        </div>
        <h1 className={`text-2xl sm:text-3xl font-bold mb-2 text-center`}>{cardTitle}</h1>
        <p className="text-center opacity-90 mb-4 whitespace-pre-line">{templateData.mainMessage}</p>
        
        <h2 className={`text-xl font-semibold mb-3 text-center ${accentColorClass}`}>{templateData.welcomeHeadline}</h2>
        
        <div className={`p-4 rounded-md mb-6 ${theme.inputBgClass || 'bg-slate-50'} border ${theme.inputBorderClass || 'border-slate-200'}`}>
          <p className="text-lg font-medium text-center mb-2">You are now subscribed to: <strong className={accentColorClass}>{planName}</strong></p>
          
           {hasDiscount ? (
                <div className="text-center opacity-80 text-sm space-y-1">
                    <div className="flex justify-between"><span>Plan Price:</span><span>{currencySymbol}{originalTotalAmount!.toFixed(2)}</span></div>
                    <div className="flex justify-between text-green-600"><span>Discount ({appliedPromotionCode}):</span><span>-{currencySymbol}{discountAmountApplied!.toFixed(2)}</span></div>
                    <div className={`flex justify-between font-semibold pt-1 mt-1 border-t ${theme.inputBorderClass || 'border-slate-300'}`}><span>Amount Paid Today:</span><span>{currencySymbol}{totalAmount.toFixed(2)}</span></div>
                </div>
            ) : (
                 <p className="text-center opacity-80 text-sm">
                    Price: {currencySymbol}{totalAmount.toFixed(2)} / {billingCycle}
                </p>
            )}
        </div>

        {templateData.planBenefits && templateData.planBenefits.length > 0 && (
          <div className="mb-6">
            <h3 className="text-md font-semibold opacity-90 mb-2">Your Plan Includes:</h3>
            <ul className="list-disc list-inside space-y-1 opacity-80 text-sm">
              {templateData.planBenefits.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>
          </div>
        )}

        {templateData.accessContentLink && templateData.accessContentButtonText && (
          <div className="text-center mb-6">
            <a 
              href={templateData.accessContentLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className={`inline-block px-6 py-3 rounded-md ${theme.buttonPrimaryClass}`}
            >
              {templateData.accessContentButtonText}
            </a>
          </div>
        )}
        
        {templateData.showNextBillingDate && (
           <p className="text-sm opacity-70 text-center mb-6">
             Your next billing date is approximately: {nextBillingDate.toLocaleDateString()}.
           </p>
        )}

        <p className="text-xs opacity-60 text-center mt-6">
          Subscription ID (Simulated): {sessionData.sessionId} (Mode: {environment.toUpperCase()})
        </p>
      </Card>
    </div>
  );
};

export default SubscriptionActiveWelcomeDisplay;