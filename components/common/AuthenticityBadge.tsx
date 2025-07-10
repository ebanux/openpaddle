
import React from 'react';
import { VerificationStatus } from '../../types';
import { useTranslation } from '../../i18n/I18nContext';

interface AuthenticityBadgeProps {
  status: VerificationStatus;
}

const AuthenticityBadge: React.FC<AuthenticityBadgeProps> = ({ status }) => {
  const { t } = useTranslation();
  
  const statusConfig = {
    verified: {
      text: t('authenticityBadge.verified'),
      icon: 'verified',
      className: 'bg-green-100 text-green-700 border border-green-200',
    },
    pending: {
      text: t('authenticityBadge.pending'),
      icon: 'hourglass_top',
      className: 'bg-yellow-100 text-yellow-700 border border-yellow-200',
    },
    revoked: {
      text: t('authenticityBadge.revoked'),
      icon: 'gpp_bad',
      className: 'bg-red-100 text-red-700 border border-red-200',
    },
    unverified: {
      text: t('authenticityBadge.unverified'),
      icon: 'help_outline',
      className: 'bg-slate-100 text-slate-600 border border-slate-200',
    },
  };

  const config = statusConfig[status] || statusConfig.unverified;

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${config.className}`}
      title={`${t('verificationPage.status')}: ${config.text}`}
    >
      <i className="material-icons-round !text-sm">{config.icon}</i>
      <span>{config.text}</span>
    </div>
  );
};

export default AuthenticityBadge;
