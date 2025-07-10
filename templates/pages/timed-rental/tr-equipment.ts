
import { Template, TimedRentalPageLinkConfig, MonetizationUseCase } from '../../../types';
import { DEFAULT_PAGE_STYLE } from '../../../constants';

export const equipmentRentalTemplate: Template<TimedRentalPageLinkConfig> = {
    id: 'tr-equipment',
    name: 'Equipment Rental',
    useCase: MonetizationUseCase.TIMED_RENTAL,
    description: 'Rent out items like bikes, tools, or cameras by the hour.',
    previewIcon: 'pedal_bike',
    previewColorClass: 'bg-orange-100',
    previewIconColorClass: 'text-orange-600',
    initialData: {
        id: '', pageId: '', tenantId: '', status: 'draft',
        useCase: MonetizationUseCase.TIMED_RENTAL,
        pageSlug: 'rent-our-gear',
        pageStyle: { ...DEFAULT_PAGE_STYLE, theme: 'ocean_breeze' },
        mode: 'payment',
        currency: 'USD',
        line_items: [
          {
            price_data: { currency: 'usd', unit_amount: 1500, product_data: { name: 'Electric Bike', images: ['https://picsum.photos/seed/ebike/600/400'] } }
          },
          {
            price_data: { currency: 'usd', unit_amount: 2500, product_data: { name: 'Kayak (2-person)', images: ['https://picsum.photos/seed/kayak2/600/400'] } }
          },
        ],
        after_completion: { type: 'custom_page_session' },
        submit_type: 'book',
        
        pageTitle: "Rent Our Gear",
        pageDescription: "Select an item and choose your rental duration to get started.",

        afterPaymentBehavior: 'showAfterPaymentPage',
        selectedAfterPaymentTemplateId: 'ap-rental-instructions-v1',
    } as TimedRentalPageLinkConfig,
  };
