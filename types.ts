

import { ThemeDefinition } from './constants'; // Import ThemeDefinition
export type { ThemeDefinition }; // Re-export for other modules

export interface AIGenConfig {
  type: 'text' | 'image';
  contextField?: string;
  promptHint?: string;
}

export type AdminEntityType = 'products' | 'prices' | 'customers' | 'subscriptions' | 'transactions' | 'coupons' | 'taxRates' | 'shippingRates' | 'emailTemplates' | 'digitalAssets' | 'vouchers' | 'collections' | 'users';
export type EditorTab = 'config' | 'checkout' | 'afterPayment' | 'style' | 'portal';
export type PreviewStep = 'page' | 'checkout' | 'afterPayment' | 'portal';
export type AppView = 'landing' | 'editor' | 'admin' | 'session' | 'how-it-works' | 'solution-event-tickets' | 'solution-subscriptions' | 'solution-parking' | 'claim' | 'codes' | 'verify' | 'solution-event-tickets-old' | 'catalog';

export enum MonetizationUseCase {
  PAYMENT_LINK = 'Payment Link',
  DONATION = 'Donation',
  FUNDRAISING = 'Fundraiser',
  PRODUCT_SALE = 'Product Sale',
  SUBSCRIPTION_RENTAL = 'Subscription Rental',
  TIMED_RENTAL = 'Timed Rental',
  PARKING_SESSION = 'Parking Session',
  RESTAURANT_BILL = 'Restaurant Bill',
  TIPS = 'Tips',
  EVENT_TICKET_SALES = 'Event Ticket Sales',
  APPOINTMENT_BOOKING = 'Appointment Booking',
  DIGITAL_CONTENT_ACCESS = 'Digital Content Access',
  SIMPLE_INVOICE = 'Simple Invoice',
  MEMBERSHIP_ACCESS = 'Membership / Access Pass',
  VOUCHER = 'Voucher / Gift Card',
  CATALOG = 'Catalog',
}

// --- NEW Session Status Model ---
export enum SessionStatus {
  DRAFT = 'draft',
  AVAILABLE = 'available',
  IN_CHECKOUT = 'in_checkout',
  PAID = 'paid',
  ACTIVE = 'active',
  REDEEMED = 'redeemed',
  EXPIRED = 'expired',
  CANCELLED = 'cancelled',
  REFUNDED = 'refunded',
  ARCHIVED = 'archived'
}


// --- Stripe-aligned Product and Price Data ---
export interface StripeProductData {
  name: string;
  description?: string;
  images?: string[]; // Array of image URLs
  metadata?: { [key: string]: string | number | null }; // For additional product details
  // tax_code?: string; // Optional: for Stripe Tax
}

export interface StripeRecurringPriceData {
  interval: 'day' | 'week' | 'month' | 'year';
  interval_count?: number;
}

export interface StripePriceData {
  currency: string; // e.g., 'usd'
  unit_amount: number; // Amount in cents
  product_data: StripeProductData;
  recurring?: StripeRecurringPriceData;
  // tax_behavior?: 'inclusive' | 'exclusive' | 'unspecified'; // Optional
  // For Payment Links, a price can allow the unit_amount to be specified by the customer.
  custom_unit_amount?: {
    enabled: boolean;
    minimum_amount?: number; // In cents
    maximum_amount?: number; // In cents
    preset_amounts?: number[]; // In cents
  };
}

export interface StripeAdjustableQuantity {
  enabled: boolean;
  minimum?: number;
  maximum?: number;
}

export interface StripeLineItem {
  id?: string; // Our internal ID for the line item if needed for UI, or Stripe Price ID if pre-existing
  price_data?: StripePriceData; // Used for creating new prices on the fly
  price?: string; // Stripe Price ID (if using pre-existing prices)
  quantity?: number;
  adjustable_quantity?: StripeAdjustableQuantity;
  // dynamic_price: not directly supported by payment links in this way, use price_data.custom_unit_amount
}

// --- Cart System ---
export interface CartItem {
  id: string; // Unique ID for this cart entry (e.g., uuid)
  lineItem: StripeLineItem;
  quantity: number;
  product?: ShopProduct; // The full product details if available
  variant?: Variant; // The specific variant chosen
  addedAt: string;
}

// --- Stripe-aligned After Completion ---
export interface StripeHostedConfirmation {
  custom_message?: string;
}

export interface StripeRedirectAfterCompletion {
  url: string; // URL to redirect to, can use {CHECKOUT_SESSION_ID}
}

export interface StripeAfterCompletion {
  type: 'redirect' | 'hosted_confirmation' | 'custom_page_session'; // 'custom_page_session' is our internal type
  hosted_confirmation?: StripeHostedConfirmation;
  redirect?: StripeRedirectAfterCompletion;
  // For 'custom_page_session', we use _ourCustomAfterPaymentPageId and _ourCustomAfterPaymentPageData
}

// --- Stripe-aligned Custom Fields ---
export interface StripeCustomFieldDropdownOption {
  label: string;
  value: string;
}
export interface StripeCustomFieldDropdown {
  options: StripeCustomFieldDropdownOption[];
}
export interface StripeCustomField {
  key: string; // Developer-facing key
  label: {
    type: 'custom';
    custom: string; // Customer-facing label
  };
  type: 'text' | 'numeric' | 'dropdown';
  optional?: boolean;
  dropdown?: StripeCustomFieldDropdown;
  text?: { minimum_length?: number; maximum_length?: number; };
  numeric?: { minimum_value?: string; maximum_value?: string; }; // Stripe uses string for min/max numeric values
  defaultValue?: string | number; // Added defaultValue
}

// --- NEW: Access Control Settings ---
export interface AccessControlSettings {
  enabled: boolean;
  verificationType: 'single-use' | 'multi-use' | 'disabled';
  showQRCode: boolean;
  showAccessLink: boolean;
}

