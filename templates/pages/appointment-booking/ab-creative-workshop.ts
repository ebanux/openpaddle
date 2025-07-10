
import { Template, AppointmentBookingPageLinkConfig, MonetizationUseCase } from '../../../types';
import { DEFAULT_PAGE_STYLE } from '../../../constants';

export const creativeWorkshopTemplate: Template<AppointmentBookingPageLinkConfig> = {
    id: 'ab-creative-workshop',
    name: 'Creative Workshop Signup',
    useCase: MonetizationUseCase.APPOINTMENT_BOOKING,
    description: 'A vibrant page for artists and educators to sell seats in workshops.',
    previewIcon: 'palette',
    previewColorClass: 'bg-rose-100',
    previewIconColorClass: 'text-rose-600',
    initialData: {
      id: '', pageId: '', tenantId: '', status: 'draft',
      useCase: MonetizationUseCase.APPOINTMENT_BOOKING,
      pageSlug: 'pottery-workshop',
      pageStyle: { ...DEFAULT_PAGE_STYLE, theme: 'sunset_glow' },
      mode: 'payment',
      currency: 'USD',
      serviceImageUrl: 'https://picsum.photos/seed/pottery/800/400',
      line_items: [
        { id: 'workshop_seat', price_data: { currency: 'usd', unit_amount: 8500, product_data: { name: 'Single Seat Reservation' } } }
      ],
      payment_limits: { enabled: true, max_payments: 12 },
      after_completion: { type: 'custom_page_session' },
      submit_type: 'book',
      serviceTitle: 'Introduction to Pottery Workshop',
      serviceDescription: 'Join our 3-hour beginner-friendly pottery workshop! Learn the basics of wheel throwing and create your own unique piece. All materials and firing costs included.',
      providerName: 'The Clay Studio',
      availabilityNotes: 'Workshop Date: Saturday, July 20th, 10am - 1pm.',
      afterPaymentBehavior: 'showAfterPaymentPage',
      selectedAfterPaymentTemplateId: 'ap-booking-intake-form-v1',
    } as AppointmentBookingPageLinkConfig,
  };
