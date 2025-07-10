

// schemas.ts
import { JsonSchema, SchemaProperty, MonetizationUseCase, SessionStatus, UserRole, AdminEntityType } from './types';

/**
 * Common schema for a positive numeric amount.
 */
export const PositiveNumericAmountSchema: SchemaProperty = {
  title: "forms.common.positiveNumericAmount.title",
  type: "number",
  minimum: 0.01,
  description: "forms.common.positiveNumericAmount.description"
};

/**
 * Schema for details of a tip in a restaurant bill context.
 */
export const TipDetailsSchema: JsonSchema = {
  title: "forms.common.tipDetails.title",
  type: "object",
  properties: {
    tipType: {
      type: "string",
      enum: ["percentage", "custom", "none"],
      description: "forms.common.tipDetails.properties.tipType.description"
    },
    selectedTipPercentage: {
      type: "number",
      minimum: 0,
      maximum: 1,
      description: "forms.common.tipDetails.properties.selectedTipPercentage.description"
    },
    customTipAmount: {
      type: "number",
      minimum: 0,
      description: "forms.common.tipDetails.properties.customTipAmount.description"
    }
  },
  required: ["tipType"],
  description: "forms.common.tipDetails.description"
};

// --- INPUT VALIDATION SCHEMAS (Remain unchanged, used for checkout logic if needed) ---
export const FundraisingInputSchema: JsonSchema = { type: "object", properties: {}, description: "Input for fundraising." };
export const ProductSaleInputSchema: JsonSchema = { type: "object", properties: {}, description: "Input for product sale." };
export const SubscriptionSelectionInputSchema: JsonSchema = { type: "object", properties: {}, description: "Input for subscription selection." };
export const TimedRentalInputSchema: JsonSchema = { type: "object", properties: {}, description: "Input for timed rental." };
export const ParkingSessionInputSchema: JsonSchema = { type: "object", properties: {}, description: "Input for parking session." };
export const RestaurantBillInputSchema: JsonSchema = { type: "object", properties: {}, description: "Input for restaurant bill." };
export const GeneralTipInputSchema: JsonSchema = { type: "object", properties: {}, description: "Input for general tip." };


// --- Schema for After Payment Configuration ---
export const AfterPaymentConfigSchema: JsonSchema = {
  title: "forms.afterPaymentConfig.title",
  type: "object",
  properties: {
    afterPaymentBehavior: {
      type: "string",
      title: "forms.afterPaymentConfig.properties.afterPaymentBehavior.title",
      enum: ["showAfterPaymentPage", "redirect"],
      default: "showAfterPaymentPage",
      description: "forms.afterPaymentConfig.properties.afterPaymentBehavior.description"
    },
    redirectUrl: {
      type: "string",
      title: "forms.afterPaymentConfig.properties.redirectUrl.title",
      pattern: "^https?://.+",
      description: "forms.afterPaymentConfig.properties.redirectUrl.description"
    },
     enableSessionPage: {
        type: "boolean",
        title: "forms.afterPaymentConfig.properties.enableSessionPage.title",
        default: false,
        description: "forms.afterPaymentConfig.properties.enableSessionPage.description"
    }
  },
  required: ["afterPaymentBehavior"],
  description: "forms.afterPaymentPage.description"
};

// --- Detailed Schemas for Stripe Payment Link Alignment ---

export const StripeProductDataSchema: JsonSchema = {
  title: "forms.stripe.productData.title",
  type: "object",
  properties: {
    name: { type: "string", title: "forms.stripe.productData.properties.name.title", description: "forms.stripe.productData.properties.name.description" },
    description: { type: "string", title: "forms.stripe.productData.properties.description.title", uiWidget: 'textarea', description: "forms.stripe.productData.properties.description.description" },
    images: { type: "array", title: "forms.stripe.productData.properties.images.title", items: { type: "string" }, description: "forms.stripe.productData.properties.images.description" },
    metadata: { type: "object", title: "forms.stripe.productData.properties.metadata.title", description: "forms.stripe.productData.properties.metadata.description" }
  },
  required: ["name"],
};

export const StripeRecurringPriceDataSchema: JsonSchema = {
  title: "forms.stripe.recurringPriceData.title",
  type: "object",
  properties: {
    interval: { type: "string", title: "forms.stripe.recurringPriceData.properties.interval.title", enum: ["day", "week", "month", "year"], description: "forms.stripe.recurringPriceData.properties.interval.description" },
    interval_count: { type: "integer", title: "forms.stripe.recurringPriceData.properties.interval_count.title", minimum: 1, default: 1, description: "forms.stripe.recurringPriceData.properties.interval_count.description" },
  },
  required: ["interval"],
};

export const StripeCustomUnitAmountSchema: JsonSchema = {
  title: "forms.stripe.customUnitAmount.title",
  type: "object",
  properties: {
    enabled: { type: "boolean", title: "forms.stripe.customUnitAmount.properties.enabled.title", default: false },
    minimum_amount: { type: "integer", title: "forms.stripe.customUnitAmount.properties.minimum_amount.title", minimum: 0 },
    maximum_amount: { type: "integer", title: "forms.stripe.customUnitAmount.properties.maximum_amount.title", minimum: 0 },
    preset_amounts: { type: "array", title: "forms.stripe.customUnitAmount.properties.preset_amounts.title", items: { type: "integer", minimum: 0 } },
  },
  required: ["enabled"],
};

export const StripePriceDataSchema: JsonSchema = {
  title: "forms.stripe.priceData.title",
  type: "object",
  properties: {
    currency: { type: "string", title: "forms.stripe.priceData.properties.currency.title", default: "usd", description: "forms.stripe.priceData.properties.currency.description" },
    unit_amount: { type: "integer", title: "forms.stripe.priceData.properties.unit_amount.title", minimum: 0, description: "forms.stripe.priceData.properties.unit_amount.description" },
    product_data: StripeProductDataSchema,
    recurring: StripeRecurringPriceDataSchema,
    custom_unit_amount: StripeCustomUnitAmountSchema,
  },
  required: ["currency", "product_data"],
};

export const StripeAdjustableQuantitySchema: JsonSchema = {
  title: "forms.stripe.adjustableQuantity.title",
  type: "object",
  properties: {
    enabled: { type: "boolean", title: "forms.stripe.adjustableQuantity.properties.enabled.title", default: false },
    minimum: { type: "integer", title: "forms.stripe.adjustableQuantity.properties.minimum.title", minimum: 1, default: 1 },
    maximum: { type: "integer", title: "forms.stripe.adjustableQuantity.properties.maximum.title", minimum: 1, default: 10 },
  },
  required: ["enabled"],
};

export const StripeLineItemSchema: JsonSchema = {
  title: "forms.stripe.lineItem.title",
  type: "object",
  properties: {
    id: { type: "string", title: "forms.stripe.lineItem.properties.id.title", description: "forms.stripe.lineItem.properties.id.description" },
    price_data: StripePriceDataSchema,
    price: { type: "string", title: "forms.stripe.lineItem.properties.price.title", description: "forms.stripe.lineItem.properties.price.description" },
    quantity: { type: "integer", title: "forms.stripe.lineItem.properties.quantity.title", minimum: 1, default: 1 },
    adjustable_quantity: StripeAdjustableQuantitySchema,
  },
  description: "forms.stripe.lineItem.description"
};

export const StripeCustomFieldDropdownOptionSchema: JsonSchema = {
  title: "forms.stripe.dropdownOption.title",
  type: "object",
  properties: {
    label: { type: "string", title: "forms.stripe.dropdownOption.properties.label.title", description: "forms.stripe.dropdownOption.properties.label.description" },
    value: { type: "string", title: "forms.stripe.dropdownOption.properties.value.title", description: "forms.stripe.dropdownOption.properties.value.description" },
  },
  required: ["label", "value"],
};

export const StripeCustomFieldDropdownSchema: JsonSchema = {
  title: "forms.stripe.dropdownConfig.title",
  type: "object",
  properties: {
    options: { type: "array", title: "forms.stripe.dropdownConfig.properties.options.title", items: StripeCustomFieldDropdownOptionSchema, description: "forms.stripe.dropdownConfig.properties.options.description" },
  },
  required: ["options"],
};

export const StripeCustomFieldLabelSchema: JsonSchema = {
    title: "forms.stripe.labelConfig.title",
    type: "object",
    properties: {
        type: { type: "string", enum: ["custom"], default: "custom", title:"forms.stripe.labelConfig.properties.type.title" },
        custom: { type: "string", title: "forms.stripe.labelConfig.properties.custom.title", description: "forms.stripe.labelConfig.properties.custom.description" },
    },
    required: ["type", "custom"],
};

export const StripeCustomFieldTextSchema: JsonSchema = {
    title: "forms.stripe.textConfig.title",
    type: "object",
    properties: {
        minimum_length: { type: "integer", title: "forms.stripe.textConfig.properties.min.title", minimum: 0 },
        maximum_length: { type: "integer", title: "forms.stripe.textConfig.properties.max.title", minimum: 1 },
    },
};

