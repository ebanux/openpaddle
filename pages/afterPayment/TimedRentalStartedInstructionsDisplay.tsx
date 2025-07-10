
import React from 'react';
import { BaseAfterPaymentPageProps, TimedRentalStartedInstructionsAPData } from '../../types';
import { CURRENCY_SYMBOLS } from '../../constants';
import Card from '../../components/common/Card';

const TimedRentalStartedInstructionsDisplay: React.FC<BaseAfterPaymentPageProps<TimedRentalStartedInstructionsAPData>> = ({ sessionData, templateData, theme, environment }) => {
  const currencySymbol = CURRENCY_SYMBOLS[sessionData.paymentDetails.currency] || '$';
  const rentedItem = sessionData.paymentDetails.items[0]; // Assuming one primary item
  const cardTitle = templateData.title || "Rental Started";

  const accentColorClass = theme.buttonPrimaryClass.includes('sky') ? 'text-sky-500' : 
                         theme.buttonPrimaryClass.includes('cyan') ? 'text-cyan-500' :
                         theme.buttonPrimaryClass.includes('red') ? 'text-red-500' :
                         theme.buttonPrimaryClass.includes('lime') ? 'text-lime-400' :
                         'text-blue-600';

  return (
    <div className={`min-h-screen ${theme.bgClass} ${theme.textClass} py-8 px-4 flex flex-col items-center`}>
      <Card className={`${theme.cardBgClass} p-6 sm:p-8 shadow-2xl max-w-lg w-full`}>
        <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mb-5 sm:mb-6 mx-auto ${theme.buttonPrimaryClass.replace('text-white','bg-opacity-20').replace('text-slate-900','bg-opacity-20').replace('text-green-900','bg-opacity-20')} ${accentColorClass.replace('text-','bg-')} bg-opacity-20`}>
             <i className={`material-icons-round !text-4xl ${accentColorClass}`}>timer</i>
        </div>
        <h1 className={`text-2xl sm:text-3xl font-bold mb-2 text-center`}>{cardTitle}</h1>
        <p className="text-center opacity-90 mb-6 whitespace-pre-line">{templateData.mainMessage}</p>

        {rentedItem && (
          <div className={`p-4 rounded-md mb-6 ${theme.inputBgClass || 'bg-slate-50'} border ${theme.inputBorderClass || 'border-slate-200'}`}>
            <p className="text-lg font-medium text-center">
              Item: <strong className={accentColorClass}>{rentedItem.name}</strong>
            </p>
            <p className="text-center opacity-80 text-sm">
              Amount Paid: {currencySymbol}{sessionData.paymentDetails.totalAmount.toFixed(2)}
            </p>
            <p className="text-center opacity-70 text-xs mt-1">
              Started: {new Date(sessionData.paymentDetails.paymentTimestamp).toLocaleTimeString()}
            </p>
          </div>
        )}

        {templateData.instructionsList && templateData.instructionsList.length > 0 && (
          <div className="mb-6">
            <h2 className={`text-xl font-semibold mb-3 ${accentColorClass}`}>{templateData.instructionsHeadline}</h2>
            <ul className="list-disc list-inside space-y-1 opacity-80 text-sm">
              {templateData.instructionsList.map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ul>
          </div>
        )}

        {templateData.returnInfo && (
          <div className={`mt-4 p-3 rounded-md ${theme.inputBgClass || 'bg-slate-100'} border ${theme.inputBorderClass || 'border-slate-200'} text-sm`}>
            <h3 className="font-semibold opacity-90 mb-1">Return Information:</h3>
            <p className="opacity-80 whitespace-pre-line">{templateData.returnInfo}</p>
          </div>
        )}

        {templateData.emergencyContact && (
          <div className={`mt-4 p-3 rounded-md ${theme.inputBgClass || 'bg-slate-100'} border ${theme.inputBorderClass || 'border-slate-200'} text-sm`}>
            <h3 className="font-semibold opacity-90 mb-1">Emergency Contact:</h3>
            <p className="opacity-80 whitespace-pre-line">{templateData.emergencyContact}</p>
          </div>
        )}
        
        <p className="text-xs opacity-60 text-center mt-8">
          Rental ID (Simulated): {sessionData.sessionId} (Mode: {environment.toUpperCase()})
        </p>
      </Card>
    </div>
  );
};

export default TimedRentalStartedInstructionsDisplay;