// --- Base Configuration for a Monetization Page (Stripe Payment Link inspired) ---
export interface BasePageLinkConfig {
  id: string; // Our internal ID for the configuration instance (e.g., 'fr-community-garden')
  tenantId: string; // MULTI-TENANCY: The ID of the tenant this page belongs to.
  status: 'draft' | 'published';
  _templateId?: string; // ID of the template this was created from
  createdAt?: string;
  pageId: string; // New 5-digit alphanumeric code for text-to-pay
  useCase: MonetizationUseCase; // Remains for our internal categorization and UI
  pageSlug?: string; // The user-editable path for the page URL
  pageStyle: PageStyle; // Our UI styling, not part of Stripe Payment Link directly

  // Stripe Payment Link equivalent fields
  mode: 'payment' | 'subscription';
  currency: string; // Default currency for the link
  line_items: StripeLineItem[];
  payment_method_types?: Array<'card' | 'us_bank_account' | 'klarna' | string>; // Add more as needed
  
  after_completion: StripeAfterCompletion;
  
  // Optional Stripe fields that Payment Links support
  submit_type?: 'auto' | 'pay' | 'book' | 'donate'; // Relevant for 'payment' mode
  billing_address_collection?: 'auto' | 'required';
  custom_fields?: StripeCustomField[];
  metadata?: { [key: string]: string | number | null }; // General metadata for the link

  // --- NEW OPTIONS BASED ON PAYMENT LINKS UI ---
  header_image_url?: string; // For a general banner image on the page
  page_description?: string; // A general description for the payment page

  payment_limits?: { // To simulate "Limit the number of payments"
    enabled: boolean;
    max_payments?: number; // Total number of payments allowed
    message_after_limit?: string; // Message if limit is reached
  };
  tax_id_collection?: { // To "Allow business customers to provide tax IDs"
    enabled: boolean;
  };
  consent_collection?: { // To "Require customers to accept your terms of service"
    terms_of_service?: 'required' | 'none'; 
    terms_of_service_url?: string; // Added for the actual URL
    // promotions?: 'auto' | 'none'; // Stripe also has this
  };
  automatic_tax?: { // To "Collect tax automatically"
    enabled: boolean;
  };
  shipping_address_collection?: { // To "Collect customers' addresses" (shipping part)
    enabled: boolean;
    allowed_countries?: string[]; // Array of ISO country codes
  };
  phone_number_collection?: { // To "Require customers to provide a phone number"
    enabled: boolean;
  };
  allow_promotion_codes?: boolean; // To "Allow promotion codes"
  save_payment_details_for_future_use?: boolean; // Added this option
  // --- END OF NEW OPTIONS ---

  // --- Fields for UI editor convenience & custom after payment page logic ---
  // These will often be mapped to/from `after_completion` or `metadata`
  // when interacting with Stripe or for specific internal behaviors.
  afterPaymentBehavior?: 'showAfterPaymentPage' | 'redirect';
  redirectUrl?: string;
  enableSessionPage?: boolean; // This influences _enableCustomPageSession or direct AP logic
  selectedAfterPaymentTemplateId?: string; // ID of our custom AfterPaymentTemplate (used if behavior is 'showAfterPaymentPage')
  afterPaymentPageData?: any; // Config for that custom AP template if behavior is 'showAfterPaymentPage'
  // --- END OF UI HELPER FIELDS ---
  tax_rate_ids?: string[];
  shipping_rate_ids?: string[];
  
  // --- NEW: Access Control ---
  accessControl: AccessControlSettings;

  // Our internal fields for custom after payment pages & session management
  _enableCustomPageSession?: boolean; // Our flag for enabling /s/SESSION_ID pages
  _ourCustomAfterPaymentPageId?: string; // ID of our custom AfterPaymentTemplate
  _ourCustomAfterPaymentPageData?: any; // Config for that custom AP template (e.g. FundraisingThankYouAPData)
}


// --- DEPRECATED Original Data Structures (to be phased out) ---
// These will be mapped to line_items or properties within BasePageLinkConfig
export interface Product {
  id: string; // Will map to a line_item's product_data or a Stripe Product ID
  name: string;
  description: string;
  price: number; // Will map to unit_amount in price_data
  imageUrl: string;
  currency: string;
}

export interface SubscriptionPlan {
  id: string; // Will map to a line_item (Price ID or new Price with recurring data)
  name: string;
  price: number;
  billingCycle: 'monthly' | 'yearly';
  features: string[];
  currency: string;
}

export interface RentableItem {
  id: string;
  name: string;
  ratePerHour: number;
  imageUrl: string;
  currency: string;
}

export interface ParkingRate {
  id: string;
  duration: string; 
  price: number;
  hours: number; 
}

export interface BillItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface TicketType {
  id: string;
  name: string;
  price: number;
  description: string;
}

export interface DurationOption {
  id:string;
  label: string;
  price: number;
  description: string;
}
// --- END OF DEPRECATED ---


// --- Page Style System (no changes needed) ---
export interface PageStyle {
  theme: string; // e.g., 'light', 'dark', 'playful'
}


// --- NEW SHOPIFY-LIKE PRODUCT MODEL ---

export interface Media {
  type: 'image' | 'video' | 'model';
  url: string;
  alt?: string;
  thumbnail?: string;
}

export interface Variant {
  id: string;
  sku: string;
  title: string; // e.g., "M / Red"
  price: number; // in cents
  compareAtPrice?: number | null; // in cents
  inventory_quantity: number;
  inventory_policy: 'deny' | 'continue';
  options: { [key: string]: string }; // e.g., { "Size": "M", "Color": "Red" }
  media?: Media[];
  metafields?: { [key: string]: any };
}

export interface ShopProduct {
  id: string;
  title: string;
  description: string;
  media?: Media[];
  tags?: string[];
  collectionIds?: string[];
  variants: Variant[];
  options: string[]; // e.g., ["Size", "Color"]
  metafields?: { [key: string]: any };
  createdAt?: string;
  updatedAt?: string;
}

export interface Collection {
  id: string;
  title: string;
  description?: string;
  productIds?: string[];
  metadata?: { [key: string]: any };
}