export const StripeCustomFieldNumericSchema: JsonSchema = {
    title: "forms.stripe.numericConfig.title",
    type: "object",
    properties: {
        minimum_value: { type: "string", title: "forms.stripe.numericConfig.properties.min.title", description: "forms.stripe.numericConfig.properties.min.description" },
        maximum_value: { type: "string", title: "forms.stripe.numericConfig.properties.max.title" },
    },
};

export const StripeCustomFieldSchema: JsonSchema = {
  title: "forms.stripe.customField.title",
  type: "object",
  properties: {
    key: { type: "string", title: "forms.stripe.customField.properties.key.title", description: "forms.stripe.customField.properties.key.description" },
    label: StripeCustomFieldLabelSchema,
    type: { type: "string", title: "forms.stripe.customField.properties.type.title", enum: ["text", "numeric", "dropdown"], description: "forms.stripe.customField.properties.type.description" },
    optional: { type: "boolean", title: "forms.stripe.customField.properties.optional.title", default: false, description: "forms.stripe.customField.properties.optional.description" },
    dropdown: StripeCustomFieldDropdownSchema,
    text: StripeCustomFieldTextSchema,
    numeric: StripeCustomFieldNumericSchema,
    defaultValue: { type: "string", title: "forms.stripe.customField.properties.defaultValue.title", description: "forms.stripe.customField.properties.defaultValue.description" }
  },
  required: ["key", "label", "type"],
  description: "forms.stripe.customField.description"
};


// --- Common Advanced Options properties to be merged into use case schemas ---
export const commonAdvancedOptionsSchemaProperties: { [key: string]: SchemaProperty } = {
  line_items: { 
    type: "array",
    title: "forms.advancedOptions.lineItems.title",
    items: StripeLineItemSchema,
    description: "forms.advancedOptions.lineItems.description"
  },
  header_image_url: {
    type: "string",
    title: "forms.advancedOptions.headerImage.title",
    pattern: "^https?://.+",
    description: "forms.advancedOptions.headerImage.description",
  },
  page_description: {
    type: "string",
    title: "forms.advancedOptions.pageDescription.title",
    uiWidget: 'textarea',
    description: "forms.advancedOptions.pageDescription.description",
  },
  payment_limits_enabled: {
    type: "boolean",
    title: "forms.advancedOptions.limitPayments.title",
    default: false,
    description: "forms.advancedOptions.limitPayments.description"
  },
  payment_limits_max_payments: {
    type: "integer",
    title: "forms.advancedOptions.maxPayments.title",
    minimum: 1,
    description: "forms.advancedOptions.maxPayments.description"
  },
  payment_limits_message_after_limit: {
    type: "string",
    title: "forms.advancedOptions.messageAfterLimit.title",
    default: "This payment link is no longer active.",
    description: "forms.advancedOptions.messageAfterLimit.description"
  },
};

export const AccessControlSchema: JsonSchema = {
  title: "Access Control (for Tickets, Memberships, etc.)",
  type: "object",
  properties: {
    enabled: {
      type: "boolean",
      title: "Enable Access Control",
      description: "Turns on access code generation and verification for this page.",
      default: true,
    },
    verificationType: {
      type: "string",
      title: "Verification Type",
      description: "Defines how the access code can be used or verified.",
      enum: ["single-use", "multi-use", "disabled"],
      default: "single-use",
    },
    showQRCode: {
      type: "boolean",
      title: "Show QR Code on After-Payment Page",
      description: "If checked, a scannable QR code will be displayed to the customer.",
      default: true,
    },
    showAccessLink: {
      type: "boolean",
      title: "Show Access Link on After-Payment Page",
      description: "If checked, a direct link to the session page will be displayed.",
      default: true,
    }
  }
};


export const checkoutConfigSchemaProperties: { [key: string]: SchemaProperty } = {
  currency: { type: "string", title: "forms.checkoutConfig.currency.title", enum: ["USD", "EUR", "GBP"], default: "USD" },
  submit_type: { 
    type: "string", 
    title: "forms.checkoutConfig.submitType.title", 
    enum: ["auto", "pay", "book", "donate"], 
    default: "pay",
    description: "forms.checkoutConfig.submitType.description"
  },
  custom_fields: {
    type: "array",
    title: "forms.checkoutConfig.customFields.title",
    items: StripeCustomFieldSchema,
    description: "forms.checkoutConfig.customFields.description"
  },
  billing_address_collection: {
    type: "string",
    title: "forms.checkoutConfig.billingAddress.title",
    enum: ["auto", "required"],
    default: "auto",
    description: "forms.checkoutConfig.billingAddress.description"
  },
  shipping_address_collection_enabled: {
    type: "boolean",
    title: "forms.checkoutConfig.shippingAddress.title",
    default: false,
    description: "forms.checkoutConfig.shippingAddress.description"
  },
  shipping_address_collection_allowed_countries: {
    type: "array",
    title: "forms.checkoutConfig.allowedCountries.title",
    items: { type: "string" },
    default: ["US", "CA", "GB"],
    description: "forms.checkoutConfig.allowedCountries.description"
  },
  phone_number_collection_enabled: {
    type: "boolean",
    title: "forms.checkoutConfig.phone.title",
    default: false,
    description: "forms.checkoutConfig.phone.description"
  },
  allow_promotion_codes: {
    type: "boolean",
    title: "forms.checkoutConfig.promoCodes.title",
    default: false,
    description: "forms.checkoutConfig.promoCodes.description"
  },
  tax_id_collection_enabled: {
    type: "boolean",
    title: "forms.checkoutConfig.taxId.title",
    default: false,
    description: "forms.checkoutConfig.taxId.description"
  },
  tax_rate_ids: {
    type: "array",
    title: "forms.checkoutConfig.taxRates.title",
    uiWidget: "checkboxGroup",
    items: { type: 'string' },
    description: "forms.checkoutConfig.taxRates.description"
  },
  shipping_rate_ids: {
    type: "array",
    title: "forms.checkoutConfig.shippingRates.title",
    uiWidget: "checkboxGroup",
    items: { type: 'string' },
    description: "forms.checkoutConfig.shippingRates.description"
  },
  automatic_tax_enabled: {
    type: "boolean",
    title: "forms.checkoutConfig.autoTax.title",
    default: false,
    description: "forms.checkoutConfig.autoTax.description"
  },
  consent_collection_terms_of_service: {
    type: "string",
    title: "forms.checkoutConfig.terms.title",
    enum: ["none", "required"],
    default: "none",
    description: "forms.checkoutConfig.terms.description"
  },
  consent_collection_terms_of_service_url: {
    type: "string",
    title: "forms.checkoutConfig.termsUrl.title",
    pattern: "^https?://.+",
    description: "forms.checkoutConfig.termsUrl.description"
  },
  save_payment_details_for_future_use: {
      type: "boolean",
      title: "forms.checkoutConfig.savePayment.title",
      default: false,
      description: "forms.checkoutConfig.savePayment.description"
  }
};


// --- Schemas for Page Configuration Forms ---

export const PaymentLinkSchema: JsonSchema = {
    title: "Edit Payment Link Config",
    type: "object",
    properties: {
        pageSlug: { type: "string", title: "forms.common.pageSlug.title", pattern: "^[a-zA-Z0-9-]+$", description: "forms.common.pageSlug.description" },
        ...commonAdvancedOptionsSchemaProperties,
    },
    required: ['pageSlug'],
};

export const ProductPageSchema: JsonSchema = {
    title: "forms.product.title",
    type: "object",
    properties: {
      pageSlug: { type: "string", title: "forms.common.pageSlug.title", pattern: "^[a-zA-Z0-9-]+$", description: "forms.common.pageSlug.description" },
      productId: { type: 'string', title: "Product ID", description: "The ID of the ShopProduct to display." },
      ...commonAdvancedOptionsSchemaProperties,
      additionalDetails: {
        type: "array",
        title: "forms.product.details.title",
        items: { type: "string" },
        description: "forms.product.details.description"
      },
    },
    required: ['pageSlug'],
};

export const FundraisingPageSchema: JsonSchema = {
    title: "forms.fundraising.title",
    type: "object",
    properties: {
      pageSlug: { type: "string", title: "forms.common.pageSlug.title", pattern: "^[a-zA-Z0-9-]+$", description: "forms.common.pageSlug.description" },
      pageTitle: { type: "string", title: "forms.fundraising.campaignTitle.title", aiGenConfig: { type: 'text' } },
      pageDescription: { type: "string", uiWidget: "textarea", title: "forms.fundraising.campaignDesc.title", aiGenConfig: { type: 'text', contextField: 'pageTitle' } },
      predefinedAmounts: { type: "array", items: { type: "number" }, title: "forms.fundraising.amounts.title", description: "forms.fundraising.amounts.description" },
      whyDonatePoints: { type: "array", items: { type: "string" }, title: "forms.fundraising.whyPoints.title", description: "forms.fundraising.whyPoints.description" },
      targetAmount: { type: "number", title: "Target Amount", minimum: 0 },
      endDate: { type: "string", title: "End Date (YYYY-MM-DD)" },
      showDonorList: { type: "boolean", title: "Show Recent Donor List", default: false },
      ...commonAdvancedOptionsSchemaProperties,
    },
    required: ["pageSlug", "pageTitle", "pageDescription"],
};

