import { AfterPaymentTemplate, AfterPaymentTemplateType, TipsSupportMoreAPData, MonetizationUseCase } from '../../../types';
import { TipsSupportMoreAPSchema } from '../../../schemas';

export const tipsSupportMoreAPTemplate: AfterPaymentTemplate<TipsSupportMoreAPData> = {
    id: 'ap-tip-support-more-v1',
    name: 'Support More',
    useCase: MonetizationUseCase.TIPS,
    description: 'Suggests other ways to support, like following on social media or visiting a website.',
    templateType: AfterPaymentTemplateType.TIPS_SUPPORT_MORE,
    previewIcon: 'volunteer_activism',
    previewColorClass: 'bg-pink-100',
    previewIconColorClass: 'text-pink-600',
    initialData: {
      templateDefinitionId: 'ap-tip-support-more-v1',
      mainMessage: 'Thanks for the support!',
      supportMoreHeadline: 'Want to support us further?',
      showSubmittedCustomFields: false,
    },
    schema: TipsSupportMoreAPSchema,
  };
