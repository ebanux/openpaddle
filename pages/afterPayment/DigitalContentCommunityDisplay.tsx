import React from 'react';
import { BaseAfterPaymentPageProps, DigitalContentCommunityFeedbackAPData } from '../../types';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

const DigitalContentCommunityDisplay: React.FC<BaseAfterPaymentPageProps<DigitalContentCommunityFeedbackAPData>> = ({ sessionData, templateData, theme, environment }) => {
  const cardTitle = templateData.title || "Thank You & Welcome!";
  
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

        {templateData.communityHeadline && (
          <div className={`p-4 rounded-lg mb-4 ${theme.inputBgClass || 'bg-slate-50'} border ${theme.inputBorderClass || 'border-slate-200'}`}>
            <h2 className={`text-xl font-semibold mb-2 text-center ${accentColorClass}`}>{templateData.communityHeadline}</h2>
            {templateData.communityJoinLink && (
              <div className="text-center">
                <Button onClick={() => window.open(templateData.communityJoinLink, '_blank')} className={theme.buttonPrimaryClass}>
                  {templateData.communityButtonText || 'Join Now'}
                </Button>
              </div>
            )}
          </div>
        )}

        {templateData.feedbackHeadline && (
          <div className="mt-6 pt-6 border-t border-dashed">
            <h2 className={`text-xl font-semibold mb-2 text-center ${accentColorClass}`}>{templateData.feedbackHeadline}</h2>
            {templateData.feedbackFormLink && (
              <div className="text-center">
                <Button onClick={() => window.open(templateData.feedbackFormLink, '_blank')} className={theme.buttonSecondaryClass}>
                  {templateData.feedbackButtonText || 'Leave Feedback'}
                </Button>
              </div>
            )}
          </div>
        )}
        
        <p className="text-xs opacity-60 text-center mt-8">
          Access ID: {sessionData.sessionId} (Mode: {environment.toUpperCase()})
        </p>
      </Card>
    </div>
  );
};

export default DigitalContentCommunityDisplay;
