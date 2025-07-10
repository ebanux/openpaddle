import { Template, VoucherPageLinkConfig, MonetizationUseCase } from '../../../types';
import { DEFAULT_PAGE_STYLE } from '../../../constants';

export const holidayGiftCardTemplate: Template<VoucherPageLinkConfig> = {
  id: 'voucher-holiday',
  name: 'Holiday Gift Card',
  useCase: MonetizationUseCase.VOUCHER,
  description: 'A festive template perfect for holiday seasons and special promotions.',
  previewIcon: 'celebration',
  previewColorClass: 'bg-red-100',
  previewIconColorClass: 'text-red-600',
  initialData: {
    id: '', pageId: '', tenantId: '', status: 'draft',
    useCase: MonetizationUseCase.VOUCHER,
    pageSlug: 'holiday-gift',
    pageStyle: { ...DEFAULT_PAGE_STYLE, theme: 'forest_canopy' },
    mode: 'payment',
    currency: 'USD',
    header_image_url: 'https://picsum.photos/seed/holiday/800/400',
    line_items: [{
      price_data: {
        currency: 'usd',
        unit_amount: 0,
        product_data: { name: 'Holiday Gift Card' },
        custom_unit_amount: {
          enabled: true,
          preset_amounts: [2500, 5000, 10000, 20000],
        },
      },
    }],
    after_completion: { type: 'custom_page_session' },
    submit_type: 'pay',
    pageTitle: 'Give the Gift of Choice',
    pageDescription: "This holiday season, give a gift they're guaranteed to love. Our digital gift cards are delivered instantly.",
    afterPaymentBehavior: 'showAfterPaymentPage',
    selectedAfterPaymentTemplateId: 'ap-voucher-interactive-reveal-v1',
  } as VoucherPageLinkConfig,
};
