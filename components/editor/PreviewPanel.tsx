


import React from 'react';
import { BasePageLinkConfig, MonetizationUseCase, PreviewStep, ThemeDefinition, CustomerPortalConfig, AdminDashboardData, PageSessionData, StripeLineItem, AfterPaymentTemplateType, BaseAfterPaymentPageProps, SessionStatus, VerificationStatus } from '../../types';
import { THEMES, MOCK_CUSTOMER_PORTAL_DATA, MOCK_PARKING_RATES } from '../../constants';
import { APP_AFTER_PAYMENT_TEMPLATES } from '../../templates';

// Page Components
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
import CustomerPortalPage from '../../pages/customerPortal/CustomerPortalPage';
import CollapsibleSection from './CollapsibleSection';
import { SharePanel } from './SharePanel';
import Button from '../common/Button';
import CheckoutPreview from './CheckoutPreview';
import { useTranslation } from '../../i18n/I18nContext';

// After Payment Page Display Components
import FundraisingThankYouDisplay from '../../pages/afterPayment/FundraisingThankYouDisplay';
import FundraisingImpactReportDisplay from '../../pages/afterPayment/FundraisingImpactReportDisplay';
import FundraisingUpdatesSignupDisplay from '../../pages/afterPayment/FundraisingUpdatesSignupDisplay';
import FundraisingDonorWallDisplay from '../../pages/afterPayment/FundraisingDonorWallDisplay';
import ParkingActiveInfoDisplay from '../../pages/afterPayment/ParkingActiveInfoDisplay';
import ParkingExtendMapDisplay from '../../pages/afterPayment/ParkingExtendMapDisplay';
import ProductOrderConfirmedTrackingDisplay from '../../pages/afterPayment/ProductOrderConfirmedTrackingDisplay';
import ProductThankYouUpsellDisplay from '../../pages/afterPayment/ProductThankYouUpsellDisplay';
import SubscriptionActiveWelcomeDisplay from '../../pages/afterPayment/SubscriptionActiveWelcomeDisplay';
import SubscriptionManageExploreDisplay from '../../pages/afterPayment/SubscriptionManageExploreDisplay';
import TimedRentalStartedInstructionsDisplay from '../../pages/afterPayment/TimedRentalStartedInstructionsDisplay';
import RentalExtendHelpDisplay from '../../pages/afterPayment/RentalExtendHelpDisplay';
import RestaurantBillReceiptDisplay from '../../pages/afterPayment/RestaurantBillReceiptDisplay';
import RestaurantFeedbackLoyaltyDisplay from '../../pages/afterPayment/RestaurantFeedbackLoyaltyDisplay';
import TipsThankYouDisplay from '../../pages/afterPayment/TipsThankYouDisplay';
import TipsSupportMoreDisplay from '../../pages/afterPayment/TipsSupportMoreDisplay';
import EventTicketConfirmedQRDisplay from '../../pages/afterPayment/EventTicketConfirmedQRDisplay';
import EventInfoShareDisplay from '../../pages/afterPayment/EventInfoShareDisplay';
import AppointmentBookingConfirmedDisplay from '../../pages/afterPayment/AppointmentBookingConfirmedDisplay';
import AppointmentPreparationInfoDisplay from '../../pages/afterPayment/AppointmentPreparationInfoDisplay';
import DigitalContentAccessDownloadDisplay from '../../pages/afterPayment/DigitalContentAccessDownloadDisplay';
import DigitalContentSupportMoreDisplay from '../../pages/afterPayment/DigitalContentSupportMoreDisplay';
import InvoicePaidReceiptDisplay from '../../pages/afterPayment/InvoicePaidReceiptDisplay';
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


