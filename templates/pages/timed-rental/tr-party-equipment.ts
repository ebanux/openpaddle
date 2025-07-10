import { Template, TimedRentalPageLinkConfig, MonetizationUseCase } from '../../../types';
import { DEFAULT_PAGE_STYLE } from '../../../constants';

export const partyEquipmentRentalTemplate: Template<TimedRentalPageLinkConfig> = {
    id: 'tr-party-equipment',
    name: 'Party Equipment Rental',
    useCase: MonetizationUseCase.TIMED_RENTAL,
    description: 'Designed for renting items like sound systems or bouncy castles for events.',
    previewIcon: 'celebration',
    previewColorClass: 'bg-pink-100',
    previewIconColorClass: 'text-pink-600',
    initialData: {
        id: '', pageId: '', tenantId: '', status: 'draft',
        useCase: MonetizationUseCase.TIMED_RENTAL,
        pageSlug: 'party-rentals',
        pageStyle: { ...DEFAULT_PAGE_STYLE, theme: 'sunset_glow' },
        mode: 'payment',
        currency: 'USD',
        line_items: [
          {
            price_data: { currency: 'usd', unit_amount: 5000, product_data: { name: 'Large PA Sound System (per hour)', images: ['https://picsum.photos/seed/soundsystem/600/400'] } }
          },
          {
            price_data: { currency: 'usd', unit_amount: 8000, product_data: { name: 'Inflatable Bouncy Castle (per hour)', images: ['https://picsum.photos/seed/bouncycastle/600/400'] } }
          }
        ],
        custom_fields: [{
            key: 'event_date',
            type: 'text',
            label: { type: 'custom', custom: 'Event Date (YYYY-MM-DD)' },
            optional: false,
        }],
        after_completion: { type: 'custom_page_session' },
        submit_type: 'book',
        pageTitle: "Level Up Your Party",
        pageDescription: "Rent professional equipment to make your next event unforgettable.",
        afterPaymentBehavior: 'showAfterPaymentPage',
        selectedAfterPaymentTemplateId: 'ap-rental-instructions-v1',
    } as TimedRentalPageLinkConfig,
};
