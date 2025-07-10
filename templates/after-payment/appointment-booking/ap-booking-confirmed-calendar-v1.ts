
import { AfterPaymentTemplate, AfterPaymentTemplateType, AppointmentBookingConfirmedCalendarAPData, MonetizationUseCase } from '../../../types';
import { AppointmentBookingConfirmedCalendarAPSchema } from '../../../schemas';

export const appointmentBookingConfirmedCalendarAPTemplate: AfterPaymentTemplate<AppointmentBookingConfirmedCalendarAPData> = {
    id: 'ap-booking-confirmed-calendar-v1',
    name: 'Booking Confirmed w/ Calendar',
    useCase: MonetizationUseCase.APPOINTMENT_BOOKING,
    description: 'Confirms the appointment and provides prominent "Add to Calendar" links.',
    templateType: AfterPaymentTemplateType.APPOINTMENT_BOOKING_CONFIRMED_CALENDAR,
    previewIcon: 'edit_calendar',
    previewColorClass: 'bg-teal-100',
    previewIconColorClass: 'text-teal-600',
    initialData: {
      templateDefinitionId: 'ap-booking-confirmed-calendar-v1',
      mainMessage: 'An invitation has also been sent to your email.',
      confirmationHeadline: 'Your Appointment is Confirmed!',
      showAppointmentDetails: true,
      showAddToCalendar: true,
      showSubmittedCustomFields: true,
    },
    schema: AppointmentBookingConfirmedCalendarAPSchema,
  };
