
import React from 'react';
import { BaseAfterPaymentPageProps, InvoicePaidReceiptAPData, SimpleInvoicePageLinkConfig, StripeCustomField, BasePageLinkConfig } from '../../types';
import { CURRENCY_SYMBOLS } from '../../constants';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

const InvoicePaidReceiptDisplay: React.FC<BaseAfterPaymentPageProps<InvoicePaidReceiptAPData>> = ({ sessionData, templateData, theme, environment }) => {
  const currencySymbol = CURRENCY_SYMBOLS[sessionData.paymentDetails.currency] || '$';
  const cardTitle = templateData.title || "Payment Received";
  const pageConfig = sessionData.pageConfig as SimpleInvoicePageLinkConfig;
  const invoiceNumber = pageConfig?.invoiceNumber || sessionData.sessionId; // Example: use session ID if no specific invoice number
  
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
    <div className={`min-h-screen ${theme.bgClass} ${theme.textClass} py-8 px-4 flex flex-col items-center`}>
      <Card className={`${theme.cardBgClass} p-6 sm:p-8 shadow-2xl max-w-lg w-full`}>
        <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mb-5 sm:mb-6 mx-auto ${theme.buttonPrimaryClass.replace('text-white','bg-opacity-20').replace('text-slate-900','bg-opacity-20').replace('text-green-900','bg-opacity-20')} ${accentColorClass.replace('text-','bg-')} bg-opacity-20`}>
            <i className={`material-icons-round !text-4xl ${accentColorClass}`}>receipt_long</i>
        </div>
        <h1 className={`text-2xl sm:text-3xl font-bold mb-2 text-center`}>{cardTitle}</h1>
        <p className="text-center opacity-90 mb-6 whitespace-pre-line">{templateData.mainMessage}</p>
        
        <h2 className={`text-xl font-semibold mb-4 text-center ${accentColorClass}`}>{templateData.receiptHeadline}</h2>

        <div className={`p-4 rounded-md mb-6 ${theme.inputBgClass || 'bg-slate-50'} border ${theme.inputBorderClass || 'border-slate-200'}`}>
          {templateData.showInvoiceNumber && (
            <div className="flex justify-between text-sm opacity-80 mb-1">
              <span>Invoice #:</span>
              <span>{invoiceNumber}</span>
            </div>
          )}
          {templateData.showPaymentDetails && (
            <>
              <div className="flex justify-between text-sm opacity-80">
                <span>Payment Date:</span>
                <span>{new Date(sessionData.paymentDetails.paymentTimestamp).toLocaleDateString()}</span>
              </div>
              {hasDiscount ? (
                  <div className="text-sm space-y-1 mt-2">
                      <div className="flex justify-between"><span>Amount Due:</span><span>{currencySymbol}{originalTotalAmount!.toFixed(2)}</span></div>
                      <div className="flex justify-between text-green-600"><span>Discount ({appliedPromotionCode}):</span><span>-{currencySymbol}{discountAmountApplied!.toFixed(2)}</span></div>
                  </div>
              ) : null}
              <div className={`flex justify-between text-md font-medium mt-2 pt-2 border-t ${theme.inputBorderClass || 'border-slate-300'}`}>
                <span>Amount Paid:</span>
                <span className={accentColorClass}>{currencySymbol}{totalAmount.toFixed(2)}</span>
              </div>
            </>
          )}
        </div>

        {/* Display Custom Fields if enabled */}
        {templateData.showSubmittedCustomFields && sessionData.submittedCustomFields && Object.keys(sessionData.submittedCustomFields).length > 0 && (
          <div className={`mb-6 pt-4 border-t ${theme.inputBorderClass || 'border-slate-300'}`}>
            <h3 className="text-md font-semibold opacity-90 mb-2">Additional Details:</h3>
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

        {templateData.nextSteps && (
          <div className="text-sm opacity-80 mb-6">
            <h4 className="font-semibold">Next Steps:</h4>
            <p className="whitespace-pre-line">{templateData.nextSteps}</p>
          </div>
        )}

        {templateData.downloadPdfLink && (
          <div className="text-center mb-6">
            <a 
              href={templateData.downloadPdfLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className={`inline-block px-5 py-2.5 rounded-md ${theme.buttonSecondaryClass}`}
            >
              Download PDF Receipt
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

export default InvoicePaidReceiptDisplay;