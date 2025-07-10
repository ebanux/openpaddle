
import { Template, VoucherPageLinkConfig, MonetizationUseCase } from '../../../types';
import { DEFAULT_PAGE_STYLE } from '../../../constants';

export const standardVoucherTemplate: Template<VoucherPageLinkConfig> = {
  id: 'voucher-standard',
  name: 'Standard Gift Card',
  useCase: MonetizationUseCase.VOUCHER,
  description: 'A simple and elegant page to sell digital gift cards in various amounts.',
  previewIcon: 'card_giftcard',
  previewColorClass: 'bg-green-100',
  previewIconColorClass: 'text-green-600',
  initialData: {
    id: '', pageId: '', tenantId: '', status: 'draft',
    useCase: MonetizationUseCase.VOUCHER,
    pageSlug: 'gift-card',
    pageStyle: { ...DEFAULT_PAGE_STYLE, theme: 'light' },
    mode: 'payment',
    currency: 'USD',
    line_items: [{
      price_data: {
        currency: 'usd',
        unit_amount: 0, // This is a placeholder, amount is selected on the page
        product_data: { name: 'Gift Card' },
        custom_unit_amount: {
          enabled: true,
          preset_amounts: [1000, 2500, 5000, 10000], // $10, $25, $50, $100
        },
      },
    }],
    after_completion: { type: 'custom_page_session' },
    submit_type: 'pay',
    billing_address_collection: 'required',
    accessControl: { enabled: false, verificationType: 'disabled', showQRCode: false, showAccessLink: false },
    pageTitle: 'Purchase a Gift Card',
    pageDescription: 'The perfect gift for any occasion. Choose an amount and send a digital gift card instantly.',
    afterPaymentBehavior: 'showAfterPaymentPage',
    selectedAfterPaymentTemplateId: 'ap-voucher-code-display-v1',
  } as VoucherPageLinkConfig,
};