export const SubscriptionPageSchema: JsonSchema = {
    title: "forms.subscription.title",
    type: "object",
    properties: {
      pageSlug: { type: "string", title: "forms.common.pageSlug.title", pattern: "^[a-zA-Z0-9-]+$", description: "forms.common.pageSlug.description" },
      pageTitle: { type: "string", title: "forms.subscription.pageTitle.title" },
      pageDescription: { type: "string", uiWidget: 'textarea', title: "forms.subscription.pageDesc.title" },
      ...commonAdvancedOptionsSchemaProperties,
    },
    required: ["pageSlug", "pageTitle"],
};

export const TimedRentalPageSchema: JsonSchema = {
    title: "forms.rental.title",
    type: "object",
    properties: {
      pageSlug: { type: "string", title: "forms.common.pageSlug.title", pattern: "^[a-zA-Z0-9-]+$", description: "forms.common.pageSlug.description" },
      pageTitle: { type: "string", title: "forms.rental.pageTitle.title" },
      pageDescription: { type: "string", uiWidget: 'textarea', title: "forms.rental.pageDesc.title" },
      ...commonAdvancedOptionsSchemaProperties,
    },
    required: ["pageSlug", "pageTitle"],
};

export const ParkingPageSchema: JsonSchema = {
  title: "forms.parking.title",
  type: "object",
  properties: {
    pageSlug: { type: "string", title: "forms.common.pageSlug.title", pattern: "^[a-zA-Z0-9-]+$", description: "forms.common.pageSlug.description" },
    pageTitle: { type: "string", title: "forms.parking.pageTitle.title" },
    pageDescription: { type: "string", uiWidget: 'textarea', title: "forms.advancedOptions.pageDescription.title" },
    locationName: { type: "string", title: "forms.parking.locationName.title" },
    zoneId: { type: "string", title: "forms.parking.zoneId.title" },
    operatorName: { type: "string", title: "forms.parking.operator.title" },
    locationAddress: { type: "string", title: "forms.parking.address.title" },
    infoPoints: { type: "array", items: { type: "string" }, title: "forms.parking.infoPoints.title" },
    ...commonAdvancedOptionsSchemaProperties,
  },
  required: ["pageSlug", "pageTitle", "locationName"],
};

export const RestaurantBillPageSchema: JsonSchema = {
  title: "forms.restaurant.title",
  type: "object",
  properties: {
    pageSlug: { type: "string", title: "forms.common.pageSlug.title", pattern: "^[a-zA-Z0-9-]+$", description: "forms.common.pageSlug.description" },
    pageTitle: { type: "string", title: "forms.restaurant.pageTitle.title" },
    defaultTaxRate: { type: "number", title: "forms.restaurant.taxRate.title" },
    predefinedTipPercentages: { type: "array", items: { type: "number" }, title: "forms.restaurant.tipPercentages.title" },
    ...commonAdvancedOptionsSchemaProperties,
  },
  required: ["pageSlug", "pageTitle"],
};

export const TipsPageSchema: JsonSchema = {
  title: "forms.tips.title",
  type: "object",
  properties: {
    pageSlug: { type: "string", title: "forms.common.pageSlug.title", pattern: "^[a-zA-Z0-9-]+$", description: "forms.common.pageSlug.description" },
    pageTitle: { type: "string", title: "forms.tips.pageTitle.title" },
    pageDescription: { type: "string", uiWidget: 'textarea', title: "forms.advancedOptions.pageDescription.title" },
    predefinedAmounts: { type: "array", items: { type: "number" }, title: "forms.tips.amounts.title" },
    whyTipText: { type: "string", uiWidget: 'textarea', title: "forms.tips.whyText.title" },
    ...commonAdvancedOptionsSchemaProperties,
  },
  required: ["pageSlug", "pageTitle"],
};

export const EventTicketSalesPageSchema: JsonSchema = {
  title: "forms.event.title",
  type: "object",
  properties: {
    pageSlug: { type: "string", title: "forms.common.pageSlug.title", pattern: "^[a-zA-Z0-9-]+$", description: "forms.common.pageSlug.description" },
    eventTitle: { type: "string", title: "forms.event.eventTitle.title" },
    eventDescription: { type: "string", uiWidget: 'textarea', title: "forms.event.eventDesc.title" },
    eventDate: { type: "string", title: "forms.event.date.title" },
    eventTime: { type: "string", title: "forms.event.time.title" },
    eventLocation: { type: "string", title: "forms.event.location.title" },
    eventBannerImageUrl: { type: "string", title: "forms.advancedOptions.headerImage.title" },
    organizerName: { type: "string", title: "forms.event.organizer.title" },
    contactEmail: { type: "string", title: "forms.event.contact.title" },
    ...commonAdvancedOptionsSchemaProperties,
  },
  required: ["pageSlug", "eventTitle", "eventDate", "eventTime"],
};

export const AppointmentBookingPageSchema: JsonSchema = {
  title: "forms.appointment.title",
  type: "object",
  properties: {
    pageSlug: { type: "string", title: "forms.common.pageSlug.title", pattern: "^[a-zA-Z0-9-]+$", description: "forms.common.pageSlug.description" },
    serviceTitle: { type: "string", title: "forms.appointment.serviceTitle.title" },
    serviceDescription: { type: "string", uiWidget: 'textarea', title: "forms.appointment.serviceDesc.title" },
    serviceImageUrl: { type: "string", title: "forms.advancedOptions.headerImage.title" },
    providerName: { type: "string", title: "forms.appointment.provider.title" },
    contactInfo: { type: "string", title: "forms.appointment.contact.title" },
    availabilityNotes: { type: "string", uiWidget: 'textarea', title: "forms.appointment.availability.title" },
    ...commonAdvancedOptionsSchemaProperties,
  },
  required: ["pageSlug", "serviceTitle"],
};

export const DigitalContentAccessPageSchema: JsonSchema = {
  title: "forms.digital.title",
  type: "object",
  properties: {
    pageSlug: { type: "string", title: "forms.common.pageSlug.title", pattern: "^[a-zA-Z0-9-]+$", description: "forms.common.pageSlug.description" },
    contentTitle: { type: "string", title: "forms.digital.contentTitle.title" },
    contentDescription: { type: "string", uiWidget: 'textarea', title: "forms.digital.contentDesc.title" },
    previewImageUrlOrVideoUrl: { type: "string", title: "forms.advancedOptions.headerImage.title" },
    fileTypeOrFormat: { type: "string", title: "File Type / Format" },
    digitalAssetId: { type: "string", title: "forms.digital.assetId.title", description: "forms.digital.assetId.description" },
    accessInstructions: { type: "string", uiWidget: 'textarea', title: "forms.digital.instructions.title", description: "forms.digital.instructions.description" },
    creatorName: { type: "string", title: "forms.digital.creator.title" },
    ...commonAdvancedOptionsSchemaProperties,
  },
  required: ["pageSlug", "contentTitle"],
};

export const SimpleInvoicePageSchema: JsonSchema = {
  title: "forms.invoice.title",
  type: "object",
  properties: {
    pageSlug: { type: "string", title: "forms.common.pageSlug.title", pattern: "^[a-zA-Z0-9-]+$", description: "forms.common.pageSlug.description" },
    requestTitle: { type: "string", title: "forms.invoice.requestTitle.title" },
    yourNameOrBusinessName: { type: "string", title: "forms.invoice.yourName.title" },
    clientName: { type: "string", title: "forms.invoice.clientName.title" },
    itemDescription: { type: "string", uiWidget: 'textarea', title: "forms.invoice.itemDesc.title" },
    dueDate: { type: "string", title: "forms.invoice.dueDate.title" },
    notes: { type: "string", uiWidget: 'textarea', title: "forms.invoice.notes.title" },
    invoiceNumber: { type: "string", title: "forms.invoice.invoiceNumber.title" },
    ...commonAdvancedOptionsSchemaProperties,
  },
  required: ["pageSlug", "requestTitle"],
};

export const MembershipAccessPageSchema: JsonSchema = {
  title: "Edit Membership Page Config",
  type: "object",
  properties: {
    pageSlug: { type: "string", title: "forms.common.pageSlug.title", pattern: "^[a-zA-Z0-9-]+$", description: "forms.common.pageSlug.description" },
    pageTitle: { type: "string", title: "Page Title" },
    pageDescription: { type: "string", uiWidget: 'textarea', title: "Page Description" },
    benefits: { type: "array", items: { type: "string" }, title: "Membership Benefits" },
    ...commonAdvancedOptionsSchemaProperties,
  },
  required: ["pageSlug", "pageTitle"],
};

