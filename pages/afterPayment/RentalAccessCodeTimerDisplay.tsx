import React from 'react';
import { BaseAfterPaymentPageProps, RentalAccessCodeTimerAPData } from '../../types';
import Card from '../../components/common/Card';
import CountdownTimer from '../../components/common/CountdownTimer';

const RentalAccessCodeTimerDisplay: React.FC<BaseAfterPaymentPageProps<RentalAccessCodeTimerAPData>> = ({ sessionData, templateData, theme, environment }) => {
  const cardTitle = templateData.title || "Your Rental is Active";
  const expiryTimestamp = sessionData.timer?.expiresAt || new Date(Date.now() + 1 * 60 * 60 * 1000).toISOString();
  
  const accentColorClass = theme.buttonPrimaryClass.includes('sky') ? 'text-sky-500' : 
                         theme.buttonPrimaryClass.includes('cyan') ? 'text-cyan-500' :
                         theme.buttonPrimaryClass.includes('red') ? 'text-red-500' :
                         theme.buttonPrimaryClass.includes('lime') ? 'text-lime-400' :
                         'text-blue-600';

  return (
    <div className={`min-h-screen ${theme.bgClass} ${theme.textClass} py-8 px-4 flex flex-col items-center`}>
      <Card className={`${theme.cardBgClass} p-6 sm:p-8 shadow-2xl max-w-lg w-full text-center`}>
        <h1 className={`text-2xl sm:text-3xl font-bold mb-2`}>{cardTitle}</h1>
        <p className="opacity-90 mb-6 whitespace-pre-line">{templateData.mainMessage}</p>

        <div className={`p-4 rounded-lg mb-4 ${theme.inputBgClass || 'bg-slate-50'}`}>
          <h2 className="text-md font-semibold text-slate-600">{templateData.accessCodeHeadline}</h2>
          <p className="text-3xl font-bold font-mono tracking-widest text-slate-800 my-2 p-2 bg-white rounded-md border">{templateData.accessCode}</p>
        </div>
        
        <div className={`p-4 rounded-lg mb-6 ${theme.inputBgClass || 'bg-slate-50'}`}>
          <h2 className="text-md font-semibold text-slate-600">{templateData.timerHeadline}</h2>
          <CountdownTimer 
              expiryTimestamp={expiryTimestamp}
              onExpire={() => {}}
              className={`text-4xl font-bold tracking-wider my-2 ${accentColorClass}`}
          />
        </div>
        
        <p className="text-xs opacity-60 text-center mt-8">
          Rental ID: {sessionData.sessionId} (Mode: {environment.toUpperCase()})
        </p>
      </Card>
    </div>
  );
};

export default RentalAccessCodeTimerDisplay;
