
import React from 'react';
import { BaseAfterPaymentPageProps, EventInfoShareAPData, EventTicketSalesPageLinkConfig } from '../../types';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { CURRENCY_SYMBOLS } from '../../constants';

const EventInfoShareDisplay: React.FC<BaseAfterPaymentPageProps<EventInfoShareAPData>> = ({ sessionData, templateData, theme, environment }) => {
  const cardTitle = templateData.title || "Event Over! Share Your Experience";
  const pageConfig = sessionData.pageConfig as EventTicketSalesPageLinkConfig;
  const eventName = pageConfig?.eventTitle || "The Event";
  
  const accentColorClass = theme.buttonPrimaryClass.includes('sky') ? 'text-sky-500' : 
                         theme.buttonPrimaryClass.includes('cyan') ? 'text-cyan-500' :
                         theme.buttonPrimaryClass.includes('red') ? 'text-red-500' :
                         theme.buttonPrimaryClass.includes('lime') ? 'text-lime-400' :
                         'text-blue-600';

    const getSocialShareUrl = (platform: string, link?: string, text?: string): string => {
        const pageUrl = link || (pageConfig as any)?.redirectUrl || window.location.href; // Cast redirectUrl access
        const shareText = encodeURIComponent(text || `Had a great time at ${eventName}!`);
        switch(platform.toLowerCase()) {
            case 'facebook':
                return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`;
            case 'twitter':
                return `https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${shareText}`;
            case 'linkedin':
                return `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(pageUrl)}&title=${encodeURIComponent(eventName)}&summary=${shareText}`;
            case 'email':
                return `mailto:?subject=${encodeURIComponent(`Check out ${eventName}`)}&body=${shareText}%0A%0A${encodeURIComponent(pageUrl)}`;
            default:
                return pageUrl;
        }
    };


  return (
    <div className={`min-h-screen ${theme.bgClass} ${theme.textClass} py-8 px-4 flex flex-col items-center`}>
      <Card className={`${theme.cardBgClass} p-6 sm:p-8 shadow-2xl max-w-lg w-full text-center`}>
         <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mb-5 sm:mb-6 mx-auto ${theme.buttonPrimaryClass.replace('text-white','bg-opacity-20').replace('text-slate-900','bg-opacity-20').replace('text-green-900','bg-opacity-20')} ${accentColorClass.replace('text-','bg-')} bg-opacity-20`}>
            <i className={`material-icons-round !text-4xl ${accentColorClass}`}>share</i>
        </div>
        <h1 className={`text-2xl sm:text-3xl font-bold mb-2`}>{cardTitle}</h1>
        <p className="opacity-90 mb-6 whitespace-pre-line">{templateData.mainMessage}</p>

        {templateData.eventRecapHeadline && (
            <h2 className={`text-xl font-semibold mb-3 ${accentColorClass}`}>{templateData.eventRecapHeadline}</h2>
        )}
        <p className="text-sm opacity-80 mb-4">
            You attended: <strong>{eventName}</strong> on {pageConfig?.eventDate ? new Date(pageConfig.eventDate + 'T00:00:00Z').toLocaleDateString(undefined, {timeZone:'UTC'}) : 'a recent date'}.
        </p>


        {templateData.sharePrompt && <p className="text-md opacity-90 my-4">{templateData.sharePrompt}</p>}
        {templateData.shareButtons && templateData.shareButtons.length > 0 && (
          <div className="flex justify-center space-x-3 my-4">
            {templateData.shareButtons.map((button, index) => (
              <a 
                key={index} 
                href={getSocialShareUrl(button.platform, button.link, button.text)}
                target="_blank" 
                rel="noopener noreferrer"
                className={`px-4 py-2 text-sm rounded-md flex items-center space-x-2 ${theme.buttonSecondaryClass}`}
              >
                <span>{button.platform}</span> {/* Replace with actual icons later if desired */}
              </a>
            ))}
          </div>
        )}

        {templateData.galleryLink && (
          <div className="my-6">
            <Button onClick={() => window.open(templateData.galleryLink, '_blank')} className={theme.buttonPrimaryClass}>
              {templateData.galleryButtonText || "View Event Gallery"}
            </Button>
          </div>
        )}
        
        {templateData.nextEventPrompt && (
          <div className={`mt-8 pt-6 border-t ${theme.inputBorderClass || 'border-slate-300'} border-dashed`}>
            <p className="text-md font-semibold opacity-90 mb-2">{templateData.nextEventPrompt}</p>
            {templateData.nextEventLink && (
              <Button onClick={() => window.open(templateData.nextEventLink, '_blank')} className={theme.buttonSecondaryClass}>
                {templateData.nextEventButtonText || "See Our Next Event"}
              </Button>
            )}
          </div>
        )}
        
        <p className="text-xs opacity-60 text-center mt-8">
          Session ID: {sessionData.sessionId} (Mode: {environment.toUpperCase()})
        </p>
      </Card>
    </div>
  );
};

export default EventInfoShareDisplay;