
import { AfterPaymentTemplate, AfterPaymentTemplateType, TimedRentalStartedInstructionsAPData, MonetizationUseCase } from '../../../types';
import { TimedRentalStartedInstructionsAPSchema } from '../../../schemas';

export const rentalInstructionsAPTemplate: AfterPaymentTemplate<TimedRentalStartedInstructionsAPData> = {
    id: 'ap-rental-instructions-v1',
    name: 'Rental Instructions',
    useCase: MonetizationUseCase.TIMED_RENTAL,
    description: 'Provides instructions and next steps after a rental is initiated.',
    templateType: AfterPaymentTemplateType.RENTAL_STARTED_INSTRUCTIONS,
    previewIcon: 'integration_instructions',
    previewColorClass: 'bg-orange-100',
    previewIconColorClass: 'text-orange-600',
    initialData: {
      templateDefinitionId: 'ap-rental-instructions-v1',
      mainMessage: 'Your rental has started. Please follow the instructions below.',
      instructionsHeadline: 'Getting Started',
      instructionsList: ['Unlock your item using the code sent to your email.', 'Inspect for any damage before use.', 'Enjoy your rental!'],
      returnInfo: 'Please return the item to the designated drop-off point by the end of your rental period.',
      showSubmittedCustomFields: true,
    },
    schema: TimedRentalStartedInstructionsAPSchema,
  };
