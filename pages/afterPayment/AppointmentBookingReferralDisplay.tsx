
import React, { useState } from 'react';
import { BaseAfterPaymentPageProps, AppointmentBookingReferralAPData } from '../../types';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

const AppointmentBookingReferralDisplay: React.FC<BaseAfterPaymentPageProps<AppointmentBookingReferralAPData>> = ({ sessionData, templateData, theme, environment }) => {
  const cardTitle = templateData.title || "Refer & Earn";
  const referralLink = `${window.location.origin}/r/${templateData.referralCode}`;
  const [copied, setCopied] = useState(false);

  const accentColorClass = theme.buttonPrimaryClass.includes('sky') ? 'text-sky-500' : 'text-blue-600';

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className={`min-h-screen ${theme.bgClass} ${theme.textClass} py-8 px-4 flex flex-col items-center`}>
      <Card className={`${theme.cardBgClass} p-6 sm:p-8 shadow-2xl max-w-lg w-full text-center`}>
        <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mb-5 sm:mb-6 mx-auto ${theme.buttonPrimaryClass.replace('text-white','bg-opacity-20')} ${accentColorClass.replace('text-','bg-')} bg-opacity-20`}>
             <i className={`material-icons-round !text-4xl ${accentColorClass}`}>group_add</i>
        </div>
        <h1 className={`text-2xl sm:text-3xl font-bold mb-2`}>{cardTitle}</h1>
        <p className="opacity-90 mb-4 whitespace-pre-line">{templateData.mainMessage}</p>

        <h2 className={`text-xl font-semibold mb-2 ${accentColorClass}`}>{templateData.referralHeadline}</h2>
        <p className="text-sm opacity-80 mb-6">{templateData.referralMessage}</p>
        
        <div className={`p-4 rounded-md mb-6 ${theme.inputBgClass || 'bg-slate-50'} border-2 border-dashed ${theme.inputBorderClass || 'border-slate-300'}`}>
          <label htmlFor="referral-link" className="block text-xs font-medium text-slate-500 mb-1">Your Personal Referral Link:</label>
          <div className="flex items-stretch">
            <input
              id="referral-link"
              type="text"
              readOnly
              value={referralLink}
              className="flex-grow text-sm bg-transparent outline-none px-1 font-mono"
            />
            <Button size="sm" onClick={handleCopy} className={`${theme.buttonPrimaryClass} !px-3 !py-1 !text-xs`}>
              {copied ? 'Copied!' : 'Copy'}
            </Button>
          </div>
        </div>

        <p className="text-xs opacity-60 text-center mt-8">
          Booking ID: {sessionData.sessionId}
        </p>
      </Card>
    </div>
  );
};

export default AppointmentBookingReferralDisplay;
