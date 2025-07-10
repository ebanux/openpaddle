
import React from 'react';
import { BaseAfterPaymentPageProps, FundraisingImpactReportAPData } from '../../types';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

const FundraisingImpactReportDisplay: React.FC<BaseAfterPaymentPageProps<FundraisingImpactReportAPData>> = ({ sessionData, templateData, theme, environment }) => {
  const cardTitle = templateData.title || "Your Impact";

  const accentColorClass = theme.buttonPrimaryClass.includes('sky') ? 'text-sky-500' : 
                         theme.buttonPrimaryClass.includes('cyan') ? 'text-cyan-500' :
                         theme.buttonPrimaryClass.includes('red') ? 'text-red-500' :
                         theme.buttonPrimaryClass.includes('lime') ? 'text-lime-400' :
                         'text-blue-600';
  
  const progressBgClass = theme.buttonPrimaryClass.replace('hover:', '').split(' ').find(c => c.startsWith('bg-')) || 'bg-blue-600';

  return (
    <div className={`min-h-screen ${theme.bgClass} ${theme.textClass} py-8 px-4 flex flex-col items-center`}>
      <Card className={`${theme.cardBgClass} p-6 sm:p-8 shadow-2xl max-w-lg w-full text-center`}>
         <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mb-5 sm:mb-6 mx-auto ${theme.buttonPrimaryClass.replace('text-white','bg-opacity-20').replace('text-slate-900','bg-opacity-20').replace('text-green-900','bg-opacity-20')} ${accentColorClass.replace('text-','bg-')} bg-opacity-20`}>
            <i className={`material-icons-round !text-4xl ${accentColorClass}`}>insights</i>
        </div>
        <h1 className={`text-2xl sm:text-3xl font-bold mb-2`}>{cardTitle}</h1>
        <p className="opacity-90 mb-6 whitespace-pre-line">{templateData.mainMessage}</p>

        <h2 className={`text-xl font-semibold mb-4 ${accentColorClass}`}>{templateData.reportHeadline}</h2>

        {templateData.impactStats && templateData.impactStats.length > 0 && (
          <div className="grid grid-cols-2 gap-4 mb-6">
            {templateData.impactStats.map((stat, index) => (
              <div key={index} className={`p-3 rounded-lg ${theme.inputBgClass || 'bg-slate-50'} border ${theme.inputBorderClass || 'border-slate-200'}`}>
                <p className={`text-2xl font-bold ${accentColorClass}`}>{stat.value}</p>
                <p className="text-xs opacity-80">{stat.label}</p>
              </div>
            ))}
          </div>
        )}

        {templateData.progressPercentage !== undefined && (
          <div className="mb-6">
            <h3 className="text-sm font-semibold opacity-90 mb-2">{templateData.nextGoalMessage || 'Our Progress:'}</h3>
            <div className={`w-full ${theme.inputBgClass || 'bg-slate-200'} rounded-full h-4 shadow-inner overflow-hidden`}>
              <div className={`${progressBgClass} h-4 rounded-full`} style={{ width: `${templateData.progressPercentage}%` }}></div>
            </div>
          </div>
        )}

        <p className="text-xs opacity-60 text-center mt-8">
          Transaction ID (Simulated): {sessionData.sessionId} (Mode: {environment.toUpperCase()})
        </p>
      </Card>
    </div>
  );
};

export default FundraisingImpactReportDisplay;