// --- TEAM MANAGEMENT & ROLES ---
export enum UserRole {
    Admin = 'Admin',
    Editor = 'Editor',
    Viewer = 'Viewer',
}

export interface TenantUser {
    id: string;
    email: string;
    role: UserRole;
    status: 'Pending' | 'Accepted';
}


// --- Use Case Specific PageLink Configs (can extend BasePageLinkConfig if needed) ---
// For now, many can just be BasePageLinkConfig or type aliases
// Specific fields from old XYZTemplateData will be mapped into line_items, product_data, custom_fields, or metadata.

export type PaymentLinkConfig = BasePageLinkConfig;

export type DonationPageLinkConfig = BasePageLinkConfig & {
  pageTitle: string;
  pageDescription: string;
  predefinedAmounts: number[];
  recipientName?: string;
};

export type FundraisingPageLinkConfig = BasePageLinkConfig & {
  pageTitle: string;
  pageDescription: string;
  predefinedAmounts: number[];
  whyDonatePoints: string[];
  targetAmount?: number;
  endDate?: string;
  showDonorList?: boolean;
};
export type ProductPageLinkConfig = BasePageLinkConfig & {
  productId?: string; // NEW: The ID of the ShopProduct to display.
  additionalDetails?: string[];
};
export type SubscriptionPageLinkConfig = BasePageLinkConfig & {
  pageTitle: string;
  pageDescription: string;
  // `plans` is deprecated, all plan data is derived from line_items + Admin Data Catalog
};
export type TimedRentalPageLinkConfig = BasePageLinkConfig & {
  pageTitle: string;
  pageDescription: string;
  // `items` is deprecated, all item data is derived from line_items + Admin Data Catalog
};
export type ParkingPageLinkConfig = BasePageLinkConfig & {
    pageTitle: string;
    // pageDescription is now in BasePageLinkConfig
    locationName?: string;
    zoneId?: string;
    operatorName?: string;
    locationAddress?: string;
    // `rates` is deprecated, all rate data is derived from line_items + Admin Data Catalog
    allowCustomDuration?: boolean;
    baseRatePerHour?: number;
    minDurationMinutes?: number;
    maxDurationHours?: number;
    durationIncrementMinutes?: number;
    serviceFee?: number;
    requestPhoneNumber?: boolean; // Will map to phone_number_collection
    payByPhoneInstructions?: string;
    infoPoints?: string[];
    invoiceNumber?: string; 
};
export type RestaurantBillPageLinkConfig = BasePageLinkConfig & {
    pageTitle: string;
    defaultTaxRate: number;
    predefinedTipPercentages: number[];
    // `billItems` is deprecated, all item data is derived from line_items + Admin Data Catalog
};
export type TipsPageLinkConfig = BasePageLinkConfig & {
    pageTitle: string;
    // pageDescription is now in BasePageLinkConfig
    predefinedAmounts: number[];
    whyTipText?: string;
};
export type EventTicketSalesPageLinkConfig = BasePageLinkConfig & {
    eventTitle: string;
    eventDescription: string; // Could also use page_description from Base
    eventDate: string;
    eventTime: string;
    eventLocation: string;
    eventBannerImageUrl?: string; // Could also use header_image_url from Base
    organizerName?: string;
    contactEmail?: string;
    // `ticketTypes` is deprecated, all type data is derived from line_items + Admin Data Catalog
};
export type AppointmentBookingPageLinkConfig = BasePageLinkConfig & {
    serviceTitle: string;
    serviceDescription: string; // Could also use page_description from Base
    serviceImageUrl?: string; // Could also use header_image_url from Base
    providerName?: string;
    contactInfo?: string;
    availabilityNotes?: string;
    // `pricePerServiceOrSlot` and `durationOptions` are deprecated, all option data is derived from line_items + Admin Data Catalog
};
export type DigitalContentAccessPageLinkConfig = BasePageLinkConfig & {
    contentTitle: string;
    contentDescription: string; // Could also use page_description from Base
    previewImageUrlOrVideoUrl?: string; // Could also use header_image_url from Base
    fileTypeOrFormat?: string;
    digitalAssetId?: string; // NEW: Link to a DigitalAsset entity
    // `price` is deprecated, all price data is derived from line_items + Admin Data Catalog
    accessInstructions?: string;
    creatorName?: string;
};
export type SimpleInvoicePageLinkConfig = BasePageLinkConfig & {
    requestTitle: string;
    yourNameOrBusinessName?: string;
    clientName?: string;
    itemDescription: string; // Could also use page_description from Base
    // `amountDue` is deprecated, all amount data is derived from line_items + Admin Data Catalog
    dueDate?: string;
    notes?: string;
    invoiceNumber?: string;
};
export type MembershipAccessPageLinkConfig = BasePageLinkConfig & {
  pageTitle: string;
  pageDescription: string;
  benefits: string[];
};
export interface VoucherPageLinkConfig extends BasePageLinkConfig {
  pageTitle: string;
  pageDescription: string;
}
export interface CatalogPageLinkConfig extends BasePageLinkConfig {
    pageTitle: string;
    pageDescription: string;
    collectionIds: string[];
}


// --- Template System Types (Template remains, but its T will be a PageLinkConfig) ---
export interface Template<T extends BasePageLinkConfig = BasePageLinkConfig> {
  id: string; // e.g. "fr-community-garden"
  name: string;
  useCase: MonetizationUseCase;
  description: string;
  previewIcon: string; 
  previewColorClass: string; 
  previewIconColorClass: string;
  initialData: T; // This will now be BasePageLinkConfig or its derivatives
}


