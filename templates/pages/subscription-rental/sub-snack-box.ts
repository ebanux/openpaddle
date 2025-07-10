
import { Template, SubscriptionPageLinkConfig, MonetizationUseCase } from '../../../types';
import { DEFAULT_PAGE_STYLE } from '../../../constants';

export const snackBoxSubscriptionTemplate: Template<SubscriptionPageLinkConfig> = {
    id: 'sub-snack-box',
    name: 'Artisanal Snack Box',
    useCase: MonetizationUseCase.SUBSCRIPTION_RENTAL,
    description: 'A visually appealing page for a monthly subscription box of physical goods.',
    previewIcon: 'inventory',
    previewColorClass: 'bg-orange-100',
    previewIconColorClass: 'text-orange-600',
    initialData: {
      id: '', pageId: '', tenantId: '', status: 'draft',
      useCase: MonetizationUseCase.SUBSCRIPTION_RENTAL,
      pageSlug: 'snack-box',
      pageStyle: { ...DEFAULT_PAGE_STYLE, theme: 'sunset_glow' },
      mode: 'subscription',
      currency: 'USD',
      header_image_url: 'https://picsum.photos/seed/snacks/800/400',
      line_items: [
        {
            id: 'snack_box_monthly',
            price_data: { currency: 'usd', unit_amount: 3500, product_data: { name: 'Monthly Box', description: "A curated box of 8-10 artisanal snacks delivered monthly." }, recurring: { interval: 'month' } }
        },
        {
            id: 'snack_box_quarterly',
            price_data: { currency: 'usd', unit_amount: 9500, product_data: { name: 'Quarterly Box (3 Months)', description: "Save on a 3-month prepay. Same great snacks, better value." }, recurring: { interval: 'month', interval_count: 3 } }
        }
      ],
      shipping_address_collection: { enabled: true },
      after_completion: { type: 'custom_page_session' },
      pageTitle: "Discover Your Next Favorite Snack",
      pageDescription: "Get a monthly delivery of unique, delicious, and healthy snacks from artisanal makers around the world.",
      afterPaymentBehavior: 'showAfterPaymentPage',
      selectedAfterPaymentTemplateId: 'ap-sub-shipment-info-v1',
    } as SubscriptionPageLinkConfig,
  };
