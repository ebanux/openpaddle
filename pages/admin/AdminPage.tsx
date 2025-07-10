import React, { useMemo, useState } from 'react';
import { AdminDashboardData, MonetizationUseCase, StripeTransaction, StripeCustomer, StripeSubscription, StripePrice, StripeProduct, AdminMonetizationPage, PageSessionData, SessionStatus, StripeCoupon, StripeTaxRate, StripeShippingRate, TenantSettings, PlatformPayoutDetails, EmailTemplate, DigitalAsset, Collection, ShopProduct, Variant, Column, TenantUser, UserRole, AdminEntityType } from '../../types';
import { CURRENCY_SYMBOLS, NAV_ITEMS } from '../../constants';
import EntityTable from './EntityTable';
import Button from '../../components/common/Button';
import PayoutsPage from './PayoutsPage';
import { useTranslation } from '../../i18n/I18nContext';
import InventoryManagementPage from './InventoryManagementPage';
import DashboardView from './DashboardView';
import { formatCurrency } from '../../utils';
import EntityEditorPage from './EntityEditorPage';
import { schemas } from '../../schemas';
import UserEditorModal from './UserEditorModal';


type AdminView = 'dashboard' | 'pages' | 'products' | 'collections' | 'inventory' | 'prices' | 'customers' | 'subscriptions' | 'transactions' | 'sessions' | 'codes' | 'coupons' | 'taxRates' | 'shippingRates' | 'payouts' | 'emailTemplates' | 'digitalAssets' | 'team';

