
import { AfterPaymentTemplate, AfterPaymentTemplateType, AppointmentBookingConfirmedAPData, MonetizationUseCase } from '../../../types';
import { AppointmentBookingConfirmedAPSchema } from '../../../schemas';

export const appointmentBookingConfirmedAPTemplate: AfterPaymentTemplate<AppointmentBookingConfirmedAPData> = {
    id: 'ap-booking-confirmed-v1',
    name: 'Booking Confirmed',
    useCase: MonetizationUseCase.APPOINTMENT_BOOKING,
    description: 'Confirms the appointment and shows key details.',
    templateType: AfterPaymentTemplateType.APPOINTMENT_BOOKING_CONFIRMED,
    previewIcon: 'event_available',
    previewColorClass: 'bg-teal-100',
    previewIconColorClass: 'text-teal-600',
    initialData: {
      templateDefinitionId: 'ap-booking-confirmed-v1',
      mainMessage: 'Check your email for full confirmation details.',
      confirmationHeadline: 'Your Appointment is Booked!',
      showAppointmentDetails: true,
      showSubmittedCustomFields: true,
    },
    schema: AppointmentBookingConfirmedAPSchema,
  };
