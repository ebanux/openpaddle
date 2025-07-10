
import { Template, SubscriptionPageLinkConfig, MonetizationUseCase } from '../../../types';
import { DEFAULT_PAGE_STYLE } from '../../../constants';

export const serviceRetainerSubscriptionTemplate: Template<SubscriptionPageLinkConfig> = {
    id: 'sub-service-retainer',
    name: 'Service Retainer',
    useCase: MonetizationUseCase.SUBSCRIPTION_RENTAL,
    description: 'A professional page for freelancers or agencies to bill for recurring monthly services.',
    previewIcon: 'work',
    previewColorClass: 'bg-gray-100',
    previewIconColorClass: 'text-gray-600',
    initialData: {
      id: '', pageId: '', tenantId: '', status: 'draft',
      useCase: MonetizationUseCase.SUBSCRIPTION_RENTAL,
      pageSlug: 'service-retainer',
      pageStyle: { ...DEFAULT_PAGE_STYLE, theme: 'light' },
      mode: 'subscription',
      currency: 'USD',
      line_items: [
        {
            id: 'retainer_design',
            price_data: { currency: 'usd', unit_amount: 150000, product_data: { name: 'Design Retainer', description: "Up to 10 hours of design work per month. Perfect for ongoing needs." }, recurring: { interval: 'month' } }
        },
        {
            id: 'retainer_dev',
            price_data: { currency: 'usd', unit_amount: 250000, product_data: { name: 'Development Retainer', description: "Up to 20 hours of development work and priority support." }, recurring: { interval: 'month' } }
        }
      ],
      billing_address_collection: 'required',
      after_completion: { type: 'custom_page_session' },
      pageTitle: "Monthly Service Retainer",
      pageDescription: "Secure our dedicated services for your business on a recurring monthly basis. Please select your required plan.",
      afterPaymentBehavior: 'showAfterPaymentPage',
      selectedAfterPaymentTemplateId: 'ap-sub-welcome-v1',
    } as SubscriptionPageLinkConfig,
  };
