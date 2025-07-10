import { Template, SimpleInvoicePageLinkConfig, MonetizationUseCase } from '../../../types';
import { DEFAULT_PAGE_STYLE } from '../../../constants';

export const hourlyWorkInvoiceTemplate: Template<SimpleInvoicePageLinkConfig> = {
    id: 'si-hourly-work',
    name: 'Hourly Work Invoice',
    useCase: MonetizationUseCase.SIMPLE_INVOICE,
    description: 'A clear invoice for billing clients for hourly work.',
    previewIcon: 'timer',
    previewColorClass: 'bg-sky-100',
    previewIconColorClass: 'text-sky-600',
    initialData: {
      id: '', pageId: '', tenantId: '', status: 'draft',
      useCase: MonetizationUseCase.SIMPLE_INVOICE,
      pageSlug: 'web-dev-hours-may',
      pageStyle: { ...DEFAULT_PAGE_STYLE, theme: 'midnight_tech' },
      mode: 'payment',
      currency: 'USD',
      line_items: [{
        price_data: {
          currency: 'usd',
          unit_amount: 187500, // $1,875.00 (e.g., 25 hours @ $75/hr)
          product_data: { name: 'Web Development Services (May)' }
        }
      }],
      after_completion: { type: 'custom_page_session' },
      requestTitle: 'Invoice for May Services',
      yourNameOrBusinessName: 'DevWorks',
      clientName: 'Tech Solutions Ltd.',
      itemDescription: '25 hours of development work at a rate of $75/hour. Work includes frontend feature implementation and bug fixes as detailed in our shared project tracker.',
      invoiceNumber: 'DW-2024-05',
      afterPaymentBehavior: 'showAfterPaymentPage',
      selectedAfterPaymentTemplateId: 'ap-invoice-receipt-v1',
    } as SimpleInvoicePageLinkConfig,
  };
