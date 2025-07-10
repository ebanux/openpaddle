
import { AfterPaymentTemplate, AfterPaymentTemplateType, AppointmentBookingUpsellAPData, MonetizationUseCase } from '../../../types';
import { AppointmentBookingUpsellAPSchema } from '../../../schemas';

export const appointmentBookingUpsellAPTemplate: AfterPaymentTemplate<AppointmentBookingUpsellAPData> = {
    id: 'ap-booking-upsell-v1',
    name: 'Upsell Related Services',
    useCase: MonetizationUseCase.APPOINTMENT_BOOKING,
    description: 'Suggests other relevant services or packages after the initial booking.',
    templateType: AfterPaymentTemplateType.APPOINTMENT_BOOKING_UPSELL,
    previewIcon: 'add_shopping_cart',
    previewColorClass: 'bg-teal-100',
    previewIconColorClass: 'text-teal-600',
    initialData: {
      templateDefinitionId: 'ap-booking-upsell-v1',
      mainMessage: "You're all set! While you're here, check out our other popular services.",
      upsellHeadline: "Enhance Your Experience",
      upsellItems: [
          { name: "Follow-Up Session Package (3-Pack)", description: "Save 15% when you book three follow-up sessions.", price: "$450", link: "#" },
          { name: "Advanced Strategy Workshop", description: "Join our group workshop for a deep dive.", price: "$299", link: "#" }
      ],
      showSubmittedCustomFields: false,
    },
    schema: AppointmentBookingUpsellAPSchema,
  };
