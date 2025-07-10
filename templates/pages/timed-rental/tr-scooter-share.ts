import { Template, TimedRentalPageLinkConfig, MonetizationUseCase } from '../../../types';
import { DEFAULT_PAGE_STYLE } from '../../../constants';

export const scooterShareTemplate: Template<TimedRentalPageLinkConfig> = {
    id: 'tr-scooter-share',
    name: 'E-Scooter Rental',
    useCase: MonetizationUseCase.TIMED_RENTAL,
    description: 'A modern, map-focused template for on-the-go rentals of personal mobility vehicles.',
    previewIcon: 'electric_scooter',
    previewColorClass: 'bg-lime-100',
    previewIconColorClass: 'text-lime-600',
    initialData: {
        id: '', pageId: '', tenantId: '', status: 'draft',
        useCase: MonetizationUseCase.TIMED_RENTAL,
        pageSlug: 'ride-now',
        pageStyle: { ...DEFAULT_PAGE_STYLE, theme: 'forest_canopy' },
        mode: 'payment',
        currency: 'USD',
        line_items: [
          {
            price_data: { currency: 'usd', unit_amount: 100, product_data: { name: 'Unlock Fee' } }
          },
          {
            price_data: { currency: 'usd', unit_amount: 35, product_data: { name: 'Per Minute Rate' } }
          },
        ],
        after_completion: { type: 'custom_page_session' },
        submit_type: 'pay',
        pageTitle: "Grab a Ride",
        pageDescription: "Unlock an e-scooter and ride now. Billed per minute.",
        afterPaymentBehavior: 'showAfterPaymentPage',
        selectedAfterPaymentTemplateId: 'ap-rental-map-v1',
    } as TimedRentalPageLinkConfig,
};
