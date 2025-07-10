

import React from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import { AfterPaymentTemplate, PageSessionData, MonetizationUseCase, CheckoutItem, BaseAfterPaymentPageProps, AfterPaymentTemplateType, ParkingRate, BasePageLinkConfig, ParkingPageLinkConfig, SubscriptionPageLinkConfig, RestaurantBillPageLinkConfig, EventTicketSalesPageLinkConfig, AppointmentBookingPageLinkConfig, SimpleInvoicePageLinkConfig, SessionStatus, VerificationStatus, MembershipAccessPageLinkConfig, VoucherPageLinkConfig, Voucher, StripeLineItem } from '../../types';
import { THEMES, DEFAULT_PAGE_STYLE, ThemeDefinition, CURRENCY_SYMBOLS, MOCK_PARKING_RATES } from '../../constants';
import { APP_AFTER_PAYMENT_TEMPLATES } from '../../templates'; // To find definition if needed, though template object is passed

// Import all After Payment display components - consider a more dynamic way if this list grows very large
import FundraisingThankYouDisplay from '../../pages/afterPayment/FundraisingThankYouDisplay';
import FundraisingImpactReportDisplay from '../../pages/afterPayment/FundraisingImpactReportDisplay';
import FundraisingUpdatesSignupDisplay from '../../pages/afterPayment/FundraisingUpdatesSignupDisplay';
import FundraisingDonorWallDisplay from '../../pages/afterPayment/FundraisingDonorWallDisplay';
import DonationSimpleThankYouDisplay from '../../pages/afterPayment/DonationSimpleThankYouDisplay';
import DonationPersonalNoteDisplay from '../../pages/afterPayment/DonationPersonalNoteDisplay';
import DonationSocialFollowDisplay from '../../pages/afterPayment/DonationSocialFollowDisplay';
import DonationExploreContentDisplay from '../../pages/afterPayment/DonationExploreContentDisplay';
import ParkingActiveInfoDisplay from '../../pages/afterPayment/ParkingActiveInfoDisplay';
import ProductOrderConfirmedTrackingDisplay from '../../pages/afterPayment/ProductOrderConfirmedTrackingDisplay';
import SubscriptionActiveWelcomeDisplay from '../../pages/afterPayment/SubscriptionActiveWelcomeDisplay';
import DigitalContentAccessDownloadDisplay from '../../pages/afterPayment/DigitalContentAccessDownloadDisplay';
import TimedRentalStartedInstructionsDisplay from '../../pages/afterPayment/TimedRentalStartedInstructionsDisplay';
import RestaurantBillReceiptDisplay from '../../pages/afterPayment/RestaurantBillReceiptDisplay';
import TipsThankYouDisplay from '../../pages/afterPayment/TipsThankYouDisplay';
import EventTicketConfirmedQRDisplay from '../../pages/afterPayment/EventTicketConfirmedQRDisplay';
import AppointmentBookingConfirmedDisplay from '../../pages/afterPayment/AppointmentBookingConfirmedDisplay';
import InvoicePaidReceiptDisplay from '../../pages/afterPayment/InvoicePaidReceiptDisplay';
import ParkingExtendMapDisplay from '../../pages/afterPayment/ParkingExtendMapDisplay';
import ProductThankYouUpsellDisplay from '../../pages/afterPayment/ProductThankYouUpsellDisplay';
import SubscriptionManageExploreDisplay from '../../pages/afterPayment/SubscriptionManageExploreDisplay';
import RentalExtendHelpDisplay from '../../pages/afterPayment/RentalExtendHelpDisplay';
import RestaurantFeedbackLoyaltyDisplay from '../../pages/afterPayment/RestaurantFeedbackLoyaltyDisplay';
import TipsSupportMoreDisplay from '../../pages/afterPayment/TipsSupportMoreDisplay';
import EventInfoShareDisplay from '../../pages/afterPayment/EventInfoShareDisplay';
import AppointmentPreparationInfoDisplay from '../../pages/afterPayment/AppointmentPreparationInfoDisplay';
import DigitalContentSupportMoreDisplay from '../../pages/afterPayment/DigitalContentSupportMoreDisplay';
import InvoiceNextStepsRateDisplay from '../../pages/afterPayment/InvoiceNextStepsRateDisplay';
import ProductUpdatesCommunityDisplay from '../../pages/afterPayment/ProductUpdatesCommunityDisplay';
import EventHypePageDisplay from '../../pages/afterPayment/EventHypePageDisplay';
import SubscriptionReferralDisplay from '../../pages/afterPayment/SubscriptionReferralDisplay';
import TipsVideoThankYouDisplay from '../../pages/afterPayment/TipsVideoThankYouDisplay';
import SubscriptionOnboardingDisplay from '../../pages/afterPayment/SubscriptionOnboardingDisplay';
import SubscriptionShipmentInfoDisplay from '../../pages/afterPayment/SubscriptionShipmentInfoDisplay';
import SubscriptionContentTeaserDisplay from '../../pages/afterPayment/SubscriptionContentTeaserDisplay';
import SubscriptionPersonalWelcomeDisplay from '../../pages/afterPayment/SubscriptionPersonalWelcomeDisplay';
import RentalRulesWaiverDisplay from '../../pages/afterPayment/RentalRulesWaiverDisplay';
import RentalAccessCodeTimerDisplay from '../../pages/afterPayment/RentalAccessCodeTimerDisplay';
import RentalFindOnMapDisplay from '../../pages/afterPayment/RentalFindOnMapDisplay';
import RentalRateExperienceDisplay from '../../pages/afterPayment/RentalRateExperienceDisplay';
import InvoiceUpsellServicesDisplay from '../../pages/afterPayment/InvoiceUpsellServicesDisplay';
import InvoiceSimpleThankYouDisplay from '../../pages/afterPayment/InvoiceSimpleThankYouDisplay';
import DigitalContentCommunityDisplay from '../../pages/afterPayment/DigitalContentCommunityDisplay';
import DigitalContentLicenseKeyDisplay from '../../pages/afterPayment/DigitalContentLicenseKeyDisplay';
import AppointmentBookingConfirmedCalendarDisplay from '../../pages/afterPayment/AppointmentBookingConfirmedCalendarDisplay';
import AppointmentBookingIntakeFormDisplay from '../../pages/afterPayment/AppointmentBookingIntakeFormDisplay';
import AppointmentBookingUpsellDisplay from '../../pages/afterPayment/AppointmentBookingUpsellDisplay';
import AppointmentBookingReferralDisplay from '../../pages/afterPayment/AppointmentBookingReferralDisplay';
import MembershipPassQRDisplay from '../../pages/afterPayment/MembershipPassQRDisplay';
import MembershipWelcomeDisplay from '../../pages/afterPayment/MembershipWelcomeDisplay';
import MembershipContentTeaserDisplay from '../../pages/afterPayment/MembershipContentTeaserDisplay';
import VoucherCodeDisplay from '../../pages/afterPayment/VoucherCodeDisplay';
import VoucherSendAsGiftDisplay from '../../pages/afterPayment/VoucherSendAsGiftDisplay';
import VoucherCorporateBrandedDisplay from '../../pages/afterPayment/VoucherCorporateBrandedDisplay';
import VoucherInteractiveRevealDisplay from '../../pages/afterPayment/VoucherInteractiveRevealDisplay';
import EventPreparationInfoDisplay from '../../pages/afterPayment/EventPreparationInfoDisplay';
import TipsSocialShoutoutDisplay from '../../pages/afterPayment/TipsSocialShoutoutDisplay';


