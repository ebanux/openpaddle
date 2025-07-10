
import { Template, ParkingPageLinkConfig, MonetizationUseCase } from '../../../types';
import { DEFAULT_PAGE_STYLE } from '../../../constants';

export const cityCenterParkingTemplate: Template<ParkingPageLinkConfig> = {
    id: 'park-city-center',
    name: 'City Center Parking',
    useCase: MonetizationUseCase.PARKING_SESSION,
    description: 'A modern, mobile-first page for paying for a parking session by zone or license plate.',
    previewIcon: 'local_parking',
    previewColorClass: 'bg-blue-100',
    previewIconColorClass: 'text-blue-600',
    initialData: {
      id: '', pageId: '', tenantId: '', status: 'draft',
      useCase: MonetizationUseCase.PARKING_SESSION,
      pageSlug: 'city-parking',
      pageStyle: { ...DEFAULT_PAGE_STYLE, theme: 'ocean_breeze' },
      mode: 'payment',
      currency: 'USD',
      line_items: [
        { id: 'park_1h', price_data: { currency: 'usd', unit_amount: 300, product_data: { name: 'Parking - 1 Hour', metadata: { hours: 1 } } } },
        { id: 'park_3h', price_data: { currency: 'usd', unit_amount: 800, product_data: { name: 'Parking - 3 Hours', metadata: { hours: 3 } } } },
        { id: 'park_allday', price_data: { currency: 'usd', unit_amount: 2000, product_data: { name: 'Parking - All Day (8 hours)', metadata: { hours: 8 } } } },
      ],
      after_completion: { type: 'custom_page_session' },
      submit_type: 'pay',
      phone_number_collection: { enabled: true },
      accessControl: {
        enabled: true,
        verificationType: 'disabled',
        showQRCode: false,
        showAccessLink: true,
      },
      
      pageTitle: 'Pay for Parking',
      page_description: 'Enter your license plate and select your parking duration.',
      locationName: 'City Center Garage',
      zoneId: 'Zone A-5',
      infoPoints: ["No in-and-out privileges", "Parking is enforced 24/7", "This is a digital permit, no need to display a receipt"],
      
      afterPaymentBehavior: 'showAfterPaymentPage',
      enableSessionPage: true,
      selectedAfterPaymentTemplateId: 'ap-park-active-info-v1',
    } as ParkingPageLinkConfig,
  };
