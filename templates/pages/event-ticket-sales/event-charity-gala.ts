import { Template, EventTicketSalesPageLinkConfig, MonetizationUseCase } from '../../../types';
import { DEFAULT_PAGE_STYLE } from '../../../constants';

export const charityGalaTemplate: Template<EventTicketSalesPageLinkConfig> = {
    id: 'event-charity-gala',
    name: 'Charity Gala',
    useCase: MonetizationUseCase.EVENT_TICKET_SALES,
    description: 'An elegant page for selling tickets or tables to a charity gala, fundraiser dinner, or formal event.',
    previewIcon: 'nightlife',
    previewColorClass: 'bg-amber-100',
    previewIconColorClass: 'text-amber-700',
    initialData: {
      id: '', pageId: '', tenantId: '', status: 'draft',
      useCase: MonetizationUseCase.EVENT_TICKET_SALES,
      pageSlug: 'hope-gala-2024',
      pageStyle: { ...DEFAULT_PAGE_STYLE, theme: 'vintage_paper' },
      mode: 'payment',
      currency: 'USD',
      line_items: [
        {
          id: 'tix_individual',
          price_data: { currency: 'usd', unit_amount: 25000, product_data: { name: 'Individual Ticket', description: 'Admits one guest to the Hope Gala.' } },
          adjustable_quantity: { enabled: true, minimum: 1, maximum: 10 }
        },
        {
          id: 'tix_table',
          price_data: { currency: 'usd', unit_amount: 180000, product_data: { name: 'Table of 8', description: 'Reserved seating for eight guests and program recognition.' } },
          adjustable_quantity: { enabled: true, minimum: 1, maximum: 5 }
        },
      ],
      after_completion: { type: 'custom_page_session' },
      submit_type: 'book',
      eventTitle: 'The 2024 Hope Gala',
      eventDescription: 'Join us for an evening of elegance, entertainment, and philanthropy to support our community programs. Black tie optional.',
      eventDate: '2024-11-09',
      eventTime: '18:30',
      eventLocation: 'The Grand Ballroom',
      organizerName: 'The Hope Foundation',
      afterPaymentBehavior: 'showAfterPaymentPage',
      enableSessionPage: true,
      selectedAfterPaymentTemplateId: 'ap-event-share-v1',
    } as EventTicketSalesPageLinkConfig,
  };