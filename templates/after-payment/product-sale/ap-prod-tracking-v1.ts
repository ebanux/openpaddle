
import { AfterPaymentTemplate, AfterPaymentTemplateType, ProductOrderConfirmedTrackingAPData, MonetizationUseCase } from '../../../types';
import { ProductOrderConfirmedTrackingAPSchema } from '../../../schemas';

export const productOrderTrackingAPTemplate: AfterPaymentTemplate<ProductOrderConfirmedTrackingAPData> = {
    id: 'ap-prod-tracking-v1',
    name: 'Order Confirmed & Tracking',
    useCase: MonetizationUseCase.PRODUCT_SALE,
    description: 'Confirmation page for physical goods with a mock tracking link.',
    templateType: AfterPaymentTemplateType.PRODUCT_ORDER_CONFIRMED_TRACKING,
    previewIcon: 'local_shipping',
    previewColorClass: 'bg-gray-100',
    previewIconColorClass: 'text-gray-600',
    initialData: {
      templateDefinitionId: 'ap-prod-tracking-v1',
      mainMessage: "We've received your order and are getting it ready.",
      showEstimatedDelivery: true,
      estimatedDeliveryText: '3-5 business days',
      trackingLinkButtonText: 'Track Your Order',
      mockTrackingLink: '#',
      showSubmittedCustomFields: true,
    },
    schema: ProductOrderConfirmedTrackingAPSchema,
  };
