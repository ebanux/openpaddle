

// --- Page Templates ---
import { genericPaymentLinkTemplate } from './templates/pages/payment-link/pl-generic';
import { supportCreatorTemplate } from './templates/pages/donation/donate-support-creator';
import { charityGeneralTemplate } from './templates/pages/donation/donate-charity-general';
import { streamerTipsTemplate } from './templates/pages/donation/donate-streamer-tips';
import { projectSupportTemplate } from './templates/pages/donation/donate-project-support';
import { communityGardenTemplate } from './templates/pages/fundraising/fr-community-garden';
import { scholarshipFundTemplate } from './templates/pages/fundraising/fr-scholarship-fund';
import { animalShelterTemplate } from './templates/pages/fundraising/fr-animal-shelter';
import { techCrowdfundTemplate } from './templates/pages/fundraising/fr-tech-crowdfund';
import { ebookTemplate } from './templates/pages/product-sale/ps-ebook';
import { tshirtTemplate } from './templates/pages/product-sale/ps-tshirt';
import { musicAlbumTemplate } from './templates/pages/product-sale/ps-music-album';
import { artPrintTemplate } from './templates/pages/product-sale/ps-art-print';
import { onlineCourseTemplate } from './templates/pages/product-sale/ps-online-course';
import { gadgetPreorderTemplate } from './templates/pages/product-sale/ps-gadget-preorder';
import { softwareSubscriptionTemplate } from './templates/pages/subscription-rental/sub-software';
import { coffeeBoxSubscriptionTemplate } from './templates/pages/subscription-rental/sub-coffee-box';
import { newsletterSubscriptionTemplate } from './templates/pages/subscription-rental/sub-newsletter';
import { snackBoxSubscriptionTemplate } from './templates/pages/subscription-rental/sub-snack-box';
import { communityAccessSubscriptionTemplate } from './templates/pages/subscription-rental/sub-community-access';
import { serviceRetainerSubscriptionTemplate } from './templates/pages/subscription-rental/sub-service-retainer';
import { equipmentRentalTemplate } from './templates/pages/timed-rental/tr-equipment';
import { photoStudioRentalTemplate } from './templates/pages/timed-rental/tr-photo-studio';
import { scooterShareTemplate } from './templates/pages/timed-rental/tr-scooter-share';
import { partyEquipmentRentalTemplate } from './templates/pages/timed-rental/tr-party-equipment';
import { meetingRoomRentalTemplate } from './templates/pages/timed-rental/tr-meeting-room';
import { cityCenterParkingTemplate } from './templates/pages/parking-session/park-city-center';
import { musicFestTemplate } from './templates/pages/event-ticket-sales/event-music-fest';
import { corporateConferenceTemplate } from './templates/pages/event-ticket-sales/event-corp-conference';
import { communityWorkshopTemplate } from './templates/pages/event-ticket-sales/event-community-workshop';
import { charityGalaTemplate } from './templates/pages/event-ticket-sales/event-charity-gala';
import { quickRestaurantBillTemplate } from './templates/pages/restaurant-bill/rb-quick-pay';
import { musicianTipJarTemplate } from './templates/pages/tips/tip-jar-musician';
import { serviceWorkerTipJarTemplate } from './templates/pages/tips/tip-jar-service-worker';
import { eventStaffTipJarTemplate } from './templates/pages/tips/tip-jar-event-staff';
import { qrCodeTipJarTemplate } from './templates/pages/tips/tip-jar-qr-code';
import { consultationBookingTemplate } from './templates/pages/appointment-booking/ab-consultation';
import { professionalConsultantTemplate } from './templates/pages/appointment-booking/ab-professional-consultant';
import { wellnessSpaTemplate } from './templates/pages/appointment-booking/ab-wellness-spa';
import { creativeWorkshopTemplate } from './templates/pages/appointment-booking/ab-creative-workshop';
import { tutorLessonTemplate } from './templates/pages/appointment-booking/ab-tutor-lesson';
import { photoPackTemplate } from './templates/pages/digital-content-access/dca-photo-pack';
import { freelanceInvoiceTemplate } from './templates/pages/simple-invoice/si-freelance-work';
import { classicServiceInvoiceTemplate } from './templates/pages/simple-invoice/si-classic-service';
import { creativeProjectInvoiceTemplate } from './templates/pages/simple-invoice/si-creative-project';
import { hourlyWorkInvoiceTemplate } from './templates/pages/simple-invoice/si-hourly-work';
import { quickPaymentRequestTemplate } from './templates/pages/simple-invoice/si-quick-request';
import { videoCourseTemplate } from './templates/pages/digital-content-access/dca-video-course';
import { musicSingleTemplate } from './templates/pages/digital-content-access/dca-music-single';
import { softwareLicenseTemplate } from './templates/pages/digital-content-access/dca-software-license';
import { digitalMembershipPassTemplate } from './templates/pages/membership-access/ma-digital-pass';
import { gymFitnessMembershipTemplate } from './templates/pages/membership-access/ma-gym-fitness';
import { exclusiveCommunityTemplate } from './templates/pages/membership-access/ma-exclusive-community';
import { softwarePassTemplate } from './templates/pages/membership-access/ma-software-pass';
import { standardVoucherTemplate } from './templates/pages/vouchers/voucher-standard';
import { birthdayGiftCardTemplate } from './templates/pages/vouchers/voucher-birthday';
import { corporateGiftCardTemplate } from './templates/pages/vouchers/voucher-corporate';
import { holidayGiftCardTemplate } from './templates/pages/vouchers/voucher-holiday';
import { catalogStorefrontTemplate } from './templates/pages/catalog/catalog-storefront';