const afterPaymentComponentMap: Record<string, React.FC<BaseAfterPaymentPageProps<any>>> = {
  [AfterPaymentTemplateType.FUNDRAISING_THANK_YOU]: FundraisingThankYouDisplay,
  [AfterPaymentTemplateType.FUNDRAISING_IMPACT_REPORT]: FundraisingImpactReportDisplay,
  [AfterPaymentTemplateType.FUNDRAISING_UPDATES_SIGNUP]: FundraisingUpdatesSignupDisplay,
  [AfterPaymentTemplateType.FUNDRAISING_DONOR_WALL]: FundraisingDonorWallDisplay,
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

// Main Page Component Map
const pageComponentMap = {
    [MonetizationUseCase.PAYMENT_LINK]: PaymentLinkPage,
    [MonetizationUseCase.DONATION]: DonationPage,
    [MonetizationUseCase.FUNDRAISING]: FundraisingPage,
    [MonetizationUseCase.PRODUCT_SALE]: ProductPage,
    [MonetizationUseCase.SUBSCRIPTION_RENTAL]: SubscriptionRentalPage,
    [MonetizationUseCase.MEMBERSHIP_ACCESS]: MembershipPage,
    [MonetizationUseCase.VOUCHER]: VoucherPage,
    [MonetizationUseCase.TIMED_RENTAL]: TimedRentalPage,
    [MonetizationUseCase.PARKING_SESSION]: ParkingSessionPage,
    [MonetizationUseCase.RESTAURANT_BILL]: RestaurantBillPage,
    [MonetizationUseCase.TIPS]: TipsPage,
    [MonetizationUseCase.EVENT_TICKET_SALES]: EventTicketSalesPage,
    [MonetizationUseCase.APPOINTMENT_BOOKING]: AppointmentBookingPage,
    [MonetizationUseCase.DIGITAL_CONTENT_ACCESS]: DigitalContentAccessPage,
    [MonetizationUseCase.SIMPLE_INVOICE]: SimpleInvoicePage,
};

interface PreviewPanelProps {
    editorData: BasePageLinkConfig | null;
    previewStep: PreviewStep;
    environment: 'test' | 'live';
    publishedUrl: string | null;
    sessionUrl: string | null;
    activeTheme: ThemeDefinition;
    customerPortalConfig: CustomerPortalConfig;
    adminData: AdminDashboardData | null;

    onPreviewStepChange: (step: PreviewStep) => void;
    onPublish: () => void;
    onShare: (url: string | null, title: string) => void;
    onInitiateCheckout: (lineItems: StripeLineItem[], useCase: MonetizationUseCase, specificUseCaseData: any) => void;
    onAddToCart: (lineItem: StripeLineItem, useCaseData?: any) => void;
}

const PreviewPanel: React.FC<PreviewPanelProps> = ({
    editorData,
    previewStep,
    environment,
    publishedUrl,
    sessionUrl,
    activeTheme,
    customerPortalConfig,
    adminData,
    onPreviewStepChange,
    onPublish,
    onShare,
    onInitiateCheckout,
    onAddToCart,
}) => {
    const { t } = useTranslation();

    const renderPageContent = () => {
        if (!editorData) {
            return (
                <div className="p-6 text-center text-slate-500">
                    <p>{t('previewPanel.noPageSelected.title')}</p>
                    <p className="text-sm">{t('previewPanel.noPageSelected.description')}</p>
                </div>
            );
        }
    
        const PageComponent = pageComponentMap[editorData.useCase];
        if (!PageComponent) {
            return <div className="p-4">Preview not available for this use case.</div>;
        }

        const pageProps = {
            initialData: editorData as any, // Cast to any to bypass specific config type checks
            isLivePreview: true,
            onInitiateCheckout,
            onAddToCart,
            theme: activeTheme,
            environment,
            adminData: adminData!, 
        };

        // Special case for ParkingSessionPage
        if (editorData.useCase === MonetizationUseCase.PARKING_SESSION) {
            return <ParkingSessionPage {...pageProps} getParkingSpecificData={() => {}} />;
        }
    
        return <PageComponent {...pageProps} />;
    };

    const renderCheckoutContent = () => {
         if (!editorData) return <div className="p-6 text-center text-slate-500">{t('previewPanel.noPageSelected.configureFirst')}</div>;
        
         const primaryLineItem = editorData.line_items?.[0];
         const mockItem = {
            name: primaryLineItem?.price_data?.product_data?.name || "Example Item",
            price: (primaryLineItem?.price_data?.unit_amount || 2500) / 100, // Default to $25
            quantity: 1,
         };

         return (
            <div className="p-4 flex justify-center items-center">
                <CheckoutPreview
                    title={editorData.pageSlug || "Checkout"}
                    items={[mockItem]}
                    totalAmount={mockItem.price}
                    currency={editorData.currency || 'USD'}
                    environment={environment}
                />
            </div>
         );
    }
    
    const renderAfterPaymentContent = () => {
        if (!editorData) return <div className="p-6 text-center text-slate-500">{t('previewPanel.noPageSelected.configureFirst')}</div>;
        
        const templateId = editorData.selectedAfterPaymentTemplateId;
        const templateData = editorData.afterPaymentPageData;
        
        if (!templateId || !templateData) {
            return <div className="p-6 text-center text-slate-500">{t('previewPanel.noAfterPaymentTemplate')}</div>;
        }
        
        const apTemplateDefinition = APP_AFTER_PAYMENT_TEMPLATES.find(t => t.id === templateId);
        if (!apTemplateDefinition) {
             return <div className="p-6 text-center text-slate-500">{t('previewPanel.afterPaymentTemplateNotFound')}</div>;
        }
        
        const APComponent = afterPaymentComponentMap[apTemplateDefinition.templateType];
        if (!APComponent) {
            return <div className="p-6 text-center text-slate-500">{t('previewPanel.afterPaymentPreviewNotAvailable')}</div>;
        }

        const mockSessionData: PageSessionData = {
            id: "PREVIEW_SESS_123",
            sessionId: "PREVIEW_SESS_123",
            tenantId: editorData.tenantId,
            useCase: editorData.useCase,
            status: SessionStatus.PAID,
            pageConfig: editorData,
            paymentDetails: {
                items: [{ name: "Example Item", price: 25.00, quantity: 1 }],
                totalAmount: 25.00,
                currency: editorData.currency || 'USD',
                paymentTimestamp: new Date().toISOString(),
            },
            submittedCustomFields: {
                'preview_field': 'Sample Value'
            },
            afterPaymentConfig: {
                behavior: 'showAfterPaymentPage',
                templateDefinitionId: templateId,
                templateData: templateData,
            },
            verificationStatus: 'verified' as VerificationStatus,
            verificationHistory: [],
            parking: editorData.useCase === MonetizationUseCase.PARKING_SESSION ? { licensePlate: 'PREVIEW', selectedRate: MOCK_PARKING_RATES[0] } : undefined,
            voucherDetails: editorData.useCase === MonetizationUseCase.VOUCHER ? { voucherId: (adminData?.vouchers?.[0]?.id || 'vouch_preview') } : undefined,
        };
        
        return <APComponent sessionData={mockSessionData} templateData={templateData} theme={activeTheme} environment={environment} adminData={adminData || undefined} onInitiateCheckout={onInitiateCheckout} onAddToCart={onAddToCart} />;
    };
    
    const renderPortalContent = () => {
         return <CustomerPortalPage config={customerPortalConfig} customerData={MOCK_CUSTOMER_PORTAL_DATA} theme={activeTheme} />;
    }

    const renderContent = () => {
        switch (previewStep) {
            case 'page':
                return renderPageContent();
            case 'checkout':
                return renderCheckoutContent();
            case 'afterPayment':
                return renderAfterPaymentContent();
            case 'portal':
                return renderPortalContent();
            default:
                return renderPageContent();
        }
    };
    
    const isStepDisabled = (step: PreviewStep) => {
        if (!editorData) return true;
        if (step === 'portal') {
            return ![MonetizationUseCase.SUBSCRIPTION_RENTAL, MonetizationUseCase.MEMBERSHIP_ACCESS].includes(editorData.useCase);
        }
        return false;
    };
    
    const StepButton: React.FC<{ step: PreviewStep, children: React.ReactNode }> = ({ step, children }) => (
        <button
            type="button"
            disabled={isStepDisabled(step)}
            onClick={() => onPreviewStepChange(step)}
            className={`px-3 py-1.5 text-sm font-medium focus:outline-none rounded-md transition-colors ${
                previewStep === step
                ? 'bg-blue-600 text-white shadow'
                : 'text-slate-500 hover:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed'
            }`}
        >
            {children}
        </button>
    );

    return (
        <div className="h-full flex flex-col">
             <div className="flex-shrink-0 p-3 bg-slate-50 border-b border-slate-200 rounded-t-xl flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <StepButton step="page">{t('previewPanel.steps.page')}</StepButton>
                    <StepButton step="checkout">{t('previewPanel.steps.checkout')}</StepButton>
                    <StepButton step="afterPayment">{t('previewPanel.steps.afterPayment')}</StepButton>
                    <StepButton step="portal">{t('previewPanel.steps.portal')}</StepButton>
                </div>
                <div className="flex items-center space-x-2">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${environment === 'live' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {environment.toUpperCase()}
                    </span>
                    <Button
                        size="sm"
                        variant="primary"
                        onClick={onPublish}
                        disabled={!editorData || editorData.status === 'published'}
                    >
                        {t('common.publish')}
                    </Button>
                </div>
            </div>
            <div className="flex-1 min-h-0 bg-white shadow-inner">
                {editorData ? (
                    <CollapsibleSection title={t('previewPanel.shareAndTest')} defaultOpen={false}>
                        <SharePanel
                            publishedUrl={publishedUrl}
                            sessionUrl={sessionUrl}
                            pageId={editorData.pageId}
                            pageTitle={editorData.pageSlug || "Untitled Page"}
                            onShare={onShare}
                        />
                    </CollapsibleSection>
                ) : null}

                <div className="flex justify-center items-center p-4">
                    <div className="w-[320px] h-[650px] bg-slate-800 rounded-[40px] p-2.5 shadow-2xl overflow-hidden ring-2 ring-slate-700">
                         <div className={`w-full h-full ${activeTheme.bgClass} rounded-[30px] overflow-hidden relative`}>
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-slate-800 rounded-b-lg z-10"></div>
                            <div className="h-full overflow-y-auto no-scrollbar pt-8"> 
                                <div className="px-4 pb-8">
                                    {renderContent()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PreviewPanel;
