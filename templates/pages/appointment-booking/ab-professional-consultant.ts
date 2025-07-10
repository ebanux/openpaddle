
import { Template, AppointmentBookingPageLinkConfig, MonetizationUseCase } from '../../../types';
import { DEFAULT_PAGE_STYLE } from '../../../constants';

export const professionalConsultantTemplate: Template<AppointmentBookingPageLinkConfig> = {
    id: 'ab-pro-consultant',
    name: 'Professional Consultant',
    useCase: MonetizationUseCase.APPOINTMENT_BOOKING,
    description: 'A clean, trustworthy page for consultants, coaches, and financial advisors.',
    previewIcon: 'business_center',
    previewColorClass: 'bg-indigo-100',
    previewIconColorClass: 'text-indigo-600',
    initialData: {
      id: '', pageId: '', tenantId: '', status: 'draft',
      useCase: MonetizationUseCase.APPOINTMENT_BOOKING,
      pageSlug: 'pro-consulting',
      pageStyle: { ...DEFAULT_PAGE_STYLE, theme: 'light' },
      mode: 'payment',
      currency: 'USD',
      serviceImageUrl: 'https://picsum.photos/seed/consultant/800/400',
      line_items: [
        { id: '30min_call', price_data: { currency: 'usd', unit_amount: 15000, product_data: { name: '30-Minute Discovery Call', description: 'A brief call to assess your needs.'} } },
        { id: '60min_strategy', price_data: { currency: 'usd', unit_amount: 25000, product_data: { name: '60-Minute Strategy Session', description: 'An in-depth session to create an action plan.'} } },
      ],
      after_completion: { type: 'custom_page_session' },
      submit_type: 'book',
      serviceTitle: 'Expert Business Consultation',
      serviceDescription: 'Leverage years of industry experience to solve your most pressing business challenges. Book a session to get started.',
      providerName: 'Alex Smith, MBA',
      availabilityNotes: 'Upon booking, you will receive a link to my calendar to choose a time that works best for you.',
      afterPaymentBehavior: 'showAfterPaymentPage',
      selectedAfterPaymentTemplateId: 'ap-booking-confirmed-calendar-v1',
    } as AppointmentBookingPageLinkConfig,
  };
