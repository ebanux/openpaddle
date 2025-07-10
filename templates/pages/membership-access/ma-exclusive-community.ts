import { Template, MembershipAccessPageLinkConfig, MonetizationUseCase } from '../../../types';
import { DEFAULT_PAGE_STYLE } from '../../../constants';

export const exclusiveCommunityTemplate: Template<MembershipAccessPageLinkConfig> = {
    id: 'ma-exclusive-community',
    name: 'Exclusive Community',
    useCase: MonetizationUseCase.MEMBERSHIP_ACCESS,
    description: 'A focused page for selling access to a private online community (e.g., Discord).',
    previewIcon: 'forum',
    previewColorClass: 'bg-purple-100',
    previewIconColorClass: 'text-purple-600',
    initialData: {
      id: '', pageId: '', tenantId: '', status: 'draft',
      useCase: MonetizationUseCase.MEMBERSHIP_ACCESS,
      pageSlug: 'the-mastermind',
      pageStyle: { ...DEFAULT_PAGE_STYLE, theme: 'midnight_tech' },
      mode: 'subscription',
      currency: 'USD',
      line_items: [
        {
            id: 'community_monthly',
            price_data: { currency: 'usd', unit_amount: 2500, product_data: { name: 'Monthly Access' }, recurring: { interval: 'month' } }
        },
        {
            id: 'community_founding',
            price_data: { currency: 'usd', unit_amount: 25000, product_data: { name: 'Founding Member (Yearly)' }, recurring: { interval: 'year' } }
        }
      ],
      custom_fields: [{
        key: 'member_name', type: 'text', label: { type: 'custom', custom: 'Your Name' }, optional: false,
      }, {
        key: 'discord_handle', type: 'text', label: { type: 'custom', custom: 'Your Discord Handle' }, optional: false,
      }],
      after_completion: { type: 'custom_page_session' },
      pageTitle: "Join The Mastermind",
      pageDescription: "Connect with experts, share your work, and accelerate your growth in our private community.",
      benefits: [ "24/7 access to our private Discord", "Weekly expert AMAs", "Members-only resource library", "Direct feedback on your projects" ],
      afterPaymentBehavior: 'showAfterPaymentPage',
      enableSessionPage: true,
      selectedAfterPaymentTemplateId: 'ap-member-welcome-onboarding-v1',
    } as MembershipAccessPageLinkConfig,
  };