export const VoucherPageSchema: JsonSchema = {
  title: "Edit Voucher Page Config",
  type: "object",
  properties: {
    pageSlug: { type: "string", title: "forms.common.pageSlug.title", pattern: "^[a-zA-Z0-9-]+$", description: "forms.common.pageSlug.description" },
    pageTitle: { type: "string", title: "Page Title" },
    pageDescription: { type: "string", uiWidget: 'textarea', title: "Page Description" },
    ...commonAdvancedOptionsSchemaProperties,
  },
  required: ["pageSlug", "pageTitle"],
};

export const CatalogTemplateDataSchema: JsonSchema = {
    title: "Edit Catalog Page Config",
    type: "object",
    properties: {
        pageSlug: { type: "string", title: "forms.common.pageSlug.title", pattern: "^[a-zA-Z0-9-]+$", description: "forms.common.pageSlug.description" },
        pageTitle: { type: "string", title: "Page Title" },
        pageDescription: { type: "string", uiWidget: "textarea", title: "Page Description" },
        collectionIds: { type: "array", title: "Collection IDs", items: { type: "string" }, description: "List of collection IDs to display on the storefront." },
    },
    required: ["pageSlug", "pageTitle"],
};


// Function to get the right schema for the use case
export const getEditorSchemaForUseCase = (useCase: MonetizationUseCase): JsonSchema => {
  const schemaMap: { [key in MonetizationUseCase]?: JsonSchema } = {
    [MonetizationUseCase.PAYMENT_LINK]: PaymentLinkSchema,
    [MonetizationUseCase.DONATION]: FundraisingPageSchema,
    [MonetizationUseCase.FUNDRAISING]: FundraisingPageSchema,
    [MonetizationUseCase.PRODUCT_SALE]: ProductPageSchema,
    [MonetizationUseCase.SUBSCRIPTION_RENTAL]: SubscriptionPageSchema,
    [MonetizationUseCase.TIMED_RENTAL]: TimedRentalPageSchema,
    [MonetizationUseCase.PARKING_SESSION]: ParkingPageSchema,
    [MonetizationUseCase.RESTAURANT_BILL]: RestaurantBillPageSchema,
    [MonetizationUseCase.TIPS]: TipsPageSchema,
    [MonetizationUseCase.EVENT_TICKET_SALES]: EventTicketSalesPageSchema,
    [MonetizationUseCase.APPOINTMENT_BOOKING]: AppointmentBookingPageSchema,
    [MonetizationUseCase.DIGITAL_CONTENT_ACCESS]: DigitalContentAccessPageSchema,
    [MonetizationUseCase.SIMPLE_INVOICE]: SimpleInvoicePageSchema,
    [MonetizationUseCase.MEMBERSHIP_ACCESS]: MembershipAccessPageSchema,
    [MonetizationUseCase.VOUCHER]: VoucherPageSchema,
    [MonetizationUseCase.CATALOG]: CatalogTemplateDataSchema,
  };
  return schemaMap[useCase] || PaymentLinkSchema; // Fallback to a generic schema
};


// --- Schema for Checkout Tab ---
export const CheckoutConfigSchema: JsonSchema = {
    title: "Checkout Configuration",
    type: "object",
    properties: {
      ...checkoutConfigSchemaProperties,
    },
    required: [],
};

// --- After Payment Schemas ---
const baseAPSchemaProperties: {[key: string]: SchemaProperty} = {
  title: { type: 'string', title: 'Page Title' },
  mainMessage: { type: 'string', uiWidget: 'textarea', title: 'Main Message' },
  showSubmittedCustomFields: { type: 'boolean', title: 'Show Custom Fields Submitted by User', default: false },
};

export const FundraisingThankYouAPSchema: JsonSchema = {
  title: "Configure Thank You Page",
  type: "object",
  properties: {
    ...baseAPSchemaProperties,
    thankYouMessage: { type: 'string', title: 'Thank You Headline' },
    showDonationAmount: { type: 'boolean', title: 'Show Donation Amount', default: true },
    socialSharePrompt: { type: 'string', title: 'Social Share Prompt' },
  }
};

export const FundraisingImpactReportAPSchema: JsonSchema = {
  title: "Configure Impact Report Page",
  type: "object",
  properties: {
    ...baseAPSchemaProperties,
    reportHeadline: { type: 'string', title: 'Report Headline' },
    impactStats: { type: 'array', title: 'Impact Stats', items: { type: 'object', properties: { value: {type: 'string'}, label: {type: 'string'} } } },
    nextGoalMessage: { type: 'string', title: 'Next Goal Message' },
    progressPercentage: { type: 'number', title: 'Progress Bar Percentage', minimum: 0, maximum: 100 },
  }
};

export const FundraisingUpdatesSignupAPSchema: JsonSchema = {
    title: "Configure Updates Signup Page",
    type: "object",
    properties: {
        ...baseAPSchemaProperties,
        signupHeadline: { type: 'string', title: 'Signup Headline' },
        signupBlurb: { type: 'string', title: 'Signup Blurb (Optional)' },
        showEmailSignupForm: { type: 'boolean', title: 'Show Email Signup Form' },
        formButtonText: { type: 'string', title: 'Form Button Text' },
    }
};

export const FundraisingDonorWallAPSchema: JsonSchema = {
    title: "Configure Donor Wall Page",
    type: "object",
    properties: {
        ...baseAPSchemaProperties,
        donorWallHeadline: { type: 'string', title: 'Donor Wall Headline' },
        anonymizeDonors: { type: 'boolean', title: 'Anonymize Donors' },
        donorWallMessage: { type: 'string', title: 'Message Above Donor Wall' },
        displayLevels: { type: 'boolean', title: 'Display Donor Levels (Gold, Silver, etc.)' },
    }
};

export const DonationSimpleThankYouAPSchema: JsonSchema = {
  title: "Configure Simple Thank You Page",
  type: "object",
  properties: {
    ...baseAPSchemaProperties,
    showDonationAmount: { type: 'boolean', title: 'Show Donation Amount', default: true },
  }
};

export const DonationPersonalNoteAPSchema: JsonSchema = {
  title: "Configure Personal Note Page",
  type: "object",
  properties: {
    ...baseAPSchemaProperties,
    imageUrl: { type: 'string', title: 'Image URL (e.g., your photo)' },
    personalMessage: { type: 'string', uiWidget: 'textarea', title: 'Personal Message' },
  }
};

export const DonationSocialFollowAPSchema: JsonSchema = {
  title: "Configure Social Follow Page",
  type: "object",
  properties: {
    ...baseAPSchemaProperties,
    followHeadline: { type: 'string', title: 'Follow Headline' },
    followMessage: { type: 'string', uiWidget: 'textarea', title: 'Follow Message' },
    socialMediaLinks: { type: 'array', title: 'Social Media Links', items: { type: 'object', properties: { platform: { type: 'string' }, link: { type: 'string' } } } },
  }
};

export const DonationExploreContentAPSchema: JsonSchema = {
  title: "Configure Explore Content Page",
  type: "object",
  properties: {
    ...baseAPSchemaProperties,
    exploreHeadline: { type: 'string', title: 'Explore Headline' },
    contentLinks: { type: 'array', title: 'Content Links', items: { type: 'object', properties: { title: { type: 'string' }, link: { type: 'string' } } } },
  }
};

export const ParkingActiveInfoAPSchema: JsonSchema = {
    title: "Configure Active Parking Info Page",
    type: "object",
    properties: {
        ...baseAPSchemaProperties,
        showEndTime: { type: 'boolean', title: 'Show Parking End Time', default: true },
        showParkingLotRulesLink: { type: 'boolean', title: 'Show Link to Parking Rules', default: false },
        parkingLotRulesLink: { type: 'string', title: 'Parking Rules URL' },
        customNote: { type: 'string', title: 'Custom Note (optional)' },
        showLocationName: { type: 'boolean', title: 'Show Location Name', default: true },
        showZoneId: { type: 'boolean', title: 'Show Zone ID', default: true },
        showOperatorName: { type: 'boolean', title: 'Show Operator Name', default: false },
        showPhoneNumber: { type: 'boolean', title: 'Show Phone Number', default: false },
    }
};

export const ParkingExtendMapAPSchema: JsonSchema = {
    title: "Configure Extend Parking & Map Page",
    type: "object",
    properties: {
        ...baseAPSchemaProperties,
        mapEmbedUrl: { type: 'string', title: 'Google Maps Embed URL' },
        extendButtonText: { type: 'string', title: 'Extend Button Text', default: 'Extend Parking' },
        locationHelpText: { type: 'string', title: 'Location Help Text', default: 'Find your car or nearby amenities on the map below.' },
    }
};

export const ProductOrderConfirmedTrackingAPSchema: JsonSchema = {
    title: "Configure Order Confirmed & Tracking Page",
    type: "object",
    properties: {
        ...baseAPSchemaProperties,
        showEstimatedDelivery: { type: 'boolean', title: 'Show Estimated Delivery', default: true },
        estimatedDeliveryText: { type: 'string', title: 'Estimated Delivery Text' },
        trackingLinkButtonText: { type: 'string', title: 'Tracking Link Button Text' },
        mockTrackingLink: { type: 'string', title: 'Mock Tracking Link URL' },
    }
};

