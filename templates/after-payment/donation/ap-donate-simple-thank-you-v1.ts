
import { AfterPaymentTemplate, AfterPaymentTemplateType, DonationSimpleThankYouAPData, MonetizationUseCase } from '../../../types';
import { DonationSimpleThankYouAPSchema } from '../../../schemas';

export const donationSimpleThankYouAPTemplate: AfterPaymentTemplate<DonationSimpleThankYouAPData> = {
  id: 'ap-donate-simple-thank-you-v1',
  name: 'Simple Thank You',
  useCase: MonetizationUseCase.DONATION,
  description: 'A clean, minimal page to thank a donor.',
  templateType: AfterPaymentTemplateType.DONATION_SIMPLE_THANK_YOU,
  previewIcon: 'thumb_up',
  previewColorClass: 'bg-red-100',
  previewIconColorClass: 'text-red-600',
  initialData: {
    templateDefinitionId: 'ap-donate-simple-thank-you-v1',
    mainMessage: 'Your generosity is greatly appreciated!',
    showDonationAmount: true,
  },
  schema: DonationSimpleThankYouAPSchema,
};