// --- After Payment Templates ---
import { fundraisingThankYouAPTemplate } from './templates/after-payment/fundraising/ap-fr-thank-you-share-v1';
import { fundraisingImpactReportAPTemplate } from './templates/after-payment/fundraising/ap-fr-impact-report-v1';
import { fundraisingUpdatesSignupAPTemplate } from './templates/after-payment/fundraising/ap-fr-updates-signup-v1';
import { fundraisingDonorWallAPTemplate } from './templates/after-payment/fundraising/ap-fr-donor-wall-v1';
import { donationSimpleThankYouAPTemplate } from './templates/after-payment/donation/ap-donate-simple-thank-you-v1';
import { donationPersonalNoteAPTemplate } from './templates/after-payment/donation/ap-donate-personal-note-v1';
import { donationSocialFollowAPTemplate } from './templates/after-payment/donation/ap-donate-social-follow-v1';
import { donationExploreContentAPTemplate } from './templates/after-payment/donation/ap-donate-explore-content-v1';
import { parkingActiveInfoAPTemplate } from './templates/after-payment/parking-session/ap-park-active-info-v1';
import { parkingExtendMapAPTemplate } from './templates/after-payment/parking-session/ap-park-extend-map-v1';
import { productOrderTrackingAPTemplate } from './templates/after-payment/product-sale/ap-prod-tracking-v1';
import { productUpsellAPTemplate } from './templates/after-payment/product-sale/ap-prod-upsell-v1';
import { productCommunityAPTemplate } from './templates/after-payment/product-sale/ap-prod-community-v1';
import { subscriptionWelcomeAPTemplate } from './templates/after-payment/subscription-rental/ap-sub-welcome-v1';
import { subscriptionManageAPTemplate } from './templates/after-payment/subscription-rental/ap-sub-manage-v1';
import { subscriptionReferralAPTemplate } from './templates/after-payment/subscription-rental/ap-sub-referral-v1';
import { subscriptionOnboardingAPTemplate } from './templates/after-payment/subscription-rental/ap-sub-onboarding-v1';
import { subscriptionShipmentInfoAPTemplate } from './templates/after-payment/subscription-rental/ap-sub-shipment-info-v1';
import { subscriptionContentTeaserAPTemplate } from './templates/after-payment/subscription-rental/ap-sub-content-teaser-v1';
import { subscriptionPersonalWelcomeAPTemplate } from './templates/after-payment/subscription-rental/ap-sub-personal-welcome-v1';
import { rentalInstructionsAPTemplate } from './templates/after-payment/timed-rental/ap-rental-instructions-v1';
import { rentalHelpAPTemplate } from './templates/after-payment/timed-rental/ap-rental-help-v1';
import { rentalRulesAPTemplate } from './templates/after-payment/timed-rental/ap-rental-rules-v1';
import { rentalAccessCodeAPTemplate } from './templates/after-payment/timed-rental/ap-rental-access-code-v1';
import { rentalMapAPTemplate } from './templates/after-payment/timed-rental/ap-rental-map-v1';
import { rentalRatingAPTemplate } from './templates/after-payment/timed-rental/ap-rental-rating-v1';
import { restaurantReceiptAPTemplate } from './templates/after-payment/restaurant-bill/ap-rb-receipt-v1';
import { restaurantFeedbackAPTemplate } from './templates/after-payment/restaurant-bill/ap-rb-feedback-loyalty-v1';
import { tipsThankYouAPTemplate } from './templates/after-payment/tips/ap-tip-thank-you-v1';
import { tipsSupportMoreAPTemplate } from './templates/after-payment/tips/ap-tip-support-more-v1';
import { tipsVideoThankYouAPTemplate } from './templates/after-payment/tips/ap-tip-video-thank-you-v1';
import { tipsSocialShoutoutAPTemplate } from './templates/after-payment/tips/ap-tip-social-shoutout-v1';
import { eventTicketQRAPTemplate } from './templates/after-payment/event-ticket-sales/ap-event-qr-v1';
import { eventInfoShareAPTemplate } from './templates/after-payment/event-ticket-sales/ap-event-share-v1';
import { eventHypePageAPTemplate } from './templates/after-payment/event-ticket-sales/ap-event-hype-v1';
import { eventPrepInfoAPTemplate } from './templates/after-payment/event-ticket-sales/ap-event-prep-info-v1';
import { appointmentBookingConfirmedAPTemplate } from './templates/after-payment/appointment-booking/ap-booking-confirmed-v1';
import { appointmentPrepInfoAPTemplate } from './templates/after-payment/appointment-booking/ap-booking-prep-info-v1';
import { appointmentBookingConfirmedCalendarAPTemplate } from './templates/after-payment/appointment-booking/ap-booking-confirmed-calendar-v1';
import { appointmentBookingIntakeFormAPTemplate } from './templates/after-payment/appointment-booking/ap-booking-intake-form-v1';
import { appointmentBookingUpsellAPTemplate } from './templates/after-payment/appointment-booking/ap-booking-upsell-v1';
import { appointmentBookingReferralAPTemplate } from './templates/after-payment/appointment-booking/ap-booking-referral-v1';
import { digitalContentDownloadAPTemplate } from './templates/after-payment/digital-content-access/ap-dc-download-v1';
import { digitalContentSupportMoreAPTemplate } from './templates/after-payment/digital-content-access/ap-dc-support-more-v1';
import { digitalContentCommunityFeedbackAPTemplate } from './templates/after-payment/digital-content-access/ap-dc-community-feedback-v1';
import { digitalContentLicenseKeyAPTemplate } from './templates/after-payment/digital-content-access/ap-dc-license-key-v1';
import { invoicePaidReceiptAPTemplate } from './templates/after-payment/simple-invoice/ap-invoice-receipt-v1';
import { invoiceNextStepsAPTemplate } from './templates/after-payment/simple-invoice/ap-invoice-next-steps-v1';
import { invoiceTestimonialAPTemplate } from './templates/after-payment/simple-invoice/ap-invoice-testimonial-v1';
import { invoiceUpsellAPTemplate } from './templates/after-payment/simple-invoice/ap-invoice-upsell-v1';
import { invoiceFinalFilesAPTemplate } from './templates/after-payment/simple-invoice/ap-invoice-final-files-v1';
import { invoiceSimpleThankYouAPTemplate } from './templates/after-payment/simple-invoice/ap-invoice-simple-thank-you-v1';
import { membershipPassQRAPTemplate } from './templates/after-payment/membership-access/ap-member-pass-qr-v1';
import { memberWelcomeOnboardingAPTemplate } from './templates/after-payment/membership-access/ap-member-welcome-onboarding-v1';
import { memberContentTeaserAPTemplate } from './templates/after-payment/membership-access/ap-member-content-teaser-v1';
import { memberReferralAPTemplate } from './templates/after-payment/membership-access/ap-member-referral-v1';
import { voucherCodeDisplayAPTemplate } from './templates/after-payment/voucher/ap-voucher-code-display-v1';
import { voucherSendAsGiftAPTemplate } from './templates/after-payment/voucher/ap-voucher-send-as-gift-v1';
import { voucherCorporateBrandedAPTemplate } from './templates/after-payment/voucher/ap-voucher-corporate-branded-v1';
import { voucherInteractiveRevealAPTemplate } from './templates/after-payment/voucher/ap-voucher-interactive-reveal-v1';


