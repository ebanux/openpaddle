
import React from 'react';
import { BaseAfterPaymentPageProps, DonationExploreContentAPData } from '../../types';
import Card from '../../components/common/Card';

const DonationExploreContentDisplay: React.FC<BaseAfterPaymentPageProps<DonationExploreContentAPData>> = ({ sessionData, templateData, theme }) => {
  const cardTitle = templateData.title || "Thank You for Your Support";
  const accentColorClass = theme.buttonPrimaryClass.includes('sky') ? 'text-sky-500' : 'text-blue-600';

  return (
    <div className={`min-h-screen ${theme.bgClass} ${theme.textClass} py-8 px-4 flex flex-col items-center justify-center`}>
      <Card className={`${theme.cardBgClass} p-6 sm:p-8 shadow-2xl max-w-lg w-full text-center`}>
        <h1 className={`text-2xl sm:text-3xl font-bold mb-2`}>{cardTitle}</h1>
        <p className="opacity-90 mb-6 whitespace-pre-line">{templateData.mainMessage}</p>
        <div className="mt-4 pt-4 border-t border-dashed border-slate-300">
          <h2 className={`text-xl font-semibold mb-3 ${accentColorClass}`}>{templateData.exploreHeadline}</h2>
          <div className="space-y-3">
            {(templateData.contentLinks || []).map((item, index) => (
              <a key={index} href={item.link} target="_blank" rel="noopener noreferrer" className={`block p-3 rounded-md text-sm ${theme.buttonSecondaryClass} hover:opacity-90 transition-opacity`}>
                <span className="font-semibold">{item.title}</span>
              </a>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};
export default DonationExploreContentDisplay;
