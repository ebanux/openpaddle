
import { AfterPaymentTemplate, AfterPaymentTemplateType, RestaurantBillReceiptAPData, MonetizationUseCase } from '../../../types';
import { RestaurantBillReceiptAPSchema } from '../../../schemas';

export const restaurantReceiptAPTemplate: AfterPaymentTemplate<RestaurantBillReceiptAPData> = {
    id: 'ap-rb-receipt-v1',
    name: 'Bill Receipt',
    useCase: MonetizationUseCase.RESTAURANT_BILL,
    description: 'A simple receipt for a paid restaurant bill.',
    templateType: AfterPaymentTemplateType.RESTAURANT_BILL_RECEIPT,
    previewIcon: 'receipt_long',
    previewColorClass: 'bg-red-100',
    previewIconColorClass: 'text-red-600',
    initialData: {
      templateDefinitionId: 'ap-rb-receipt-v1',
      mainMessage: 'Thank you for dining with us!',
      showItemizedList: true,
      showTipAmount: true,
      showSubmittedCustomFields: false,
    },
    schema: RestaurantBillReceiptAPSchema,
  };
