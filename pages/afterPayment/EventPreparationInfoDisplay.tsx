import React from 'react';
import { BaseAfterPaymentPageProps, EventPreparationInfoAPData, EventTicketSalesPageLinkConfig } from '../../types';
import Card from '../../components/common/Card';

const EventPreparationInfoDisplay: React.FC<BaseAfterPaymentPageProps<EventPreparationInfoAPData>> = ({ sessionData, templateData, theme }) => {
  const cardTitle = templateData.title || "Prepare for the Event";
  const pageConfig = sessionData.pageConfig as EventTicketSalesPageLinkConfig;
  const eventName = pageConfig?.eventTitle || "Your Event";
  
  const accentColorClass = theme.buttonPrimaryClass.includes('sky') ? 'text-sky-500' : 
                         theme.buttonPrimaryClass.includes('cyan') ? 'text-cyan-500' :
                         theme.buttonPrimaryClass.includes('red') ? 'text-red-500' :
                         theme.buttonPrimaryClass.includes('lime') ? 'text-lime-400' :
                         'text-blue-600';

  return (
    <div className={`min-h-screen ${theme.bgClass} ${theme.textClass} py-8 px-4 flex flex-col items-center`}>
      <Card className={`${theme.cardBgClass} p-6 sm:p-8 shadow-2xl max-w-lg w-full`}>
         <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mb-5 sm:mb-6 mx-auto ${theme.buttonPrimaryClass.replace('text-white','bg-opacity-20')} ${accentColorClass.replace('text-','bg-')} bg-opacity-20`}>
            <i className={`material-icons-round !text-4xl ${accentColorClass}`}>check_circle</i>
        </div>
        <h1 className={`text-2xl sm:text-3xl font-bold mb-2 text-center`}>{cardTitle}</h1>
        <p className="text-center opacity-90 mb-6 whitespace-pre-line">{templateData.mainMessage}</p>

        <h2 className={`text-xl font-semibold mb-3 text-center ${accentColorClass}`}>{templateData.preparationHeadline} for {eventName}</h2>

        {templateData.preparationSteps && templateData.preparationSteps.length > 0 && (
          <div className={`p-4 rounded-md mb-4 ${theme.inputBgClass || 'bg-slate-50'} border ${theme.inputBorderClass || 'border-slate-200'}`}>
            <h3 className="text-md font-semibold opacity-90 mb-2">Please note the following:</h3>
            <ul className="list-decimal list-inside space-y-1 opacity-80 text-sm">
              {templateData.preparationSteps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ul>
          </div>
        )}

        {templateData.whatNotToDo && templateData.whatNotToDo.length > 0 && (
          <div className={`p-4 rounded-md mb-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700`}>
            <h3 className="text-md font-semibold text-red-700 dark:text-red-300 mb-2">Please Do Not Bring:</h3>
            <ul className="list-disc list-inside space-y-1 text-red-600 dark:text-red-400 text-sm">
              {templateData.whatNotToDo.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}
        
        {templateData.venueMapEmbedUrl && (
          <div className="my-6">
            <h3 className="text-md font-semibold opacity-90 mb-2">Venue Map:</h3>
            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden border border-slate-300">
              <iframe
                src={templateData.venueMapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Venue Map"
              ></iframe>
            </div>
          </div>
        )}

        {templateData.contactForHelp && (
          <p className="text-sm opacity-80 text-center mt-6 p-3 rounded-md border border-dashed border-slate-300">
            {templateData.contactForHelp}
          </p>
        )}
        
        <p className="text-xs opacity-60 text-center mt-8">
          Booking ID: {sessionData.sessionId}
        </p>
      </Card>
    </div>
  );
};

export default EventPreparationInfoDisplay;