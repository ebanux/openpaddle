
import { AfterPaymentTemplate, AfterPaymentTemplateType, TipsThankYouAPData, MonetizationUseCase } from '../../../types';
import { TipsThankYouAPSchema } from '../../../schemas';

export const tipsThankYouAPTemplate: AfterPaymentTemplate<TipsThankYouAPData> = {
    id: 'ap-tip-thank-you-v1',
    name: 'Simple Tip Thank You',
    useCase: MonetizationUseCase.TIPS,
    description: 'A personal thank you note for leaving a tip.',
    templateType: AfterPaymentTemplateType.TIPS_THANK_YOU,
    previewIcon: 'favorite',
    previewColorClass: 'bg-pink-100',
    previewIconColorClass: 'text-pink-600',
    initialData: {
      templateDefinitionId: 'ap-tip-thank-you-v1',
      mainMessage: 'Your generosity is greatly appreciated!',
      showAmountTipped: true,
      showSubmittedCustomFields: true,
    },
    schema: TipsThankYouAPSchema,
  };
