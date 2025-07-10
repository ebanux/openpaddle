import React, { useMemo } from 'react';
import { StripeTransaction, StripeCustomer } from '../../types';
import { useTranslation } from '../../i18n/I18nContext';
import { formatCurrency } from '../../utils';

interface RecentActivityProps {
  transactions: StripeTransaction[];
  customersById: Map<string, StripeCustomer>;
}

const timeAgo = (date: Date): string => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ago";
    return Math.floor(seconds) + " seconds ago";
};

const RecentActivity: React.FC<RecentActivityProps> = ({ transactions, customersById }) => {
  const { t } = useTranslation();

  const recentTransactions = useMemo(() => {
    return [...transactions]
      .filter(t => t.status === 'succeeded')
      .sort((a, b) => b.created - a.created)
      .slice(0, 5);
  }, [transactions]);

  return (
    <div>
      <h3 className="text-lg font-semibold text-slate-800 mb-4">{t('adminPage.dashboard.recentActivity.title')}</h3>
      {recentTransactions.length > 0 ? (
        <div className="space-y-4">
          {recentTransactions.map(txn => {
            const customer = txn.customer ? customersById.get(txn.customer) : null;
            return (
              <div key={txn.id} className="flex items-center space-x-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <i className="material-icons-round text-green-600">check</i>
                </div>
                <div className="flex-grow">
                    <p className="text-sm font-medium text-slate-800">
                        {customer ? `${customer.name} (${customer.email})` : 'A guest'} paid <span className="font-bold">{formatCurrency(txn.amount / 100, txn.currency)}</span>
                    </p>
                    <p className="text-xs text-slate-500">{txn.description}</p>
                </div>
                <div className="text-xs text-slate-400 flex-shrink-0">
                    {timeAgo(new Date(txn.created * 1000))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-sm text-slate-500 italic">{t('adminPage.dashboard.recentActivity.noActivity')}</p>
      )}
    </div>
  );
};

export default RecentActivity;
