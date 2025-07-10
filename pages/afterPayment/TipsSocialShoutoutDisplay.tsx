
import React from 'react';
import { BaseAfterPaymentPageProps, TipsSocialShoutoutAPData } from '../../types';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

const TipsSocialShoutoutDisplay: React.FC<BaseAfterPaymentPageProps<TipsSocialShoutoutAPData>> = ({ sessionData, templateData, theme, environment }) => {
  const cardTitle = templateData.title || "Share the Love!";
  const accentColorClass = theme.buttonPrimaryClass.includes('sky') ? 'text-sky-500' : 
                         theme.buttonPrimaryClass.includes('pink') ? 'text-pink-500' :
                         'text-blue-600';
  
  const getShareUrl = () => {
    const text = encodeURIComponent(templateData.prewrittenText.replace('@creator', templateData.creatorHandle));
    switch (templateData.socialPlatform) {
      case 'Twitter':
        return `https://twitter.com/intent/tweet?text=${text}`;
      case 'Facebook':
        return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${text}`;
      default:
        return '#';
    }
  };

  return (
    <div className={`min-h-screen ${theme.bgClass} ${theme.textClass} py-8 px-4 flex flex-col items-center justify-center`}>
      <Card className={`${theme.cardBgClass} p-6 sm:p-8 shadow-2xl max-w-md w-full text-center`}>
        <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mb-5 sm:mb-6 mx-auto ${theme.buttonPrimaryClass.replace('text-white','bg-opacity-20').replace(/text-\w+-\d+/,'')} ${accentColorClass.replace('text-','bg-')} bg-opacity-20`}>
          <i className={`material-icons-round !text-4xl ${accentColorClass}`}>campaign</i>
        </div>
        <h1 className="text-2xl font-bold">{cardTitle}</h1>
        <p className="opacity-90 mt-2 mb-6">{templateData.mainMessage}</p>

        <div className={`p-4 rounded-lg mb-6 ${theme.inputBgClass || 'bg-slate-50'} border ${theme.inputBorderClass || 'border-slate-200'}`}>
          <p className="text-sm font-medium">Here's a pre-written message to make it easy:</p>
          <blockquote className="italic text-slate-700 mt-2 p-3 bg-white/50 rounded-md">
            "{templateData.prewrittenText.replace('@creator', templateData.creatorHandle)}"
          </blockquote>
        </div>

        <a href={getShareUrl()} target="_blank" rel="noopener noreferrer">
          <Button fullWidth className={theme.buttonPrimaryClass}>
            Share on {templateData.socialPlatform}
          </Button>
        </a>

        <p className="text-xs opacity-60 text-center mt-8">
          Transaction ID: {sessionData.sessionId}
        </p>
      </Card>
    </div>
  );
};

export default TipsSocialShoutoutDisplay;