const AdminSidebar: React.FC<{ activeView: AdminView; onViewChange: (view: AdminView) => void }> = ({ activeView, onViewChange }) => {
    const { t } = useTranslation();
    const navItems = [
        { id: 'dashboard', label: t('adminPage.sidebar.dashboard'), icon: <i className="material-icons-round">dashboard</i> },
        { id: 'pages', label: t('adminPage.sidebar.pages'), icon: <i className="material-icons-round">article</i> },
        { type: 'divider' },
        { id: 'products', label: t('adminPage.sidebar.products'), icon: <i className="material-icons-round">inventory_2</i> },
        { id: 'inventory', label: t('adminPage.sidebar.inventory'), icon: <i className="material-icons-round">warehouse</i> },
        { id: 'collections', label: t('adminPage.sidebar.collections'), icon: <i className="material-icons-round">collections_bookmark</i> },
        { id: 'prices', label: t('adminPage.sidebar.prices'), icon: <i className="material-icons-round">sell</i> },
        { type: 'divider' },
        { id: 'digitalAssets', label: t('adminPage.sidebar.digitalAssets'), icon: <i className="material-icons-round">folder_zip</i> },
        { id: 'customers', label: t('adminPage.sidebar.customers'), icon: <i className="material-icons-round">group</i> },
        { id: 'team', label: t('adminPage.sidebar.team'), icon: <i className="material-icons-round">manage_accounts</i> },
        { id: 'subscriptions', label: t('adminPage.sidebar.subscriptions'), icon: <i className="material-icons-round">card_membership</i> },
        { id: 'transactions', label: t('adminPage.sidebar.transactions'), icon: <i className="material-icons-round">payments</i> },
        { id: 'sessions', label: t('adminPage.sidebar.sessions'), icon: <i className="material-icons-round">confirmation_number</i> },
        { id: 'codes', label: t('adminPage.sidebar.codes'), icon: <i className="material-icons-round">vpn_key</i> },
        { type: 'divider' },
        { id: 'coupons', label: t('adminPage.sidebar.coupons'), icon: <i className="material-icons-round">local_offer</i> },
        { id: 'taxRates', label: t('adminPage.sidebar.taxRates'), icon: <i className="material-icons-round">request_quote</i> },
        { id: 'shippingRates', label: t('adminPage.sidebar.shippingRates'), icon: <i className="material-icons-round">local_shipping</i> },
        { type: 'divider' },
        { id: 'emailTemplates', label: t('adminPage.sidebar.emails'), icon: <i className="material-icons-round">email</i> },
        { id: 'payouts', label: t('adminPage.sidebar.payouts'), icon: <i className="material-icons-round">account_balance</i> },
    ];
    return (
        <nav className="p-4 bg-white rounded-lg shadow-md">
            <ul className="space-y-1">
                {navItems.map((item, index) => {
                    if (item.type === 'divider') {
                        return <li key={`divider-${index}`}><hr className="my-2 border-slate-200" /></li>;
                    }
                    const { id, label, icon } = item;
                    return (
                        <li key={id}>
                            <button
                                type="button"
                                onClick={() => onViewChange(id as AdminView)}
                                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                                    activeView === id 
                                        ? 'bg-blue-600 text-white shadow' 
                                        : 'text-slate-600 hover:bg-slate-100'
                                }`}
                            >
                                {icon}
                                <span>{label}</span>
                            </button>
                        </li>
                    )
                })}
            </ul>
        </nav>
    );
};


interface AdminPageProps {
  dashboardData: AdminDashboardData;
  editingEntity: { type: AdminEntityType; data: any } | null;
  onEditEntity: (entity: { type: AdminEntityType; data: any } | null) => void;
  onSaveEntity: (entityType: string, data: any) => void;
  onDeleteEntity: (entityType: string, id: string) => void;
  onLoadSampleData: () => void;
  onCreateNewPage: () => void;
  onEditPage: (pageId: string) => void;
  onDeletePage?: (pageId: string) => void;
  onPublishPage: (page: AdminMonetizationPage) => void;
  onSharePage: (page: AdminMonetizationPage) => void;
  onViewSessionPage: (session: PageSessionData) => void;
  onOpenGenerateCodesModal: (page: AdminMonetizationPage | null) => void;
  onViewCodesForPage: (page: AdminMonetizationPage) => void;
  onRevokeSession: (sessionId: string) => void;
  onAnchorProofs: () => void;
  onVerifyCode: (accessCode: string) => void;
  onTestEmailTemplate: (template: EmailTemplate) => void;
  onUpdateShopProductVariant: (productId: string, variantId: string, updatedVariantData: Partial<Variant>) => void;
  tenantSettings: TenantSettings | null;
  onSelectStripeConnect: () => void;
  onSavePlatformPayoutDetails: (details: PlatformPayoutDetails) => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ 
    dashboardData, editingEntity, onEditEntity, onSaveEntity, onDeleteEntity, onLoadSampleData, onCreateNewPage, 
    onEditPage, onDeletePage, onPublishPage, onSharePage, onViewSessionPage, 
    onOpenGenerateCodesModal, onViewCodesForPage, onRevokeSession, onAnchorProofs, onVerifyCode,
    onUpdateShopProductVariant,
    tenantSettings, onSelectStripeConnect, onSavePlatformPayoutDetails, onTestEmailTemplate
}) => {
  const { t } = useTranslation();
  const [currentView, setCurrentView] = useState<AdminView>('dashboard');
  const [pageFilterForCodes, setPageFilterForCodes] = useState<string | null>(null);
  const [isUserInviteModalOpen, setIsUserInviteModalOpen] = useState(false);
  
  const getUseCaseIcon = (useCase: MonetizationUseCase) => {
    const iconName = NAV_ITEMS.find(item => item.id === useCase)?.icon || 'help_outline';
    return <i className="material-icons-round text-sm">{iconName}</i>;
  };

  const customersById = useMemo(() => new Map(dashboardData.customers.map(c => [c.id, c])), [dashboardData.customers]);
  
  const handleViewChange = (view: AdminView) => {
    onEditEntity(null); // Close entity editor when changing main views
    setCurrentView(view);
  }

  const handleCreateNew = (entityType: AdminView) => {
    const type = entityType as AdminEntityType; // We know it's a valid type here
    onEditEntity({ type: type, data: null });
    setCurrentView('dashboard'); // Switch to a view that shows the editor
  }

  const handleEditItem = (entityType: AdminEntityType, item: any) => {
    onEditEntity({ type: entityType, data: item });
    setCurrentView('dashboard'); // Switch to a view that shows the editor
  };

  const handleDeleteItem = (entityType: AdminEntityType, item: any) => {
    if(window.confirm(`Are you sure you want to delete this ${entityType.slice(0, -1)}?`)) {
      onDeleteEntity(entityType, item.id);
    }
  };
  
  const handleInviteUser = (user: { email: string, role: UserRole }) => {
    onSaveEntity('users', user);
    setIsUserInviteModalOpen(false);
  }


  const renderCurrentView = () => {
    if (editingEntity) {
        return <EntityEditorPage
            entityType={editingEntity.type}
            schema={schemas[editingEntity.type]}
            initialData={editingEntity.data}
            adminData={dashboardData}
            onSave={(type, data) => { onSaveEntity(type, data); onEditEntity(null); }}
            onCancel={() => onEditEntity(null)}
            onUpdateShopProductVariant={onUpdateShopProductVariant}
        />
    }

    switch (currentView) {
      case 'dashboard':
        return <DashboardView dashboardData={dashboardData} customersById={customersById} onNavigateToInventory={() => setCurrentView('inventory')} onAnchorProofs={onAnchorProofs} />;
      
      case 'pages':
        const pageColumns: Column<AdminMonetizationPage>[] = [
          { header: 'Name', accessor: item => <span className="font-semibold">{item.name}</span> },
          { header: 'Use Case', accessor: item => <div className="flex items-center gap-2"><div className="w-5 h-5 rounded-md flex items-center justify-center text-sm bg-slate-200">{getUseCaseIcon(item.useCase)}</div> <span>{item.useCase}</span></div> },
          { header: 'Status', accessor: item => <span className={`px-2 py-1 text-xs font-semibold rounded-full ${item.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>{item.status}</span>},
        ];
        return <EntityTable 
            title="Pages"
            columns={pageColumns} 
            data={dashboardData.pages}
            onCreate={onCreateNewPage}
            onEdit={(item) => onEditPage(item.id)}
            onDelete={onDeletePage ? (item) => onDeletePage(item.id) : undefined}
            onPublish={onPublishPage}
            onShare={onSharePage}
            onManageCodes={onOpenGenerateCodesModal}
            hideDelete={!onDeletePage}
        />;
      
      case 'products':
          const productColumns: Column<StripeProduct>[] = [
              { header: 'Product', accessor: item => <div className="flex items-center gap-2"><img src={item.images?.[0]} className="w-8 h-8 rounded object-cover" alt={item.name} /> <span className="font-semibold">{item.name}</span></div> },
              { header: 'Description', accessor: item => <p className="text-xs truncate max-w-xs">{item.description}</p> },
              { header: 'Active', accessor: item => <span className={`px-2 py-1 text-xs font-semibold rounded-full ${item.active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{item.active ? 'Yes' : 'No'}</span> },
          ];
          return <EntityTable title="Products" columns={productColumns} data={dashboardData.products} onCreate={() => handleCreateNew('products')} onEdit={(item) => handleEditItem('products', item)} onDelete={(item) => handleDeleteItem('products', item)} />;
      case 'inventory':
          return <InventoryManagementPage shopProducts={dashboardData.shopProducts || []} onVariantUpdate={onUpdateShopProductVariant} currency="USD" />
      case 'collections':
          const collectionColumns: Column<Collection>[] = [
              { header: 'Title', accessor: item => <span className="font-semibold">{item.title}</span> },
              { header: 'Description', accessor: item => <p className="text-xs truncate max-w-xs">{item.description}</p> },
              { header: 'Product Count', accessor: item => item.productIds?.length || 0 },
          ];
          return <EntityTable title="Collections" columns={collectionColumns} data={dashboardData.collections || []} onCreate={() => handleCreateNew('collections')} onEdit={(item) => handleEditItem('collections', item)} onDelete={(item) => handleDeleteItem('collections', item)} />;
      case 'prices':
          const pricesColumns: Column<StripePrice>[] = [
              { header: 'Product', accessor: item => dashboardData.products.find(p => p.id === item.product)?.name || item.product },
              { header: 'Amount', accessor: item => <span className="font-mono">{formatCurrency(item.unit_amount / 100, item.currency)}</span> },
              { header: 'Type', accessor: item => item.type === 'recurring' ? `Recurring (${item.recurring?.interval})` : 'One-time' },
              { header: 'Active', accessor: item => <span className={`px-2 py-1 text-xs font-semibold rounded-full ${item.active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{item.active ? 'Yes' : 'No'}</span> },
          ];
          return <EntityTable title="Prices" columns={pricesColumns} data={dashboardData.prices} onCreate={() => handleCreateNew('prices')} onEdit={(item) => handleEditItem('prices', item)} onDelete={(item) => handleDeleteItem('prices', item)} />;
      case 'customers':
          const customerColumns: Column<StripeCustomer>[] = [
              { header: 'Name', accessor: item => <span className="font-semibold">{item.name}</span> },
              { header: 'Email', accessor: item => item.email },
              { header: 'Phone', accessor: item => item.phone },
              { header: 'Created', accessor: item => new Date(item.created * 1000).toLocaleDateString() },
          ];
          return <EntityTable title="Customers" columns={customerColumns} data={dashboardData.customers} onCreate={() => handleCreateNew('customers')} onEdit={(item) => handleEditItem('customers', item)} onDelete={(item) => handleDeleteItem('customers', item)} />;
      case 'subscriptions':
          const subscriptionColumns: Column<StripeSubscription>[] = [
              { header: 'Customer', accessor: item => customersById.get(item.customer)?.name || 'N/A' },
              { header: 'Status', accessor: item => <span className={`px-2 py-1 text-xs font-semibold rounded-full ${item.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>{item.status}</span> },
              { header: 'Plan(s)', accessor: item => item.items.map(i => dashboardData.prices.find(p => p.id === i.price)?.product).map(pId => dashboardData.products.find(p => p.id === pId)?.name).join(', ') || 'N/A' },
              { header: 'Next Bill', accessor: item => new Date(item.current_period_end * 1000).toLocaleDateString() },
          ];
          return <EntityTable title="Subscriptions" columns={subscriptionColumns} data={dashboardData.subscriptions} onCreate={() => handleCreateNew('subscriptions')} onEdit={(item) => handleEditItem('subscriptions', item)} onDelete={(item) => handleDeleteItem('subscriptions', item)} />;
      case 'transactions':
          const transactionColumns: Column<StripeTransaction>[] = [
              { header: 'Customer', accessor: item => item.customer ? (customersById.get(item.customer)?.name || 'N/A') : 'Guest' },
              { header: 'Amount', accessor: item => <span className="font-mono">{formatCurrency(item.amount / 100, item.currency)}</span> },
              { header: 'Description', accessor: item => item.description },
              { header: 'Status', accessor: item => <span className={`px-2 py-1 text-xs font-semibold rounded-full ${item.status === 'succeeded' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{item.status}</span> },
              { header: 'Date', accessor: item => new Date(item.created * 1000).toLocaleString() },
          ];
          return <EntityTable title="Transactions" columns={transactionColumns} data={dashboardData.transactions} onCreate={() => handleCreateNew('transactions')} onEdit={(item) => handleEditItem('transactions', item)} onDelete={(item) => handleDeleteItem('transactions', item)} />;
      case 'sessions':
          const sessionColumns: Column<PageSessionData>[] = [
              { header: 'Session ID', accessor: item => <span className="font-mono text-xs">{item.sessionId}</span> },
              { header: 'Page', accessor: item => item.pageConfig.pageSlug },
              { header: 'Status', accessor: item => <span className={`px-2 py-1 text-xs font-semibold rounded-full ${[SessionStatus.PAID, SessionStatus.ACTIVE].includes(item.status) ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>{item.status}</span> },
              { header: 'Amount', accessor: item => formatCurrency(item.paymentDetails.totalAmount, item.paymentDetails.currency) },
          ];
          return <EntityTable title="Sessions" columns={sessionColumns} data={dashboardData.sessions} hideCreate onEdit={(item) => onViewSessionPage(item)} onRevoke={onRevokeSession} editButtonText="View"/>;
      case 'codes':
          const codeColumns: Column<PageSessionData>[] = [
              { header: 'Access Code', accessor: item => <span className="font-mono font-semibold">{item.accessCode}</span> },
              { header: 'Page', accessor: item => item.pageConfig.pageSlug },
              { header: 'Status', accessor: item => <span className={`px-2 py-1 text-xs font-semibold rounded-full ${item.status === 'available' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'}`}>{item.status}</span> },
          ];
          return <EntityTable title="Access Codes" columns={codeColumns} data={dashboardData.sessions.filter(s => s.accessCode)} hideCreate onEdit={() => {}} onRevoke={onRevokeSession} onVerify={onVerifyCode} />;
      case 'coupons':
          const couponColumns: Column<StripeCoupon>[] = [
              { header: 'Code', accessor: item => <span className="font-mono font-semibold">{item.id}</span> },
              { header: 'Name', accessor: item => item.name },
              { header: 'Discount', accessor: item => item.percent_off ? `${item.percent_off}%` : formatCurrency((item.amount_off || 0) / 100, item.currency || 'usd') },
              { header: 'Valid', accessor: item => <span className={`px-2 py-1 text-xs font-semibold rounded-full ${item.valid ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{item.valid ? 'Yes' : 'No'}</span> },
          ];
          return <EntityTable title="Coupons" columns={couponColumns} data={dashboardData.coupons} onCreate={() => handleCreateNew('coupons')} onEdit={(item) => handleEditItem('coupons', item)} onDelete={(item) => handleDeleteItem('coupons', item)} />;
      case 'taxRates':
          const taxRateColumns: Column<StripeTaxRate>[] = [
              { header: 'Display Name', accessor: item => <span className="font-semibold">{item.display_name}</span> },
              { header: 'Percentage', accessor: item => `${item.percentage}%` },
              { header: 'Inclusive', accessor: item => item.inclusive ? 'Yes' : 'No' },
              { header: 'Jurisdiction', accessor: item => item.jurisdiction },
          ];
          return <EntityTable title="Tax Rates" columns={taxRateColumns} data={dashboardData.taxRates} onCreate={() => handleCreateNew('taxRates')} onEdit={(item) => handleEditItem('taxRates', item)} onDelete={(item) => handleDeleteItem('taxRates', item)} />;
      case 'shippingRates':
          const shippingRateColumns: Column<StripeShippingRate>[] = [
              { header: 'Display Name', accessor: item => <span className="font-semibold">{item.display_name}</span> },
              { header: 'Amount', accessor: item => formatCurrency(item.fixed_amount.amount / 100, item.fixed_amount.currency) },
              { header: 'Delivery Estimate', accessor: item => item.delivery_estimate ? `${item.delivery_estimate.minimum.value}-${item.delivery_estimate.maximum.value} ${item.delivery_estimate.minimum.unit}s` : 'N/A' },
          ];
          return <EntityTable title="Shipping Rates" columns={shippingRateColumns} data={dashboardData.shippingRates} onCreate={() => handleCreateNew('shippingRates')} onEdit={(item) => handleEditItem('shippingRates', item)} onDelete={(item) => handleDeleteItem('shippingRates', item)} />;
      case 'emailTemplates':
          const emailColumns: Column<EmailTemplate>[] = [
              { header: 'Name', accessor: item => <span className="font-semibold">{item.name}</span> },
              { header: 'Trigger Page', accessor: item => item.triggerPageId === 'all' ? 'All Pages' : (dashboardData.pages.find(p => p.id === item.triggerPageId)?.name || item.triggerPageId) },
              { header: 'Trigger Status', accessor: item => item.triggerSessionStatus },
              { header: 'Enabled', accessor: item => <span className={`px-2 py-1 text-xs font-semibold rounded-full ${item.isEnabled ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{item.isEnabled ? 'Yes' : 'No'}</span> },
          ];
          return <EntityTable title="Email Templates" columns={emailColumns} data={dashboardData.emailTemplates} onCreate={() => handleCreateNew('emailTemplates')} onEdit={(item) => handleEditItem('emailTemplates', item)} onDelete={(item) => handleDeleteItem('emailTemplates', item)} onTest={onTestEmailTemplate} />;
      case 'digitalAssets':
          const assetColumns: Column<DigitalAsset>[] = [
              { header: 'Name', accessor: item => <span className="font-semibold">{item.name}</span> },
              { header: 'File Name', accessor: item => <span className="font-mono text-xs">{item.fileName}</span> },
              { header: 'Type', accessor: item => item.fileType },
              { header: 'Size', accessor: item => `${item.fileSize} KB` },
          ];
          return <EntityTable title="Digital Assets" columns={assetColumns} data={dashboardData.digitalAssets} onCreate={() => handleCreateNew('digitalAssets')} onEdit={(item) => handleEditItem('digitalAssets', item)} onDelete={(item) => handleDeleteItem('digitalAssets', item)} />;
      case 'team':
          const userColumns: Column<TenantUser>[] = [
              { header: 'Email', accessor: item => <span className="font-semibold">{item.email}</span> },
              { header: 'Role', accessor: item => item.role },
              { header: 'Status', accessor: item => <span className={`px-2 py-1 text-xs font-semibold rounded-full ${item.status === 'Accepted' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{item.status}</span> },
          ];
          return (
              <>
                  <UserEditorModal isOpen={isUserInviteModalOpen} onClose={() => setIsUserInviteModalOpen(false)} onInvite={handleInviteUser} schema={schemas.users} />
                  <EntityTable title="Team Members" columns={userColumns} data={dashboardData.users} onCreate={() => setIsUserInviteModalOpen(true)} onEdit={(item) => handleEditItem('users', item)} onDelete={(item) => handleDeleteItem('users', item)} createButtonText={t('adminPage.team.inviteUser')} />
              </>
          );
      case 'payouts':
          return tenantSettings ? <PayoutsPage settings={tenantSettings} onSelectStripeConnect={onSelectStripeConnect} onSavePlatformPayoutDetails={onSavePlatformPayoutDetails} /> : <div>Loading...</div>;
      default:
        return <div>Select a view from the sidebar.</div>
    }
  }

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4">
      <div className="w-full md:w-64 flex-shrink-0">
        <AdminSidebar activeView={currentView} onViewChange={handleViewChange} />
      </div>
      <div className="flex-1 min-w-0">
        {renderCurrentView()}
      </div>
    </div>
  );
};
