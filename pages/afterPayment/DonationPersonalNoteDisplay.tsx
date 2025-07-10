
import React from 'react';
import { BaseAfterPaymentPageProps, DonationPersonalNoteAPData } from '../../types';
import Card from '../../components/common/Card';

const DonationPersonalNoteDisplay: React.FC<BaseAfterPaymentPageProps<DonationPersonalNoteAPData>> = ({ sessionData, templateData, theme }) => {
  const cardTitle = templateData.title || "A Note For You";
  const accentColorClass = theme.buttonPrimaryClass.includes('sky') ? 'text-sky-500' : 'text-blue-600';

  return (
    <div className={`min-h-screen ${theme.bgClass} ${theme.textClass} py-8 px-4 flex flex-col items-center justify-center`}>
      <Card className={`${theme.cardBgClass} p-6 sm:p-8 shadow-2xl max-w-md w-full text-center`}>
        {templateData.imageUrl && (
          <img src={templateData.imageUrl} alt="Creator" className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-white shadow-lg" />
        )}
        <h1 className={`text-2xl sm:text-3xl font-bold mb-2`}>{cardTitle}</h1>
        <p className="opacity-90 mb-4 whitespace-pre-line">{templateData.mainMessage}</p>
        <div className={`p-4 rounded-lg my-4 ${theme.inputBgClass || 'bg-slate-50'}`}>
          <p className="text-md italic opacity-90">"{templateData.personalMessage}"</p>
        </div>
      </Card>
    </div>
  );
};
export default DonationPersonalNoteDisplay;
