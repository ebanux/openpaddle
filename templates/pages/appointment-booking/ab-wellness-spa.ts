
import { Template, AppointmentBookingPageLinkConfig, MonetizationUseCase } from '../../../types';
import { DEFAULT_PAGE_STYLE } from '../../../constants';

export const wellnessSpaTemplate: Template<AppointmentBookingPageLinkConfig> = {
    id: 'ab-wellness-spa',
    name: 'Wellness/Spa Service',
    useCase: MonetizationUseCase.APPOINTMENT_BOOKING,
    description: 'A calming, serene template for booking massages, yoga, or wellness sessions.',
    previewIcon: 'spa',
    previewColorClass: 'bg-emerald-100',
    previewIconColorClass: 'text-emerald-600',
    initialData: {
      id: '', pageId: '', tenantId: '', status: 'draft',
      useCase: MonetizationUseCase.APPOINTMENT_BOOKING,
      pageSlug: 'serenity-massage',
      pageStyle: { ...DEFAULT_PAGE_STYLE, theme: 'forest_canopy' },
      mode: 'payment',
      currency: 'USD',
      serviceImageUrl: 'https://picsum.photos/seed/spa/800/400',
      line_items: [
        { id: '60min_massage', price_data: { currency: 'usd', unit_amount: 9000, product_data: { name: '60-Minute Swedish Massage', description: 'A relaxing full-body massage.'} } },
        { id: '90min_deep', price_data: { currency: 'usd', unit_amount: 13000, product_data: { name: '90-Minute Deep Tissue Massage', description: 'Targets deeper layers of muscle.'} } },
      ],
      after_completion: { type: 'custom_page_session' },
      submit_type: 'book',
      serviceTitle: 'Find Your Inner Peace',
      serviceDescription: 'Book a rejuvenating massage session at our serene wellness spa. Our certified therapists will help you unwind and de-stress.',
      providerName: 'Serenity Wellness Spa',
      availabilityNotes: 'Please call us after booking to schedule your appointment. We recommend booking at least 48 hours in advance.',
      afterPaymentBehavior: 'showAfterPaymentPage',
      selectedAfterPaymentTemplateId: 'ap-booking-prep-info-v1',
    } as AppointmentBookingPageLinkConfig,
  };
