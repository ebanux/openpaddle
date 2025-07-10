import { Template, TimedRentalPageLinkConfig, MonetizationUseCase } from '../../../types';
import { DEFAULT_PAGE_STYLE } from '../../../constants';

export const meetingRoomRentalTemplate: Template<TimedRentalPageLinkConfig> = {
    id: 'tr-meeting-room',
    name: 'Co-working Desk Space',
    useCase: MonetizationUseCase.TIMED_RENTAL,
    description: 'A simple page for booking a desk or small meeting room by the hour.',
    previewIcon: 'workspaces',
    previewColorClass: 'bg-indigo-100',
    previewIconColorClass: 'text-indigo-600',
    initialData: {
        id: '', pageId: '', tenantId: '', status: 'draft',
        useCase: MonetizationUseCase.TIMED_RENTAL,
        pageSlug: 'book-a-desk',
        pageStyle: { ...DEFAULT_PAGE_STYLE, theme: 'light' },
        mode: 'payment',
        currency: 'USD',
        line_items: [
          {
            price_data: { currency: 'usd', unit_amount: 1000, product_data: { name: 'Hot Desk (per hour)', images: ['https://picsum.photos/seed/desk/600/400'] } }
          },
          {
            price_data: { currency: 'usd', unit_amount: 4000, product_data: { name: '4-Person Meeting Room (per hour)', images: ['https://picsum.photos/seed/meetingroom/600/400'] } }
          }
        ],
        after_completion: { type: 'custom_page_session' },
        submit_type: 'book',
        pageTitle: "Book a Space",
        pageDescription: "Need a place to focus? Book a hot desk or meeting room by the hour. WiFi and coffee included.",
        afterPaymentBehavior: 'showAfterPaymentPage',
        selectedAfterPaymentTemplateId: 'ap-rental-access-code-v1',
    } as TimedRentalPageLinkConfig,
};
