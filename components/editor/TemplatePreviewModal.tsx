



import React from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import { Template, MonetizationUseCase, CheckoutItem, StripeLineItem, AdminDashboardData } from '../../types';
import { THEMES, DEFAULT_PAGE_STYLE, ThemeDefinition, CURRENCY_SYMBOLS, generateMockDataForTenant } from '../../constants';

// Import all page components for preview rendering
import DonationPage from '../../pages/DonationPage';
import FundraisingPage from '../../pages/FundraisingPage';
import ProductPage from '../../pages/ProductPage';
import SubscriptionRentalPage from '../../pages/SubscriptionRentalPage';
import TimedRentalPage from '../../pages/TimedRentalPage';
import ParkingSessionPage from '../../pages/ParkingSessionPage';
import RestaurantBillPage from '../../pages/RestaurantBillPage';
import TipsPage from '../../pages/TipsPage';
import EventTicketSalesPage from '../../pages/EventTicketSalesPage'; 
import AppointmentBookingPage from '../../pages/AppointmentBookingPage';
import DigitalContentAccessPage from '../../pages/DigitalContentAccessPage';
import SimpleInvoicePage from '../../pages/SimpleInvoicePage';
import MembershipPage from '../../pages/MembershipPage';
import VoucherPage from '../../pages/VoucherPage';
import PaymentLinkPage from '../../pages/PaymentLinkPage';
import CatalogPage from '../../pages/CatalogPage';

interface TemplatePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  template: Template<any> | null;
  onApplyTemplate: (template: Template<any>) => void;
  environment: 'test' | 'live'; 
  onAddToCart: (lineItem: StripeLineItem, useCaseData?: any) => void;
}

const TemplatePreviewModal: React.FC<TemplatePreviewModalProps> = ({
  isOpen,
  onClose,
  template,
  onApplyTemplate,
  environment, 
  onAddToCart,
}) => {
  if (!isOpen || !template) {
    return null;
  }

  const handleApply = () => {
    onApplyTemplate(template);
  };

  const mockInitiateCheckout = () => {
    alert(`Checkout Preview (${environment.toUpperCase()}): This would redirect to a secure, Stripe-hosted checkout page. (This is a preview, no actual payment)`);
  };

  const renderPreviewContent = () => {
    if (!template) return null;

    const templateThemeId = template.initialData?.pageStyle?.theme || DEFAULT_PAGE_STYLE.theme;
    const activeThemeForPreview: ThemeDefinition = THEMES.find(t => t.id === templateThemeId) || THEMES.find(t => t.id === DEFAULT_PAGE_STYLE.theme) || THEMES[0];

    const basePageProps = {
      initialData: template.initialData,
      isLivePreview: true, 
      onInitiateCheckout: mockInitiateCheckout,
      onAddToCart: onAddToCart,
      theme: activeThemeForPreview,
      environment: environment, 
      adminData: generateMockDataForTenant('preview_tenant'),
    };

    switch (template.useCase) {
      case MonetizationUseCase.PAYMENT_LINK:
        return <PaymentLinkPage {...basePageProps} />;
      case MonetizationUseCase.DONATION:
        return <DonationPage {...basePageProps} />;
      case MonetizationUseCase.FUNDRAISING:
        return <FundraisingPage {...basePageProps} />;
      case MonetizationUseCase.PRODUCT_SALE:
        return <ProductPage {...basePageProps} />;
      case MonetizationUseCase.SUBSCRIPTION_RENTAL:
        return <SubscriptionRentalPage {...basePageProps} />;
      case MonetizationUseCase.TIMED_RENTAL:
        return <TimedRentalPage {...basePageProps} />;
      case MonetizationUseCase.PARKING_SESSION:
        return <ParkingSessionPage {...basePageProps} getParkingSpecificData={() => {}} />;
      case MonetizationUseCase.RESTAURANT_BILL:
        return <RestaurantBillPage {...basePageProps} />;
      case MonetizationUseCase.TIPS:
        return <TipsPage {...basePageProps} />;
      case MonetizationUseCase.EVENT_TICKET_SALES: 
        return <EventTicketSalesPage {...basePageProps} />;
      case MonetizationUseCase.APPOINTMENT_BOOKING:
        return <AppointmentBookingPage {...basePageProps} />;
      case MonetizationUseCase.DIGITAL_CONTENT_ACCESS:
        return <DigitalContentAccessPage {...basePageProps} />;
      case MonetizationUseCase.SIMPLE_INVOICE:
        return <SimpleInvoicePage {...basePageProps} />;
      case MonetizationUseCase.MEMBERSHIP_ACCESS:
        return <MembershipPage {...basePageProps} />;
      case MonetizationUseCase.VOUCHER:
        return <VoucherPage {...basePageProps} />;
      case MonetizationUseCase.CATALOG:
        return <CatalogPage {...basePageProps} />;
      default:
        return <div className="p-4 text-slate-500">Preview not available for this template type.</div>;
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Preview Template: ${template.name}`} size="2xl">
      <div className="space-y-4">
        <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg -mx-2 -mt-2 mb-4 border-b border-slate-200">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl ${template.previewColorClass} ${template.previewIconColorClass}`}>
            <i className="material-icons-round">{template.previewIcon}</i>
          </div>
          <div>
            <h3 className="text-md font-semibold text-slate-800">{template.name}</h3>
            <p className="text-xs text-slate-600">{template.description}</p>
          </div>
        </div>

        <div className="flex justify-center items-center py-4">
          <div className="w-[320px] h-[650px] bg-slate-800 rounded-[40px] p-2.5 shadow-2xl overflow-hidden ring-2 ring-slate-700">
            <div className="w-full h-full bg-slate-100 rounded-[30px] overflow-hidden relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-slate-800 rounded-b-lg z-10"></div>
              <div className="px-4 pb-4 pt-6 h-full overflow-y-auto"> 
                {renderPreviewContent()}
              </div>
            </div>
          </div>
        </div>
        
        <p className="text-xs text-slate-500 text-center">
          This is a mobile preview ({environment.toUpperCase()} mode). You can customize further after applying.
        </p>

        <div className="mt-6 flex justify-end space-x-3">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="button" variant="primary" onClick={handleApply}>
            Apply this template
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default TemplatePreviewModal;