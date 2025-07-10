
import { AfterPaymentTemplate, AfterPaymentTemplateType, AppointmentBookingIntakeFormAPData, MonetizationUseCase } from '../../../types';
import { AppointmentBookingIntakeFormAPSchema } from '../../../schemas';

export const appointmentBookingIntakeFormAPTemplate: AfterPaymentTemplate<AppointmentBookingIntakeFormAPData> = {
    id: 'ap-booking-intake-form-v1',
    name: 'Pre-Appointment Intake Form',
    useCase: MonetizationUseCase.APPOINTMENT_BOOKING,
    description: 'Asks the user to fill out a form with more details before their appointment.',
    templateType: AfterPaymentTemplateType.APPOINTMENT_BOOKING_INTAKE_FORM,
    previewIcon: 'assignment',
    previewColorClass: 'bg-teal-100',
    previewIconColorClass: 'text-teal-600',
    initialData: {
      templateDefinitionId: 'ap-booking-intake-form-v1',
      mainMessage: "Your spot is reserved! To help us prepare, please fill out the form below.",
      formHeadline: "One Last Step...",
      formDescription: "Your answers will help us make our session as productive as possible.",
      intakeFormUrl: "#",
      formButtonText: "Go to Intake Form",
      showSubmittedCustomFields: false,
    },
    schema: AppointmentBookingIntakeFormAPSchema,
  };
