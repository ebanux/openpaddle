import React from 'react';
import { BaseAfterPaymentPageProps, MembershipPassQRAPData, MembershipAccessPageLinkConfig } from '../../types';
import Card from '../../components/common/Card';
import { QRCodeCanvas } from 'qrcode.react';
import AuthenticityBadge from '../../components/common/AuthenticityBadge';

const MembershipPassQRDisplay: React.FC<BaseAfterPaymentPageProps<MembershipPassQRAPData>> = ({ sessionData, templateData, theme, environment }) => {
  const cardTitle = templateData.title || "Membership Pass";
  const pageConfig = sessionData.pageConfig as MembershipAccessPageLinkConfig;

  const memberName = (sessionData.submittedCustomFields as any)?.member_name || 'Valued Member';
  const membershipLevel = sessionData.paymentDetails.items[0]?.name || 'Member';
  
  const accentColorClass = theme.buttonPrimaryClass.includes('sky') ? 'text-sky-500' : 
                         theme.buttonPrimaryClass.includes('cyan') ? 'text-cyan-500' :
                         theme.buttonPrimaryClass.includes('red') ? 'text-red-500' :
                         theme.buttonPrimaryClass.includes('lime') ? 'text-lime-400' :
                         'text-blue-600';

  return (
    <div className={`min-h-screen ${theme.bgClass} ${theme.textClass} py-8 px-4 flex flex-col items-center`}>
      <Card className={`${theme.cardBgClass} p-6 sm:p-8 shadow-2xl max-w-lg w-full text-center`}>
        <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mb-5 sm:mb-6 mx-auto ${theme.buttonPrimaryClass.replace('text-white','bg-opacity-20')} ${accentColorClass.replace('text-','bg-')} bg-opacity-20`}>
            <i className={`material-icons-round !text-4xl ${accentColorClass}`}>badge</i>
        </div>
        <h1 className={`text-2xl sm:text-3xl font-bold mb-2`}>{cardTitle}</h1>
        <p className="opacity-90 mb-6 whitespace-pre-line">{templateData.mainMessage}</p>

        {pageConfig.accessControl?.showQRCode && (
            <div className="mb-6">
                <div className="flex items-center justify-center gap-x-3 mb-2">
                    <p className="font-semibold text-lg opacity-95">{templateData.qrCodeInfoText}</p>
                    <AuthenticityBadge status={sessionData.verificationStatus} />
                </div>
                <div className={`w-40 h-40 sm:w-48 sm:h-48 bg-white mx-auto my-4 p-2 flex items-center justify-center rounded-lg border-2 ${theme.inputBorderClass || 'border-slate-300'}`}>
                    <QRCodeCanvas value={sessionData.accessCode || sessionData.sessionId} size={170} />
                </div>
            </div>
        )}

        {templateData.showMembershipDetails && (
          <div className={`p-4 rounded-md mb-6 ${theme.inputBgClass || 'bg-slate-50'} border ${theme.inputBorderClass || 'border-slate-200'}`}>
            <div className="text-left space-y-2">
                <div>
                    <p className="text-xs opacity-70">Member Name</p>
                    <p className="font-semibold">{memberName}</p>
                </div>
                 <div>
                    <p className="text-xs opacity-70">Membership Level</p>
                    <p className="font-semibold">{membershipLevel}</p>
                </div>
                 <div>
                    <p className="text-xs opacity-70">Member Since</p>
                    <p className="font-semibold">{new Date(sessionData.paymentDetails.paymentTimestamp).toLocaleDateString()}</p>
                </div>
            </div>
          </div>
        )}

        {templateData.additionalInstructions && (
          <div className="text-sm opacity-80 mb-6">
            <h4 className="font-semibold">Important Information:</h4>
            <p className="whitespace-pre-line">{templateData.additionalInstructions}</p>
          </div>
        )}
        
        <p className="text-xs opacity-60 text-center mt-6">
          Membership ID (Simulated): {sessionData.sessionId}
        </p>
      </Card>
    </div>
  );
};

export default MembershipPassQRDisplay;
