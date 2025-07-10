
import { AfterPaymentTemplate, AfterPaymentTemplateType, SubscriptionManageExploreAPData, MonetizationUseCase } from '../../../types';
import { SubscriptionManageExploreAPSchema } from '../../../schemas';

export const subscriptionManageAPTemplate: AfterPaymentTemplate<SubscriptionManageExploreAPData> = {
    id: 'ap-sub-manage-v1',
    name: 'Manage & Explore Subscription',
    useCase: MonetizationUseCase.SUBSCRIPTION_RENTAL,
    description: 'Provides a link to the customer portal and showcases other features.',
    templateType: AfterPaymentTemplateType.SUBSCRIPTION_MANAGE_EXPLORE,
    previewIcon: 'settings',
    previewColorClass: 'bg-indigo-100',
    previewIconColorClass: 'text-indigo-600',
    initialData: {
      templateDefinitionId: 'ap-sub-manage-v1',
      mainMessage: 'Your subscription is active. You can manage it here.',
      manageSubscriptionButtonText: 'Manage Your Subscription',
      exploreFeaturesSectionTitle: 'Discover More Features',
      showSubmittedCustomFields: false,
    },
    schema: SubscriptionManageExploreAPSchema,
  };
