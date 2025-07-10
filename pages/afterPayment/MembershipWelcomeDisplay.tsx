import React from 'react';
import { BaseAfterPaymentPageProps, MembershipWelcomeOnboardingAPData } from '../../types';
import Card from '../../components/common/Card';
import MembershipPassQR from '../../components/common/MembershipPassQR';

const MembershipWelcomeDisplay: React.FC<BaseAfterPaymentPageProps<MembershipWelcomeOnboardingAPData>> = ({ sessionData, templateData, theme }) => {
  const cardTitle = templateData.title || "Welcome! Let's get you started.";
  const accentColorClass = theme.buttonPrimaryClass.includes('sky') ? 'text-sky-500' : 
                         theme.buttonPrimaryClass.includes('cyan') ? 'text-cyan-500' :
                         theme.buttonPrimaryClass.includes('red') ? 'text-red-500' :
                         theme.buttonPrimaryClass.includes('lime') ? 'text-lime-400' :
                         'text-blue-600';

  return (
    <div className={`min-h-screen ${theme.bgClass} ${theme.textClass} py-8 px-4 flex flex-col items-center`}>
      <Card className={`${theme.cardBgClass} p-6 sm:p-8 shadow-2xl max-w-lg w-full`}>
        <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mb-5 sm:mb-6 mx-auto ${theme.buttonPrimaryClass.replace('text-white','bg-opacity-20')} ${accentColorClass.replace('text-','bg-')} bg-opacity-20`}>
          <i className={`material-icons-round !text-4xl ${accentColorClass}`}>checklist</i>
        </div>
        <h1 className={`text-2xl sm:text-3xl font-bold mb-2 text-center`}>{cardTitle}</h1>
        <p className="text-center opacity-90 mb-6 whitespace-pre-line">{templateData.mainMessage}</p>

        <h2 className={`text-xl font-semibold mb-4 text-center ${accentColorClass}`}>{templateData.welcomeHeadline}</h2>
        
        {templateData.onboardingSteps && templateData.onboardingSteps.length > 0 && (
          <div className="space-y-3">
            {templateData.onboardingSteps.map((step, index) => (
              <div key={index} className="flex items-center p-3 rounded-md bg-white/50 border border-slate-200/50">
                <i className={`material-icons-round mr-3 ${step.isComplete ? 'text-green-500' : 'text-slate-400'}`}>
                  {step.isComplete ? 'check_circle' : 'radio_button_unchecked'}
                </i>
                <span className={`flex-grow ${step.isComplete ? 'line-through text-slate-500' : 'text-slate-700'}`}>{step.text}</span>
              </div>
            ))}
          </div>
        )}
        
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

export default MembershipWelcomeDisplay;