export const ProductUpdatesCommunityAPSchema: JsonSchema = {
    title: "Configure Product Updates & Community Page",
    type: "object",
    properties: {
        ...baseAPSchemaProperties,
        statusHeadline: { type: 'string', title: 'Status Headline' },
        communityHeadline: { type: 'string', title: 'Community Section Headline' },
        communityMessage: { type: 'string', title: 'Community Message' },
        discordLink: { type: 'string', title: 'Discord Invite Link' },
        facebookGroupLink: { type: 'string', title: 'Facebook Group Link' },
    }
};

export const EventHypePageAPSchema: JsonSchema = {
  title: "Configure Event Hype Page",
  type: "object",
  properties: {
      ...baseAPSchemaProperties,
      hypeHeadline: { type: 'string', title: 'Hype Headline' },
      showCountdown: { type: 'boolean', title: 'Show Countdown Timer', default: true },
      mapEmbedUrl: { type: 'string', title: 'Venue Map Embed URL' },
      playlistEmbedUrl: { type: 'string', title: 'Spotify/Apple Music Playlist Embed URL' },
  }
};


export const SubscriptionReferralAPSchema: JsonSchema = {
    title: "Configure Referral Page",
    type: "object",
    properties: {
        ...baseAPSchemaProperties,
        referralHeadline: { type: 'string', title: 'Referral Headline' },
        referralMessage: { type: 'string', uiWidget: 'textarea', title: 'Referral Message' },
        referralCode: { type: 'string', title: 'Referral Code (mock)' },
        socialShareText: { type: 'string', title: 'Social Media Share Text' },
    }
};

export const SubscriptionOnboardingAPSchema: JsonSchema = {
    title: "Configure Onboarding Checklist Page",
    type: "object",
    properties: {
        ...baseAPSchemaProperties,
        onboardingHeadline: { type: 'string', title: 'Onboarding Headline' },
        onboardingSteps: { type: 'array', title: 'Onboarding Steps', items: { type: 'object', properties: { text: { type: 'string' }, isComplete: { type: 'boolean', default: false } } } },
    }
};

export const SubscriptionShipmentInfoAPSchema: JsonSchema = {
    title: "Configure Shipment Info Page",
    type: "object",
    properties: {
        ...baseAPSchemaProperties,
        shipmentHeadline: { type: 'string', title: 'Shipment Headline' },
        shipmentDetails: { type: 'string', uiWidget: 'textarea', title: 'Shipment Details Message' },
        trackingNumber: { type: 'string', title: 'Mock Tracking Number' },
    }
};

export const SubscriptionContentTeaserAPSchema: JsonSchema = {
    title: "Configure Content Teaser Page",
    type: "object",
    properties: {
        ...baseAPSchemaProperties,
        teaserHeadline: { type: 'string', title: 'Teaser Headline' },
        teaserItems: { type: 'array', title: 'Teaser Items', items: { type: 'object', properties: { title: { type: 'string' }, imageUrl: { type: 'string' }, link: { type: 'string' } } } },
    }
};

export const SubscriptionPersonalWelcomeAPSchema: JsonSchema = {
    title: "Configure Personal Welcome Page",
    type: "object",
    properties: {
        ...baseAPSchemaProperties,
        welcomeHeadline: { type: 'string', title: 'Welcome Headline' },
        personalMessage: { type: 'string', uiWidget: 'textarea', title: 'Personal Message' },
        videoEmbedUrl: { type: 'string', title: 'Video Embed URL (optional)' },
    }
};

export const TipsVideoThankYouAPSchema: JsonSchema = {
    title: "Configure Video Thank You Page",
    type: "object",
    properties: {
        ...baseAPSchemaProperties,
        thankYouHeadline: { type: 'string', title: 'Thank You Headline' },
        videoEmbedUrl: { type: 'string', title: 'Video Embed URL' },
    }
};

export const TipsSocialShoutoutAPSchema: JsonSchema = {
    title: "Configure Social Shout-Out Page",
    type: "object",
    properties: {
        ...baseAPSchemaProperties,
        socialPlatform: {
            type: "string",
            title: "Social Platform",
            enum: ["Twitter", "Instagram", "Facebook"],
            default: "Twitter",
        },
        prewrittenText: {
            type: "string",
            title: "Pre-written Text",
            uiWidget: 'textarea',
            default: "I just left a tip for @creator! They're great!",
        },
        creatorHandle: {
            type: "string",
            title: "Creator's Handle (e.g., @creator)",
            default: "@creator"
        }
    }
};

export const ProductThankYouUpsellAPSchema: JsonSchema = {
    title: "Configure Thank You & Upsell Page",
    type: "object",
    properties: {
        ...baseAPSchemaProperties,
        thankYouHeadline: { type: 'string', title: 'Thank You Headline' },
        upsellSectionTitle: { type: 'string', title: 'Upsell Section Title' },
        upsellItems: {
            type: 'array', title: 'Upsell Items', items: {
                type: 'object', properties: {
                    name: { type: 'string' }, description: { type: 'string' }, price: { type: 'string' }, imageUrl: { type: 'string' }, link: { type: 'string' }
                }
            }
        },
        reviewPromptText: { type: 'string', title: 'Review Prompt Text (optional)' },
    }
};

export const SubscriptionActiveWelcomeAPSchema: JsonSchema = {
    title: "Configure Subscription Welcome Page",
    type: "object",
    properties: {
        ...baseAPSchemaProperties,
        welcomeHeadline: { type: 'string', title: 'Welcome Headline' },
        planBenefits: { type: 'array', title: 'Plan Benefits List', items: { type: 'string' } },
        accessContentButtonText: { type: 'string', title: 'Access Button Text' },
        accessContentLink: { type: 'string', title: 'Access Button Link URL' },
        showNextBillingDate: { type: 'boolean', title: 'Show Next Billing Date', default: true },
    }
};

export const SubscriptionManageExploreAPSchema: JsonSchema = {
    title: "Configure Manage Subscription Page",
    type: "object",
    properties: {
        ...baseAPSchemaProperties,
        manageSubscriptionButtonText: { type: 'string', title: 'Manage Button Text' },
        stripeCustomerPortalLink: { type: 'string', title: 'Stripe Customer Portal Link (Optional)' },
        exploreFeaturesSectionTitle: { type: 'string', title: 'Explore Section Title' },
        featuresToExplore: {
            type: 'array', title: 'Features to Explore', items: {
                type: 'object', properties: { name: { type: 'string' }, description: { type: 'string' }, link: { type: 'string' } }
            }
        },
    }
};

export const DigitalContentAccessDownloadAPSchema: JsonSchema = {
    title: "Configure Digital Content Download Page",
    type: "object",
    properties: {
        ...baseAPSchemaProperties,
        downloadSectionTitle: { type: 'string', title: 'Download Section Title' },
        downloadItems: {
            type: 'array', title: 'Downloadable Items', items: {
                type: 'object', properties: { fileName: { type: 'string' }, downloadLink: { type: 'string' }, fileType: { type: 'string' }, fileSize: { type: 'string' } }
            }
        },
        postDownloadInstructions: { type: 'string', title: 'Post-Download Instructions (Optional)' },
    }
};

export const TimedRentalStartedInstructionsAPSchema: JsonSchema = {
    title: "Configure Rental Instructions Page",
    type: "object",
    properties: {
        ...baseAPSchemaProperties,
        instructionsHeadline: { type: 'string', title: 'Instructions Headline' },
        instructionsList: { type: 'array', title: 'Instructions List', items: { type: 'string' } },
        returnInfo: { type: 'string', title: 'Return Information' },
        emergencyContact: { type: 'string', title: 'Emergency Contact Info' },
    }
};

export const RentalExtendHelpAPSchema: JsonSchema = {
    title: "Configure Rental Help Page",
    type: "object",
    properties: {
        ...baseAPSchemaProperties,
        helpHeadline: { type: 'string', title: 'Help Section Headline' },
        helpResources: {
            type: 'array', title: 'Help Resources', items: {
                type: 'object', properties: { title: { type: 'string' }, description: { type: 'string' }, link: { type: 'string' } }
            }
        },
        contactSupportText: { type: 'string', title: 'Contact Support Text' },
        faqLink: { type: 'string', title: 'FAQ Page Link' },
    }
};

export const RentalRulesWaiverAPSchema: JsonSchema = {
    title: "Configure Rental Rules & Waiver Page",
    type: "object",
    properties: {
        ...baseAPSchemaProperties,
        rulesHeadline: { type: 'string', title: 'Rules Headline' },
        rentalRules: { type: 'array', title: 'Rental Rules', items: { type: 'string' } },
        waiverText: { type: 'string', title: 'Waiver Acceptance Text' },
        accessInfoAfterWaiver: { type: 'string', title: 'Access Info Revealed After Waiver' },
    }
};

export const RentalAccessCodeTimerAPSchema: JsonSchema = {
    title: "Configure Access Code & Timer Page",
    type: "object",
    properties: {
        ...baseAPSchemaProperties,
        accessCodeHeadline: { type: 'string', title: 'Access Code Headline' },
        accessCode: { type: 'string', title: 'Access Code (Mock)' },
        timerHeadline: { type: 'string', title: 'Timer Headline' },
    }
};

