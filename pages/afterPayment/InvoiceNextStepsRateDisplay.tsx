
import React from 'react';
import { BaseAfterPaymentPageProps, InvoiceNextStepsRateAPData, SimpleInvoicePageLinkConfig } from '../../types';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { CURRENCY_SYMBOLS } from '../../constants';

const InvoiceNextStepsRateDisplay: React.FC<BaseAfterPaymentPageProps<InvoiceNextStepsRateAPData>> = ({ sessionData, templateData, theme, environment }) => {
  const cardTitle = templateData.title || "Invoice Paid - What's Next?";
  const currencySymbol = CURRENCY_SYMBOLS[sessionData.paymentDetails.currency] || '$';
  const pageConfig = sessionData.pageConfig as SimpleInvoicePageLinkConfig;
  
  const accentColorClass = theme.buttonPrimaryClass.includes('sky') ? 'text-sky-500' : 
                         theme.buttonPrimaryClass.includes('cyan') ? 'text-cyan-500' :
                         theme.buttonPrimaryClass.includes('red') ? 'text-red-500' :
                         theme.buttonPrimaryClass.includes('lime') ? 'text-lime-400' :
                         'text-blue-600';

  return (
    <div className={`min-h-screen ${theme.bgClass} ${theme.textClass} py-8 px-4 flex flex-col items-center`}>
      <Card className={`${theme.cardBgClass} p-6 sm:p-8 shadow-2xl max-w-lg w-full`}>
        <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mb-5 sm:mb-6 mx-auto ${theme.buttonPrimaryClass.replace('text-white','bg-opacity-20').replace('text-slate-900','bg-opacity-20').replace('text-green-900','bg-opacity-20')} ${accentColorClass.replace('text-','bg-')} bg-opacity-20`}>
            <i className={`material-icons-round !text-4xl ${accentColorClass}`}>help_outline</i>
        </div>
        <h1 className={`text-2xl sm:text-3xl font-bold mb-2 text-center`}>{cardTitle}</h1>
        <p className="text-center opacity-90 mb-6 whitespace-pre-line">{templateData.mainMessage}</p>

        <h2 className={`text-xl font-semibold mb-3 text-center ${accentColorClass}`}>{templateData.nextStepsHeadline}</h2>
        {templateData.nextStepsList && templateData.nextStepsList.length > 0 && (
          <div className={`p-4 rounded-md mb-6 ${theme.inputBgClass || 'bg-slate-50'} border ${theme.inputBorderClass || 'border-slate-200'}`}>
            <ul className="list-decimal list-inside space-y-1 opacity-80 text-sm">
              {templateData.nextStepsList.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ul>
          </div>
        )}
        
        {(templateData.requestFeedbackLink || templateData.leaveReviewLink) && (
            <div className={`mt-8 pt-6 border-t ${theme.inputBorderClass || 'border-slate-300'} border-dashed text-center space-y-4`}>
                {templateData.requestFeedbackText && <p className="text-md opacity-90">{templateData.requestFeedbackText}</p>}
                {templateData.requestFeedbackLink && (
                    <Button onClick={() => window.open(templateData.requestFeedbackLink, '_blank')} className={theme.buttonSecondaryClass}>
                        Provide Feedback
                    </Button>
                )}
                 {templateData.leaveReviewText && <p className="text-md opacity-90 mt-4">{templateData.leaveReviewText}</p>}
                {templateData.leaveReviewLink && (
                     <Button onClick={() => window.open(templateData.leaveReviewLink, '_blank')} className={theme.buttonSecondaryClass}>
                        Leave a Review
                    </Button>
                )}
            </div>
        )}
        
        <p className="text-xs opacity-60 text-center mt-8">
          Invoice ID: {pageConfig?.invoiceNumber || sessionData.sessionId} (Mode: {environment.toUpperCase()})
        </p>
      </Card>
    </div>
  );
};

export default InvoiceNextStepsRateDisplay;