// --- AFTER PAYMENT TEMPLATE TYPES (These describe OUR custom pages, so structure remains mostly) ---
export enum AfterPaymentTemplateType {
  // Fundraising
  FUNDRAISING_THANK_YOU = 'FundraisingThankYou',
  FUNDRAISING_IMPACT_REPORT = 'FundraisingImpactReport',
  FUNDRAISING_UPDATES_SIGNUP = 'FundraisingUpdatesSignup',
  FUNDRAISING_DONOR_WALL = 'FundraisingDonorWall',
  // Donation
  DONATION_SIMPLE_THANK_YOU = 'DonationSimpleThankYou',
  DONATION_PERSONAL_NOTE = 'DonationPersonalNote',
  DONATION_SOCIAL_FOLLOW = 'DonationSocialFollow',
  DONATION_EXPLORE_CONTENT = 'DonationExploreContent',
  // Parking
  PARKING_ACTIVE_INFO = 'ParkingActiveInfo',
  PARKING_EXTEND_MAP = 'ParkingExtendMap',
  // Product
  PRODUCT_ORDER_CONFIRMED_TRACKING = 'ProductOrderConfirmedTracking',
  PRODUCT_THANK_YOU_UPSELL = 'ProductThankYouUpsell',
  PRODUCT_UPDATES_COMMUNITY = 'ProductUpdatesCommunity',
  // Subscription
  SUBSCRIPTION_ACTIVE_WELCOME = 'SubscriptionActiveWelcome',
  SUBSCRIPTION_MANAGE_EXPLORE = 'SubscriptionManageExplore',
  SUBSCRIPTION_REFERRAL = 'SubscriptionReferral',
  SUBSCRIPTION_ONBOARDING_CHECKLIST = 'SubscriptionOnboardingChecklist',
  SUBSCRIPTION_SHIPMENT_INFO = 'SubscriptionShipmentInfo',
  SUBSCRIPTION_CONTENT_TEASER = 'SubscriptionContentTeaser',
  SUBSCRIPTION_PERSONAL_WELCOME = 'SubscriptionPersonalWelcome',
  // Timed Rental
  RENTAL_STARTED_INSTRUCTIONS = 'RentalStartedInstructions',
  RENTAL_EXTEND_HELP = 'RentalExtendHelp', 
  RENTAL_RULES_WAIVER = 'RentalRulesWaiver',
  RENTAL_ACCESS_CODE_TIMER = 'RentalAccessCodeTimer',
  RENTAL_FIND_ON_MAP = 'RentalFindOnMap',
  RENTAL_RATE_EXPERIENCE = 'RentalRateExperience',
  // Restaurant Bill
  RESTAURANT_BILL_RECEIPT = 'RestaurantBillReceipt',
  RESTAURANT_FEEDBACK_LOYALTY = 'RestaurantFeedbackLoyalty', 
  // Tips
  TIPS_THANK_YOU = 'TipsThankYou',
  TIPS_SUPPORT_MORE = 'TipsSupportMore', 
  TIPS_VIDEO_THANK_YOU = 'TipsVideoThankYou',
  TIPS_SOCIAL_SHOUTOUT = 'TipsSocialShoutout',
  // Event Tickets
  EVENT_TICKET_CONFIRMED_QR = 'EventTicketConfirmedQR',
  EVENT_INFO_SHARE = 'EventInfoShare',
  EVENT_HYPE_PAGE = 'EventHypePage',
  EVENT_PREPARATION_INFO = 'EventPreparationInfo',
  // Appointment Booking
  APPOINTMENT_BOOKING_CONFIRMED = 'AppointmentBookingConfirmed',
  APPOINTMENT_PREPARATION_INFO = 'AppointmentPreparationInfo',
  APPOINTMENT_BOOKING_CONFIRMED_CALENDAR = 'AppointmentBookingConfirmedCalendar',
  APPOINTMENT_BOOKING_INTAKE_FORM = 'AppointmentBookingIntakeForm',
  APPOINTMENT_BOOKING_UPSELL = 'AppointmentBookingUpsell',
  APPOINTMENT_BOOKING_REFERRAL = 'AppointmentBookingReferral',
  // Digital Content
  DIGITAL_CONTENT_ACCESS_DOWNLOAD = 'DigitalContentAccessDownload',
  DIGITAL_CONTENT_SUPPORT_MORE = 'DigitalContentSupportMore',
  DIGITAL_CONTENT_COMMUNITY_FEEDBACK = 'DigitalContentCommunityFeedback',
  DIGITAL_CONTENT_LICENSE_KEY = 'DigitalContentLicenseKey',
  // Simple Invoice
  INVOICE_PAID_RECEIPT = 'InvoicePaidReceipt',
  INVOICE_NEXT_STEPS_RATE = 'InvoiceNextStepsRate',
  INVOICE_UPSELL_SERVICES = 'InvoiceUpsellServices',
  INVOICE_SIMPLE_THANK_YOU = 'InvoiceSimpleThankYou',
  INVOICE_FINAL_FILES = 'InvoiceFinalFiles',
  // Membership
  MEMBERSHIP_PASS_QR = 'MembershipPassQR',
  MEMBERSHIP_WELCOME_ONBOARDING = 'MembershipWelcomeOnboarding',
  MEMBERSHIP_CONTENT_TEASER = 'MembershipContentTeaser',
  MEMBERSHIP_REFERRAL = 'MembershipReferral',
  // Voucher
  VOUCHER_CODE_DISPLAY = 'VoucherCodeDisplay',
  VOUCHER_SEND_AS_GIFT = 'VoucherSendAsGift',
  VOUCHER_CORPORATE_BRANDED = 'VoucherCorporateBranded',
  VOUCHER_INTERACTIVE_REVEAL = 'VoucherInteractiveReveal',
}

// Base for OUR custom after payment page configurations
export interface BaseAfterPaymentTemplateData {
  id?: string; // Instance ID, not the definition ID
  templateDefinitionId: string; // e.g., 'parking-active-info-v1', links to AfterPaymentTemplate.id
  title?: string; // Optional override for the AP page title, mainly for UI
  mainMessage: string; // Core message for the AP page
  showSubmittedCustomFields?: boolean; // New field
}

