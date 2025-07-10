import { Template, EventTicketSalesPageLinkConfig, MonetizationUseCase } from '../../../types';
import { DEFAULT_PAGE_STYLE } from '../../../constants';

export const corporateConferenceTemplate: Template<EventTicketSalesPageLinkConfig> = {
    id: 'event-corp-conference',
    name: 'Professional Conference',
    useCase: MonetizationUseCase.EVENT_TICKET_SALES,
    description: 'A clean and professional page for selling tickets to conferences, webinars, or corporate events.',
    previewIcon: 'business_center',
    previewColorClass: 'bg-blue-100',
    previewIconColorClass: 'text-blue-600',
    initialData: {
      id: '', pageId: '', tenantId: '', status: 'draft',
      useCase: MonetizationUseCase.EVENT_TICKET_SALES,
      pageSlug: 'innovate-conf-2024',
      pageStyle: { ...DEFAULT_PAGE_STYLE, theme: 'light' },
      mode: 'payment',
      currency: 'USD',
      line_items: [
        {
          id: 'tix_standard',
          price_data: { currency: 'usd', unit_amount: 19900, product_data: { name: 'Standard Ticket', description: 'Access to all sessions and networking events.' } },
          adjustable_quantity: { enabled: true, minimum: 1, maximum: 20 }
        },
        {
          id: 'tix_all_access',
          price_data: { currency: 'usd', unit_amount: 34900, product_data: { name: 'All-Access Pass', description: 'Includes standard access plus recordings and speaker notes.' } },
          adjustable_quantity: { enabled: true, minimum: 1, maximum: 20 }
        },
      ],
      custom_fields: [
        { key: 'attendee_name', type: 'text', label: { type: 'custom', custom: 'Attendee Name' }, optional: false },
        { key: 'company_name', type: 'text', label: { type: 'custom', custom: 'Company Name (Optional)' }, optional: true },
      ],
      after_completion: { type: 'custom_page_session' },
      submit_type: 'book',
      eventTitle: 'Innovate 2024: The Future of Tech',
      eventDescription: 'Join industry leaders for two days of insightful talks, networking, and workshops on the cutting edge of technology.',
      eventDate: '2024-10-22',
      eventTime: '09:00',
      eventLocation: 'Metropolis Convention Center',
      organizerName: 'TechForward Events',
      afterPaymentBehavior: 'showAfterPaymentPage',
      enableSessionPage: true,
      selectedAfterPaymentTemplateId: 'ap-event-qr-v1',
    } as EventTicketSalesPageLinkConfig,
  };