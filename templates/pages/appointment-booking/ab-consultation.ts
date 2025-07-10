
import { Template, AppointmentBookingPageLinkConfig, MonetizationUseCase } from '../../../types';
import { DEFAULT_PAGE_STYLE } from '../../../constants';

export const consultationBookingTemplate: Template<AppointmentBookingPageLinkConfig> = {
    id: 'ab-consultation',
    name: '1-on-1 Consultation',
    useCase: MonetizationUseCase.APPOINTMENT_BOOKING,
    description: 'Book and pay for a professional consultation session. Perfect for coaches, consultants, and advisors.',
    previewIcon: 'event',
    previewColorClass: 'bg-teal-100',
    previewIconColorClass: 'text-teal-600',
    initialData: {
      id: '', pageId: '', tenantId: '', status: 'draft',
      useCase: MonetizationUseCase.APPOINTMENT_BOOKING,
      pageSlug: 'book-consultation',
      pageStyle: { ...DEFAULT_PAGE_STYLE, theme: 'ocean_breeze' },
      mode: 'payment',
      currency: 'USD',
      line_items: [
        { id: 'opt_30min', price_data: { currency: 'usd', unit_amount: 5000, product_data: { name: '30 Minute Session', description: 'A quick consultation.'} } },
        { id: 'opt_60min', price_data: { currency: 'usd', unit_amount: 9000, product_data: { name: '60 Minute Session', description: 'Standard consultation length.'} } },
      ],
      after_completion: { type: 'custom_page_session' },
      submit_type: 'book',
      serviceTitle: 'Personalized Consultation',
      serviceDescription: 'Book a one-on-one session to discuss your goals and get expert advice.',
      providerName: 'Jane Doe, Expert Consultant',
      availabilityNotes: 'After payment, we will email you within 24 hours to schedule your session.',
      afterPaymentBehavior: 'showAfterPaymentPage',
      selectedAfterPaymentTemplateId: 'ap-booking-confirmed-v1',
    } as AppointmentBookingPageLinkConfig,
  };
