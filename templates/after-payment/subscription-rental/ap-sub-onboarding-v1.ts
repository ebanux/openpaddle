
import { AfterPaymentTemplate, AfterPaymentTemplateType, SubscriptionOnboardingAPData, MonetizationUseCase } from '../../../types';
import { SubscriptionOnboardingAPSchema } from '../../../schemas';

export const subscriptionOnboardingAPTemplate: AfterPaymentTemplate<SubscriptionOnboardingAPData> = {
    id: 'ap-sub-onboarding-v1',
    name: 'Onboarding Checklist',
    useCase: MonetizationUseCase.SUBSCRIPTION_RENTAL,
    description: "Guides new subscribers through their first steps with a customizable checklist.",
    templateType: AfterPaymentTemplateType.SUBSCRIPTION_ONBOARDING_CHECKLIST,
    previewIcon: 'checklist',
    previewColorClass: 'bg-indigo-100',
    previewIconColorClass: 'text-indigo-600',
    initialData: {
      templateDefinitionId: 'ap-sub-onboarding-v1',
      mainMessage: "Welcome! Here's how to get the most out of your new subscription.",
      onboardingHeadline: "Your Onboarding Checklist",
      onboardingSteps: [
          { text: "Check your email for a welcome message.", isComplete: true },
          { text: "Join our exclusive Discord community.", isComplete: false },
          { text: "Read the 'Getting Started' guide.", isComplete: false },
      ],
      showSubmittedCustomFields: true,
    },
    schema: SubscriptionOnboardingAPSchema,
};
