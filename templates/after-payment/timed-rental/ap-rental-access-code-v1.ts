import { AfterPaymentTemplate, AfterPaymentTemplateType, RentalAccessCodeTimerAPData, MonetizationUseCase } from '../../../types';
import { RentalAccessCodeTimerAPSchema } from '../../../schemas';

export const rentalAccessCodeAPTemplate: AfterPaymentTemplate<RentalAccessCodeTimerAPData> = {
    id: 'ap-rental-access-code-v1',
    name: 'Access Code & Timer',
    useCase: MonetizationUseCase.TIMED_RENTAL,
    description: 'Shows an access code and a live countdown timer for the rental session.',
    templateType: AfterPaymentTemplateType.RENTAL_ACCESS_CODE_TIMER,
    previewIcon: 'pin',
    previewColorClass: 'bg-orange-100',
    previewIconColorClass: 'text-orange-600',
    initialData: {
      templateDefinitionId: 'ap-rental-access-code-v1',
      mainMessage: "Your rental has begun!",
      accessCodeHeadline: "Your Access Code:",
      accessCode: "AX-45-B2",
      timerHeadline: "Your rental ends in:",
      showSubmittedCustomFields: true,
    },
    schema: RentalAccessCodeTimerAPSchema,
};
