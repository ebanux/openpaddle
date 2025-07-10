
import React from 'react';
import { BaseAfterPaymentPageProps, RentalExtendHelpAPData } from '../../types';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

const RentalExtendHelpDisplay: React.FC<BaseAfterPaymentPageProps<RentalExtendHelpAPData>> = ({ sessionData, templateData, theme, environment }) => {
  const cardTitle = templateData.title || "Rental Help & Extension";
  
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

        {templateData.helpHeadline && (
            <h2 className={`text-xl font-semibold mb-3 text-center ${accentColorClass}`}>{templateData.helpHeadline}</h2>
        )}

        {templateData.helpResources && templateData.helpResources.length > 0 && (
          <div className="mb-6 space-y-3">
            {templateData.helpResources.map((resource, index) => (
              <Card key={index} className={`${theme.inputBgClass || 'bg-slate-50'} p-3 border ${theme.inputBorderClass || 'border-slate-200'} shadow-sm`}>
                <h4 className="font-medium text-sm opacity-95">{resource.title}</h4>
                {resource.description && <p className="text-xs opacity-70 mb-1">{resource.description}</p>}
                {resource.link && (
                  <a href={resource.link} target="_blank" rel="noopener noreferrer" className={`text-xs ${accentColorClass} hover:underline`}>
                    Learn More &rarr;
                  </a>
                )}
              </Card>
            ))}
          </div>
        )}

        {templateData.contactSupportText && (
            <p className="text-sm opacity-80 text-center my-4 p-3 bg-opacity-50 border rounded-md border-dashed">{templateData.contactSupportText}</p>
        )}
        
        {templateData.faqLink && (
            <div className="text-center my-4">
                <Button onClick={() => window.open(templateData.faqLink, '_blank')} className={theme.buttonSecondaryClass}>
                    View FAQs
                </Button>
            </div>
        )}
        
        <p className="text-xs opacity-60 text-center mt-6">
          Session ID: {sessionData.sessionId} (Mode: {environment.toUpperCase()})
        </p>
      </Card>
    </div>
  );
};

export default RentalExtendHelpDisplay;
