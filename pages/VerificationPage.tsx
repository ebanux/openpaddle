
import React from 'react';
import { PageSessionData, ThemeDefinition, MonetizationUseCase, EventTicketSalesPageLinkConfig } from '../types';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import AuthenticityBadge from '../components/common/AuthenticityBadge';
import { useTranslation } from '../i18n/I18nContext';

interface VerificationPageProps {
  sessionToVerify: PageSessionData;
  theme: ThemeDefinition;
}

const InfoRow: React.FC<{ label: string; value: React.ReactNode; isMono?: boolean }> = ({ label, value, isMono = false }) => (
  <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-slate-200/50">
    <span className="font-medium opacity-80 text-sm">{label}</span>
    <span className={`font-semibold text-sm text-right break-all ${isMono ? 'font-mono' : ''}`}>{value}</span>
  </div>
);

const VerificationPage: React.FC<VerificationPageProps> = ({ sessionToVerify, theme }) => {
  const { t } = useTranslation();
  const { pageConfig, paymentDetails, verificationStatus, authenticityHash, merkleProof, merkleRoot, accessCode } = sessionToVerify;

  const getIssuerName = () => {
    if ((pageConfig as any).organizerName) return (pageConfig as any).organizerName;
    if ((pageConfig as any).yourNameOrBusinessName) return (pageConfig as any).yourNameOrBusinessName;
    if ((pageConfig as any).creatorName) return (pageConfig as any).creatorName;
    return 'MonetizePro Issuer';
  };

  const accentColorClass = theme.buttonPrimaryClass.includes('sky') ? 'text-sky-500' :
                         theme.buttonPrimaryClass.includes('cyan') ? 'text-cyan-500' :
                         theme.buttonPrimaryClass.includes('red') ? 'text-red-500' :
                         theme.buttonPrimaryClass.includes('lime') ? 'text-lime-400' :
                         'text-blue-600';

  return (
    <div className={`min-h-screen ${theme.bgClass} ${theme.textClass} py-8 px-4 flex flex-col items-center`}>
      <Card className={`${theme.cardBgClass} p-6 sm:p-8 shadow-2xl max-w-2xl w-full`}>
        <div className="text-center mb-6">
          <div className={`inline-block p-3 rounded-full mb-4 ${theme.buttonPrimaryClass.replace('text-white','bg-opacity-20').replace('text-slate-900','bg-opacity-20').replace('text-green-900','bg-opacity-20')} ${accentColorClass.replace('text-','bg-')} bg-opacity-20`}>
             <i className={`material-icons-round !text-4xl ${accentColorClass}`}>shield</i>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">{t('verificationPage.title')}</h1>
          <p className="opacity-80">{t('verificationPage.prompt')} <span className="font-bold font-mono">{accessCode}</span></p>
        </div>

        <div className={`p-4 rounded-lg mb-6 ${theme.inputBgClass || 'bg-slate-50'} border ${theme.inputBorderClass || 'border-slate-200'}`}>
          <InfoRow label={t('verificationPage.itemName')} value={paymentDetails.items[0]?.name || pageConfig.pageSlug || 'N/A'} />
          <InfoRow label={t('verificationPage.issuer')} value={getIssuerName()} />
          <InfoRow label={t('verificationPage.issueDate')} value={new Date(paymentDetails.paymentTimestamp).toLocaleString()} />
          <InfoRow label={t('verificationPage.status')} value={<AuthenticityBadge status={verificationStatus} />} />
          <InfoRow label={t('verificationPage.sessionId')} value={sessionToVerify.sessionId} isMono />
        </div>
        
        {verificationStatus === 'verified' && authenticityHash && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">{t('verificationPage.cryptoProof')}</h3>
            <div className={`p-4 rounded-lg space-y-3 ${theme.inputBgClass || 'bg-slate-50'} border ${theme.inputBorderClass || 'border-slate-200'}`}>
              <InfoRow label={t('verificationPage.hash')} value={authenticityHash} isMono />
              <InfoRow label={t('verificationPage.merkleRoot')} value={merkleRoot || 'N/A'} isMono />
            </div>
            <div className="text-center">
              <Button onClick={() => alert("This would open a blockchain explorer.")} variant="secondary" className={theme.buttonSecondaryClass}>
                {t('verificationPage.viewOnExplorer')}
              </Button>
            </div>
             <p className="text-xs text-center opacity-70">
                {t('verificationPage.proofDescription')}
             </p>
          </div>
        )}

         {verificationStatus === 'revoked' && (
             <div className="p-4 rounded-lg bg-red-100 border border-red-200 text-red-800 text-center">
                <p className="font-bold">{t('verificationPage.revokedMessage')}</p>
             </div>
         )}
        
      </Card>
      <p className="text-xs opacity-60 text-center mt-6">Powered by MonetizePro Authenticity Layer</p>
    </div>
  );
};

export default VerificationPage;
