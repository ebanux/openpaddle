import { Template, VoucherPageLinkConfig, MonetizationUseCase } from '../../../types';
import { DEFAULT_PAGE_STYLE } from '../../../constants';

export const birthdayGiftCardTemplate: Template<VoucherPageLinkConfig> = {
  id: 'voucher-birthday',
  name: 'Birthday Gift Card',
  useCase: MonetizationUseCase.VOUCHER,
  description: 'A celebratory gift card template, perfect for birthdays.',
  previewIcon: 'cake',
  previewColorClass: 'bg-pink-100',
  previewIconColorClass: 'text-pink-600',
  initialData: {
    id: '', pageId: '', tenantId: '', status: 'draft',
    useCase: MonetizationUseCase.VOUCHER,
    pageSlug: 'birthday-gift',
    pageStyle: { ...DEFAULT_PAGE_STYLE, theme: 'sunset_glow' },
    mode: 'payment',
    currency: 'USD',
    header_image_url: 'https://picsum.photos/seed/birthday/800/400',
    custom_fields: [
        { key: 'recipient_name', type: 'text', label: { type: 'custom', custom: "Recipient's Name" }, optional: false },
        { key: 'personal_message', type: 'text', label: { type: 'custom', custom: 'Your Personal Message (Optional)' }, optional: true, text: { maximum_length: 200 } },
    ],
    line_items: [{
      price_data: {
        currency: 'usd',
        unit_amount: 0,
        product_data: { name: 'Birthday Gift Card' },
        custom_unit_amount: {
          enabled: true,
          preset_amounts: [2000, 5000, 10000],
        },
      },
    }],
    after_completion: { type: 'custom_page_session' },
    submit_type: 'pay',
    pageTitle: 'Happy Birthday!',
    pageDescription: 'Send a special birthday gift they can use on anything they want.',
    afterPaymentBehavior: 'showAfterPaymentPage',
    selectedAfterPaymentTemplateId: 'ap-voucher-send-as-gift-v1',
  } as VoucherPageLinkConfig,
};
