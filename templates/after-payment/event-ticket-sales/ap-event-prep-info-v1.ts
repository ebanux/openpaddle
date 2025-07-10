import { AfterPaymentTemplate, AfterPaymentTemplateType, EventPreparationInfoAPData, MonetizationUseCase } from '../../../types';
import { EventPreparationInfoAPSchema } from '../../../schemas';

export const eventPrepInfoAPTemplate: AfterPaymentTemplate<EventPreparationInfoAPData> = {
    id: 'ap-event-prep-info-v1',
    name: 'Event Prep Info',
    useCase: MonetizationUseCase.EVENT_TICKET_SALES,
    description: "Provides attendees with important information before the event, such as a schedule, what to bring, and venue rules.",
    templateType: AfterPaymentTemplateType.EVENT_PREPARATION_INFO,
    previewIcon: 'checklist',
    previewColorClass: 'bg-purple-100',
    previewIconColorClass: 'text-purple-600',
    initialData: {
      templateDefinitionId: 'ap-event-prep-info-v1',
      mainMessage: "Here's what you need to know before the event.",
      preparationHeadline: "Getting Ready for the Event",
      preparationSteps: [
        "Doors open 30 minutes before the start time.",
        "Please have your QR code ready for scanning.",
        "Outside food and drink are not permitted."
      ],
      contactForHelp: "If you have any questions, contact us at events@example.com.",
      showSubmittedCustomFields: false,
    },
    schema: EventPreparationInfoAPSchema,
};