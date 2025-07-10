
import { Template, DonationPageLinkConfig, MonetizationUseCase } from '../../../types';
import { DEFAULT_PAGE_STYLE } from '../../../constants';

export const projectSupportTemplate: Template<DonationPageLinkConfig> = {
  id: 'donate-project-support',
  name: 'Open Source Project Support',
  useCase: MonetizationUseCase.DONATION,
  description: 'A simple page for an open-source project to receive one-time or recurring donations.',
  previewIcon: 'code',
  previewColorClass: 'bg-slate-100',
  previewIconColorClass: 'text-slate-600',
  initialData: {
    id: '', pageId: '', tenantId: '', status: 'draft',
    useCase: MonetizationUseCase.DONATION,
    pageSlug: 'support-our-project',
    pageStyle: { ...DEFAULT_PAGE_STYLE, theme: 'light' },
    mode: 'payment', // could be subscription too
    currency: 'USD',
    line_items: [{
      price_data: {
        currency: 'usd', unit_amount: 0, product_data: { name: 'Donation to Project' },
        custom_unit_amount: { enabled: true, preset_amounts: [500, 1000, 2500, 5000] },
      },
    }],
    after_completion: { type: 'custom_page_session' },
    submit_type: 'donate',
    pageTitle: 'Support Our Open-Source Project',
    pageDescription: 'Our tools are free to use. If you find them valuable, consider making a donation to support continued development and maintenance.',
    predefinedAmounts: [5, 10, 25, 50],
    recipientName: 'The Project Team',
    afterPaymentBehavior: 'showAfterPaymentPage',
    selectedAfterPaymentTemplateId: 'ap-donate-explore-content-v1',
  } as DonationPageLinkConfig,
};
