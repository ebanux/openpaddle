
import { Template, SubscriptionPageLinkConfig, MonetizationUseCase } from '../../../types';
import { DEFAULT_PAGE_STYLE } from '../../../constants';

export const coffeeBoxSubscriptionTemplate: Template<SubscriptionPageLinkConfig> = {
    id: 'sub-coffee-box',
    name: 'Coffee Subscription Box',
    useCase: MonetizationUseCase.SUBSCRIPTION_RENTAL,
    description: 'A recurring subscription for a monthly delivery of premium coffee beans.',
    previewIcon: 'coffee',
    previewColorClass: 'bg-amber-100',
    previewIconColorClass: 'text-amber-800',
    initialData: {
      id: '', pageId: '', tenantId: '', status: 'draft',
      useCase: MonetizationUseCase.SUBSCRIPTION_RENTAL,
      pageSlug: 'coffee-club',
      pageStyle: { ...DEFAULT_PAGE_STYLE, theme: 'vintage_paper' },
      mode: 'subscription',
      currency: 'USD',
      line_items: [
        {
            id: 'coffee_single',
            price_data: { currency: 'usd', unit_amount: 2200, product_data: { name: 'Single Origin', description: "One 12oz bag of unique, single-origin coffee each month." }, recurring: { interval: 'month' } }
        },
        {
            id: 'coffee_double',
            price_data: { currency: 'usd', unit_amount: 4000, product_data: { name: 'Roaster\'s Choice', description: "Two different 12oz bags curated by our head roaster." }, recurring: { interval: 'month' } }
        }
      ],
      after_completion: { type: 'custom_page_session' },
      submit_type: 'pay',
      billing_address_collection: 'required',
      shipping_address_collection: { enabled: true },
      
      pageTitle: "Join the Coffee Club",
      pageDescription: "Get freshly roasted, specialty coffee delivered to your door every month.",

      afterPaymentBehavior: 'showAfterPaymentPage',
      selectedAfterPaymentTemplateId: 'ap-sub-welcome-v1',
    } as SubscriptionPageLinkConfig,
  };
