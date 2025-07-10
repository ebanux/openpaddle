
import React from 'react';
import { BaseAfterPaymentPageProps, SubscriptionManageExploreAPData } from '../../types';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

const SubscriptionManageExploreDisplay: React.FC<BaseAfterPaymentPageProps<SubscriptionManageExploreAPData>> = ({ sessionData, templateData, theme, environment }) => {
  const cardTitle = templateData.title || "Manage Your Subscription";
  
  const accentColorClass = theme.buttonPrimaryClass.includes('sky') ? 'text-sky-500' : 
                         theme.buttonPrimaryClass.includes('cyan') ? 'text-cyan-500' :
                         theme.buttonPrimaryClass.includes('red') ? 'text-red-500' :
                         theme.buttonPrimaryClass.includes('lime') ? 'text-lime-400' :
                         'text-blue-600';

  const handleManageSubscription = () => {
    if (templateData.stripeCustomerPortalLink) {
      window.open(templateData.stripeCustomerPortalLink, '_blank');
    } else {
      // Fallback or general message if no specific link
      alert("Manage subscription functionality (e.g., redirect to Stripe Customer Portal) would be here.");
    }
  };

  return (
    <div className={`min-h-screen ${theme.bgClass} ${theme.textClass} py-8 px-4 flex flex-col items-center`}>
      <Card className={`${theme.cardBgClass} p-6 sm:p-8 shadow-2xl max-w-lg w-full`}>
        <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mb-5 sm:mb-6 mx-auto ${theme.buttonPrimaryClass.replace('text-white','bg-opacity-20').replace('text-slate-900','bg-opacity-20').replace('text-green-900','bg-opacity-20')} ${accentColorClass.replace('text-','bg-') } bg-opacity-20`}>
            <i className={`material-icons-round !text-4xl ${accentColorClass}`}>settings</i>
        </div>
        <h1 className={`text-2xl sm:text-3xl font-bold mb-2 text-center`}>{cardTitle}</h1>
        <p className="text-center opacity-90 mb-6 whitespace-pre-line">{templateData.mainMessage}</p>
        
        <div className="text-center mb-8">
          <Button 
            onClick={handleManageSubscription} 
            className={`${theme.buttonPrimaryClass} px-8 py-3 text-lg`}
          >
            {templateData.manageSubscriptionButtonText}
          </Button>
        </div>

        {templateData.featuresToExplore && templateData.featuresToExplore.length > 0 && (
          <div className="mt-8 pt-6 border-t border-dashed border-slate-300">
            <h3 className={`text-lg font-semibold mb-4 ${accentColorClass}`}>{templateData.exploreFeaturesSectionTitle || "Explore More Features:"}</h3>
            <div className="space-y-3">
              {templateData.featuresToExplore.map((feature, index) => (
                <Card key={index} className={`${theme.inputBgClass || 'bg-slate-50'} p-3 border ${theme.inputBorderClass || 'border-slate-200'} shadow-sm`}>
                  <h4 className="font-medium text-sm opacity-95">{feature.name}</h4>
                  <p className="text-xs opacity-70 mb-1">{feature.description}</p>
                  {feature.link && (
                    <a href={feature.link} target="_blank" rel="noopener noreferrer" className={`text-xs ${accentColorClass} hover:underline`}>
                      Learn More &rarr;
                    </a>
                  )}
                </Card>
              ))}
            </div>
          </div>
        )}
        
        <p className="text-xs opacity-60 text-center mt-8">
          Subscription ID (Simulated): {sessionData.sessionId} (Mode: {environment.toUpperCase()})
        </p>
      </Card>
    </div>
  );
};

export default SubscriptionManageExploreDisplay;