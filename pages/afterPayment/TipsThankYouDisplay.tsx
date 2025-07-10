
import React from 'react';
import { BaseAfterPaymentPageProps, TipsThankYouAPData } from '../../types';
import { CURRENCY_SYMBOLS } from '../../constants';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

const TipsThankYouDisplay: React.FC<BaseAfterPaymentPageProps<TipsThankYouAPData>> = ({ sessionData, templateData, theme, environment }) => {
  const currencySymbol = CURRENCY_SYMBOLS[sessionData.paymentDetails.currency] || '$';
  const cardTitle = templateData.title || "Thank You!";

  const accentColorClass = theme.buttonPrimaryClass.includes('sky') ? 'text-sky-500' : 
                         theme.buttonPrimaryClass.includes('cyan') ? 'text-cyan-500' :
                         theme.buttonPrimaryClass.includes('red') ? 'text-red-500' :
                         theme.buttonPrimaryClass.includes('lime') ? 'text-lime-400' :
                         'text-blue-600';

  return (
    <div className={`min-h-screen ${theme.bgClass} ${theme.textClass} py-8 px-4 flex flex-col items-center justify-center`}>
      <Card className={`${theme.cardBgClass} p-6 sm:p-8 shadow-2xl max-w-md w-full text-center`}>
        <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mb-5 sm:mb-6 mx-auto ${theme.buttonPrimaryClass.replace('text-white','bg-opacity-20').replace('text-slate-900','bg-opacity-20').replace('text-green-900','bg-opacity-20')} ${accentColorClass.replace('text-','bg-')} bg-opacity-20`}>
            <i className={`material-icons-round !text-4xl ${accentColorClass}`}>favorite</i>
        </div>
        <h1 className={`text-2xl sm:text-3xl font-bold mb-2`}>{cardTitle}</h1>
        <p className="opacity-90 mb-6 whitespace-pre-line">{templateData.mainMessage}</p>

        {templateData.showAmountTipped && (
          <div className={`p-3 rounded-md mb-6 ${theme.inputBgClass || 'bg-slate-50'} border ${theme.inputBorderClass || 'border-slate-200'}`}>
            <p className="text-lg font-medium">
              You tipped: <strong className={accentColorClass}>{currencySymbol}{sessionData.paymentDetails.totalAmount.toFixed(2)}</strong>
            </p>
          </div>
        )}

        {templateData.personalNote && (
          <p className="text-sm opacity-80 italic mb-4">"{templateData.personalNote}"</p>
        )}
        
        {templateData.nextStepSuggestion && templateData.nextStepLink && (
          <div className="mt-6">
            <a 
              href={templateData.nextStepLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className={`inline-block px-5 py-2.5 rounded-md ${theme.buttonSecondaryClass}`}
            >
              {templateData.nextStepSuggestion}
            </a>
          </div>
        )}
         {!templateData.nextStepLink && templateData.nextStepSuggestion && (
             <p className="mt-6 text-sm opacity-80">{templateData.nextStepSuggestion}</p>
         )}
        
        <p className="text-xs opacity-60 text-center mt-8">
          Transaction ID (Simulated): {sessionData.sessionId} (Mode: {environment.toUpperCase()})
        </p>
      </Card>
    </div>
  );
};

export default TipsThankYouDisplay;