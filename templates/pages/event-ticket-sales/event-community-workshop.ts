import { Template, EventTicketSalesPageLinkConfig, MonetizationUseCase } from '../../../types';
import { DEFAULT_PAGE_STYLE } from '../../../constants';

export const communityWorkshopTemplate: Template<EventTicketSalesPageLinkConfig> = {
    id: 'event-community-workshop',
    name: 'Community Workshop',
    useCase: MonetizationUseCase.EVENT_TICKET_SALES,
    description: 'A friendly and engaging page for selling spots in a local workshop, class, or community meetup.',
    previewIcon: 'groups',
    previewColorClass: 'bg-teal-100',
    previewIconColorClass: 'text-teal-600',
    initialData: {
      id: '', pageId: '', tenantId: '', status: 'draft',
      useCase: MonetizationUseCase.EVENT_TICKET_SALES,
      pageSlug: 'watercolor-workshop',
      pageStyle: { ...DEFAULT_PAGE_STYLE, theme: 'ocean_breeze' },
      mode: 'payment',
      currency: 'USD',
      line_items: [
        {
          id: 'tix_workshop',
          price_data: { currency: 'usd', unit_amount: 7500, product_data: { name: 'Workshop Admission', description: 'Includes all materials and 3 hours of instruction.' } },
          adjustable_quantity: { enabled: true, minimum: 1, maximum: 4 }
        },
      ],
      payment_limits: { enabled: true, max_payments: 20, message_after_limit: 'This workshop is now full. Sign up for our newsletter for future dates!' },
      custom_fields: [
        { key: 'attendee_name', type: 'text', label: { type: 'custom', custom: 'Your Name' }, optional: false },
      ],
      after_completion: { type: 'custom_page_session' },
      submit_type: 'book',
      eventTitle: 'Beginner Watercolor Workshop',
      eventDescription: 'Unleash your inner artist! Join our fun, hands-on watercolor workshop. No experience necessary – just bring your creativity.',
      eventDate: '2024-09-14',
      eventTime: '13:00',
      eventLocation: 'The Art Space, 123 Main St',
      organizerName: 'The Art Space',
      afterPaymentBehavior: 'showAfterPaymentPage',
      enableSessionPage: true,
      selectedAfterPaymentTemplateId: 'ap-event-prep-info-v1', // New AP template
    } as EventTicketSalesPageLinkConfig,
  };