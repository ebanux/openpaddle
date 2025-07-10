
import { Template, MembershipAccessPageLinkConfig, MonetizationUseCase } from '../../../types';
import { DEFAULT_PAGE_STYLE } from '../../../constants';

export const digitalMembershipPassTemplate: Template<MembershipAccessPageLinkConfig> = {
    id: 'ma-digital-pass',
    name: 'Digital Membership Pass',
    useCase: MonetizationUseCase.MEMBERSHIP_ACCESS,
    description: 'Sell access to your community, gym, or premium content with a beautiful, modern page.',
    previewIcon: 'badge',
    previewColorClass: 'bg-indigo-100',
    previewIconColorClass: 'text-indigo-600',
    initialData: {
      id: '', pageId: '', tenantId: '', status: 'draft',
      useCase: MonetizationUseCase.MEMBERSHIP_ACCESS,
      pageSlug: 'join-the-club',
      pageStyle: { ...DEFAULT_PAGE_STYLE, theme: 'midnight_tech' },
      mode: 'subscription',
      currency: 'USD',
      line_items: [
        {
            id: 'member_monthly',
            price_data: { currency: 'usd', unit_amount: 1500, product_data: { name: 'Monthly Membership' }, recurring: { interval: 'month' } }
        },
        {
            id: 'member_yearly',
            price_data: { currency: 'usd', unit_amount: 15000, product_data: { name: 'Yearly Membership' }, recurring: { interval: 'year' } }
        }
      ],
      custom_fields: [{
        key: 'member_name',
        type: 'text',
        label: { type: 'custom', custom: 'Full Name for Pass' },
        optional: false,
      }],
      after_completion: { type: 'custom_page_session' },
      pageTitle: "Become a Member",
      pageDescription: "Unlock exclusive benefits, connect with our community, and support our mission. Choose your plan below.",
      benefits: [
          "Access to all premium content",
          "Entry to our private Discord server",
          "Exclusive monthly Q&A sessions",
          "Early access to new products"
      ],
      afterPaymentBehavior: 'showAfterPaymentPage',
      enableSessionPage: true,
      selectedAfterPaymentTemplateId: 'ap-member-pass-qr-v1',
    } as MembershipAccessPageLinkConfig,
  };
