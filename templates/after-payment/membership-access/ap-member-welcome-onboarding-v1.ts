import { AfterPaymentTemplate, AfterPaymentTemplateType, MembershipWelcomeOnboardingAPData, MonetizationUseCase } from '../../../types';
import { MembershipWelcomeOnboardingAPSchema } from '../../../schemas';

export const memberWelcomeOnboardingAPTemplate: AfterPaymentTemplate<MembershipWelcomeOnboardingAPData> = {
    id: 'ap-member-welcome-onboarding-v1',
    name: 'Welcome & Onboarding',
    useCase: MonetizationUseCase.MEMBERSHIP_ACCESS,
    description: "Welcomes new members and provides a checklist of first steps to take.",
    templateType: AfterPaymentTemplateType.MEMBERSHIP_WELCOME_ONBOARDING,
    previewIcon: 'checklist',
    previewColorClass: 'bg-indigo-100',
    previewIconColorClass: 'text-indigo-600',
    initialData: {
      templateDefinitionId: 'ap-member-welcome-onboarding-v1',
      title: "Welcome to the Club!",
      mainMessage: "We're so excited to have you. Here are a few things to do to get started:",
      welcomeHeadline: "Your Onboarding Checklist",
      onboardingSteps: [
          { text: "Join our exclusive community.", isComplete: false },
          { text: "Introduce yourself in the #intros channel.", isComplete: false },
          { text: "Read the community guidelines.", isComplete: false },
      ],
      showSubmittedCustomFields: true,
      showPassQRCode: true,
    },
    schema: MembershipWelcomeOnboardingAPSchema,
};