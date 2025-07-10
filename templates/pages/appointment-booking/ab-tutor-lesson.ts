
import { Template, AppointmentBookingPageLinkConfig, MonetizationUseCase } from '../../../types';
import { DEFAULT_PAGE_STYLE } from '../../../constants';

export const tutorLessonTemplate: Template<AppointmentBookingPageLinkConfig> = {
    id: 'ab-tutor-lesson',
    name: 'Tutoring / Music Lesson',
    useCase: MonetizationUseCase.APPOINTMENT_BOOKING,
    description: 'A simple, friendly page for booking tutoring sessions or music lessons.',
    previewIcon: 'school',
    previewColorClass: 'bg-teal-100',
    previewIconColorClass: 'text-teal-600',
    initialData: {
      id: '', pageId: '', tenantId: '', status: 'draft',
      useCase: MonetizationUseCase.APPOINTMENT_BOOKING,
      pageSlug: 'guitar-lessons',
      pageStyle: { ...DEFAULT_PAGE_STYLE, theme: 'light' },
      mode: 'payment',
      currency: 'USD',
      serviceImageUrl: 'https://picsum.photos/seed/guitar/800/400',
      line_items: [
        { id: '30min_lesson', price_data: { currency: 'usd', unit_amount: 3000, product_data: { name: '30-Minute Lesson', description: 'Perfect for a quick check-in or young beginners.'} } },
        { id: '60min_lesson', price_data: { currency: 'usd', unit_amount: 5000, product_data: { name: '60-Minute Lesson', description: 'Standard lesson length for in-depth learning.'} } },
        { id: '5pack_lesson', price_data: { currency: 'usd', unit_amount: 22500, product_data: { name: 'Package of 5 x 60-Min Lessons', description: 'Save 10% by booking a package!'} } },
      ],
      after_completion: { type: 'custom_page_session' },
      submit_type: 'book',
      serviceTitle: 'Private Guitar Lessons',
      serviceDescription: 'Learn to play guitar with personalized, one-on-one lessons. All skill levels welcome, from absolute beginners to advanced players.',
      providerName: 'Mike R.',
      availabilityNotes: 'After booking, please email me to schedule your first lesson.',
      afterPaymentBehavior: 'showAfterPaymentPage',
      selectedAfterPaymentTemplateId: 'ap-booking-confirmed-v1',
    } as AppointmentBookingPageLinkConfig,
  };
