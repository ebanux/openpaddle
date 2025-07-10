import { AfterPaymentTemplate, AfterPaymentTemplateType, DigitalContentSupportMoreAPData, MonetizationUseCase } from '../../../types';
import { DigitalContentSupportMoreAPSchema } from '../../../schemas';

export const digitalContentSupportMoreAPTemplate: AfterPaymentTemplate<DigitalContentSupportMoreAPData> = {
    id: 'ap-dc-support-more-v1',
    name: 'Support & More Content',
    useCase: MonetizationUseCase.DIGITAL_CONTENT_ACCESS,
    description: 'After download, suggests other products or ways to support the creator.',
    templateType: AfterPaymentTemplateType.DIGITAL_CONTENT_SUPPORT_MORE,
    previewIcon: 'auto_awesome',
    previewColorClass: 'bg-blue-100',
    previewIconColorClass: 'text-blue-600',
    initialData: {
      templateDefinitionId: 'ap-dc-support-more-v1',
      mainMessage: 'Enjoy your content!',
      supportHeadline: 'Like what you see? Support the creator!',
      viewOtherProductsButtonText: 'View All Products',
      showSubmittedCustomFields: false,
    },
    schema: DigitalContentSupportMoreAPSchema,
  };
