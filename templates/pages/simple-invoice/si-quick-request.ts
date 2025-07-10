import { Template, SimpleInvoicePageLinkConfig, MonetizationUseCase } from '../../../types';
import { DEFAULT_PAGE_STYLE } from '../../../constants';

export const quickPaymentRequestTemplate: Template<SimpleInvoicePageLinkConfig> = {
    id: 'si-quick-request',
    name: 'Quick Payment Request',
    useCase: MonetizationUseCase.SIMPLE_INVOICE,
    description: 'A minimal, fast way to request a specific payment.',
    previewIcon: 'bolt',
    previewColorClass: 'bg-yellow-100',
    previewIconColorClass: 'text-yellow-600',
    initialData: {
      id: '', pageId: '', tenantId: '', status: 'draft',
      useCase: MonetizationUseCase.SIMPLE_INVOICE,
      pageSlug: 'pay-deposit',
      pageStyle: { ...DEFAULT_PAGE_STYLE, theme: 'ocean_breeze' },
      mode: 'payment',
      currency: 'USD',
      line_items: [{
        price_data: {
          currency: 'usd',
          unit_amount: 50000, // $500.00
          product_data: { name: 'Project Deposit' }
        }
      }],
      after_completion: { type: 'custom_page_session' },
      requestTitle: 'Project Deposit Payment',
      itemDescription: 'This payment is for the 50% deposit to begin work on the website redesign project.',
      afterPaymentBehavior: 'showAfterPaymentPage',
      selectedAfterPaymentTemplateId: 'ap-invoice-next-steps-v1',
    } as SimpleInvoicePageLinkConfig,
  };