// Specific After Payment Template Data interfaces (largely unchanged)
export interface FundraisingThankYouAPData extends BaseAfterPaymentTemplateData {
  thankYouMessage: string;
  showDonationAmount: boolean;
  socialSharePrompt?: string;
  socialShareLink?: string; 
  furtherSupportMessage?: string;
  furtherSupportLink?: string;
}

export interface FundraisingImpactReportAPData extends BaseAfterPaymentTemplateData {
    reportHeadline: string;
    impactStats: Array<{ value: string; label: string; }>;
    nextGoalMessage?: string;
    progressPercentage?: number;
}

export interface FundraisingUpdatesSignupAPData extends BaseAfterPaymentTemplateData {
    signupHeadline: string;
    signupBlurb?: string;
    showEmailSignupForm: boolean;
    formButtonText?: string;
}

export interface FundraisingDonorWallAPData extends BaseAfterPaymentTemplateData {
    donorWallHeadline: string;
    anonymizeDonors: boolean;
    donorWallMessage?: string;
    displayLevels: boolean; // e.g. Gold, Silver, Bronze donors
}

// --- Donation AP Data Interfaces ---
export interface DonationSimpleThankYouAPData extends BaseAfterPaymentTemplateData {
  showDonationAmount: boolean;
}

export interface DonationPersonalNoteAPData extends BaseAfterPaymentTemplateData {
  imageUrl?: string;
  personalMessage: string;
}

export interface DonationSocialFollowAPData extends BaseAfterPaymentTemplateData {
  followHeadline: string;
  followMessage: string;
  socialMediaLinks?: Array<{ platform: string; link: string; }>;
}

export interface DonationExploreContentAPData extends BaseAfterPaymentTemplateData {
  exploreHeadline: string;
  contentLinks?: Array<{ title: string; link: string; }>;
}

// ... (other APData interfaces like ParkingActiveInfoAPData, etc., remain the same for now) ...
export interface ParkingActiveInfoAPData extends BaseAfterPaymentTemplateData {
  showEndTime: boolean;
  showParkingLotRulesLink?: boolean;
  parkingLotRulesLink?: string;
  customNote?: string;
  showLocationName?: boolean;
  showZoneId?: boolean;
  showOperatorName?: boolean;
  showPhoneNumber?: boolean;
}

export interface ParkingExtendMapAPData extends BaseAfterPaymentTemplateData {
  mapEmbedUrl?: string; 
  extendButtonText: string;
  locationHelpText?: string;
}

export interface ProductOrderConfirmedTrackingAPData extends BaseAfterPaymentTemplateData {
  showEstimatedDelivery: boolean;
  estimatedDeliveryText?: string; 
  trackingLinkButtonText?: string; 
  mockTrackingLink?: string; 
}

export interface ProductUpdatesCommunityAPData extends BaseAfterPaymentTemplateData {
  statusHeadline: string;
  communityHeadline?: string;
  communityMessage?: string;
  discordLink?: string;
  facebookGroupLink?: string;
}

export interface EventHypePageAPData extends BaseAfterPaymentTemplateData {
  hypeHeadline: string;
  showCountdown: boolean;
  mapEmbedUrl?: string;
  playlistEmbedUrl?: string;
}

export interface SubscriptionReferralAPData extends BaseAfterPaymentTemplateData {
  referralHeadline: string;
  referralMessage: string;
  referralCode: string;
  socialShareText?: string;
}

export interface OnboardingStep {
  text: string;
  isComplete: boolean; // For display purposes, not functional in preview
}

export interface SubscriptionOnboardingAPData extends BaseAfterPaymentTemplateData {
  onboardingHeadline: string;
  onboardingSteps: OnboardingStep[];
}

export interface SubscriptionShipmentInfoAPData extends BaseAfterPaymentTemplateData {
  shipmentHeadline: string;
  shipmentDetails: string;
  trackingNumber?: string; // Mock
}

export interface ContentTeaserItem {
  title: string;
  imageUrl: string;
  link?: string;
  description?: string;
}

export interface SubscriptionContentTeaserAPData extends BaseAfterPaymentTemplateData {
  teaserHeadline: string;
  teaserItems: ContentTeaserItem[];
}

export interface SubscriptionPersonalWelcomeAPData extends BaseAfterPaymentTemplateData {
  welcomeHeadline: string;
  personalMessage: string;
  videoEmbedUrl?: string;
}

export interface TipsVideoThankYouAPData extends BaseAfterPaymentTemplateData {
  thankYouHeadline: string;
  videoEmbedUrl: string;
}

export interface TipsSocialShoutoutAPData extends BaseAfterPaymentTemplateData {
  socialPlatform: 'Twitter' | 'Instagram' | 'Facebook';
  prewrittenText: string;
  creatorHandle: string;
}

export interface ProductThankYouUpsellAPData extends BaseAfterPaymentTemplateData {
  thankYouHeadline: string;
  upsellSectionTitle?: string;
  upsellItems?: Array<{ name: string; description: string; price: string; imageUrl: string; link: string }>;
  reviewPromptText?: string;
}

export interface SubscriptionActiveWelcomeAPData extends BaseAfterPaymentTemplateData {
  welcomeHeadline: string;
  planBenefits?: string[]; 
  accessContentButtonText?: string;
  accessContentLink?: string;
  showNextBillingDate?: boolean;
}

export interface SubscriptionManageExploreAPData extends BaseAfterPaymentTemplateData {
  manageSubscriptionButtonText: string;
  stripeCustomerPortalLink?: string; 
  exploreFeaturesSectionTitle?: string;
  featuresToExplore?: Array<{ name: string; description: string; link?: string }>;
}

export interface DigitalContentAccessDownloadAPData extends BaseAfterPaymentTemplateData {
  downloadSectionTitle: string;
  downloadItems: Array<{fileName: string; downloadLink: string; fileType?: string; fileSize?:string;}>; 
  postDownloadInstructions?: string;
}

export interface TimedRentalStartedInstructionsAPData extends BaseAfterPaymentTemplateData {
  instructionsHeadline: string;
  instructionsList: string[];
  returnInfo?: string;
  emergencyContact?: string;
}

