
import { AfterPaymentTemplate, AfterPaymentTemplateType, AppointmentPreparationInfoAPData, MonetizationUseCase } from '../../../types';
import { AppointmentPreparationInfoAPSchema } from '../../../schemas';

export const appointmentPrepInfoAPTemplate: AfterPaymentTemplate<AppointmentPreparationInfoAPData> = {
    id: 'ap-booking-prep-info-v1',
    name: 'Appointment Prep Info',
    useCase: MonetizationUseCase.APPOINTMENT_BOOKING,
    description: 'Provides information on how to prepare for the upcoming appointment.',
    templateType: AfterPaymentTemplateType.APPOINTMENT_PREPARATION_INFO,
    previewIcon: 'checklist',
    previewColorClass: 'bg-teal-100',
    previewIconColorClass: 'text-teal-600',
    initialData: {
      templateDefinitionId: 'ap-booking-prep-info-v1',
      mainMessage: "Here's what you need to know before your appointment.",
      preparationHeadline: 'How to Prepare',
      preparationSteps: ['Please arrive 10 minutes early.', 'Bring a valid ID.'],
      showSubmittedCustomFields: false,
    },
    schema: AppointmentPreparationInfoAPSchema,
  };