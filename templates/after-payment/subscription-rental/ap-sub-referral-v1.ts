import { AfterPaymentTemplate, AfterPaymentTemplateType, SubscriptionReferralAPData, MonetizationUseCase } from '../../../types';
import { SubscriptionReferralAPSchema } from '../../../schemas';

export const subscriptionReferralAPTemplate: AfterPaymentTemplate<SubscriptionReferralAPData> = {
    id: 'ap-sub-referral-v1',
    name: 'Refer-a-Friend',
    useCase: MonetizationUseCase.SUBSCRIPTION_RENTAL,
    description: "Encourages new subscribers to share a referral link to get a discount.",
    templateType: AfterPaymentTemplateType.SUBSCRIPTION_REFERRAL,
    previewIcon: 'group_add',
    previewColorClass: 'bg-indigo-100',
    previewIconColorClass: 'text-indigo-600',
    initialData: {
      templateDefinitionId: 'ap-sub-referral-v1',
      mainMessage: "Welcome aboard! Want to save on your next bill?",
      referralHeadline: "Refer a Friend, Get Rewarded",
      referralMessage: "Share your unique link below. When a friend signs up, you'll both get 10% off your next payment!",
      referralCode: "REF123",
      socialShareText: "I'm loving this service! Use my link to get a discount when you sign up.",
      showSubmittedCustomFields: false,
    },
    schema: SubscriptionReferralAPSchema,
};