import { Template, BasePageLinkConfig, AfterPaymentTemplate } from './types';

export const APP_TEMPLATES: Template<BasePageLinkConfig>[] = [
  catalogStorefrontTemplate,
  genericPaymentLinkTemplate,
  supportCreatorTemplate,
  charityGeneralTemplate,
  streamerTipsTemplate,
  projectSupportTemplate,
  communityGardenTemplate,
  scholarshipFundTemplate,
  animalShelterTemplate,
  techCrowdfundTemplate,
  ebookTemplate,
  tshirtTemplate,
  musicAlbumTemplate,
  artPrintTemplate,
  onlineCourseTemplate,
  gadgetPreorderTemplate,
  softwareSubscriptionTemplate,
  coffeeBoxSubscriptionTemplate,
  newsletterSubscriptionTemplate,
  snackBoxSubscriptionTemplate,
  communityAccessSubscriptionTemplate,
  serviceRetainerSubscriptionTemplate,
  digitalMembershipPassTemplate,
  gymFitnessMembershipTemplate,
  exclusiveCommunityTemplate,
  softwarePassTemplate,
  standardVoucherTemplate,
  birthdayGiftCardTemplate,
  corporateGiftCardTemplate,
  holidayGiftCardTemplate,
  equipmentRentalTemplate,
  photoStudioRentalTemplate,
  scooterShareTemplate,
  partyEquipmentRentalTemplate,
  meetingRoomRentalTemplate,
  cityCenterParkingTemplate,
  musicFestTemplate,
  corporateConferenceTemplate,
  communityWorkshopTemplate,
  charityGalaTemplate,
  quickRestaurantBillTemplate,
  musicianTipJarTemplate,
  serviceWorkerTipJarTemplate,
  eventStaffTipJarTemplate,
  qrCodeTipJarTemplate,
  consultationBookingTemplate,
  professionalConsultantTemplate,
  wellnessSpaTemplate,
  creativeWorkshopTemplate,
  tutorLessonTemplate,
  photoPackTemplate,
  videoCourseTemplate,
  musicSingleTemplate,
  softwareLicenseTemplate,
  freelanceInvoiceTemplate,
  classicServiceInvoiceTemplate,
  creativeProjectInvoiceTemplate,
  hourlyWorkInvoiceTemplate,
  quickPaymentRequestTemplate,
];

