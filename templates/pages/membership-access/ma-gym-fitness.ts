import { Template, MembershipAccessPageLinkConfig, MonetizationUseCase } from '../../../types';
import { DEFAULT_PAGE_STYLE } from '../../../constants';

export const gymFitnessMembershipTemplate: Template<MembershipAccessPageLinkConfig> = {
    id: 'ma-gym-fitness',
    name: 'Gym/Fitness Membership',
    useCase: MonetizationUseCase.MEMBERSHIP_ACCESS,
    description: 'A page to sign up new members for a gym, with different access tiers.',
    previewIcon: 'fitness_center',
    previewColorClass: 'bg-red-100',
    previewIconColorClass: 'text-red-600',
    initialData: {
      id: '', pageId: '', tenantId: '', status: 'draft',
      useCase: MonetizationUseCase.MEMBERSHIP_ACCESS,
      pageSlug: 'join-our-gym',
      pageStyle: { ...DEFAULT_PAGE_STYLE, theme: 'sunset_glow' },
      mode: 'subscription',
      currency: 'USD',
      line_items: [
        {
            id: 'gym_basic',
            price_data: { currency: 'usd', unit_amount: 3000, product_data: { name: 'Basic Gym Access' }, recurring: { interval: 'month' } }
        },
        {
            id: 'gym_all_inclusive',
            price_data: { currency: 'usd', unit_amount: 5000, product_data: { name: 'All-Inclusive Pass' }, recurring: { interval: 'month' } }
        }
      ],
      custom_fields: [{
        key: 'member_name',
        type: 'text',
        label: { type: 'custom', custom: 'Full Name' },
        optional: false,
      }],
      after_completion: { type: 'custom_page_session' },
      pageTitle: "Join Flex Fitness Club",
      pageDescription: "Commit to be fit. Get access to our state-of-the-art facilities and expert trainers. Sign up today!",
      benefits: [
          "State-of-the-art equipment",
          "Clean and spacious locker rooms",
          "All-Inclusive: Access to all group classes (Yoga, Spin, HIIT)",
          "All-Inclusive: Personal training consultation"
      ],
      afterPaymentBehavior: 'showAfterPaymentPage',
      enableSessionPage: true,
      selectedAfterPaymentTemplateId: 'ap-member-pass-qr-v1',
    } as MembershipAccessPageLinkConfig,
  };