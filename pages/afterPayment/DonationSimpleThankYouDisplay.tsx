
import React from 'react';
import { BaseAfterPaymentPageProps, DonationSimpleThankYouAPData } from '../../types';
import { CURRENCY_SYMBOLS } from '../../constants';
import Card from '../../components/common/Card';

const DonationSimpleThankYouDisplay: React.FC<BaseAfterPaymentPageProps<DonationSimpleThankYouAPData>> = ({ sessionData, templateData, theme }) => {
  const currencySymbol = CURRENCY_SYMBOLS[sessionData.paymentDetails.currency] || '$';
  const cardTitle = templateData.title || "Thank You!";
  const accentColorClass = theme.buttonPrimaryClass.includes('sky') ? 'text-sky-500' : 'text-blue-600';

  return (
    <div className={`min-h-screen ${theme.bgClass} ${theme.textClass} py-8 px-4 flex flex-col items-center justify-center`}>
      <Card className={`${theme.cardBgClass} p-6 sm:p-8 shadow-2xl max-w-md w-full text-center`}>
        <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mb-5 sm:mb-6 mx-auto ${accentColorClass.replace('text-','bg-')} bg-opacity-20`}>
          <i className={`material-icons-round !text-4xl ${accentColorClass}`}>favorite</i>
        </div>
        <h1 className={`text-2xl sm:text-3xl font-bold mb-2`}>{cardTitle}</h1>
        <p className="opacity-90 mb-6 whitespace-pre-line">{templateData.mainMessage}</p>
        {templateData.showDonationAmount && (
          <div className={`p-3 rounded-md mb-6 ${theme.inputBgClass || 'bg-slate-50'} border ${theme.inputBorderClass || 'border-slate-200'}`}>
            <p className="text-md font-medium">
              You donated: <strong className={accentColorClass}>{currencySymbol}{sessionData.paymentDetails.totalAmount.toFixed(2)}</strong>
            </p>
          </div>
        )}
      </Card>
    </div>
  );
};
export default DonationSimpleThankYouDisplay;
