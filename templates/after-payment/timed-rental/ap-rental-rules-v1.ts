import { AfterPaymentTemplate, AfterPaymentTemplateType, RentalRulesWaiverAPData, MonetizationUseCase } from '../../../types';
import { RentalRulesWaiverAPSchema } from '../../../schemas';

export const rentalRulesAPTemplate: AfterPaymentTemplate<RentalRulesWaiverAPData> = {
    id: 'ap-rental-rules-v1',
    name: 'Rental Rules & Waiver',
    useCase: MonetizationUseCase.TIMED_RENTAL,
    description: 'Displays rental rules and requires a waiver acceptance before showing access info.',
    templateType: AfterPaymentTemplateType.RENTAL_RULES_WAIVER,
    previewIcon: 'gavel',
    previewColorClass: 'bg-orange-100',
    previewIconColorClass: 'text-orange-600',
    initialData: {
      templateDefinitionId: 'ap-rental-rules-v1',
      mainMessage: "Please review and agree to the terms before proceeding.",
      rulesHeadline: "Important Rental Rules",
      rentalRules: ["No smoking in or near the equipment.", "Return the item in the same condition you received it.", "Report any damage immediately."],
      waiverText: "I have read and agree to the rental terms and liability waiver.",
      accessInfoAfterWaiver: "The key is in the lockbox. Code: 1234",
      showSubmittedCustomFields: true,
    },
    schema: RentalRulesWaiverAPSchema,
};
