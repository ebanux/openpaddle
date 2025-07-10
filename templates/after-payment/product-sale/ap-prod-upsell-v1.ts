
import { AfterPaymentTemplate, AfterPaymentTemplateType, ProductThankYouUpsellAPData, MonetizationUseCase } from '../../../types';
import { ProductThankYouUpsellAPSchema } from '../../../schemas';

export const productUpsellAPTemplate: AfterPaymentTemplate<ProductThankYouUpsellAPData> = {
    id: 'ap-prod-upsell-v1',
    name: 'Thank You & Upsell',
    useCase: MonetizationUseCase.PRODUCT_SALE,
    description: 'Thanks the customer and shows related products they might also like.',
    templateType: AfterPaymentTemplateType.PRODUCT_THANK_YOU_UPSELL,
    previewIcon: 'shopping_cart',
    previewColorClass: 'bg-gray-100',
    previewIconColorClass: 'text-gray-600',
    initialData: {
      templateDefinitionId: 'ap-prod-upsell-v1',
      mainMessage: 'We appreciate your business!',
      thankYouHeadline: 'Thanks for your purchase!',
      upsellSectionTitle: 'You Might Also Like',
      showSubmittedCustomFields: true,
    },
    schema: ProductThankYouUpsellAPSchema,
  };
