
import { Template, SubscriptionPageLinkConfig, MonetizationUseCase } from '../../../types';
import { DEFAULT_PAGE_STYLE } from '../../../constants';

export const newsletterSubscriptionTemplate: Template<SubscriptionPageLinkConfig> = {
    id: 'sub-newsletter',
    name: 'Paid Newsletter',
    useCase: MonetizationUseCase.SUBSCRIPTION_RENTAL,
    description: 'A clean, content-focused page to get subscribers for your paid newsletter.',
    previewIcon: 'article',
    previewColorClass: 'bg-slate-100',
    previewIconColorClass: 'text-slate-600',
    initialData: {
      id: '', pageId: '', tenantId: '', status: 'draft',
      useCase: MonetizationUseCase.SUBSCRIPTION_RENTAL,
      pageSlug: 'my-newsletter',
      pageStyle: { ...DEFAULT_PAGE_STYLE, theme: 'light' },
      mode: 'subscription',
      currency: 'USD',
      line_items: [
        {
            id: 'newsletter_monthly',
            price_data: { currency: 'usd', unit_amount: 500, product_data: { name: 'Monthly Access', description: "Full access to all posts, archives, and community." }, recurring: { interval: 'month' } }
        },
        {
            id: 'newsletter_yearly',
            price_data: { currency: 'usd', unit_amount: 5000, product_data: { name: 'Yearly Access', description: "Get 12 months for the price of 10. Best value!" }, recurring: { interval: 'year' } }
        }
      ],
      after_completion: { type: 'custom_page_session' },
      pageTitle: "The Weekly Byte",
      pageDescription: "In-depth analysis of the tech industry, delivered to your inbox every week. Subscribe to get full access.",
      afterPaymentBehavior: 'showAfterPaymentPage',
      selectedAfterPaymentTemplateId: 'ap-sub-personal-welcome-v1',
    } as SubscriptionPageLinkConfig,
  };