export const RentalFindOnMapAPSchema: JsonSchema = {
    title: "Configure Find on Map Page",
    type: "object",
    properties: {
        ...baseAPSchemaProperties,
        mapHeadline: { type: 'string', title: 'Map Headline' },
        mapEmbedUrl: { type: 'string', title: 'Map Embed URL' },
    }
};

export const RentalRateExperienceAPSchema: JsonSchema = {
    title: "Configure Rate Experience Page",
    type: "object",
    properties: {
        ...baseAPSchemaProperties,
        ratingHeadline: { type: 'string', title: 'Rating Headline' },
        feedbackPrompt: { type: 'string', title: 'Feedback Prompt' },
    }
};

export const RestaurantBillReceiptAPSchema: JsonSchema = {
    title: "Configure Bill Receipt Page",
    type: "object",
    properties: {
        ...baseAPSchemaProperties,
        showItemizedList: { type: 'boolean', title: 'Show Itemized List' },
        showTipAmount: { type: 'boolean', title: 'Show Tip Amount' },
        feedbackPrompt: { type: 'string', title: 'Feedback Prompt (Optional)' },
        loyaltyProgramLink: { type: 'string', title: 'Loyalty Program Link (Optional)' },
    }
};

export const RestaurantFeedbackLoyaltyAPSchema: JsonSchema = {
    title: "Configure Feedback & Loyalty Page",
    type: "object",
    properties: {
        ...baseAPSchemaProperties,
        feedbackPromptHeadline: { type: 'string', title: 'Feedback Headline' },
        feedbackFormLink: { type: 'string', title: 'Feedback Form Link' },
        loyaltyProgramHeadline: { type: 'string', title: 'Loyalty Program Headline' },
        loyaltyProgramDetails: { type: 'string', title: 'Loyalty Program Details' },
        loyaltyProgramJoinLink: { type: 'string', title: 'Loyalty Program Join Link' },
    }
};

export const TipsThankYouAPSchema: JsonSchema = {
    title: "Configure Simple Tip Thank You Page",
    type: "object",
    properties: {
        ...baseAPSchemaProperties,
        showAmountTipped: { type: 'boolean', title: 'Show Amount Tipped', default: true },
        personalNote: { type: 'string', title: 'Personal Note (Optional)' },
        nextStepSuggestion: { type: 'string', title: 'Next Step Suggestion (Optional)' },
        nextStepLink: { type: 'string', title: 'Next Step Link (Optional)' },
    }
};

export const EventTicketConfirmedQRAPSchema: JsonSchema = {
    title: "Configure Ticket & QR Code Page",
    type: "object",
    properties: {
        ...baseAPSchemaProperties,
        qrCodeInfoText: { type: 'string', title: 'QR Code Info Text' },
        showEventDetails: { type: 'boolean', title: 'Show Event Details', default: true },
        additionalInstructions: { type: 'string', title: 'Additional Instructions (Optional)' },
    }
};

export const EventInfoShareAPSchema: JsonSchema = {
    title: "Configure Event Info & Share Page",
    type: "object",
    properties: {
        ...baseAPSchemaProperties,
        eventRecapHeadline: { type: 'string', title: 'Event Recap Headline' },
        sharePrompt: { type: 'string', title: 'Share Prompt' },
        shareButtons: {
            type: 'array', title: 'Social Share Buttons', items: {
                type: 'object', properties: { platform: { type: 'string', enum: ['Facebook', 'Twitter', 'LinkedIn', 'Email'] }, link: { type: 'string' }, text: { type: 'string' } }
            }
        },
        galleryLink: { type: 'string', title: 'Event Gallery Link' },
        galleryButtonText: { type: 'string', title: 'Gallery Button Text' },
        nextEventPrompt: { type: 'string', title: 'Next Event Prompt' },
        nextEventLink: { type: 'string', title: 'Next Event Link' },
        nextEventButtonText: { type: 'string', title: 'Next Event Button Text' },
    }
};

export const EventPreparationInfoAPSchema: JsonSchema = {
    title: "Configure Event Preparation Info Page",
    type: "object",
    properties: {
        ...baseAPSchemaProperties,
        preparationHeadline: { type: 'string', title: 'Preparation Headline' },
        preparationSteps: { type: 'array', title: 'Preparation Steps', items: { type: 'string' } },
        whatNotToDo: { type: 'array', title: 'What Not To Do/Bring', items: { type: 'string' } },
        venueMapEmbedUrl: { type: 'string', title: 'Venue Map Embed URL' },
        contactForHelp: { type: 'string', title: 'Contact for Help' },
    }
};


export const AppointmentBookingConfirmedAPSchema: JsonSchema = {
    title: "Configure Booking Confirmed Page",
    type: "object",
    properties: {
        ...baseAPSchemaProperties,
        confirmationHeadline: { type: 'string', title: 'Confirmation Headline' },
        showAppointmentDetails: { type: 'boolean', title: 'Show Appointment Details', default: true },
        whatToExpect: { type: 'array', title: 'What to Expect List', items: { type: 'string' } },
        contactForQuestions: { type: 'string', title: 'Contact Info for Questions' },
    }
};

export const AppointmentBookingConfirmedCalendarAPSchema: JsonSchema = {
    ...AppointmentBookingConfirmedAPSchema,
    title: "Configure Booking Confirmed w/ Calendar Page",
    properties: {
        ...AppointmentBookingConfirmedAPSchema.properties,
        showAddToCalendar: { type: 'boolean', title: 'Show "Add to Calendar" buttons', default: true },
    }
};

export const AppointmentBookingIntakeFormAPSchema: JsonSchema = {
    title: "Configure Intake Form Page",
    type: "object",
    properties: {
        ...baseAPSchemaProperties,
        formHeadline: { type: 'string', title: 'Form Headline' },
        formDescription: { type: 'string', title: 'Form Description' },
        intakeFormUrl: { type: 'string', title: 'Intake Form URL' },
        formButtonText: { type: 'string', title: 'Form Button Text' },
    }
};

export const AppointmentBookingUpsellAPSchema: JsonSchema = {
    title: "Configure Upsell Services Page",
    type: "object",
    properties: {
        ...baseAPSchemaProperties,
        upsellHeadline: { type: 'string', title: 'Upsell Headline' },
        upsellDescription: { type: 'string', title: 'Upsell Description' },
        upsellItems: {
            type: 'array', title: 'Upsell Items', items: {
                type: 'object', properties: { name: { type: 'string' }, description: { type: 'string' }, price: { type: 'string' }, link: { type: 'string' } }
            }
        },
    }
};

export const AppointmentBookingReferralAPSchema: JsonSchema = {
    title: "Configure Referral Page",
    type: "object",
    properties: {
        ...baseAPSchemaProperties,
        referralHeadline: { type: 'string', title: 'Referral Headline' },
        referralMessage: { type: 'string', uiWidget: 'textarea', title: 'Referral Message' },
        referralCode: { type: 'string', title: 'Referral Code (mock)' },
        socialShareText: { type: 'string', title: 'Social Media Share Text' },
    }
};

export const AppointmentPreparationInfoAPSchema: JsonSchema = {
    title: "Configure Appointment Prep Info Page",
    type: "object",
    properties: {
        ...baseAPSchemaProperties,
        preparationHeadline: { type: 'string', title: 'Preparation Headline' },
        preparationSteps: { type: 'array', title: 'Preparation Steps', items: { type: 'string' } },
        whatNotToDo: { type: 'array', title: 'What Not To Do/Bring', items: { type: 'string' } },
        locationMapEmbedUrl: { type: 'string', title: 'Location Map Embed URL' },
        contactForHelp: { type: 'string', title: 'Contact for Help' },
    }
};


export const DigitalContentCommunityFeedbackAPSchema: JsonSchema = {
    title: "Configure Community & Feedback Page",
    type: "object",
    properties: {
        ...baseAPSchemaProperties,
        communityHeadline: { type: 'string', title: 'Community Headline' },
        communityJoinLink: { type: 'string', title: 'Community Join Link' },
        communityButtonText: { type: 'string', title: 'Community Button Text' },
        feedbackHeadline: { type: 'string', title: 'Feedback Headline' },
        feedbackFormLink: { type: 'string', title: 'Feedback Form Link' },
        feedbackButtonText: { type: 'string', title: 'Feedback Button Text' },
    }
};

export const DigitalContentLicenseKeyAPSchema: JsonSchema = {
    title: "Configure License Key Page",
    type: "object",
    properties: {
        ...baseAPSchemaProperties,
        licenseKeyHeadline: { type: 'string', title: 'License Key Headline' },
        licenseKey: { type: 'string', title: 'License Key (Mock)' },
        activationInstructions: { type: 'string', uiWidget: 'textarea', title: 'Activation Instructions' },
    }
};

