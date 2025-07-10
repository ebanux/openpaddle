
import { AfterPaymentTemplate, AfterPaymentTemplateType, EventTicketConfirmedQRAPData, MonetizationUseCase } from '../../../types';
import { EventTicketConfirmedQRAPSchema } from '../../../schemas';

export const eventTicketQRAPTemplate: AfterPaymentTemplate<EventTicketConfirmedQRAPData> = {
    id: 'ap-event-qr-v1',
    name: 'Ticket & QR Code',
    useCase: MonetizationUseCase.EVENT_TICKET_SALES,
    description: 'Displays the event ticket with a QR code for scanning at the entrance.',
    templateType: AfterPaymentTemplateType.EVENT_TICKET_CONFIRMED_QR,
    previewIcon: 'qr_code_2',
    previewColorClass: 'bg-purple-100',
    previewIconColorClass: 'text-purple-600',
    initialData: {
      templateDefinitionId: 'ap-event-qr-v1',
      mainMessage: "You're all set! We look forward to seeing you.",
      qrCodeInfoText: 'Present this QR code at the event entrance for scanning.',
      showEventDetails: true,
      showSubmittedCustomFields: true,
    },
    schema: EventTicketConfirmedQRAPSchema,
  };
