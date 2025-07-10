
import { Template, SubscriptionPageLinkConfig, MonetizationUseCase } from '../../../types';
import { DEFAULT_PAGE_STYLE } from '../../../constants';

export const communityAccessSubscriptionTemplate: Template<SubscriptionPageLinkConfig> = {
    id: 'sub-community-access',
    name: 'Private Community Access',
    useCase: MonetizationUseCase.SUBSCRIPTION_RENTAL,
    description: 'Sell monthly or yearly access to an exclusive community like Discord or Slack.',
    previewIcon: 'forum',
    previewColorClass: 'bg-blue-100',
    previewIconColorClass: 'text-blue-600',
    initialData: {
      id: '', pageId: '', tenantId: '', status: 'draft',
      useCase: MonetizationUseCase.SUBSCRIPTION_RENTAL,
      pageSlug: 'join-community',
      pageStyle: { ...DEFAULT_PAGE_STYLE, theme: 'ocean_breeze' },
      mode: 'subscription',
      currency: 'USD',
      custom_fields: [
        { key: 'discord_handle', type: 'text', label: { type: 'custom', custom: 'Your Discord Handle (e.g., user#1234)' }, optional: false }
      ],
      line_items: [
        {
            id: 'community_monthly',
            price_data: { currency: 'usd', unit_amount: 1000, product_data: { name: 'Monthly Membership', description: "Full access to all channels, events, and resources." }, recurring: { interval: 'month' } }
        },
        {
            id: 'community_yearly',
            price_data: { currency: 'usd', unit_amount: 10000, product_data: { name: 'Yearly Membership', description: "12 months of access for the price of 10!" }, recurring: { interval: 'year' } }
        }
      ],
      after_completion: { type: 'custom_page_session' },
      pageTitle: "Join The Inner Circle",
      pageDescription: "Become a member of our private community to network, learn, and grow with like-minded individuals.",
      afterPaymentBehavior: 'showAfterPaymentPage',
      selectedAfterPaymentTemplateId: 'ap-sub-onboarding-v1',
    } as SubscriptionPageLinkConfig,
  };