export interface RentalExtendHelpAPData extends BaseAfterPaymentTemplateData {
  helpHeadline: string;
  helpResources?: Array<{ title: string; link?: string; description?: string; }>;
  contactSupportText?: string;
  faqLink?: string;
}

export interface RentalRulesWaiverAPData extends BaseAfterPaymentTemplateData {
  rulesHeadline: string;
  rentalRules: string[];
  waiverText: string;
  accessInfoAfterWaiver: string;
}

export interface RentalAccessCodeTimerAPData extends BaseAfterPaymentTemplateData {
  accessCodeHeadline: string;
  accessCode: string;
  timerHeadline: string;
}

export interface RentalFindOnMapAPData extends BaseAfterPaymentTemplateData {
  mapHeadline: string;
  mapEmbedUrl: string;
}

export interface RentalRateExperienceAPData extends BaseAfterPaymentTemplateData {
  ratingHeadline: string;
  feedbackPrompt: string;
}

export interface RestaurantBillReceiptAPData extends BaseAfterPaymentTemplateData {
  showItemizedList: boolean;
  showTipAmount: boolean;
  feedbackPrompt?: string;
  loyaltyProgramLink?: string;
}

export interface RestaurantFeedbackLoyaltyAPData extends BaseAfterPaymentTemplateData {
  feedbackPromptHeadline?: string;
  feedbackFormLink?: string; 
  loyaltyProgramHeadline?: string;
  loyaltyProgramDetails?: string;
  loyaltyProgramJoinLink?: string;
}

export interface TipsThankYouAPData extends BaseAfterPaymentTemplateData {
  showAmountTipped: boolean;
  personalNote?: string;
  nextStepSuggestion?: string;
  nextStepLink?: string;
}

export interface EventTicketConfirmedQRAPData extends BaseAfterPaymentTemplateData {
  qrCodeInfoText: string;
  showEventDetails: boolean;
  additionalInstructions?: string;
}

export interface EventInfoShareAPData extends BaseAfterPaymentTemplateData {
  eventRecapHeadline: string;
  sharePrompt: string;
  shareButtons?: Array<{ platform: 'Facebook' | 'Twitter' | 'LinkedIn' | 'Email'; link?: string; text?: string; }>;
  galleryLink?: string;
  galleryButtonText?: string;
  nextEventPrompt?: string;
  nextEventLink?: string;
  nextEventButtonText?: string;
}

export interface EventPreparationInfoAPData extends BaseAfterPaymentTemplateData {
  preparationHeadline: string;
  preparationSteps: string[];
  whatNotToDo?: string[];
  venueMapEmbedUrl?: string;
  contactForHelp?: string;
}

export interface AppointmentBookingConfirmedAPData extends BaseAfterPaymentTemplateData {
  confirmationHeadline: string;
  showAppointmentDetails: boolean;
  whatToExpect?: string[];
  contactForQuestions?: string;
}

export interface AppointmentBookingConfirmedCalendarAPData extends AppointmentBookingConfirmedAPData {
  showAddToCalendar: boolean;
}

export interface AppointmentBookingIntakeFormAPData extends BaseAfterPaymentTemplateData {
  formHeadline: string;
  formDescription?: string;
  intakeFormUrl: string;
  formButtonText: string;
}

export interface AppointmentBookingUpsellAPData extends BaseAfterPaymentTemplateData {
  upsellHeadline: string;
  upsellDescription?: string;
  upsellItems?: Array<{ name: string; description: string; price: string; link: string; }>;
}

export interface AppointmentBookingReferralAPData extends BaseAfterPaymentTemplateData {
  referralHeadline: string;
  referralMessage: string;
  referralCode: string;
  socialShareText?: string;
}

export interface AppointmentPreparationInfoAPData extends BaseAfterPaymentTemplateData {
  preparationHeadline: string;
  preparationSteps: string[];
  whatNotToDo?: string[];
  locationMapEmbedUrl?: string;
  contactForHelp?: string;
}

export interface DigitalContentCommunityFeedbackAPData extends BaseAfterPaymentTemplateData {
  communityHeadline: string;
  communityJoinLink?: string;
  communityButtonText?: string;
  feedbackHeadline: string;
  feedbackFormLink?: string;
  feedbackButtonText?: string;
}

export interface DigitalContentLicenseKeyAPData extends BaseAfterPaymentTemplateData {
  licenseKeyHeadline: string;
  licenseKey: string;
  activationInstructions: string;
}

export interface InvoicePaidReceiptAPData extends BaseAfterPaymentTemplateData {
  receiptHeadline: string;
  showInvoiceNumber: boolean;
  showPaymentDetails: boolean;
  nextSteps?: string;
  downloadPdfLink?: string;
}

export interface InvoiceNextStepsRateAPData extends BaseAfterPaymentTemplateData {
  nextStepsHeadline: string;
  nextStepsList?: string[];
  requestFeedbackText?: string;
  requestFeedbackLink?: string;
  leaveReviewText?: string;
  leaveReviewLink?: string;
}

export interface InvoiceSimpleThankYouAPData extends BaseAfterPaymentTemplateData {
  personalNote: string;
}

export interface InvoiceUpsellServicesAPData extends BaseAfterPaymentTemplateData {
  upsellSectionTitle: string;
  upsellItems?: Array<{ name: string; description: string; price: string; link: string; }>;
}

export interface MembershipPassQRAPData extends BaseAfterPaymentTemplateData {
  qrCodeInfoText: string;
  showMembershipDetails: boolean;
  additionalInstructions?: string;
}

export interface MembershipWelcomeOnboardingAPData extends BaseAfterPaymentTemplateData {
  welcomeHeadline: string;
  onboardingSteps: OnboardingStep[];
  showPassQRCode?: boolean;
}

export interface MembershipContentTeaserAPData extends BaseAfterPaymentTemplateData {
  teaserHeadline: string;
  teaserItems: ContentTeaserItem[];
  showPassQRCode?: boolean;
}

