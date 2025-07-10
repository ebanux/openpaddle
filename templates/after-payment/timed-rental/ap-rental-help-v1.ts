
import { AfterPaymentTemplate, AfterPaymentTemplateType, RentalExtendHelpAPData, MonetizationUseCase } from '../../../types';
import { RentalExtendHelpAPSchema } from '../../../schemas';

export const rentalHelpAPTemplate: AfterPaymentTemplate<RentalExtendHelpAPData> = {
    id: 'ap-rental-help-v1',
    name: 'Rental Help',
    useCase: MonetizationUseCase.TIMED_RENTAL,
    description: 'Provides help resources and contact information for renters.',
    templateType: AfterPaymentTemplateType.RENTAL_EXTEND_HELP,
    previewIcon: 'help',
    previewColorClass: 'bg-orange-100',
    previewIconColorClass: 'text-orange-600',
    initialData: {
      templateDefinitionId: 'ap-rental-help-v1',
      mainMessage: 'Having trouble? We are here to help.',
      helpHeadline: 'Help & Support',
      contactSupportText: 'For urgent issues, call 555-RENT-NOW',
      showSubmittedCustomFields: false,
    },
    schema: RentalExtendHelpAPSchema,
  };
