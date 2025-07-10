
import { AfterPaymentTemplate, AfterPaymentTemplateType, RestaurantFeedbackLoyaltyAPData, MonetizationUseCase } from '../../../types';
import { RestaurantFeedbackLoyaltyAPSchema } from '../../../schemas';

export const restaurantFeedbackAPTemplate: AfterPaymentTemplate<RestaurantFeedbackLoyaltyAPData> = {
    id: 'ap-rb-feedback-loyalty-v1',
    name: 'Feedback & Loyalty',
    useCase: MonetizationUseCase.RESTAURANT_BILL,
    description: 'Asks for feedback and promotes a loyalty program after payment.',
    templateType: AfterPaymentTemplateType.RESTAURANT_FEEDBACK_LOYALTY,
    previewIcon: 'rate_review',
    previewColorClass: 'bg-red-100',
    previewIconColorClass: 'text-red-600',
    initialData: {
      templateDefinitionId: 'ap-rb-feedback-loyalty-v1',
      mainMessage: 'We hope you enjoyed your meal!',
      feedbackPromptHeadline: 'We Value Your Feedback',
      loyaltyProgramHeadline: 'Join Our Rewards Program',
      showSubmittedCustomFields: false,
    },
    schema: RestaurantFeedbackLoyaltyAPSchema,
  };