export interface MembershipReferralAPData extends SubscriptionReferralAPData {
  showPassQRCode?: boolean;
}

export interface VoucherCodeDisplayAPData extends BaseAfterPaymentTemplateData {
  headline: string;
  instructions: string;
  showQRCodeForCode: boolean;
}

export interface VoucherSendAsGiftAPData extends BaseAfterPaymentTemplateData {
  headline: string;
  sendPrompt: string;
  recipientEmailLabel: string;
  messageLabel: string;
  sendButtonText: string;
}

export interface VoucherCorporateBrandedAPData extends BaseAfterPaymentTemplateData {
  headline: string;
  companyNameLabel: string;
  issuedByLabel: string;
}

export interface VoucherInteractiveRevealAPData extends BaseAfterPaymentTemplateData {
  headline: string;
  revealPrompt: string;
  revealButtonText: string;
}

export interface DigitalContentSupportMoreAPData extends BaseAfterPaymentTemplateData {
  supportHeadline: string;
  supportMessage?: string;
  viewOtherProductsLink?: string;
  viewOtherProductsButtonText?: string;
  merchandiseLink?: string;
  merchandiseButtonText?: string;
  socialMediaPrompt?: string;
  socialMediaLinks?: Array<{ platform: string; link: string; iconSvg?: string; }>;
}

export interface TipsSupportMoreAPData extends BaseAfterPaymentTemplateData {
  supportMoreHeadline: string;
  supportMoreMessage?: string;
  otherWaysToSupport?: Array<{ title: string; description: string; link: string; }>;
  socialMediaLinks?: Array<{ platform: string; link: string; iconSvg?: string; }>;
}

// These types were inferred from constants and other parts of the app.
// Adding them here because they are imported from 'types.ts' but were missing.
// --- Data Catalog for Admin Dashboard ---
export interface AdminMonetizationPage {
  id: string;
  tenantId: string;
  name: string;
  useCase: MonetizationUseCase;
  revenue: number;
  transactions: number;
  createdAt: string;
  status: 'draft' | 'published';
}

export interface StripeProduct {
  id: string;
  tenantId: string;
  active: boolean;
  name: string;
  description?: string;
  images?: string[];
  metadata?: { [key: string]: any };
}

export interface StripePrice {
  id: string;
  tenantId: string;
  product: string;
  active: boolean;
  unit_amount: number;
  currency: string;
  type: 'one_time' | 'recurring';
  recurring?: {
    interval: 'day' | 'week' | 'month' | 'year';
    interval_count?: number;
  };
}

export interface StripeCoupon {
  id: string;
  tenantId: string;
  name: string;
  percent_off?: number;
  amount_off?: number;
  currency?: string;
  valid: boolean;
}

export interface StripeTaxRate {
  id: string;
  tenantId: string;
  active: boolean;
  display_name: string;
  inclusive: boolean;
  percentage: number;
  country?: string;
  state?: string;
  jurisdiction?: string;
  description?: string;
}

export interface StripeShippingRate {
  id: string;
  tenantId: string;
  active: boolean;
  display_name: string;
  type: 'fixed_amount';
  fixed_amount: {
    amount: number;
    currency: string;
  };
  delivery_estimate?: {
    minimum: { unit: string; value: number };
    maximum: { unit: string; value: number };
  };
}


export interface StripeCustomer {
  id: string;
  tenantId: string;
  name: string;
  email: string;
  phone: string;
  created: number;
}

export interface StripeSubscription {
  id: string;
  tenantId: string;
  customer: string;
  status: 'active' | 'canceled' | 'past_due' | 'unpaid' | 'incomplete' | 'incomplete_expired' | 'trialing';
  items: { price: string }[];
  created: number;
  current_period_start: number;
  current_period_end: number;
}

export interface StripeTransaction {
  id: string;
  tenantId: string;
  customer: string | null;
  amount: number;
  currency: string;
  status: 'succeeded' | 'pending' | 'failed';
  description: string;
  created: number;
  pageId?: string;
  productId?: string;
  variantId?: string;
}

export interface DailyTransactionMetrics {
  date: string; // "YYYY-MM-DD"
  revenue: number;
  transactions: number;
}

export interface EmailTemplate {
  id: string;
  tenantId: string;
  name: string;
  subject: string;
  body: string;
  triggerPageId: 'all' | string;
  triggerSessionStatus: SessionStatus;
  isEnabled: boolean;
}

export interface DigitalAsset {
  id: string;
  tenantId: string;
  name: string;
  description: string;
  fileName: string;
  fileUrl: string;
  fileType: string;
  fileSize: number; // in KB
}

export interface Donation {
  id: string;
  tenantId: string;
  pageId: string;
  donorName: string;
  amount: number;
  timestamp: string;
}

export interface Voucher {
  id: string;
  tenantId: string;
  code: string;
  initialAmount: number; // in cents
  remainingAmount: number; // in cents
  currency: string;
  status: 'active' | 'partially_redeemed' | 'redeemed' | 'expired' | 'disabled';
  createdAt: string;
  expiresAt?: string;
  createdFromPageId: string;
}

export interface CustomerPortalConfig {
  tenantId: string;
  portalTitle: string;
  welcomeMessage: string;
  theme: string;
  showPaymentHistory: boolean;
  allowSubscriptionCancellation: boolean;
  allowPaymentMethodUpdate: boolean;
  supportContactInfo: string;
}

export interface AdminDashboardData {
  summaryStats: {
    totalRevenue: number;
    activeSubscriptions: number;
    totalCustomers: number;
    totalTransactions: number;
  };
  pages: AdminMonetizationPage[];
  products: StripeProduct[];
  shopProducts?: ShopProduct[];
  collections?: Collection[];
  prices: StripePrice[];
  coupons: StripeCoupon[];
  taxRates: StripeTaxRate[];
  shippingRates: StripeShippingRate[];
  customers: StripeCustomer[];
  subscriptions: StripeSubscription[];
  transactions: StripeTransaction[];
  sessions: PageSessionData[];
  dailyMetrics: DailyTransactionMetrics[];
  emailTemplates: EmailTemplate[];
  digitalAssets: DigitalAsset[];
  donations: Donation[];
  vouchers: Voucher[];
  users: TenantUser[];
}

