import React from 'react';
import { BaseAfterPaymentPageProps, MembershipContentTeaserAPData } from '../../types';
import Card from '../../components/common/Card';
import MembershipPassQR from '../../components/common/MembershipPassQR';

const MembershipContentTeaserDisplay: React.FC<BaseAfterPaymentPageProps<MembershipContentTeaserAPData>> = ({ sessionData, templateData, theme }) => {
  const cardTitle = templateData.title || "You're In!";
  
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

        <div className="mt-4 pt-4 border-t border-dashed border-slate-300">
          <h2 className={`text-xl font-semibold mb-4 text-center ${accentColorClass}`}>{templateData.teaserHeadline}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {(templateData.teaserItems || []).map((item, index) => (
              <div key={index} className="block group">
                <Card className={`${theme.inputBgClass || 'bg-slate-50'} overflow-hidden h-full flex flex-col`}>
                  <img src={item.imageUrl} alt={item.title} className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-105" />
                  <div className="p-3">
                    <h4 className="font-semibold text-sm text-slate-800">{item.title}</h4>
                    {item.description && <p className="text-xs text-slate-600 mt-1">{item.description}</p>}
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
        
        {templateData.showPassQRCode && (
            <MembershipPassQR sessionData={sessionData} theme={theme} />
        )}

        <p className="text-xs opacity-60 text-center mt-8">
          Membership ID: {sessionData.sessionId}
        </p>
      </Card>
    </div>
  );
};

export default MembershipContentTeaserDisplay;