export const InvoicePaidReceiptAPSchema: JsonSchema = {
    title: "Configure Invoice Paid Receipt Page",
    type: "object",
    properties: {
        ...baseAPSchemaProperties,
        receiptHeadline: { type: 'string', title: 'Receipt Headline' },
        showInvoiceNumber: { type: 'boolean', title: 'Show Invoice Number', default: true },
        showPaymentDetails: { type: 'boolean', title: 'Show Payment Details', default: true },
        nextSteps: { type: 'string', title: 'Next Steps (Optional)' },
        downloadPdfLink: { type: 'string', title: 'Download PDF Link (Optional)' },
    }
};

export const InvoiceNextStepsRateAPSchema: JsonSchema = {
    title: "Configure Invoice Next Steps & Rating Page",
    type: "object",
    properties: {
        ...baseAPSchemaProperties,
        nextStepsHeadline: { type: 'string', title: 'Next Steps Headline' },
        nextStepsList: { type: 'array', title: 'Next Steps List', items: { type: 'string' } },
        requestFeedbackText: { type: 'string', title: 'Request Feedback Text' },
        requestFeedbackLink: { type: 'string', title: 'Feedback Form Link' },
        leaveReviewText: { type: 'string', title: 'Leave Review Text' },
        leaveReviewLink: { type: 'string', title: 'Review Site Link' },
    }
};

export const InvoiceSimpleThankYouAPSchema: JsonSchema = {
    title: "Configure Simple Thank You Page",
    type: "object",
    properties: {
        ...baseAPSchemaProperties,
        personalNote: { type: 'string', uiWidget: 'textarea', title: 'Personal Note' },
    }
};

export const InvoiceUpsellServicesAPSchema: JsonSchema = {
    title: "Configure Upsell Services Page",
    type: "object",
    properties: {
        ...baseAPSchemaProperties,
        upsellSectionTitle: { type: 'string', title: 'Upsell Section Title' },
        upsellItems: {
            type: 'array', title: 'Upsell Items', items: {
                type: 'object', properties: { name: { type: 'string' }, description: { type: 'string' }, price: { type: 'string' }, link: { type: 'string' } }
            }
        },
    }
};

export const MembershipPassQRAPSchema: JsonSchema = {
    title: "Configure Membership Pass Page",
    type: "object",
    properties: {
        ...baseAPSchemaProperties,
        qrCodeInfoText: { type: 'string', title: 'QR Code Info Text' },
        showMembershipDetails: { type: 'boolean', title: 'Show Membership Details', default: true },
        additionalInstructions: { type: 'string', title: 'Additional Instructions (Optional)' },
    }
};

export const MembershipWelcomeOnboardingAPSchema: JsonSchema = {
    title: "Configure Welcome & Onboarding Page",
    type: "object",
    properties: {
        ...baseAPSchemaProperties,
        welcomeHeadline: { type: 'string', title: 'Welcome Headline' },
        onboardingSteps: { type: 'array', title: 'Onboarding Steps', items: { type: 'object', properties: { text: { type: 'string' }, isComplete: { type: 'boolean', default: false } } } },
        showPassQRCode: { type: 'boolean', title: 'Show Membership Pass QR Code', default: true },
    }
};

export const MembershipContentTeaserAPSchema: JsonSchema = {
    title: "Configure Content Teaser Page",
    type: "object",
    properties: {
        ...baseAPSchemaProperties,
        teaserHeadline: { type: 'string', title: 'Teaser Headline' },
        teaserItems: {
            type: 'array', title: 'Teaser Items', items: {
                type: 'object', properties: { title: { type: 'string' }, imageUrl: { type: 'string' }, description: { type: 'string' } }
            }
        },
        showPassQRCode: { type: 'boolean', title: 'Show Membership Pass QR Code', default: true },
    }
};

export const MembershipReferralAPSchema: JsonSchema = {
    ...SubscriptionReferralAPSchema,
    title: "Configure Member Referral Page",
    properties: {
        ...SubscriptionReferralAPSchema.properties,
        showPassQRCode: { type: 'boolean', title: 'Show Membership Pass QR Code', default: true },
    }
};

export const VoucherCodeDisplayAPSchema: JsonSchema = {
  title: "Configure Voucher Code Display Page",
  type: "object",
  properties: {
    ...baseAPSchemaProperties,
    headline: { type: 'string', title: 'Headline' },
    instructions: { type: 'string', uiWidget: 'textarea', title: 'Instructions' },
    showQRCodeForCode: { type: 'boolean', title: 'Show QR code of voucher code', default: true },
  }
};

export const VoucherSendAsGiftAPSchema: JsonSchema = {
  title: "Configure Send as Gift Page",
  type: "object",
  properties: {
    ...baseAPSchemaProperties,
    headline: { type: 'string', title: 'Headline' },
    sendPrompt: { type: 'string', title: 'Prompt Message' },
    recipientEmailLabel: { type: 'string', title: 'Recipient Email Field Label' },
    messageLabel: { type: 'string', title: 'Personal Message Field Label' },
    sendButtonText: { type: 'string', title: 'Send Button Text' },
  }
};

export const VoucherCorporateBrandedAPSchema: JsonSchema = {
  title: "Configure Corporate Branded Voucher Page",
  type: "object",
  properties: {
    ...baseAPSchemaProperties,
    headline: { type: 'string', title: 'Headline' },
    companyNameLabel: { type: 'string', title: 'Company Name Label' },
    issuedByLabel: { type: 'string', title: 'Issued By Label' },
  }
};

export const VoucherInteractiveRevealAPSchema: JsonSchema = {
  title: "Configure Interactive Reveal Page",
  type: "object",
  properties: {
    ...baseAPSchemaProperties,
    headline: { type: 'string', title: 'Headline' },
    revealPrompt: { type: 'string', title: 'Reveal Prompt' },
    revealButtonText: { type: 'string', title: 'Reveal Button Text' },
  }
};

export const DigitalContentSupportMoreAPSchema: JsonSchema = {
  title: "Configure Support More Page",
  type: "object",
  properties: {
    ...baseAPSchemaProperties,
    supportHeadline: { type: 'string', title: 'Headline' },
    supportMessage: { type: 'string', uiWidget: 'textarea', title: 'Message' },
    viewOtherProductsLink: { type: 'string', title: 'Other Products Link' },
    viewOtherProductsButtonText: { type: 'string', title: 'Other Products Button Text' },
    merchandiseLink: { type: 'string', title: 'Merchandise Store Link' },
    merchandiseButtonText: { type: 'string', title: 'Merchandise Button Text' },
    socialMediaPrompt: { type: 'string', title: 'Social Media Prompt' },
    socialMediaLinks: { type: 'array', title: 'Social Media Links', items: { type: 'object', properties: { platform: { type: 'string' }, link: { type: 'string' } } } },
  }
};

export const TipsSupportMoreAPSchema: JsonSchema = {
  title: "Configure Support More Page",
  type: "object",
  properties: {
    ...baseAPSchemaProperties,
    supportMoreHeadline: { type: 'string', title: 'Headline' },
    supportMoreMessage: { type: 'string', uiWidget: 'textarea', title: 'Message' },
    otherWaysToSupport: { type: 'array', title: 'Other Support Links', items: { type: 'object', properties: { title: { type: 'string' }, description: { type: 'string' }, link: { type: 'string' } } } },
    socialMediaLinks: { type: 'array', title: 'Social Media Links', items: { type: 'object', properties: { platform: { type: 'string' }, link: { type: 'string' } } } },
  }
};


// --- ADMIN SCHEMAS ---
const baseAdminEntitySchemaProperties = {
  id: { type: "string", title: "ID", readOnly: true },
  tenantId: { type: "string", title: "Tenant ID", readOnly: true },
};

export const ProductSchema: JsonSchema = {
    title: "forms.admin.product.title",
    type: "object",
    properties: {
        ...baseAdminEntitySchemaProperties,
        active: { type: "boolean", title: "forms.admin.product.active" },
        name: { type: "string", title: "forms.admin.product.name" },
        description: { type: "string", uiWidget: 'textarea', title: "forms.admin.product.description" },
        images: { type: "array", items: { type: "string" }, title: "forms.admin.product.images" },
        metadata: { type: "object", title: "forms.admin.product.metadata" },
    },
    required: ['name'],
};

export const PriceSchema: JsonSchema = {
  title: "forms.admin.price.title",
  type: "object",
  properties: {
    ...baseAdminEntitySchemaProperties,
    product: { type: "string", title: "forms.admin.price.product" }, // Will be a dropdown
    active: { type: "boolean", title: "forms.admin.price.active" },
    unit_amount: { type: "integer", title: "forms.admin.price.amount" },
    currency: { type: "string", title: "forms.admin.price.currency", default: 'usd' },
    type: { type: "string", title: "forms.admin.price.type", enum: ['one_time', 'recurring'] },
    recurring: {
      type: "object", title: "forms.admin.price.recurring", properties: {
        interval: { type: 'string', enum: ['day', 'week', 'month', 'year'], title: "forms.admin.price.interval" },
        interval_count: { type: 'integer', default: 1, title: "forms.admin.price.intervalCount" }
      }
    }
  },
  required: ['product', 'unit_amount', 'currency', 'type']
};

