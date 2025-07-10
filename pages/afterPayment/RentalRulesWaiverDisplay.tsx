import React, { useState } from 'react';
import { BaseAfterPaymentPageProps, RentalRulesWaiverAPData } from '../../types';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

const RentalRulesWaiverDisplay: React.FC<BaseAfterPaymentPageProps<RentalRulesWaiverAPData>> = ({ sessionData, templateData, theme, environment }) => {
  const [agreed, setAgreed] = useState(false);
  const cardTitle = templateData.title || "Rental Agreement";
  
  const accentColorClass = theme.buttonPrimaryClass.includes('sky') ? 'text-sky-500' : 
                         theme.buttonPrimaryClass.includes('cyan') ? 'text-cyan-500' :
                         theme.buttonPrimaryClass.includes('red') ? 'text-red-500' :
                         theme.buttonPrimaryClass.includes('lime') ? 'text-lime-400' :
                         'text-blue-600';

  return (
    <div className={`min-h-screen ${theme.bgClass} ${theme.textClass} py-8 px-4 flex flex-col items-center`}>
      <Card className={`${theme.cardBgClass} p-6 sm:p-8 shadow-2xl max-w-lg w-full`}>
        <h1 className={`text-2xl sm:text-3xl font-bold mb-4 text-center ${accentColorClass}`}>{cardTitle}</h1>
        <p className="text-center opacity-90 mb-6 whitespace-pre-line">{templateData.mainMessage}</p>

        <div className={`p-4 rounded-md mb-6 ${theme.inputBgClass || 'bg-slate-50'} border ${theme.inputBorderClass || 'border-slate-200'}`}>
          <h2 className="text-lg font-semibold mb-2">{templateData.rulesHeadline}</h2>
          <ul className="list-disc list-inside space-y-1 opacity-80 text-sm">
            {(templateData.rentalRules || []).map((rule, index) => <li key={index}>{rule}</li>)}
          </ul>
        </div>
        
        <div className="mb-6">
            <label htmlFor="waiver-checkbox" className="flex items-start">
                <input
                    id="waiver-checkbox"
                    type="checkbox"
                    checked={agreed}
                    onChange={() => setAgreed(!agreed)}
                    className="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 mt-0.5"
                />
                <span className="ml-3 text-sm">{templateData.waiverText}</span>
            </label>
        </div>

        {agreed ? (
          <div className="p-4 rounded-lg bg-green-100 border border-green-200 text-green-800 text-center">
            <h3 className="font-bold">Access Information:</h3>
            <p>{templateData.accessInfoAfterWaiver}</p>
          </div>
        ) : (
          <Button fullWidth disabled className={theme.buttonSecondaryClass}>
            Agree to Reveal Access Info
          </Button>
        )}
        
        <p className="text-xs opacity-60 text-center mt-8">
          Session ID: {sessionData.sessionId} (Mode: {environment.toUpperCase()})
        </p>
      </Card>
    </div>
  );
};

export default RentalRulesWaiverDisplay;
