import React from 'react';
import { BaseAfterPaymentPageProps, RentalFindOnMapAPData } from '../../types';
import Card from '../../components/common/Card';

const RentalFindOnMapDisplay: React.FC<BaseAfterPaymentPageProps<RentalFindOnMapAPData>> = ({ sessionData, templateData, theme, environment }) => {
  const cardTitle = templateData.title || "Find Your Ride";
  
  const accentColorClass = theme.buttonPrimaryClass.includes('sky') ? 'text-sky-500' : 
                         theme.buttonPrimaryClass.includes('cyan') ? 'text-cyan-500' :
                         theme.buttonPrimaryClass.includes('red') ? 'text-red-500' :
                         theme.buttonPrimaryClass.includes('lime') ? 'text-lime-400' :
                         'text-blue-600';

  return (
    <div className={`min-h-screen ${theme.bgClass} ${theme.textClass} py-8 px-4 flex flex-col items-center`}>
      <Card className={`${theme.cardBgClass} p-6 sm:p-8 shadow-2xl max-w-lg w-full`}>
        <h1 className={`text-2xl sm:text-3xl font-bold mb-2 text-center`}>{cardTitle}</h1>
        <p className="text-center opacity-90 mb-6 whitespace-pre-line">{templateData.mainMessage}</p>

        <h2 className={`text-xl font-semibold mb-4 text-center ${accentColorClass}`}>{templateData.mapHeadline}</h2>
        
        <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-lg border border-slate-300">
          <iframe
            src={templateData.mapEmbedUrl}
            title="Rental Location Map"
            frameBorder="0"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>
        
        <p className="text-xs opacity-60 text-center mt-8">
          Rental ID: {sessionData.sessionId}
        </p>
      </Card>
    </div>
  );
};

export default RentalFindOnMapDisplay;