// This map needs to be available here or passed as a prop
const afterPaymentComponentMapInternal: Record<string, React.FC<BaseAfterPaymentPageProps<any>>> = {
  [AfterPaymentTemplateType.FUNDRAISING_THANK_YOU]: FundraisingThankYouDisplay,
  [AfterPaymentTemplateType.FUNDRAISING_IMPACT_REPORT]: FundraisingImpactReportDisplay,
  [AfterPaymentTemplateType.FUNDRAISING_UPDATES_SIGNUP]: FundraisingUpdatesSignupDisplay,
  [AfterPaymentTemplateType.FUNDRAISING_DONOR_WALL]: FundraisingDonorWallDisplay,
  [AfterPaymentTemplateType.DONATION_SIMPLE_THANK_YOU]: DonationSimpleThankYouDisplay,
  [AfterPaymentTemplateType.DONATION_PERSONAL_NOTE]: DonationPersonalNoteDisplay,
  [AfterPaymentTemplateType.DONATION_SOCIAL_FOLLOW]: DonationSocialFollowDisplay,
  [AfterPaymentTemplateType.DONATION_EXPLORE_CONTENT]: DonationExploreContentDisplay,
  [AfterPaymentTemplateType.PARKING_ACTIVE_INFO]: ParkingActiveInfoDisplay,
  [AfterPaymentTemplateType.PARKING_EXTEND_MAP]: ParkingExtendMapDisplay,
  [AfterPaymentTemplateType.PRODUCT_ORDER_CONFIRMED_TRACKING]: ProductOrderConfirmedTrackingDisplay,
  [AfterPaymentTemplateType.PRODUCT_THANK_YOU_UPSELL]: ProductThankYouUpsellDisplay,
  [AfterPaymentTemplateType.SUBSCRIPTION_ACTIVE_WELCOME]: SubscriptionActiveWelcomeDisplay,
  [AfterPaymentTemplateType.SUBSCRIPTION_MANAGE_EXPLORE]: SubscriptionManageExploreDisplay,
  [AfterPaymentTemplateType.DIGITAL_CONTENT_ACCESS_DOWNLOAD]: DigitalContentAccessDownloadDisplay,
  [AfterPaymentTemplateType.DIGITAL_CONTENT_SUPPORT_MORE]: DigitalContentSupportMoreDisplay,
  [AfterPaymentTemplateType.DIGITAL_CONTENT_COMMUNITY_FEEDBACK]: DigitalContentCommunityDisplay,
  [AfterPaymentTemplateType.DIGITAL_CONTENT_LICENSE_KEY]: DigitalContentLicenseKeyDisplay,
  [AfterPaymentTemplateType.RENTAL_STARTED_INSTRUCTIONS]: TimedRentalStartedInstructionsDisplay,
  [AfterPaymentTemplateType.RESTAURANT_BILL_RECEIPT]: RestaurantBillReceiptDisplay,
  [AfterPaymentTemplateType.TIPS_THANK_YOU]: TipsThankYouDisplay,
  [AfterPaymentTemplateType.EVENT_TICKET_CONFIRMED_QR]: EventTicketConfirmedQRDisplay,
  [AfterPaymentTemplateType.APPOINTMENT_BOOKING_CONFIRMED]: AppointmentBookingConfirmedDisplay,
  [AfterPaymentTemplateType.APPOINTMENT_PREPARATION_INFO]: AppointmentPreparationInfoDisplay,
  [AfterPaymentTemplateType.APPOINTMENT_BOOKING_CONFIRMED_CALENDAR]: AppointmentBookingConfirmedCalendarDisplay,
  [AfterPaymentTemplateType.APPOINTMENT_BOOKING_INTAKE_FORM]: AppointmentBookingIntakeFormDisplay,
  [AfterPaymentTemplateType.APPOINTMENT_BOOKING_UPSELL]: AppointmentBookingUpsellDisplay,
  [AfterPaymentTemplateType.APPOINTMENT_BOOKING_REFERRAL]: AppointmentBookingReferralDisplay,
  [AfterPaymentTemplateType.INVOICE_PAID_RECEIPT]: InvoicePaidReceiptDisplay,
  [AfterPaymentTemplateType.INVOICE_NEXT_STEPS_RATE]: InvoiceNextStepsRateDisplay,
  [AfterPaymentTemplateType.INVOICE_UPSELL_SERVICES]: InvoiceUpsellServicesDisplay,
  [AfterPaymentTemplateType.INVOICE_SIMPLE_THANK_YOU]: InvoiceSimpleThankYouDisplay,
  [AfterPaymentTemplateType.INVOICE_FINAL_FILES]: DigitalContentAccessDownloadDisplay, // Reusing for file delivery
  [AfterPaymentTemplateType.RENTAL_EXTEND_HELP]: RentalExtendHelpDisplay,
  [AfterPaymentTemplateType.RESTAURANT_FEEDBACK_LOYALTY]: RestaurantFeedbackLoyaltyDisplay,
  [AfterPaymentTemplateType.TIPS_SUPPORT_MORE]: TipsSupportMoreDisplay,
  [AfterPaymentTemplateType.TIPS_SOCIAL_SHOUTOUT]: TipsSocialShoutoutDisplay,
  [AfterPaymentTemplateType.EVENT_INFO_SHARE]: EventInfoShareDisplay,
  [AfterPaymentTemplateType.PRODUCT_UPDATES_COMMUNITY]: ProductUpdatesCommunityDisplay,
  [AfterPaymentTemplateType.EVENT_HYPE_PAGE]: EventHypePageDisplay,
  [AfterPaymentTemplateType.EVENT_PREPARATION_INFO]: EventPreparationInfoDisplay,
  [AfterPaymentTemplateType.SUBSCRIPTION_REFERRAL]: SubscriptionReferralDisplay,
  [AfterPaymentTemplateType.TIPS_VIDEO_THANK_YOU]: TipsVideoThankYouDisplay,
  [AfterPaymentTemplateType.SUBSCRIPTION_ONBOARDING_CHECKLIST]: SubscriptionOnboardingDisplay,
  [AfterPaymentTemplateType.SUBSCRIPTION_SHIPMENT_INFO]: SubscriptionShipmentInfoDisplay,
  [AfterPaymentTemplateType.SUBSCRIPTION_CONTENT_TEASER]: SubscriptionContentTeaserDisplay,
  [AfterPaymentTemplateType.SUBSCRIPTION_PERSONAL_WELCOME]: SubscriptionPersonalWelcomeDisplay,
  [AfterPaymentTemplateType.RENTAL_RULES_WAIVER]: RentalRulesWaiverDisplay,
  [AfterPaymentTemplateType.RENTAL_ACCESS_CODE_TIMER]: RentalAccessCodeTimerDisplay,
  [AfterPaymentTemplateType.RENTAL_FIND_ON_MAP]: RentalFindOnMapDisplay,
  [AfterPaymentTemplateType.RENTAL_RATE_EXPERIENCE]: RentalRateExperienceDisplay,
  [AfterPaymentTemplateType.MEMBERSHIP_PASS_QR]: MembershipPassQRDisplay,
  [AfterPaymentTemplateType.MEMBERSHIP_WELCOME_ONBOARDING]: MembershipWelcomeDisplay,
  [AfterPaymentTemplateType.MEMBERSHIP_CONTENT_TEASER]: MembershipContentTeaserDisplay,
  [AfterPaymentTemplateType.MEMBERSHIP_REFERRAL]: SubscriptionReferralDisplay,
  [AfterPaymentTemplateType.VOUCHER_CODE_DISPLAY]: VoucherCodeDisplay,
  [AfterPaymentTemplateType.VOUCHER_SEND_AS_GIFT]: VoucherSendAsGiftDisplay,
  [AfterPaymentTemplateType.VOUCHER_CORPORATE_BRANDED]: VoucherCorporateBrandedDisplay,
  [AfterPaymentTemplateType.VOUCHER_INTERACTIVE_REVEAL]: VoucherInteractiveRevealDisplay,
};


