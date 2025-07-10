import { Template, TimedRentalPageLinkConfig, MonetizationUseCase } from '../../../types';
import { DEFAULT_PAGE_STYLE } from '../../../constants';

export const photoStudioRentalTemplate: Template<TimedRentalPageLinkConfig> = {
    id: 'tr-photo-studio',
    name: 'Photography Studio Rental',
    useCase: MonetizationUseCase.TIMED_RENTAL,
    description: 'A professional page for booking studio time by the hour, with options for add-on equipment.',
    previewIcon: 'photo_camera',
    previewColorClass: 'bg-slate-100',
    previewIconColorClass: 'text-slate-600',
    initialData: {
        id: '', pageId: '', tenantId: '', status: 'draft',
        useCase: MonetizationUseCase.TIMED_RENTAL,
        pageSlug: 'rent-photo-studio',
        pageStyle: { ...DEFAULT_PAGE_STYLE, theme: 'light' },
        mode: 'payment',
        currency: 'USD',
        line_items: [
          {
            price_data: { currency: 'usd', unit_amount: 7500, product_data: { name: 'Studio Time (per hour)', images: ['https://picsum.photos/seed/studio/600/400'] } }
          },
        ],
        custom_fields: [{
            key: 'lighting_package',
            type: 'dropdown',
            label: { type: 'custom', custom: 'Select Lighting Package' },
            dropdown: {
                options: [
                    { label: 'Standard Lighting (Included)', value: 'standard' },
                    { label: 'Premium Strobe Kit (+$25/hr)', value: 'premium' },
                    { label: 'Continuous Video Lighting (+$30/hr)', value: 'video' },
                ]
            }
        }],
        after_completion: { type: 'custom_page_session' },
        submit_type: 'book',
        pageTitle: "Book Our Photography Studio",
        pageDescription: "Natural light or fully equipped. Our studio is perfect for your next shoot. Book your time slot now.",
        afterPaymentBehavior: 'showAfterPaymentPage',
        selectedAfterPaymentTemplateId: 'ap-rental-access-code-v1',
    } as TimedRentalPageLinkConfig,
};
