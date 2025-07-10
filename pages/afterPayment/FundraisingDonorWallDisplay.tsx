
import React from 'react';
import { BaseAfterPaymentPageProps, FundraisingDonorWallAPData } from '../../types';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

// Mock data for display purposes
const mockDonors = [
  { name: 'Alice W.', amount: 100, level: 'Gold' },
  { name: 'Bob J.', amount: 50, level: 'Silver' },
  { name: 'Charlie D.', amount: 25, level: 'Bronze' },
  { name: 'Anonymous', amount: 20, level: 'Bronze' },
  { name: 'Eve M.', amount: 10, level: 'Bronze' },
];

const FundraisingDonorWallDisplay: React.FC<BaseAfterPaymentPageProps<FundraisingDonorWallAPData>> = ({ sessionData, templateData, theme, environment }) => {
  const cardTitle = templateData.title || "Our Supporters";
  
  const accentColorClass = theme.buttonPrimaryClass.includes('sky') ? 'text-sky-500' : 
                         theme.buttonPrimaryClass.includes('cyan') ? 'text-cyan-500' :
                         theme.buttonPrimaryClass.includes('red') ? 'text-red-500' :
                         theme.buttonPrimaryClass.includes('lime') ? 'text-lime-400' :
                         'text-blue-600';
  
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Gold': return 'bg-amber-400 text-amber-900';
      case 'Silver': return 'bg-slate-300 text-slate-800';
      case 'Bronze': return 'bg-orange-300 text-orange-900';
      default: return 'bg-slate-200 text-slate-700';
    }
  };


  return (
    <div className={`min-h-screen ${theme.bgClass} ${theme.textClass} py-8 px-4 flex flex-col items-center`}>
      <Card className={`${theme.cardBgClass} p-6 sm:p-8 shadow-2xl max-w-lg w-full`}>
        <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mb-5 sm:mb-6 mx-auto ${theme.buttonPrimaryClass.replace('text-white','bg-opacity-20').replace('text-slate-900','bg-opacity-20').replace('text-green-900','bg-opacity-20')} ${accentColorClass.replace('text-','bg-')} bg-opacity-20`}>
            <i className={`material-icons-round !text-4xl ${accentColorClass}`}>groups</i>
        </div>
        <h1 className={`text-2xl sm:text-3xl font-bold mb-2 text-center`}>{cardTitle}</h1>
        <p className="text-center opacity-90 mb-6 whitespace-pre-line">{templateData.mainMessage}</p>

        <h2 className={`text-xl font-semibold mb-3 text-center ${accentColorClass}`}>{templateData.donorWallHeadline}</h2>
        {templateData.donorWallMessage && (
            <p className="text-sm opacity-80 text-center mb-6">{templateData.donorWallMessage}</p>
        )}

        <div className={`p-4 rounded-lg ${theme.inputBgClass || 'bg-slate-50'} border ${theme.inputBorderClass || 'border-slate-200'} max-h-60 overflow-y-auto`}>
          <div className="space-y-2">
            {mockDonors.map((donor, index) => (
              <div key={index} className="flex justify-between items-center text-sm p-2 rounded-md bg-white/50">
                <span className="font-medium opacity-90">{templateData.anonymizeDonors ? 'Anonymous Donor' : donor.name}</span>
                {templateData.displayLevels && (
                  <span className={`px-2 py-0.5 text-xs font-semibold rounded ${getLevelColor(donor.level)}`}>
                    {donor.level}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
        
        <p className="text-xs opacity-60 text-center mt-8">
          Transaction ID (Simulated): {sessionData.sessionId} (Mode: {environment.toUpperCase()})
        </p>
      </Card>
    </div>
  );
};

export default FundraisingDonorWallDisplay;
