
import React from 'react';
import { BaseAfterPaymentPageProps, DonationSocialFollowAPData } from '../../types';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

const DonationSocialFollowDisplay: React.FC<BaseAfterPaymentPageProps<DonationSocialFollowAPData>> = ({ sessionData, templateData, theme }) => {
  const cardTitle = templateData.title || "Thank You!";
  const accentColorClass = theme.buttonPrimaryClass.includes('sky') ? 'text-sky-500' : 'text-blue-600';

  return (
    <div className={`min-h-screen ${theme.bgClass} ${theme.textClass} py-8 px-4 flex flex-col items-center justify-center`}>
      <Card className={`${theme.cardBgClass} p-6 sm:p-8 shadow-2xl max-w-md w-full text-center`}>
        <h1 className={`text-2xl sm:text-3xl font-bold mb-2`}>{cardTitle}</h1>
        <p className="opacity-90 mb-6 whitespace-pre-line">{templateData.mainMessage}</p>
        <div className="mt-4 pt-4 border-t border-dashed border-slate-300">
          <h2 className={`text-xl font-semibold mb-2 ${accentColorClass}`}>{templateData.followHeadline}</h2>
          <p className="text-sm opacity-80 mb-4">{templateData.followMessage}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {(templateData.socialMediaLinks || []).map((social, index) => (
              <a key={index} href={social.link} target="_blank" rel="noopener noreferrer" className={`flex-1 ${theme.buttonSecondaryClass} py-2 px-4 rounded-md text-center`}>
                Follow on {social.platform}
              </a>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};
export default DonationSocialFollowDisplay;
