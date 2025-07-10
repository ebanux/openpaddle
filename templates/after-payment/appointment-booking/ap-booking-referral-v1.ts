
import { AfterPaymentTemplate, AfterPaymentTemplateType, AppointmentBookingReferralAPData, MonetizationUseCase } from '../../../types';
import { AppointmentBookingReferralAPSchema } from '../../../schemas';

export const appointmentBookingReferralAPTemplate: AfterPaymentTemplate<AppointmentBookingReferralAPData> = {
    id: 'ap-booking-referral-v1',
    name: 'Refer-a-Friend',
    useCase: MonetizationUseCase.APPOINTMENT_BOOKING,
    description: 'Encourages word-of-mouth marketing with a simple referral program page.',
    templateType: AfterPaymentTemplateType.APPOINTMENT_BOOKING_REFERRAL,
    previewIcon: 'group_add',
    previewColorClass: 'bg-teal-100',
    previewIconColorClass: 'text-teal-600',
    initialData: {
      templateDefinitionId: 'ap-booking-referral-v1',
      mainMessage: "Your booking is confirmed. Know someone else who could benefit?",
      referralHeadline: "Refer a Friend, Get Rewarded",
      referralMessage: "Share your unique link below. When a friend books a session, you'll both get 15% off your next booking!",
      referralCode: "BOOKWITHALEX",
      socialShareText: "I just booked a great session! Use my link to get a discount.",
      showSubmittedCustomFields: false,
    },
    schema: AppointmentBookingReferralAPSchema,
  };
