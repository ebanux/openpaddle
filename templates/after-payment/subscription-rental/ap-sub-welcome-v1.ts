
import { AfterPaymentTemplate, AfterPaymentTemplateType, SubscriptionActiveWelcomeAPData, MonetizationUseCase } from '../../../types';
import { SubscriptionActiveWelcomeAPSchema } from '../../../schemas';

export const subscriptionWelcomeAPTemplate: AfterPaymentTemplate<SubscriptionActiveWelcomeAPData> = {
    id: 'ap-sub-welcome-v1',
    name: 'Subscription Welcome',
    useCase: MonetizationUseCase.SUBSCRIPTION_RENTAL,
    description: 'Welcomes new subscribers and provides initial access links.',
    templateType: AfterPaymentTemplateType.SUBSCRIPTION_ACTIVE_WELCOME,
    previewIcon: 'card_membership',
    previewColorClass: 'bg-indigo-100',
    previewIconColorClass: 'text-indigo-600',
    initialData: {
      templateDefinitionId: 'ap-sub-welcome-v1',
      mainMessage: 'You are now subscribed!',
      welcomeHeadline: 'Welcome to the Club!',
      planBenefits: ['Exclusive Content', 'Early Access', 'Priority Support'],
      accessContentButtonText: 'Access Your Member Area',
      accessContentLink: '#',
      showNextBillingDate: true,
      showSubmittedCustomFields: true,
    },
    schema: SubscriptionActiveWelcomeAPSchema,
  };
