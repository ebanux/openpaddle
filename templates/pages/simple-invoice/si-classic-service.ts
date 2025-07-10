import { Template, SimpleInvoicePageLinkConfig, MonetizationUseCase } from '../../../types';
import { DEFAULT_PAGE_STYLE } from '../../../constants';

export const classicServiceInvoiceTemplate: Template<SimpleInvoicePageLinkConfig> = {
    id: 'si-classic-service',
    name: 'Classic Service Invoice',
    useCase: MonetizationUseCase.SIMPLE_INVOICE,
    description: 'A standard, professional invoice for B2B services.',
    previewIcon: 'receipt_long',
    previewColorClass: 'bg-slate-100',
    previewIconColorClass: 'text-slate-600',
    initialData: {
      id: '', pageId: '', tenantId: '', status: 'draft',
      useCase: MonetizationUseCase.SIMPLE_INVOICE,
      pageSlug: 'invoice-001',
      pageStyle: { ...DEFAULT_PAGE_STYLE, theme: 'light' },
      mode: 'payment',
      currency: 'USD',
      line_items: [{
        price_data: {
          currency: 'usd',
          unit_amount: 125000, // $1,250.00
          product_data: { name: 'Q3 Consulting Services' }
        }
      }],
      after_completion: { type: 'custom_page_session' },
      requestTitle: 'Invoice #001',
      yourNameOrBusinessName: 'Your Business Inc.',
      clientName: 'Client Corporation',
      itemDescription: 'Consulting services rendered for Q3 as per agreement #C-45. Includes project management and technical advisory.',
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Due in 30 days
      notes: 'Payment is due within 30 days. Thank you for your partnership.',
      invoiceNumber: 'INV-001',
      afterPaymentBehavior: 'showAfterPaymentPage',
      selectedAfterPaymentTemplateId: 'ap-invoice-receipt-v1',
    } as SimpleInvoicePageLinkConfig,
  };
