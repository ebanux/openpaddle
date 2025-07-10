
import React from 'react';
import { BaseAfterPaymentPageProps, RestaurantFeedbackLoyaltyAPData } from '../../types';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

const RestaurantFeedbackLoyaltyDisplay: React.FC<BaseAfterPaymentPageProps<RestaurantFeedbackLoyaltyAPData>> = ({ sessionData, templateData, theme, environment }) => {
  const cardTitle = templateData.title || "Feedback & Loyalty";

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

        {templateData.feedbackPromptHeadline && (
            <h2 className={`text-xl font-semibold mb-2 text-center ${accentColorClass}`}>{templateData.feedbackPromptHeadline}</h2>
        )}
        {templateData.feedbackFormLink && (
            <div className="text-center my-4">
                <Button onClick={() => window.open(templateData.feedbackFormLink, '_blank')} className={theme.buttonPrimaryClass}>
                    Leave Feedback
                </Button>
            </div>
        )}
        
        {templateData.loyaltyProgramHeadline && (
             <div className="mt-8 pt-6 border-t border-dashed border-slate-300">
                <h2 className={`text-xl font-semibold mb-2 text-center ${accentColorClass}`}>{templateData.loyaltyProgramHeadline}</h2>
                {templateData.loyaltyProgramDetails && (
                    <p className="text-sm opacity-80 text-center mb-3">{templateData.loyaltyProgramDetails}</p>
                )}
                {templateData.loyaltyProgramJoinLink && (
                     <div className="text-center my-4">
                        <Button onClick={() => window.open(templateData.loyaltyProgramJoinLink, '_blank')} className={theme.buttonSecondaryClass}>
                            Join Our Loyalty Program
                        </Button>
                    </div>
                )}
            </div>
        )}
        
        <p className="text-xs opacity-60 text-center mt-6">
          Session ID: {sessionData.sessionId} (Mode: {environment.toUpperCase()})
        </p>
      </Card>
    </div>
  );
};

export default RestaurantFeedbackLoyaltyDisplay;
