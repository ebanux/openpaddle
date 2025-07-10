
import { Template, PaymentLinkConfig, MonetizationUseCase } from '../../../types';
import { DEFAULT_PAGE_STYLE } from '../../../constants';

export const genericPaymentLinkTemplate: Template<PaymentLinkConfig> = {
  id: 'pl-generic',
  name: 'Generic Payment Link',
  useCase: MonetizationUseCase.PAYMENT_LINK,
  description: 'A simple, flexible link for any one-time payment, subscription, or donation.',
  previewIcon: 'link',
  previewColorClass: 'bg-blue-100',
  previewIconColorClass: 'text-blue-600',
  initialData: {
    id: '',
    tenantId: '',
    status: 'draft',
    pageId: '', // will be generated on creation
    useCase: MonetizationUseCase.PAYMENT_LINK,
    pageSlug: 'pay-me',
    pageStyle: { ...DEFAULT_PAGE_STYLE, theme: 'light' },
    mode: 'payment',
    currency: 'USD',
    line_items: [{
      price_data: {
        currency: 'usd',
        unit_amount: 1000,
        product_data: {
          name: 'Payment for Services',
          description: 'A one-time payment.'
        },
      },
      quantity: 1
    }],
    after_completion: { type: 'hosted_confirmation' },
    accessControl: { enabled: false, verificationType: 'disabled', showQRCode: false, showAccessLink: false },
  } as PaymentLinkConfig,
};