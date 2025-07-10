import React from 'react';
import { AdminDashboardData, StripeCustomer } from '../../types';
import StatCard from '../../components/admin/StatCard';
import LowStockAlerts from '../../components/admin/LowStockAlerts';
import RecentActivity from '../../components/admin/RecentActivity';
import { useTranslation } from '../../i18n/I18nContext';
import { formatCurrency } from '../../utils';
import Button from '../../components/common/Button';
import RevenueChart from '../../components/admin/charts/RevenueChart';
import SalesBreakdownChart from '../../components/admin/charts/SalesBreakdownChart';
import Card from '../../components/common/Card';

interface DashboardViewProps {
  dashboardData: AdminDashboardData;
  customersById: Map<string, StripeCustomer>;
  onNavigateToInventory: () => void;
  onAnchorProofs: () => void;
}

const DashboardView: React.FC<DashboardViewProps> = ({ dashboardData, customersById, onNavigateToInventory, onAnchorProofs }) => {
  const { t } = useTranslation();

  const hasSalesData = dashboardData.transactions.some(t => t.status === 'succeeded');
  const hasMetrics = dashboardData.dailyMetrics && dashboardData.dailyMetrics.length > 0;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title={t('adminPage.stats.totalRevenue')} value={formatCurrency(dashboardData.summaryStats.totalRevenue)} icon={<i className="material-icons-round text-2xl">attach_money</i>} colorClass="bg-green-100 text-green-600" />
        <StatCard title={t('adminPage.stats.activeSubscriptions')} value={dashboardData.summaryStats.activeSubscriptions} icon={<i className="material-icons-round text-2xl">autorenew</i>} colorClass="bg-blue-100 text-blue-600" />
        <StatCard title={t('adminPage.stats.totalCustomers')} value={dashboardData.summaryStats.totalCustomers} icon={<i className="material-icons-round text-2xl">group</i>} colorClass="bg-yellow-100 text-yellow-600" />
        <StatCard title={t('adminPage.stats.totalTransactions')} value={dashboardData.summaryStats.totalTransactions} icon={<i className="material-icons-round text-2xl">receipt_long</i>} colorClass="bg-indigo-100 text-indigo-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <Card className="lg:col-span-3 bg-white p-4">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">{t('adminPage.dashboard.revenueChartTitle')}</h3>
          <div className="h-72">
            {hasMetrics ? <RevenueChart data={dashboardData.dailyMetrics} /> : <p className="text-sm text-slate-500 italic p-4 text-center">{t('adminPage.dashboard.noChartData')}</p>}
          </div>
        </Card>
        <Card className="lg:col-span-2 bg-white p-4">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">{t('adminPage.dashboard.salesBreakdownTitle')}</h3>
          <div className="h-72">
            {hasSalesData ? <SalesBreakdownChart transactions={dashboardData.transactions} stripeProducts={dashboardData.products} shopProducts={dashboardData.shopProducts || []} /> : <p className="text-sm text-slate-500 italic p-4 text-center">{t('adminPage.dashboard.noSalesData')}</p>}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-4 sm:p-6 rounded-lg shadow-md">
            <RecentActivity transactions={dashboardData.transactions} customersById={customersById} />
        </div>
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
            <LowStockAlerts shopProducts={dashboardData.shopProducts || []} onNavigate={onNavigateToInventory} />
        </div>
      </div>
      
       <div className="bg-white p-4 rounded-lg shadow-md mt-6 flex justify-end">
            <Button onClick={onAnchorProofs} variant='outline' size="sm">
                <i className="material-icons-round text-base mr-1.5">gavel</i>
                {t('adminPage.anchorButton')}
            </Button>
        </div>
    </div>
  );
};

export default DashboardView;