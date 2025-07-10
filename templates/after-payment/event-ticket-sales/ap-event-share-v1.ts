
import { AfterPaymentTemplate, AfterPaymentTemplateType, EventInfoShareAPData, MonetizationUseCase } from '../../../types';
import { EventInfoShareAPSchema } from '../../../schemas';

export const eventInfoShareAPTemplate: AfterPaymentTemplate<EventInfoShareAPData> = {
    id: 'ap-event-share-v1',
    name: 'Event Info & Share',
    useCase: MonetizationUseCase.EVENT_TICKET_SALES,
    description: 'Shows event info and encourages sharing on social media.',
    templateType: AfterPaymentTemplateType.EVENT_INFO_SHARE,
    previewIcon: 'celebration',
    previewColorClass: 'bg-purple-100',
    previewIconColorClass: 'text-purple-600',
    initialData: {
      templateDefinitionId: 'ap-event-share-v1',
      mainMessage: 'Thanks for attending!',
      eventRecapHeadline: 'Hope you had a great time!',
      sharePrompt: 'Share your experience with friends!',
      showSubmittedCustomFields: false,
    },
    schema: EventInfoShareAPSchema,
  };
