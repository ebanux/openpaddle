
import { Template, SimpleInvoicePageLinkConfig, MonetizationUseCase } from '../../../types';
import { DEFAULT_PAGE_STYLE } from '../../../constants';

export const freelanceInvoiceTemplate: Template<SimpleInvoicePageLinkConfig> = {
    id: 'si-freelance-work',
    name: 'Simple Freelance Invoice',
    useCase: MonetizationUseCase.SIMPLE_INVOICE,
    description: 'A straightforward page for clients to pay an invoice for services rendered.',
    previewIcon: 'receipt_long',
    previewColorClass: 'bg-slate-100',
    previewIconColorClass: 'text-slate-600',
    initialData: {
      id: '', pageId: '', tenantId: '', status: 'draft',
      useCase: MonetizationUseCase.SIMPLE_INVOICE,
      pageSlug: 'invoice-123',
      pageStyle: { ...DEFAULT_PAGE_STYLE, theme: 'light' },
      mode: 'payment',
      currency: 'USD',
      line_items: [{
        price_data: {
          currency: 'usd',
          unit_amount: 45000, // $450.00
          product_data: { name: 'Web Design Services - Project Alpha' }
        }
      }],
      after_completion: { type: 'custom_page_session' },
      requestTitle: 'Payment Request for Invoice #123',
      yourNameOrBusinessName: 'Creative Solutions LLC',
      clientName: 'Client Co.',
      itemDescription: 'Completed web design and development for Project Alpha as per our agreement.',
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Due in 14 days
      notes: 'Thank you for your business!',
      invoiceNumber: 'INV-123',
      afterPaymentBehavior: 'showAfterPaymentPage',
      selectedAfterPaymentTemplateId: 'ap-invoice-receipt-v1',
    } as SimpleInvoicePageLinkConfig,
  };
