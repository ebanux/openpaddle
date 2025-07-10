
import React from 'react';
import { BaseAfterPaymentPageProps, DigitalContentAccessDownloadAPData } from '../../types';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button'; // Assuming Button component

const DigitalContentAccessDownloadDisplay: React.FC<BaseAfterPaymentPageProps<DigitalContentAccessDownloadAPData>> = ({ sessionData, templateData, theme, environment }) => {
  const cardTitle = templateData.title || "Your Content is Ready";
  
  const accentColorClass = theme.buttonPrimaryClass.includes('sky') ? 'text-sky-500' : 
                         theme.buttonPrimaryClass.includes('cyan') ? 'text-cyan-500' :
                         theme.buttonPrimaryClass.includes('red') ? 'text-red-500' :
                         theme.buttonPrimaryClass.includes('lime') ? 'text-lime-400' :
                         'text-blue-600';

  return (
    <div className={`min-h-screen ${theme.bgClass} ${theme.textClass} py-8 px-4 flex flex-col items-center`}>
      <Card className={`${theme.cardBgClass} p-6 sm:p-8 shadow-2xl max-w-lg w-full`}>
        <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mb-5 sm:mb-6 mx-auto ${theme.buttonPrimaryClass.replace('text-white','bg-opacity-20').replace('text-slate-900','bg-opacity-20').replace('text-green-900','bg-opacity-20')} ${accentColorClass.replace('text-','bg-')} bg-opacity-20`}>
            <i className={`material-icons-round !text-4xl ${accentColorClass}`}>download</i>
        </div>
        <h1 className={`text-2xl sm:text-3xl font-bold mb-2 text-center`}>{cardTitle}</h1>
        <p className="text-center opacity-90 mb-6 whitespace-pre-line">{templateData.mainMessage}</p>

        {templateData.downloadItems && templateData.downloadItems.length > 0 && (
          <div className="mb-6">
            <h2 className={`text-xl font-semibold mb-3 ${accentColorClass}`}>{templateData.downloadSectionTitle}</h2>
            <div className="space-y-3">
              {templateData.downloadItems.map((item, index) => (
                <Card key={index} className={`${theme.inputBgClass || 'bg-slate-50'} p-4 border ${theme.inputBorderClass || 'border-slate-200'} shadow-sm`}>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium opacity-95">{item.fileName}</p>
                      <p className="text-xs opacity-70">
                        {item.fileType && `${item.fileType}`}
                        {item.fileSize && `${item.fileType ? ' - ' : ''}${item.fileSize}`}
                      </p>
                    </div>
                    <a 
                      href={item.downloadLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={`px-4 py-2 text-sm rounded-md ${theme.buttonPrimaryClass}`}
                      download // Suggests browser to download
                    >
                      Download
                    </a>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {templateData.postDownloadInstructions && (
          <div className={`mt-6 p-4 rounded-md ${theme.inputBgClass || 'bg-slate-100'} border ${theme.inputBorderClass || 'border-slate-200'}`}>
            <h3 className="font-semibold opacity-90 mb-1 text-sm">Next Steps:</h3>
            <p className="text-xs opacity-80 whitespace-pre-line">{templateData.postDownloadInstructions}</p>
          </div>
        )}
        
        <p className="text-xs opacity-60 text-center mt-8">
          Access ID (Simulated): {sessionData.sessionId} (Mode: {environment.toUpperCase()})
        </p>
      </Card>
    </div>
  );
};

export default DigitalContentAccessDownloadDisplay;