import { AfterPaymentTemplate, AfterPaymentTemplateType, RentalRateExperienceAPData, MonetizationUseCase } from '../../../types';
import { RentalRateExperienceAPSchema } from '../../../schemas';

export const rentalRatingAPTemplate: AfterPaymentTemplate<RentalRateExperienceAPData> = {
    id: 'ap-rental-rating-v1',
    name: 'Rate Your Experience',
    useCase: MonetizationUseCase.TIMED_RENTAL,
    description: "After the rental period, prompts the user to provide a star rating and leave feedback.",
    templateType: AfterPaymentTemplateType.RENTAL_RATE_EXPERIENCE,
    previewIcon: 'star_rate',
    previewColorClass: 'bg-orange-100',
    previewIconColorClass: 'text-orange-600',
    initialData: {
      templateDefinitionId: 'ap-rental-rating-v1',
      mainMessage: "Thanks for renting with us!",
      ratingHeadline: "How Was Your Rental Experience?",
      feedbackPrompt: "Your feedback helps us improve our service for everyone. Please let us know how we did!",
      showSubmittedCustomFields: false,
    },
    schema: RentalRateExperienceAPSchema,
};
