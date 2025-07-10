import { Template, MembershipAccessPageLinkConfig, MonetizationUseCase } from '../../../types';
import { DEFAULT_PAGE_STYLE } from '../../../constants';

export const softwarePassTemplate: Template<MembershipAccessPageLinkConfig> = {
    id: 'ma-software-pass',
    name: 'Software Access Pass',
    useCase: MonetizationUseCase.MEMBERSHIP_ACCESS,
    description: 'Sell yearly or lifetime access to a software tool or application.',
    previewIcon: 'code',
    previewColorClass: 'bg-blue-100',
    previewIconColorClass: 'text-blue-600',
    initialData: {
      id: '', pageId: '', tenantId: '', status: 'draft',
      useCase: MonetizationUseCase.MEMBERSHIP_ACCESS,
      pageSlug: 'get-pro-editor',
      pageStyle: { ...DEFAULT_PAGE_STYLE, theme: 'light' },
      mode: 'payment', // Can be payment (lifetime) or subscription (yearly)
      currency: 'USD',
      line_items: [
        {
            id: 'pro_yearly',
            price_data: { currency: 'usd', unit_amount: 4900, product_data: { name: 'Pro Editor - Yearly Pass' }, recurring: { interval: 'year' } }
        },
        {
            id: 'pro_lifetime',
            price_data: { currency: 'usd', unit_amount: 14900, product_data: { name: 'Pro Editor - Lifetime Pass' } }
        }
      ],
      after_completion: { type: 'custom_page_session' },
      pageTitle: "Get Pro Editor",
      pageDescription: "Unlock all professional features with a Yearly or Lifetime access pass. Includes all future updates.",
      benefits: [ "Advanced editing tools", "Priority support", "Access to all themes and plugins", "Unlimited projects" ],
      afterPaymentBehavior: 'showAfterPaymentPage',
      enableSessionPage: true,
      selectedAfterPaymentTemplateId: 'ap-dc-license-key-v1', // Reuse this for license key delivery
    } as MembershipAccessPageLinkConfig,
  };