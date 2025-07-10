
import { AfterPaymentTemplate, AfterPaymentTemplateType, SubscriptionShipmentInfoAPData, MonetizationUseCase } from '../../../types';
import { SubscriptionShipmentInfoAPSchema } from '../../../schemas';

export const subscriptionShipmentInfoAPTemplate: AfterPaymentTemplate<SubscriptionShipmentInfoAPData> = {
    id: 'ap-sub-shipment-info-v1',
    name: 'First Shipment Info',
    useCase: MonetizationUseCase.SUBSCRIPTION_RENTAL,
    description: "Informs subscribers about the status of their first physical subscription box.",
    templateType: AfterPaymentTemplateType.SUBSCRIPTION_SHIPMENT_INFO,
    previewIcon: 'local_shipping',
    previewColorClass: 'bg-indigo-100',
    previewIconColorClass: 'text-indigo-600',
    initialData: {
      templateDefinitionId: 'ap-sub-shipment-info-v1',
      mainMessage: "Thanks for subscribing! Get ready for some amazing goodies.",
      shipmentHeadline: "Your First Box is Being Prepared!",
      shipmentDetails: "Your first subscription box will ship within 3-5 business days. You'll receive an email with tracking information as soon as it's on its way.",
      trackingNumber: "1Z999AA10123456789",
      showSubmittedCustomFields: true,
    },
    schema: SubscriptionShipmentInfoAPSchema,
};
