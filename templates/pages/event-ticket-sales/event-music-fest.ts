
import { Template, EventTicketSalesPageLinkConfig, MonetizationUseCase } from '../../../types';
import { DEFAULT_PAGE_STYLE } from '../../../constants';

export const musicFestTemplate: Template<EventTicketSalesPageLinkConfig> = {
    id: 'event-music-fest',
    name: 'Music Festival Tickets',
    useCase: MonetizationUseCase.EVENT_TICKET_SALES,
    description: 'Sell tickets for a multi-day music festival with different ticket tiers.',
    previewIcon: 'music_note',
    previewColorClass: 'bg-purple-100',
    previewIconColorClass: 'text-purple-600',
    initialData: {
      id: '', pageId: '', tenantId: '', status: 'draft',
      useCase: MonetizationUseCase.EVENT_TICKET_SALES,
      pageSlug: 'music-fest-2024',
      pageStyle: { ...DEFAULT_PAGE_STYLE, theme: 'sunset_glow' },
      mode: 'payment',
      currency: 'USD',
      line_items: [
        {
          id: 'tix_ga',
          price_data: { currency: 'usd', unit_amount: 5500, product_data: { name: 'General Admission', description: 'Access to all main stages for the full weekend.' } },
          adjustable_quantity: { enabled: true, minimum: 1, maximum: 10 }
        },
        {
          id: 'tix_vip',
          price_data: { currency: 'usd', unit_amount: 15000, product_data: { name: 'VIP Pass', description: 'Includes access to VIP lounge, priority entry, and a merch bag.' } },
          adjustable_quantity: { enabled: true, minimum: 1, maximum: 10 }
        },
      ],
      after_completion: { type: 'custom_page_session' },
      submit_type: 'book',
      payment_limits: { enabled: true, max_payments: 500, message_after_limit: 'This event is sold out!' },
      custom_fields: [
        {
          key: 'attendee_name',
          label: {
            type: 'custom',
            custom: 'Attendee Name',
          },
          type: 'text',
          optional: false,
        }
      ],
      
      eventTitle: 'Sunset Music Festival 2024',
      eventDescription: 'Three days of incredible music, art, and community under the summer sky. Join us for an unforgettable experience!',
      eventDate: '2024-08-16',
      eventTime: '12:00',
      eventLocation: 'Sunrise Valley Fields',
      eventBannerImageUrl: 'https://picsum.photos/seed/festival/800/400',
      organizerName: 'Live Events Co.',
      contactEmail: 'contact@liveevents.co',

      afterPaymentBehavior: 'showAfterPaymentPage',
      enableSessionPage: true,
      selectedAfterPaymentTemplateId: 'ap-event-qr-v1',
    } as EventTicketSalesPageLinkConfig,
  };
