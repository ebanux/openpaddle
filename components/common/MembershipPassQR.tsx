import React from 'react';
import { PageSessionData, ThemeDefinition, MembershipAccessPageLinkConfig } from '../../types';
import { QRCodeCanvas } from 'qrcode.react';
import AuthenticityBadge from './AuthenticityBadge';

interface MembershipPassQRProps {
    sessionData: PageSessionData;
    theme: ThemeDefinition;
}

const MembershipPassQR: React.FC<MembershipPassQRProps> = ({ sessionData, theme }) => {
    const pageConfig = sessionData.pageConfig as MembershipAccessPageLinkConfig;
    const memberName = (sessionData.submittedCustomFields as any)?.member_name || 'Valued Member';
    const membershipLevel = sessionData.paymentDetails.items[0]?.name || 'Member';

    return (
        <div className={`mt-6 pt-6 border-t ${theme.inputBorderClass || 'border-slate-300'} border-dashed`}>
            <div className="flex items-center justify-center gap-x-3 mb-2">
                <p className="font-semibold text-lg opacity-95">Your Membership Pass</p>
                <AuthenticityBadge status={sessionData.verificationStatus} />
            </div>
            <div className={`w-40 h-40 sm:w-48 sm:h-48 bg-white mx-auto my-4 p-2 flex items-center justify-center rounded-lg border-2 ${theme.inputBorderClass || 'border-slate-300'}`}>
                <QRCodeCanvas value={sessionData.sessionId} size={170} />
            </div>
             <div className={`p-4 rounded-md mb-2 text-sm ${theme.inputBgClass || 'bg-slate-50'}`}>
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
        </div>
    );
};

export default MembershipPassQR;