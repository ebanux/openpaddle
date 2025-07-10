
import React from 'react';
import { BaseAfterPaymentPageProps, ProductThankYouUpsellAPData } from '../../types';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button'; // Assuming Button component

const ProductThankYouUpsellDisplay: React.FC<BaseAfterPaymentPageProps<ProductThankYouUpsellAPData>> = ({ sessionData, templateData, theme, environment }) => {
  const cardTitle = templateData.title || "Thank You!";
  
  const accentColorClass = theme.buttonPrimaryClass.includes('sky') ? 'text-sky-500' : 
                         theme.buttonPrimaryClass.includes('cyan') ? 'text-cyan-500' :
                         theme.buttonPrimaryClass.includes('red') ? 'text-red-500' :
                         theme.buttonPrimaryClass.includes('lime') ? 'text-lime-400' :
                         'text-blue-600';

  return (
    <div className={`min-h-screen ${theme.bgClass} ${theme.textClass} py-8 px-4 flex flex-col items-center`}>
      <Card className={`${theme.cardBgClass} p-6 sm:p-8 shadow-2xl max-w-lg w-full`}>
         <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mb-5 sm:mb-6 mx-auto ${theme.buttonPrimaryClass.replace('text-white','bg-opacity-20').replace('text-slate-900','bg-opacity-20').replace('text-green-900','bg-opacity-20')} ${accentColorClass.replace('text-','bg-') } bg-opacity-20`}>
             <i className={`material-icons-round !text-4xl ${accentColorClass}`}>auto_awesome</i>
        </div>
        <h1 className={`text-2xl sm:text-3xl font-bold mb-2 text-center`}>{cardTitle}</h1>
        <p className="text-center opacity-90 mb-6 whitespace-pre-line">{templateData.mainMessage}</p>
        
        <h2 className={`text-xl font-semibold mb-4 text-center ${accentColorClass}`}>{templateData.thankYouHeadline}</h2>

        {templateData.reviewPromptText && (
          <p className="text-sm opacity-80 italic text-center mb-6">{templateData.reviewPromptText}</p>
        )}

        {templateData.upsellItems && templateData.upsellItems.length > 0 && (
          <div className="mt-8 pt-6 border-t border-dashed border-slate-300">
            <h3 className={`text-lg font-semibold mb-4 ${accentColorClass}`}>{templateData.upsellSectionTitle || "You Might Also Like:"}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {templateData.upsellItems.map((item, index) => (
                <Card key={index} className={`${theme.inputBgClass || 'bg-slate-50'} p-3 border ${theme.inputBorderClass || 'border-slate-200'} shadow-sm flex flex-col`}>
                  <img src={item.imageUrl || 'https://picsum.photos/seed/upsell'+index+'/300/200'} alt={item.name} className="w-full h-32 object-cover rounded-md mb-2"/>
                  <h4 className="font-medium text-sm opacity-95">{item.name}</h4>
                  <p className="text-xs opacity-70 mb-1 flex-grow">{item.description}</p>
                  <div className="flex justify-between items-center mt-2">
                    <p className={`text-sm font-semibold ${accentColorClass}`}>{item.price}</p>
                    <a href={item.link} target="_blank" rel="noopener noreferrer" className={`px-3 py-1 text-xs rounded ${theme.buttonSecondaryClass}`}>
                      View Item
                    </a>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
        
        <p className="text-xs opacity-60 text-center mt-8">
          Order ID (Simulated): {sessionData.sessionId} (Mode: {environment.toUpperCase()})
        </p>
      </Card>
    </div>
  );
};

export default ProductThankYouUpsellDisplay;