// These types seem to be used by App.tsx, adding them here.
export type JsonSchema = any;
export type SchemaProperty = any;

export interface CheckoutItem {
  name: string;
  price: number;
  quantity: number;
}

export interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmWithStripe: (paymentMethodId: string) => void;
  title: string;
  items: CheckoutItem[];
  totalAmount: number;
  currency: string;
  isProcessingExternally?: boolean;
  externalError?: string | null;
  environment: 'test' | 'live';
  originalTotalAmount?: number;
  appliedPromotionCode?: string;
  discountAmountApplied?: number;
}

export type AfterPaymentTemplate<T = any> = {
  id: string;
  name: string;
  description: string;
  useCase: MonetizationUseCase;
  templateType: AfterPaymentTemplateType;
  previewIcon: string;
  previewColorClass: string;
  previewIconColorClass: string;
  initialData: T;
  schema: JsonSchema;
};

export type VerificationStatus = 'unverified' | 'pending' | 'verified' | 'revoked';

export interface PageSessionData {
    id: string;
    sessionId: string;
    accessCode?: string;
    tenantId: string;
    useCase: MonetizationUseCase;
    status: SessionStatus;
    pageConfig: BasePageLinkConfig;
    paymentDetails: {
      items: { name: string; price: number; quantity: number }[];
      totalAmount: number;
      originalTotalAmount?: number;
      appliedPromotionCode?: string;
      discountAmountApplied?: number;
      shippingAmount?: number;
      taxAmount?: number;
      currency: string;
      paymentTimestamp: string;
    };
    submittedCustomFields?: { [key: string]: any };
    afterPaymentConfig: {
      behavior?: 'showAfterPaymentPage' | 'redirect';
      templateDefinitionId?: string;
      templateData?: any;
      redirectUrl?: string;
    };
    productDetails?: {
      productId: string;
      variantId: string;
      quantity: number;
    };
    parking?: {
      licensePlate: string;
      selectedRate: ParkingRate;
      phoneNumber?: string;
    };
    timer?: {
      expiresAt: string;
    };
    voucherDetails?: {
      voucherId: string;
    };
    verificationStatus: VerificationStatus;
    verificationHistory: { timestamp: string, event: string }[];
    authenticityHash?: string;
    merkleProof?: string[];
    merkleRoot?: string;
}

interface BasePageProps {
  isLivePreview: boolean;
  theme: ThemeDefinition;
  environment: 'test' | 'live';
  adminData: AdminDashboardData;
  onAddToCart: (lineItem: StripeLineItem, useCaseData?: any) => void;
  onInitiateCheckout?: (lineItems: StripeLineItem[], useCase: MonetizationUseCase, specificUseCaseData: any) => void;
}

export interface FundraisingPageProps extends BasePageProps {
  initialData: FundraisingPageLinkConfig;
}

export interface ProductPageProps extends BasePageProps {
  initialData: ProductPageLinkConfig;
}

export interface DonationPageProps extends BasePageProps {
  initialData: DonationPageLinkConfig;
}

export interface SubscriptionRentalPageProps extends BasePageProps {
  initialData: SubscriptionPageLinkConfig;
}

export interface TimedRentalPageProps extends BasePageProps {
  initialData: TimedRentalPageLinkConfig;
}

export interface ParkingSessionPageProps extends BasePageProps {
  initialData: ParkingPageLinkConfig;
  getParkingSpecificData?: (getData: () => any) => void;
}

export interface RestaurantBillPageProps extends BasePageProps {
  initialData: RestaurantBillPageLinkConfig;
}

export interface TipsPageProps extends BasePageProps {
  initialData: TipsPageLinkConfig;
}

export interface EventTicketSalesPageProps extends BasePageProps {
  initialData: EventTicketSalesPageLinkConfig;
}

export interface AppointmentBookingPageProps extends BasePageProps {
  initialData: AppointmentBookingPageLinkConfig;
}

export interface DigitalContentAccessPageProps extends BasePageProps {
  initialData: DigitalContentAccessPageLinkConfig;
}

export interface SimpleInvoicePageProps extends BasePageProps {
  initialData: SimpleInvoicePageLinkConfig;
}

export interface MembershipAccessPageProps extends BasePageProps {
  initialData: MembershipAccessPageLinkConfig;
}

export interface VoucherPageProps extends BasePageProps {
  initialData: VoucherPageLinkConfig;
}

export interface PaymentLinkPageProps extends BasePageProps {
  initialData: PaymentLinkConfig;
}

export interface CatalogPageProps {
  initialData: CatalogPageLinkConfig;
  isLivePreview: boolean;
  theme: ThemeDefinition;
  adminData: AdminDashboardData;
  onAddToCart: (lineItem: StripeLineItem, useCaseData?: any) => void;
}


export interface BaseAfterPaymentPageProps<T> {
  sessionData: PageSessionData;
  templateData: T;
  theme: ThemeDefinition;
  environment: 'test' | 'live';
  adminData?: AdminDashboardData;
  onAddToCart?: (lineItem: StripeLineItem, useCaseData?: any) => void;
  onInitiateCheckout?: (lineItems: StripeLineItem[], useCase: MonetizationUseCase, specificUseCaseData: any) => void;
}

export type TenantSettings = {
    payoutMethod: 'unselected' | 'payoneer_wise' | 'stripe_connect';
    stripeAccountId?: string;
    platformPayoutDetails?: PlatformPayoutDetails;
}

export type PlatformPayoutDetails = {
    beneficiaryName: string;
    payoutEmail: string;
}

export interface Column<T> {
  header: string;
  accessor: (item: T) => React.ReactNode;
}