
import { AfterPaymentTemplate, AfterPaymentTemplateType, FundraisingThankYouAPData, MonetizationUseCase } from '../../../types';
import { FundraisingThankYouAPSchema } from '../../../schemas';

export const fundraisingThankYouAPTemplate: AfterPaymentTemplate<FundraisingThankYouAPData> = {
    id: 'ap-fr-thank-you-share-v1',
    name: 'Standard Thank You & Share',
    useCase: MonetizationUseCase.FUNDRAISING,
    description: 'A simple thank you page that encourages social sharing.',
    templateType: AfterPaymentTemplateType.FUNDRAISING_THANK_YOU,
    previewIcon: 'share',
    previewColorClass: 'bg-green-100',
    previewIconColorClass: 'text-green-600',
    initialData: {
      templateDefinitionId: 'ap-fr-thank-you-share-v1',
      mainMessage: 'Your support is invaluable to our cause.',
      thankYouMessage: 'Your contribution will make a real difference!',
      showDonationAmount: true,
      socialSharePrompt: 'Help us reach our goal by sharing this campaign!',
      showSubmittedCustomFields: true,
    },
    schema: FundraisingThankYouAPSchema,
  };
