
import React from 'react';
import { BaseAfterPaymentPageProps, AppointmentBookingUpsellAPData } from '../../types';
import Card from '../../components/common/Card';

const AppointmentBookingUpsellDisplay: React.FC<BaseAfterPaymentPageProps<AppointmentBookingUpsellAPData>> = ({ sessionData, templateData, theme, environment }) => {
  const cardTitle = templateData.title || "Thank You!";
  
  const accentColorClass = theme.buttonPrimaryClass.includes('sky') ? 'text-sky-500' : 'text-blue-600';

  return (
    <div className={`min-h-screen ${theme.bgClass} ${theme.textClass} py-8 px-4 flex flex-col items-center`}>
      <Card className={`${theme.cardBgClass} p-6 sm:p-8 shadow-2xl max-w-lg w-full`}>
        <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mb-5 sm:mb-6 mx-auto ${theme.buttonPrimaryClass.replace('text-white','bg-opacity-20')} ${accentColorClass.replace('text-','bg-')} bg-opacity-20`}>
             <i className={`material-icons-round !text-4xl ${accentColorClass}`}>auto_awesome</i>
        </div>
        <h1 className={`text-2xl sm:text-3xl font-bold mb-2 text-center`}>{cardTitle}</h1>
        <p className="text-center opacity-90 mb-6 whitespace-pre-line">{templateData.mainMessage}</p>
        
        <div className="mt-8 pt-6 border-t border-dashed border-slate-300">
          <h2 className={`text-xl font-semibold mb-2 text-center ${accentColorClass}`}>{templateData.upsellHeadline}</h2>
          {templateData.upsellDescription && <p className="text-sm text-center opacity-80 mb-4">{templateData.upsellDescription}</p>}
          
          <div className="space-y-4">
            {(templateData.upsellItems || []).map((item, index) => (
              <a href={item.link || '#'} target="_blank" rel="noopener noreferrer" key={index} className="block group">
                <Card className={`${theme.inputBgClass || 'bg-slate-50'} p-3 border ${theme.inputBorderClass || 'border-slate-200'} shadow-sm hover:shadow-md transition-shadow`}>
                    <div className="flex justify-between items-center">
                        <div>
                            <h4 className="font-semibold text-slate-800 group-hover:text-blue-600">{item.name}</h4>
                            <p className="text-xs opacity-70">{item.description}</p>
                        </div>
                        <p className={`text-md font-semibold ${accentColorClass} ml-2 flex-shrink-0`}>{item.price}</p>
                    </div>
                </Card>
              </a>
            ))}
          </div>
        </div>
        
        <p className="text-xs opacity-60 text-center mt-8">
          Booking ID: {sessionData.sessionId}
        </p>
      </Card>
    </div>
  );
};

export default AppointmentBookingUpsellDisplay;
