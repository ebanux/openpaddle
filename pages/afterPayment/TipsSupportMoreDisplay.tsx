import React from 'react';
import { BaseAfterPaymentPageProps, TipsSupportMoreAPData } from '../../types';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

const TipsSupportMoreDisplay: React.FC<BaseAfterPaymentPageProps<TipsSupportMoreAPData>> = ({ sessionData, templateData, theme, environment }) => {
  const cardTitle = templateData.title || "Support Further";
  
  const accentColorClass = theme.buttonPrimaryClass.includes('sky') ? 'text-sky-500' : 
                         theme.buttonPrimaryClass.includes('cyan') ? 'text-cyan-500' :
                         theme.buttonPrimaryClass.includes('red') ? 'text-red-500' :
                         theme.buttonPrimaryClass.includes('lime') ? 'text-lime-400' :
                         'text-blue-600';
  
  // Basic SVG icons - replace with better ones if available
  const socialIcons: {[key:string]: string} = {
    Facebook: `<svg viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path></svg>`,
    Instagram: `<svg viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.267.058 2.148.277 2.917.578.78.304 1.464.717 2.126 1.378.662.662 1.075 1.348 1.378 2.126.301.77.52 1.65.578 2.917.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.058 1.267-.277 2.148-.578 2.917-.303.78-.716 1.464-1.378 2.126-.662.662-1.348 1.075-2.126 1.378-.77.301-1.65.52-2.917.578-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.267-.058-2.148-.277-2.917-.578-.78-.303-1.464-.716-2.126-1.378C2.931 19.143 2.518 18.458 2.215 17.68c-.301-.77-.52-1.65-.578-2.917-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.058-1.267.277 2.148.578 2.917.304-.78.717-1.464 1.378-2.126.662-.662 1.348-1.075 2.126-1.378.77-.301 1.65-.52 2.917-.578C8.416 2.175 8.796 2.163 12 2.163zm0 1.802c-3.116 0-3.476.011-4.695.068-1.14.053-1.846.248-2.438.476-.642.254-1.109.56-1.593 1.045-.484.484-.791.951-1.045 1.593-.228.592-.423 1.298-.476 2.438C2.175 8.524 2.163 8.884 2.163 12s.011 3.476.068 4.695c.053 1.14.248 1.846.476 2.438.254.642.56 1.109 1.045 1.593.484.484.951.791 1.593 1.045.592.228 1.298.423 2.438.476 1.219.057 1.579.068 4.695.068s3.476-.011 4.695-.068c1.14-.053 1.846-.248 2.438-.476.642-.254 1.109-.56 1.593-1.045.484-.484.791-.951-1.045-1.593.228-.592-.423-1.298-.476-2.438.057-1.219.068-1.579.068-4.695s-.011-3.476-.068-4.695c-.053-1.14-.248-1.846-.476-2.438-.254-.642-.56-1.109-1.045-1.593-.484-.484-.951-.791-1.045-1.593-.228-.592-.423-1.298-.476-2.438C15.476 3.976 15.116 3.965 12 3.965zm0 2.972c-2.761 0-5 2.239-5 5s2.239 5 5 5 5-2.239 5-5-2.239-5-5-5zm0 8.139c-1.685 0-3.056-1.37-3.056-3.056S10.315 8.944 12 8.944s3.056 1.37 3.056 3.056S13.685 15.056 12 15.056zm5.225-8.204a1.2 1.2 0 1 1 0-2.4 1.2 1.2 0 0 1 0 2.4z"></path></svg>`,
    Twitter: `<svg viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5"><path d="M22.46 6c-.77.35-1.6.58-2.46.67.9-.53 1.59-1.37 1.92-2.38-.84.5-1.78.86-2.79 1.07A4.477 4.477 0 0 0 16.34 4c-2.38 0-4.31 1.93-4.31 4.31 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79A4.27 4.27 0 0 0 3.64 6.9c-.75-.02-1.45-.23-2.05-.57v.05c0 1.47 1.05 2.7 2.44 2.98-.25.07-.52.1-.8.1-.19 0-.38-.02-.56-.05.39 1.2 1.5 2.08 2.82 2.1A4.322 4.322 0 0 1 .5 13.56a6.012 6.012 0 0 0 3.25 1.04c3.9 0 6.03-3.24 6.03-6.04 0-.09 0-.18-.01-.27.41-.3.77-.68 1.06-1.1z"></path></svg>`,
  };

  return (
    <div className={`min-h-screen ${theme.bgClass} ${theme.textClass} py-8 px-4 flex flex-col items-center`}>
      <Card className={`${theme.cardBgClass} p-6 sm:p-8 shadow-2xl max-w-lg w-full`}>
        <h1 className={`text-2xl sm:text-3xl font-bold mb-4 text-center ${accentColorClass}`}>{cardTitle}</h1>
        <p className="text-center opacity-90 mb-6 whitespace-pre-line">{templateData.mainMessage}</p>

        {templateData.supportMoreHeadline && (
            <h2 className={`text-xl font-semibold mb-3 text-center ${accentColorClass}`}>{templateData.supportMoreHeadline}</h2>
        )}
        {templateData.supportMoreMessage && (
            <p className="text-sm opacity-80 text-center mb-6">{templateData.supportMoreMessage}</p>
        )}

        {templateData.otherWaysToSupport && templateData.otherWaysToSupport.length > 0 && (
          <div className="mb-6 space-y-3">
            <h3 className="font-medium opacity-90 text-center mb-2">Other Ways to Support:</h3>
            {templateData.otherWaysToSupport.map((item, index) => (
              <a key={index} href={item.link} target="_blank" rel="noopener noreferrer" className={`block p-3 rounded-md text-sm ${theme.buttonSecondaryClass} hover:opacity-90 transition-opacity`}>
                <span className="font-semibold">{item.title}</span>
                {item.description && <span className="text-xs block opacity-70 mt-0.5">{item.description}</span>}
              </a>
            ))}
          </div>
        )}

        {templateData.socialMediaLinks && templateData.socialMediaLinks.length > 0 && (
            <div className="my-6 pt-4 border-t border-dashed">
                <h3 className="font-medium opacity-90 text-center mb-3">Connect With Us:</h3>
                <div className="flex justify-center space-x-3">
                    {templateData.socialMediaLinks.map((social, index) => (
                        <a key={index} href={social.link} target="_blank" rel="noopener noreferrer" title={social.platform}
                           className={`p-2 rounded-full ${theme.buttonSecondaryClass} hover:opacity-80 transition-opacity`}>
                           {social.iconSvg ? (
                               <span dangerouslySetInnerHTML={{ __html: social.iconSvg }} />
                           ) : socialIcons[social.platform] ? (
                               <span dangerouslySetInnerHTML={{ __html: socialIcons[social.platform] }} />
                           ) : (
                               social.platform.substring(0,1)
                           )}
                        </a>
                    ))}
                </div>
            </div>
        )}
        
        <p className="text-xs opacity-60 text-center mt-6">
          Session ID: {sessionData.sessionId} (Mode: {environment.toUpperCase()})
        </p>
      </Card>
    </div>
  );
};

export default TipsSupportMoreDisplay;
