

import { Template, DonationPageLinkConfig, MonetizationUseCase } from '../../../types';
import { DEFAULT_PAGE_STYLE } from '../../../constants';

export const supportCreatorTemplate: Template<DonationPageLinkConfig> = {
  id: 'donate-support-creator',
  name: 'Support a Creator',
  useCase: MonetizationUseCase.DONATION,
  description: 'A simple, clean page for creators to accept donations or tips.',
  previewIcon: 'volunteer_activism',
  previewColorClass: 'bg-pink-100',
  previewIconColorClass: 'text-pink-600',
  initialData: {
    id: '', pageId: '', tenantId: '', status: 'draft',
    useCase: MonetizationUseCase.DONATION,
    pageSlug: 'support-me',
    pageStyle: { ...DEFAULT_PAGE_STYLE, theme: 'sunset_glow' },
    mode: 'payment',
    currency: 'USD',
    line_items: [{
      price_data: {
        currency: 'usd',
        unit_amount: 0,
        product_data: { name: 'Donation' },
        custom_unit_amount: {
          enabled: true,
          preset_amounts: [500, 1000, 2000], // $5, $10, $20
        },
      },
    }],
    after_completion: { type: 'custom_page_session' },
    submit_type: 'donate',
    billing_address_collection: 'auto',
    phone_number_collection: { enabled: false },
    allow_promotion_codes: false,
    accessControl: { enabled: false, verificationType: 'disabled', showQRCode: false, showAccessLink: false },
    
    pageTitle: 'Support My Work',
    pageDescription: 'If you enjoy my content, please consider supporting me with a small donation. It helps me create more of what you love!',
    predefinedAmounts: [5, 10, 20],
    recipientName: 'The Creator',

    afterPaymentBehavior: 'showAfterPaymentPage',
    selectedAfterPaymentTemplateId: 'ap-donate-personal-note-v1',
  } as DonationPageLinkConfig,
};