export const APP_AFTER_PAYMENT_TEMPLATES: AfterPaymentTemplate<any>[] = [
  fundraisingThankYouAPTemplate,
  fundraisingImpactReportAPTemplate,
  fundraisingUpdatesSignupAPTemplate,
  fundraisingDonorWallAPTemplate,
  donationSimpleThankYouAPTemplate,
  donationPersonalNoteAPTemplate,
  donationSocialFollowAPTemplate,
  donationExploreContentAPTemplate,
  parkingActiveInfoAPTemplate,
  parkingExtendMapAPTemplate,
  productOrderTrackingAPTemplate,
  productUpsellAPTemplate,
  productCommunityAPTemplate,
  subscriptionWelcomeAPTemplate,
  subscriptionManageAPTemplate,
  subscriptionReferralAPTemplate,
  subscriptionOnboardingAPTemplate,
  subscriptionShipmentInfoAPTemplate,
  subscriptionContentTeaserAPTemplate,
  subscriptionPersonalWelcomeAPTemplate,
  membershipPassQRAPTemplate,
  memberWelcomeOnboardingAPTemplate,
  memberContentTeaserAPTemplate,
  memberReferralAPTemplate,
  voucherCodeDisplayAPTemplate,
  voucherSendAsGiftAPTemplate,
  voucherCorporateBrandedAPTemplate,
  voucherInteractiveRevealAPTemplate,
  rentalInstructionsAPTemplate,
  rentalHelpAPTemplate,
  rentalRulesAPTemplate,
  rentalAccessCodeAPTemplate,
  rentalMapAPTemplate,
  rentalRatingAPTemplate,
  restaurantReceiptAPTemplate,
  restaurantFeedbackAPTemplate,
  tipsThankYouAPTemplate,
  tipsSupportMoreAPTemplate,
  tipsVideoThankYouAPTemplate,
  tipsSocialShoutoutAPTemplate,
  eventTicketQRAPTemplate,
  eventInfoShareAPTemplate,
  eventHypePageAPTemplate,
  eventPrepInfoAPTemplate,
  appointmentBookingConfirmedAPTemplate,
  appointmentPrepInfoAPTemplate,
  appointmentBookingConfirmedCalendarAPTemplate,
  appointmentBookingIntakeFormAPTemplate,
  appointmentBookingUpsellAPTemplate,
  appointmentBookingReferralAPTemplate,
  digitalContentDownloadAPTemplate,
  digitalContentSupportMoreAPTemplate,
  digitalContentCommunityFeedbackAPTemplate,
  digitalContentLicenseKeyAPTemplate,
  invoicePaidReceiptAPTemplate,
  invoiceNextStepsAPTemplate,
  invoiceTestimonialAPTemplate,
  invoiceUpsellAPTemplate,
  invoiceFinalFilesAPTemplate,
  invoiceSimpleThankYouAPTemplate,
];