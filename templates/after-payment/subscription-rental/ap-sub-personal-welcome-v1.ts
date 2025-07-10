
import { AfterPaymentTemplate, AfterPaymentTemplateType, SubscriptionPersonalWelcomeAPData, MonetizationUseCase } from '../../../types';
import { SubscriptionPersonalWelcomeAPSchema } from '../../../schemas';

export const subscriptionPersonalWelcomeAPTemplate: AfterPaymentTemplate<SubscriptionPersonalWelcomeAPData> = {
    id: 'ap-sub-personal-welcome-v1',
    name: 'Personal Welcome',
    useCase: MonetizationUseCase.SUBSCRIPTION_RENTAL,
    description: "A simple, warm welcome page with a personal message or embedded video.",
    templateType: AfterPaymentTemplateType.SUBSCRIPTION_PERSONAL_WELCOME,
    previewIcon: 'waving_hand',
    previewColorClass: 'bg-indigo-100',
    previewIconColorClass: 'text-indigo-600',
    initialData: {
      templateDefinitionId: 'ap-sub-personal-welcome-v1',
      mainMessage: "Welcome to our community!",
      welcomeHeadline: "So Glad to Have You!",
      personalMessage: "Thank you for joining. We're a small team and every new member means the world to us. We can't wait to share what we've been working on.",
      showSubmittedCustomFields: true,
    },
    schema: SubscriptionPersonalWelcomeAPSchema,
};
