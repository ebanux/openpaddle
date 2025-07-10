import { Template, SimpleInvoicePageLinkConfig, MonetizationUseCase } from '../../../types';
import { DEFAULT_PAGE_STYLE } from '../../../constants';

export const creativeProjectInvoiceTemplate: Template<SimpleInvoicePageLinkConfig> = {
    id: 'si-creative-project',
    name: 'Creative Project Invoice',
    useCase: MonetizationUseCase.SIMPLE_INVOICE,
    description: 'A stylish invoice for creative freelancers (designers, writers, etc.).',
    previewIcon: 'brush',
    previewColorClass: 'bg-rose-100',
    previewIconColorClass: 'text-rose-600',
    initialData: {
      id: '', pageId: '', tenantId: '', status: 'draft',
      useCase: MonetizationUseCase.SIMPLE_INVOICE,
      pageSlug: 'project-aurora',
      pageStyle: { ...DEFAULT_PAGE_STYLE, theme: 'vintage_paper' },
      mode: 'payment',
      currency: 'USD',
      line_items: [{
        price_data: {
          currency: 'usd',
          unit_amount: 200000, // $2,000.00
          product_data: { name: 'Project Aurora: Branding & Logo Design' }
        }
      }],
      after_completion: { type: 'custom_page_session' },
      requestTitle: 'Final Payment for Project Aurora',
      yourNameOrBusinessName: 'Alex Doe Creative Studio',
      clientName: 'Startup Inc.',
      itemDescription: 'Final milestone payment for the complete branding package, including all logo assets, style guide, and brand collateral as delivered.',
      notes: 'It was a pleasure bringing your vision to life! Looking forward to our next collaboration.',
      invoiceNumber: 'PROJ-AURORA-FINAL',
      afterPaymentBehavior: 'showAfterPaymentPage',
      selectedAfterPaymentTemplateId: 'ap-invoice-testimonial-v1',
    } as SimpleInvoicePageLinkConfig,
  };
