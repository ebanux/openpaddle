
import { AfterPaymentTemplate, AfterPaymentTemplateType, DonationPersonalNoteAPData, MonetizationUseCase } from '../../../types';
import { DonationPersonalNoteAPSchema } from '../../../schemas';

export const donationPersonalNoteAPTemplate: AfterPaymentTemplate<DonationPersonalNoteAPData> = {
  id: 'ap-donate-personal-note-v1',
  name: 'Personal Note',
  useCase: MonetizationUseCase.DONATION,
  description: 'A personal thank you with a space for a photo and a custom message.',
  templateType: AfterPaymentTemplateType.DONATION_PERSONAL_NOTE,
  previewIcon: 'waving_hand',
  previewColorClass: 'bg-red-100',
  previewIconColorClass: 'text-red-600',
  initialData: {
    templateDefinitionId: 'ap-donate-personal-note-v1',
    mainMessage: "From the bottom of my heart, thank you.",
    imageUrl: 'https://picsum.photos/seed/creator/200/200',
    personalMessage: "Your support allows me to continue doing what I love. I couldn't do it without you!",
  },
  schema: DonationPersonalNoteAPSchema,
};
