
import React from 'react';
import { PageSessionData, ThemeDefinition, MonetizationUseCase, EventTicketSalesPageLinkConfig } from '../types';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import AuthenticityBadge from '../components/common/AuthenticityBadge';
import { useTranslation } from '../i18n/I18nContext';

interface ClaimPageProps {
  sessionToClaim: PageSessionData;
  onClaim: (accessCode: string) => void;
  theme: ThemeDefinition;
}

const ClaimPage: React.FC<ClaimPageProps> = ({ sessionToClaim, onClaim, theme }) => {
  const { t } = useTranslation();
  const { accessCode, pageConfig, verificationStatus } = sessionToClaim;
  const { useCase } = pageConfig;

  // Determine what is being claimed
  let claimItemName = 'Access';
  if (useCase === MonetizationUseCase.EVENT_TICKET_SALES) {
    claimItemName = `1x Ticket for ${(pageConfig as EventTicketSalesPageLinkConfig).eventTitle || 'Event'}`;
  } else if (pageConfig.line_items && pageConfig.line_items.length > 0) {
    claimItemName = pageConfig.line_items[0].price_data?.product_data?.name || "Access Pass";
  } else if (pageConfig.pageSlug) {
    claimItemName = `Access to "${pageConfig.pageSlug}"`;
  }

  const handleClaim = () => {
    if (accessCode) {
      onClaim(accessCode);
    }
  };
  
  const accentColorClass = theme.buttonPrimaryClass.includes('sky') ? 'text-sky-500' : 
                         theme.buttonPrimaryClass.includes('cyan') ? 'text-cyan-500' :
                         theme.buttonPrimaryClass.includes('red') ? 'text-red-500' :
                         theme.buttonPrimaryClass.includes('lime') ? 'text-lime-400' :
                         'text-blue-600';


  return (
    <div className={`min-h-screen ${theme.bgClass} ${theme.textClass} py-8 px-4 flex flex-col items-center justify-center`}>
      <Card className={`${theme.cardBgClass} p-6 sm:p-8 shadow-2xl max-w-lg w-full text-center`}>
        <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mb-5 sm:mb-6 mx-auto ${theme.buttonPrimaryClass.replace('text-white','bg-opacity-20').replace('text-slate-900','bg-opacity-20').replace('text-green-900','bg-opacity-20')} ${accentColorClass.replace('text-','bg-')} bg-opacity-20`}>
            <i className={`material-icons-round !text-4xl ${accentColorClass}`}>card_giftcard</i>
        </div>
        <h1 className="text-2xl font-bold mb-2">{t('claimPage.title')}</h1>
        <p className="opacity-80 mb-6">{t('claimPage.prompt')}</p>
        
        <div className={`p-4 rounded-lg mb-6 ${theme.inputBgClass || 'bg-slate-50'} border ${theme.inputBorderClass || 'border-slate-200'}`}>
          <div className="flex justify-center items-center gap-x-3">
             <h3 className={`font-bold text-xl ${accentColorClass}`}>{claimItemName}</h3>
             <AuthenticityBadge status={verificationStatus} />
          </div>
          <p className="text-xs opacity-60 mt-2">{t('claimPage.codeLabel')} {accessCode}</p>
        </div>

        <Button onClick={handleClaim} className={theme.buttonPrimaryClass} size="lg" fullWidth>
          {t('claimPage.cta')}
        </Button>
      </Card>
    </div>
  );
};

export default ClaimPage;
