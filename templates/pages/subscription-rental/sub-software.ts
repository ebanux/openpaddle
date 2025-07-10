
import { Template, SubscriptionPageLinkConfig, MonetizationUseCase } from '../../../types';
import { DEFAULT_PAGE_STYLE } from '../../../constants';

export const softwareSubscriptionTemplate: Template<SubscriptionPageLinkConfig> = {
    id: 'sub-software',
    name: 'Software Subscription (SaaS)',
    useCase: MonetizationUseCase.SUBSCRIPTION_RENTAL,
    description: 'A classic SaaS pricing page with multiple tiers for a software product.',
    previewIcon: 'laptop_mac',
    previewColorClass: 'bg-indigo-100',
    previewIconColorClass: 'text-indigo-600',
    initialData: {
      id: '', pageId: '', tenantId: '', status: 'draft',
      useCase: MonetizationUseCase.SUBSCRIPTION_RENTAL,
      pageSlug: 'pro-software',
      pageStyle: { ...DEFAULT_PAGE_STYLE, theme: 'midnight_tech' },
      mode: 'subscription',
      currency: 'USD',
      line_items: [
        {
            price_data: { currency: 'usd', unit_amount: 2900, product_data: { name: 'Basic', description: "Great for individuals,Access to core features,5 projects" }, recurring: { interval: 'month', interval_count: 1 } }
        },
        {
            price_data: { currency: 'usd', unit_amount: 7900, product_data: { name: 'Pro', description: "Perfect for professionals,All basic features,Unlimited projects,Priority support" }, recurring: { interval: 'month', interval_count: 1 } }
        },
        {
            price_data: { currency: 'usd', unit_amount: 14900, product_data: { name: 'Team', description: "For collaboration,All pro features,Team management,Advanced analytics" }, recurring: { interval: 'month', interval_count: 1 } }
        }
      ],
      after_completion: { type: 'custom_page_session' },
      submit_type: 'pay',
      billing_address_collection: 'required',
      
      pageTitle: "Choose Your Plan",
      pageDescription: "Unlock your potential with our powerful software. Cancel anytime.",

      afterPaymentBehavior: 'showAfterPaymentPage',
      selectedAfterPaymentTemplateId: 'ap-sub-welcome-v1',
    } as SubscriptionPageLinkConfig,
  };
