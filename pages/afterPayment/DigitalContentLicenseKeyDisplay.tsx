import React, { useState } from 'react';
import { BaseAfterPaymentPageProps, DigitalContentLicenseKeyAPData } from '../../types';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

const DigitalContentLicenseKeyDisplay: React.FC<BaseAfterPaymentPageProps<DigitalContentLicenseKeyAPData>> = ({ sessionData, templateData, theme, environment }) => {
  const [copied, setCopied] = useState(false);
  const cardTitle = templateData.title || "Your License Key";
  
  const accentColorClass = theme.buttonPrimaryClass.includes('sky') ? 'text-sky-500' : 
                         theme.buttonPrimaryClass.includes('cyan') ? 'text-cyan-500' :
                         theme.buttonPrimaryClass.includes('red') ? 'text-red-500' :
                         theme.buttonPrimaryClass.includes('lime') ? 'text-lime-400' :
                         'text-blue-600';
  
  const handleCopy = () => {
    navigator.clipboard.writeText(templateData.licenseKey).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className={`min-h-screen ${theme.bgClass} ${theme.textClass} py-8 px-4 flex flex-col items-center`}>
      <Card className={`${theme.cardBgClass} p-6 sm:p-8 shadow-2xl max-w-lg w-full`}>
        <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mb-5 sm:mb-6 mx-auto ${theme.buttonPrimaryClass.replace('text-white','bg-opacity-20')} ${accentColorClass.replace('text-','bg-')} bg-opacity-20`}>
            <i className={`material-icons-round !text-4xl ${accentColorClass}`}>vpn_key</i>
        </div>
        <h1 className={`text-2xl sm:text-3xl font-bold mb-2 text-center`}>{cardTitle}</h1>
        <p className="text-center opacity-90 mb-6 whitespace-pre-line">{templateData.mainMessage}</p>

        <h2 className={`text-xl font-semibold mb-3 text-center ${accentColorClass}`}>{templateData.licenseKeyHeadline}</h2>

        <div className={`p-4 rounded-md mb-6 ${theme.inputBgClass || 'bg-slate-50'} border-2 border-dashed ${theme.inputBorderClass || 'border-slate-300'}`}>
          <div className="flex items-center justify-between">
            <p className="font-mono font-bold text-lg tracking-wider text-slate-800">{templateData.licenseKey}</p>
            <Button onClick={handleCopy} size="sm" className={theme.buttonSecondaryClass}>
              {copied ? 'Copied!' : 'Copy'}
            </Button>
          </div>
        </div>
        
        <div className="text-sm opacity-80 mb-6">
          <h4 className="font-semibold mb-1">Activation Instructions:</h4>
          <div className="whitespace-pre-line bg-white/50 p-3 rounded-md border text-xs">{templateData.activationInstructions}</div>
        </div>
        
        <p className="text-xs opacity-60 text-center mt-8">
          Order ID (Simulated): {sessionData.sessionId}
        </p>
      </Card>
    </div>
  );
};

export default DigitalContentLicenseKeyDisplay;
