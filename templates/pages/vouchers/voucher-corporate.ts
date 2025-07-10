import { Template, VoucherPageLinkConfig, MonetizationUseCase } from '../../../types';
import { DEFAULT_PAGE_STYLE } from '../../../constants';

export const corporateGiftCardTemplate: Template<VoucherPageLinkConfig> = {
  id: 'voucher-corporate',
  name: 'Corporate Gift Card',
  useCase: MonetizationUseCase.VOUCHER,
  description: 'A professional template for B2B gift card sales and employee rewards.',
  previewIcon: 'business',
  previewColorClass: 'bg-blue-100',
  previewIconColorClass: 'text-blue-600',
  initialData: {
    id: '', pageId: '', tenantId: '', status: 'draft',
    useCase: MonetizationUseCase.VOUCHER,
    pageSlug: 'corporate-gifts',
    pageStyle: { ...DEFAULT_PAGE_STYLE, theme: 'light' },
    mode: 'payment',
    currency: 'USD',
    custom_fields: [
        { key: 'company_name', type: 'text', label: { type: 'custom', custom: "Your Company Name" }, optional: false },
    ],
    line_items: [{
      price_data: {
        currency: 'usd',
        unit_amount: 0,
        product_data: { name: 'Corporate Gift Card' },
        custom_unit_amount: {
          enabled: true,
          preset_amounts: [2500, 5000, 10000, 25000],
        },
      },
    }],
    after_completion: { type: 'custom_page_session' },
    submit_type: 'pay',
    pageTitle: 'Corporate Gift Cards',
    pageDescription: 'A perfect way to reward employees or thank clients. Purchase digital gift cards in bulk or individually.',
    afterPaymentBehavior: 'showAfterPaymentPage',
    selectedAfterPaymentTemplateId: 'ap-voucher-corporate-branded-v1',
  } as VoucherPageLinkConfig,
};
