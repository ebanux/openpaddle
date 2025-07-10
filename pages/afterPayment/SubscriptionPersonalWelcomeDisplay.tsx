
import React from 'react';
import { BaseAfterPaymentPageProps, SubscriptionPersonalWelcomeAPData } from '../../types';
import Card from '../../components/common/Card';

const SubscriptionPersonalWelcomeDisplay: React.FC<BaseAfterPaymentPageProps<SubscriptionPersonalWelcomeAPData>> = ({ sessionData, templateData, theme, environment }) => {
  const cardTitle = templateData.title || "Welcome!";
  
  const accentColorClass = theme.buttonPrimaryClass.includes('sky') ? 'text-sky-500' : 
                         theme.buttonPrimaryClass.includes('cyan') ? 'text-cyan-500' :
                         theme.buttonPrimaryClass.includes('red') ? 'text-red-500' :
                         theme.buttonPrimaryClass.includes('lime') ? 'text-lime-400' :
                         'text-blue-600';

  const getEmbedUrl = (url: string = '') => {
    if (url.includes('youtube.com/watch?v=')) return url.replace('watch?v=', 'embed/');
    if (url.includes('youtu.be/')) return url.replace('youtu.be/', 'youtube.com/embed/');
    if (url.includes('vimeo.com/')) {
      const videoId = url.substring(url.lastIndexOf('/') + 1);
      return `https://player.vimeo.com/video/${videoId}`;
    }
    return url;
  };

  return (
    <div className={`min-h-screen ${theme.bgClass} ${theme.textClass} py-8 px-4 flex flex-col items-center`}>
      <Card className={`${theme.cardBgClass} p-6 sm:p-8 shadow-2xl max-w-lg w-full`}>
        <h1 className={`text-2xl sm:text-3xl font-bold mb-2 text-center`}>{cardTitle}</h1>
        <p className="text-center opacity-90 mb-4 whitespace-pre-line">{templateData.mainMessage}</p>

        <h2 className={`text-xl font-semibold mb-4 text-center ${accentColorClass}`}>{templateData.welcomeHeadline}</h2>
        
        {templateData.videoEmbedUrl ? (
          <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-lg border border-slate-300 mb-4">
            <iframe
              src={getEmbedUrl(templateData.videoEmbedUrl)}
              title="Personal Welcome Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
        ) : null}

        <div className={`p-4 rounded-md ${theme.inputBgClass || 'bg-slate-50'}`}>
          <p className="text-sm opacity-80 whitespace-pre-line">{templateData.personalMessage}</p>
        </div>
        
        <p className="text-xs opacity-60 text-center mt-8">
          Subscription ID: {sessionData.sessionId}
        </p>
      </Card>
    </div>
  );
};

export default SubscriptionPersonalWelcomeDisplay;
