
import { Template, DonationPageLinkConfig, MonetizationUseCase } from '../../../types';
import { DEFAULT_PAGE_STYLE } from '../../../constants';

export const charityGeneralTemplate: Template<DonationPageLinkConfig> = {
  id: 'donate-charity-general',
  name: 'General Charity Donation',
  useCase: MonetizationUseCase.DONATION,
  description: 'A clean, trustworthy page for non-profits to accept general donations for their ongoing work.',
  previewIcon: 'favorite',
  previewColorClass: 'bg-red-100',
  previewIconColorClass: 'text-red-600',
  initialData: {
    id: '', pageId: '', tenantId: '', status: 'draft',
    useCase: MonetizationUseCase.DONATION,
    pageSlug: 'donate-to-charity',
    pageStyle: { ...DEFAULT_PAGE_STYLE, theme: 'light' },
    mode: 'payment',
    currency: 'USD',
    line_items: [{
      price_data: {
        currency: 'usd', unit_amount: 0, product_data: { name: 'Donation' },
        custom_unit_amount: { enabled: true, preset_amounts: [2500, 5000, 10000, 20000] },
      },
    }],
    after_completion: { type: 'custom_page_session' },
    submit_type: 'donate',
    billing_address_collection: 'required',
    accessControl: { enabled: false, verificationType: 'disabled', showQRCode: false, showAccessLink: false },
    pageTitle: 'Support Our Mission',
    pageDescription: 'Your donation helps us continue our vital work in the community. Every contribution makes a difference.',
    predefinedAmounts: [25, 50, 100, 200],
    recipientName: 'Our Non-Profit Organization',
    afterPaymentBehavior: 'showAfterPaymentPage',
    selectedAfterPaymentTemplateId: 'ap-donate-simple-thank-you-v1',
  } as DonationPageLinkConfig,
};
