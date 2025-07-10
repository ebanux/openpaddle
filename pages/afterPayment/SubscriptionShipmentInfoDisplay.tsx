
import React from 'react';
import { BaseAfterPaymentPageProps, SubscriptionShipmentInfoAPData } from '../../types';
import Card from '../../components/common/Card';

const SubscriptionShipmentInfoDisplay: React.FC<BaseAfterPaymentPageProps<SubscriptionShipmentInfoAPData>> = ({ sessionData, templateData, theme, environment }) => {
  const cardTitle = templateData.title || "Confirmation & Shipping";
  
  const accentColorClass = theme.buttonPrimaryClass.includes('sky') ? 'text-sky-500' : 
                         theme.buttonPrimaryClass.includes('cyan') ? 'text-cyan-500' :
                         theme.buttonPrimaryClass.includes('red') ? 'text-red-500' :
                         theme.buttonPrimaryClass.includes('lime') ? 'text-lime-400' :
                         'text-blue-600';

  return (
    <div className={`min-h-screen ${theme.bgClass} ${theme.textClass} py-8 px-4 flex flex-col items-center`}>
      <Card className={`${theme.cardBgClass} p-6 sm:p-8 shadow-2xl max-w-lg w-full`}>
        <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mb-5 sm:mb-6 mx-auto ${theme.buttonPrimaryClass.replace('text-white','bg-opacity-20')} ${accentColorClass.replace('text-','bg-')} bg-opacity-20`}>
          <i className={`material-icons-round !text-4xl ${accentColorClass}`}>local_shipping</i>
        </div>
        <h1 className={`text-2xl sm:text-3xl font-bold mb-2 text-center`}>{cardTitle}</h1>
        <p className="text-center opacity-90 mb-6 whitespace-pre-line">{templateData.mainMessage}</p>

        <h2 className={`text-xl font-semibold mb-3 text-center ${accentColorClass}`}>{templateData.shipmentHeadline}</h2>
        <div className={`p-4 rounded-md mb-6 ${theme.inputBgClass || 'bg-slate-50'} border ${theme.inputBorderClass || 'border-slate-200'}`}>
            <p className="text-sm opacity-80 whitespace-pre-line">{templateData.shipmentDetails}</p>
            {templateData.trackingNumber && (
                <div className="mt-3 pt-3 border-t border-slate-300/50">
                    <p className="text-xs text-slate-500">Mock Tracking #:</p>
                    <p className="font-mono font-semibold text-slate-700">{templateData.trackingNumber}</p>
                </div>
            )}
        </div>
        
        <p className="text-xs opacity-60 text-center mt-8">
          Order ID: {sessionData.sessionId}
        </p>
      </Card>
    </div>
  );
};

export default SubscriptionShipmentInfoDisplay;
