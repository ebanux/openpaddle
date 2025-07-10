import React from 'react';
import { BaseAfterPaymentPageProps, ProductUpdatesCommunityAPData } from '../../types';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

const ProductUpdatesCommunityDisplay: React.FC<BaseAfterPaymentPageProps<ProductUpdatesCommunityAPData>> = ({ sessionData, templateData, theme, environment }) => {
  const cardTitle = templateData.title || "Pre-Order Confirmed!";
  
  const accentColorClass = theme.buttonPrimaryClass.includes('sky') ? 'text-sky-500' : 
                         theme.buttonPrimaryClass.includes('cyan') ? 'text-cyan-500' :
                         theme.buttonPrimaryClass.includes('red') ? 'text-red-500' :
                         theme.buttonPrimaryClass.includes('lime') ? 'text-lime-400' :
                         'text-blue-600';

  return (
    <div className={`min-h-screen ${theme.bgClass} ${theme.textClass} py-8 px-4 flex flex-col items-center`}>
      <Card className={`${theme.cardBgClass} p-6 sm:p-8 shadow-2xl max-w-lg w-full`}>
        <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mb-5 sm:mb-6 mx-auto ${theme.buttonPrimaryClass.replace('text-white','bg-opacity-20').replace('text-slate-900','bg-opacity-20').replace('text-green-900','bg-opacity-20')} ${accentColorClass.replace('text-','bg-')} bg-opacity-20`}>
             <i className={`material-icons-round !text-4xl ${accentColorClass}`}>check_circle</i>
        </div>
        <h1 className={`text-2xl sm:text-3xl font-bold mb-2 text-center`}>{cardTitle}</h1>
        <p className="text-center opacity-90 mb-6 whitespace-pre-line">{templateData.mainMessage}</p>
        
        <div className={`p-4 rounded-md mb-6 ${theme.inputBgClass || 'bg-slate-50'} border ${theme.inputBorderClass || 'border-slate-200'}`}>
          <h2 className={`text-lg font-semibold text-center ${accentColorClass}`}>{templateData.statusHeadline}</h2>
          <p className="text-sm opacity-80 text-center mt-1">We'll notify you via email when your order ships.</p>
        </div>

        {templateData.communityHeadline && (
          <div className="mt-8 pt-6 border-t border-dashed border-slate-300">
            <h3 className={`text-lg font-semibold mb-2 text-center`}>{templateData.communityHeadline}</h3>
            {templateData.communityMessage && <p className="text-sm text-center opacity-80 mb-4">{templateData.communityMessage}</p>}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              {templateData.discordLink && (
                <a href={templateData.discordLink} target="_blank" rel="noopener noreferrer" className={`flex-1 ${theme.buttonSecondaryClass} py-2 px-4 rounded-md text-center`}>
                  Join Discord
                </a>
              )}
              {templateData.facebookGroupLink && (
                 <a href={templateData.facebookGroupLink} target="_blank" rel="noopener noreferrer" className={`flex-1 ${theme.buttonSecondaryClass} py-2 px-4 rounded-md text-center`}>
                  Join Facebook Group
                </a>
              )}
            </div>
          </div>
        )}
        
        <p className="text-xs opacity-60 text-center mt-8">
          Order ID: {sessionData.sessionId} (Mode: {environment.toUpperCase()})
        </p>
      </Card>
    </div>
  );
};

export default ProductUpdatesCommunityDisplay;