export const CouponSchema: JsonSchema = {
  title: "forms.admin.coupon.title",
  type: "object",
  properties: {
    id: { type: "string", title: "forms.admin.coupon.code", description: "forms.admin.coupon.codeDesc" },
    name: { type: "string", title: "forms.admin.coupon.name" },
    percent_off: { type: "number", title: "forms.admin.coupon.percent", minimum: 0, maximum: 100 },
    amount_off: { type: "integer", title: "forms.admin.coupon.amount" },
    currency: { type: "string", title: "forms.admin.coupon.currency" },
    valid: { type: "boolean", title: "forms.admin.coupon.active", default: true },
  },
  required: ['id']
};

export const TaxRateSchema: JsonSchema = {
  title: "forms.admin.tax.title",
  type: "object",
  properties: {
    ...baseAdminEntitySchemaProperties,
    display_name: { type: "string", title: "forms.admin.tax.name" },
    percentage: { type: "number", title: "forms.admin.tax.percent" },
    inclusive: { type: "boolean", title: "forms.admin.tax.inclusive" },
    description: { type: "string", title: "forms.admin.tax.desc" },
    jurisdiction: { type: "string", title: "forms.admin.tax.jurisdiction" },
    country: { type: "string", title: "forms.admin.tax.country" },
    state: { type: "string", title: "forms.admin.tax.state" },
    active: { type: "boolean", title: "forms.admin.tax.active", default: true },
  },
  required: ['display_name', 'percentage']
};

export const ShippingRateSchema: JsonSchema = {
  title: "forms.admin.shipping.title",
  type: "object",
  properties: {
    ...baseAdminEntitySchemaProperties,
    display_name: { type: "string", title: "forms.admin.shipping.name" },
    active: { type: "boolean", title: "forms.admin.shipping.active", default: true },
    type: { type: "string", enum: ['fixed_amount'], default: 'fixed_amount', readOnly: true },
    fixed_amount: {
      type: "object", properties: {
        amount: { type: "integer", title: "forms.admin.shipping.amount" },
        currency: { type: "string", title: "forms.admin.shipping.currency", default: 'usd' },
      }
    },
    delivery_estimate: {
      type: "object", properties: {
        minimum: { type: "object", properties: { value: { type: "integer", title: "forms.admin.shipping.minVal" }, unit: { type: "string", enum: ['day', 'week', 'month'], title: "forms.admin.shipping.minUnit" } } },
        maximum: { type: "object", properties: { value: { type: "integer", title: "forms.admin.shipping.maxVal" }, unit: { type: "string", enum: ['day', 'week', 'month'], title: "forms.admin.shipping.maxUnit" } } }
      }
    }
  },
  required: ['display_name']
};

export const CustomerSchema: JsonSchema = {
  title: "forms.admin.customer.title",
  type: "object",
  properties: {
    ...baseAdminEntitySchemaProperties,
    name: { type: "string", title: "forms.admin.customer.name" },
    email: { type: "string", title: "forms.admin.customer.email" },
    phone: { type: "string", title: "forms.admin.customer.phone" },
  },
  required: ['name', 'email']
};

export const SubscriptionSchema: JsonSchema = {
  title: "forms.admin.subscription.title",
  type: "object",
  properties: {
    ...baseAdminEntitySchemaProperties,
    customer: { type: "string", title: "forms.admin.subscription.customer" },
    status: { type: "string", title: "forms.admin.subscription.status", enum: ['active', 'canceled', 'past_due', 'unpaid', 'incomplete', 'incomplete_expired', 'trialing'] },
    items: { type: "array", title: "forms.admin.subscription.items", items: { type: "object", properties: { price: { type: 'string', title: "forms.admin.subscription.priceId" } } } },
  },
  required: ['customer', 'status', 'items']
};

export const TransactionSchema: JsonSchema = {
    title: "forms.admin.transaction.title",
    type: "object",
    properties: {
        ...baseAdminEntitySchemaProperties,
        customer: { type: "string", title: "forms.admin.transaction.customer" },
        amount: { type: "integer", title: "forms.admin.transaction.amount" },
        currency: { type: "string", title: "forms.admin.transaction.currency", default: 'usd' },
        status: { type: "string", title: "forms.admin.transaction.status", enum: ['succeeded', 'pending', 'failed'] },
        description: { type: "string", title: "forms.admin.transaction.desc" },
        pageId: { type: "string", title: "forms.admin.transaction.pageId" },
    },
    required: ['amount', 'currency', 'status', 'description']
};

export const EmailTemplateSchema: JsonSchema = {
  title: "forms.admin.email.title",
  type: "object",
  properties: {
    ...baseAdminEntitySchemaProperties,
    isEnabled: { type: "boolean", title: "forms.admin.email.enabled", default: true },
    name: { type: "string", title: "forms.admin.email.name" },
    triggerPageId: { type: "string", title: "forms.admin.email.triggerPage", description: "forms.admin.email.triggerPageDesc" },
    triggerSessionStatus: { type: "string", title: "forms.admin.email.triggerStatus", enum: Object.values(SessionStatus), default: SessionStatus.PAID, description: "forms.admin.email.triggerStatusDesc" },
    subject: { type: "string", title: "forms.admin.email.subject", description: "forms.admin.email.subjectDesc" },
    body: { type: "string", uiWidget: "textarea", rows: 10, title: "forms.admin.email.body", description: "forms.admin.email.bodyDesc" },
  },
  required: ['name', 'subject', 'body']
};

export const DigitalAssetSchema: JsonSchema = {
  title: "forms.admin.digitalAsset.title",
  type: "object",
  properties: {
    ...baseAdminEntitySchemaProperties,
    name: { type: "string", title: "forms.admin.digitalAsset.name" },
    description: { type: "string", uiWidget: 'textarea', title: "forms.admin.digitalAsset.desc" },
    fileUrl: { type: "string", uiWidget: "file", title: "forms.admin.digitalAsset.fileUrl" },
    fileName: { type: "string", title: "forms.admin.digitalAsset.fileName", readOnly: true },
    fileType: { type: "string", title: "forms.admin.digitalAsset.fileType", readOnly: true },
    fileSize: { type: "number", title: "forms.admin.digitalAsset.fileSize", readOnly: true },
  },
  required: ['name', 'fileUrl']
};

export const CollectionSchema: JsonSchema = {
  title: "Collection",
  type: "object",
  properties: {
      ...baseAdminEntitySchemaProperties,
      title: { type: "string", title: "Title" },
      description: { type: "string", uiWidget: "textarea", title: "Description" },
      productIds: { type: "array", title: "Product IDs", items: { type: "string" }, description: "List of ShopProduct IDs in this collection." },
  },
  required: ['title']
};

export const VariantSchema: JsonSchema = {
  title: "entityEditor.variant.title",
  type: "object",
  properties: {
      title: { type: "string", title: "entityEditor.variant.properties.title" },
      sku: { type: "string", title: "entityEditor.variant.properties.sku" },
      price: { type: "number", title: "entityEditor.variant.properties.price", description: "entityEditor.variant.properties.priceDesc" },
      inventory_quantity: { type: "integer", title: "entityEditor.variant.properties.inventory", default: 0 },
      // `id`, `options`, `media` will be handled internally, not in the form
  },
  required: ['title', 'sku', 'price', 'inventory_quantity']
};

export const UserSchema: JsonSchema = {
    title: 'Invite User',
    type: 'object',
    properties: {
        email: { type: 'string', title: 'Email Address' },
        role: { type: 'string', title: 'Role', enum: Object.values(UserRole), default: UserRole.Viewer }
    },
    required: ['email', 'role']
};

export const schemas: { [key in AdminEntityType]?: JsonSchema } = {
  products: ProductSchema,
  prices: PriceSchema,
  customers: CustomerSchema,
  subscriptions: SubscriptionSchema,
  transactions: TransactionSchema,
  coupons: CouponSchema,
  taxRates: TaxRateSchema,
  shippingRates: ShippingRateSchema,
  emailTemplates: EmailTemplateSchema,
  digitalAssets: DigitalAssetSchema,
  collections: CollectionSchema,
  users: UserSchema,
};

export const CustomerPortalConfigSchema: JsonSchema = {
    title: "Customer Portal Configuration",
    type: "object",
    properties: {
        portalTitle: { type: 'string', title: 'Portal Title' },
        welcomeMessage: { type: 'string', uiWidget: 'textarea', title: 'Welcome Message' },
        theme: { type: 'string', title: 'Theme', enum: ['light', 'dark', 'ocean_breeze', 'sunset_glow', 'forest_canopy', 'midnight_tech', 'vintage_paper'] },
        showPaymentHistory: { type: 'boolean', title: 'Show Payment History' },
        allowSubscriptionCancellation: { type: 'boolean', title: 'Allow Subscription Cancellation' },
        allowPaymentMethodUpdate: { type: 'boolean', title: 'Allow Payment Method Update' },
        supportContactInfo: { type: 'string', title: 'Support Contact Info' },
    }
};