interface AfterPaymentTemplatePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  template: AfterPaymentTemplate<any> | null;
  onApplyAfterPaymentTemplate: (template: AfterPaymentTemplate<any>) => void;
  activeTheme: ThemeDefinition; // Theme of the main page this AP template might apply to
  environment: 'test' | 'live';
  onAddToCart?: (lineItem: StripeLineItem, useCaseData?: any) => void;
  onInitiateCheckout?: (lineItems: StripeLineItem[], useCase: MonetizationUseCase, specificUseCaseData: any) => void;
}

const AfterPaymentTemplatePreviewModal: React.FC<AfterPaymentTemplatePreviewModalProps> = ({
  isOpen,
  onClose,
  template,
  onApplyAfterPaymentTemplate,
  activeTheme,
  environment,
  onAddToCart,
  onInitiateCheckout,
}) => {
  if (!isOpen || !template) {
    return null;
  }

  const handleApply = () => {
    onApplyAfterPaymentTemplate(template);
  };

  const renderPreviewContent = () => {
    if (!template) return null;

    const APComponent = afterPaymentComponentMapInternal[template.templateType];
    if (!APComponent) {
      return <div className="p-4 text-slate-500">Preview not available for this After Payment template type.</div>;
    }
    
    let mockSpecificPageConfig: Partial<BasePageLinkConfig> = {
        id: 'mock-page-config',
        pageId: 'MOCK1',
        useCase: template.useCase,
        pageStyle: { theme: activeTheme.id },
        currency: 'USD',
        mode: 'payment', // Default, can be overridden
        line_items: [],
        after_completion: {type: 'hosted_confirmation'},
        accessControl: { enabled: true, verificationType: 'single-use', showQRCode: true, showAccessLink: true },
    };

    const newMockSessionData: PageSessionData = {
        id: "AP_PREVIEW_SESSION",
        sessionId: "AP_PREVIEW_SESSION",
        tenantId: "ap_preview_tenant",
        useCase: template.useCase,
        status: SessionStatus.PAID,
        pageConfig: {} as BasePageLinkConfig, // Will be populated by the switch
        paymentDetails: {
          items: [{ name: "Example Item", price: 25.00, quantity: 1 }],
          totalAmount: 25.00,
          currency: 'USD', 
          paymentTimestamp: new Date().toISOString(),
        },
        submittedCustomFields: { 'member_name': 'Alex Preview' },
        afterPaymentConfig: {
          behavior: 'showAfterPaymentPage',
          templateDefinitionId: template.id,
          templateData: template.initialData, 
        },
        verificationStatus: 'verified',
        verificationHistory: [],
    };
    
    const newAdminData: { vouchers: Voucher[] } = {
        vouchers: [],
    };

    switch (template.useCase) {
        case MonetizationUseCase.PARKING_SESSION:
            mockSpecificPageConfig.line_items = MOCK_PARKING_RATES.map(rate => ({
                id: rate.id,
                price_data: { currency: 'USD', unit_amount: rate.price * 100, product_data: { name: `Parking - ${rate.duration}`, metadata: {hours: rate.hours} } }
            }));
            (mockSpecificPageConfig as Partial<ParkingPageLinkConfig>).locationName = "Preview Lot";
            (mockSpecificPageConfig as Partial<ParkingPageLinkConfig>).zoneId = "P-123";
            newMockSessionData.parking = { licensePlate: "PREVIEW", selectedRate: MOCK_PARKING_RATES[0] };
            break;
        case MonetizationUseCase.SUBSCRIPTION_RENTAL:
        case MonetizationUseCase.MEMBERSHIP_ACCESS:
            mockSpecificPageConfig.mode = 'subscription';
            mockSpecificPageConfig.line_items = [{
                id: 'prev_sub', price_data: { currency: 'USD', unit_amount: 1000, product_data: { name: 'Preview Plan', description: 'Feature 1' }, recurring: { interval: 'month', interval_count: 1 } }
            }];
            break;
        case MonetizationUseCase.VOUCHER:
            (mockSpecificPageConfig as Partial<VoucherPageLinkConfig>).pageTitle = "Preview Gift Card";
            newMockSessionData.voucherDetails = { voucherId: 'vouch_preview' };
            newAdminData.vouchers = [{
                id: 'vouch_preview', tenantId: 'ap_preview_tenant', code: 'GIFT-PREVIEW',
                initialAmount: 2500, remainingAmount: 2500, currency: 'usd', status: 'active',
                createdAt: new Date().toISOString(), createdFromPageId: 'mock-page-config'
            }];
            break;
        case MonetizationUseCase.RESTAURANT_BILL:
            mockSpecificPageConfig.line_items = [{id: 'prev_item', quantity: 1, price_data: { currency: 'USD', unit_amount: 1500, product_data: { name: 'Preview Item' } } }];
            (mockSpecificPageConfig as Partial<RestaurantBillPageLinkConfig>).defaultTaxRate = 0.08;
            break;
        case MonetizationUseCase.EVENT_TICKET_SALES:
            (mockSpecificPageConfig as Partial<EventTicketSalesPageLinkConfig>).eventTitle = "Preview Event";
            (mockSpecificPageConfig as Partial<EventTicketSalesPageLinkConfig>).eventDate = "2024-12-31";
            (mockSpecificPageConfig as Partial<EventTicketSalesPageLinkConfig>).eventTime = "18:00";
            (mockSpecificPageConfig as Partial<EventTicketSalesPageLinkConfig>).eventLocation = "Preview Venue";
            break;
        case MonetizationUseCase.APPOINTMENT_BOOKING:
            (mockSpecificPageConfig as Partial<AppointmentBookingPageLinkConfig>).serviceTitle = "Preview Service";
            (mockSpecificPageConfig as Partial<AppointmentBookingPageLinkConfig>).providerName = "Preview Provider";
            break;
        case MonetizationUseCase.SIMPLE_INVOICE:
            (mockSpecificPageConfig as Partial<SimpleInvoicePageLinkConfig>).invoiceNumber = "PREVIEW-INV-001";
            break;
    }

    newMockSessionData.pageConfig = mockSpecificPageConfig as BasePageLinkConfig;
    
    return <APComponent sessionData={newMockSessionData} templateData={template.initialData} theme={activeTheme} environment={environment} adminData={newAdminData as any} onAddToCart={onAddToCart} onInitiateCheckout={onInitiateCheckout} />;
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Preview AP Template: ${template.name}`} size="2xl">
      <div className="space-y-4">
        <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg -mx-2 -mt-2 mb-4 border-b border-slate-200">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl ${template.previewColorClass || 'bg-slate-200'} ${template.previewIconColorClass || 'text-slate-700'}`}>
            <i className="material-icons-round">{template.previewIcon}</i>
          </div>
          <div>
            <h3 className="text-md font-semibold text-slate-800">{template.name}</h3>
            <p className="text-xs text-slate-600">{template.description}</p>
          </div>
        </div>

        <div className="flex justify-center items-center py-4">
          <div className="w-[320px] h-[650px] bg-slate-800 rounded-[40px] p-2.5 shadow-2xl overflow-hidden ring-2 ring-slate-700">
            <div className={`w-full h-full rounded-[30px] overflow-hidden relative ${activeTheme.bgClass}`}>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-slate-800 rounded-b-lg z-10"></div>
              <div className="h-full overflow-y-auto no-scrollbar"> 
                {renderPreviewContent()}
              </div>
            </div>
          </div>
        </div>
        
        <p className="text-xs text-slate-500 text-center">
          This is a mobile preview ({environment.toUpperCase()} mode). Styling reflects the currently active main page theme.
        </p>

        <div className="mt-6 flex justify-end space-x-3">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="button" variant="primary" onClick={handleApply}>
            Apply this After Payment Template
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default AfterPaymentTemplatePreviewModal;