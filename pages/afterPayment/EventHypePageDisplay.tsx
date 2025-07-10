import React from 'react';
import { BaseAfterPaymentPageProps, EventHypePageAPData, EventTicketSalesPageLinkConfig } from '../../types';
import Card from '../../components/common/Card';
import CountdownTimer from '../../components/common/CountdownTimer';

const EventHypePageDisplay: React.FC<BaseAfterPaymentPageProps<EventHypePageAPData>> = ({ sessionData, templateData, theme, environment }) => {
  const cardTitle = templateData.title || "Get Ready!";
  const pageConfig = sessionData.pageConfig as EventTicketSalesPageLinkConfig;
  const eventDate = pageConfig.eventDate;
  const eventTime = pageConfig.eventTime;

  const expiryTimestamp = eventDate && eventTime ? `${eventDate}T${eventTime}:00` : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();

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

        <h2 className={`text-xl font-semibold mb-4 text-center ${accentColorClass}`}>{templateData.hypeHeadline}</h2>

        {templateData.showCountdown && (
          <div className={`p-4 rounded-lg my-4 ${theme.inputBgClass || 'bg-slate-50'}`}>
            <p className="text-sm opacity-80 text-center">Event Starts In:</p>
            <CountdownTimer 
              expiryTimestamp={expiryTimestamp}
              onExpire={() => {}}
              className={`text-4xl font-bold tracking-wider my-2 ${accentColorClass} text-center`}
            />
          </div>
        )}
        
        {templateData.mapEmbedUrl && (
          <div className="my-6">
            <h3 className="text-md font-semibold opacity-90 mb-2">Venue Location:</h3>
            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden border border-slate-300">
              <iframe
                src={templateData.mapEmbedUrl}
                width="100%" height="100%" style={{ border: 0 }}
                allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                title="Venue Map"
              ></iframe>
            </div>
          </div>
        )}

        {templateData.playlistEmbedUrl && (
          <div className="my-6">
            <h3 className="text-md font-semibold opacity-90 mb-2">Get in the Mood:</h3>
            <div className="rounded-lg overflow-hidden">
               <iframe 
                style={{ borderRadius: '12px' }}
                src={templateData.playlistEmbedUrl} 
                width="100%" height="152" frameBorder="0" allowFullScreen={false}
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy"
                title="Event Playlist"
              ></iframe>
            </div>
          </div>
        )}
        
        <p className="text-xs opacity-60 text-center mt-6">
          Ticket ID: {sessionData.sessionId} (Mode: {environment.toUpperCase()})
        </p>
      </Card>
    </div>
  );
};

export default EventHypePageDisplay;
