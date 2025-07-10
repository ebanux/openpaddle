
import { AfterPaymentTemplate, AfterPaymentTemplateType, DonationSocialFollowAPData, MonetizationUseCase } from '../../../types';
import { DonationSocialFollowAPSchema } from '../../../schemas';

export const donationSocialFollowAPTemplate: AfterPaymentTemplate<DonationSocialFollowAPData> = {
  id: 'ap-donate-social-follow-v1',
  name: 'Social Media Follow',
  useCase: MonetizationUseCase.DONATION,
  description: 'Thanks the donor and encourages them to follow on social media.',
  templateType: AfterPaymentTemplateType.DONATION_SOCIAL_FOLLOW,
  previewIcon: 'share',
  previewColorClass: 'bg-red-100',
  previewIconColorClass: 'text-red-600',
  initialData: {
    templateDefinitionId: 'ap-donate-social-follow-v1',
    mainMessage: "Thank you so much for the support!",
    followHeadline: "Stay Connected",
    followMessage: "Follow me on social media to stay up to date with my latest work.",
    socialMediaLinks: [
      { platform: 'Twitter', link: 'https://twitter.com/example' },
      { platform: 'Instagram', link: 'https://instagram.com/example' },
    ],
  },
  schema: DonationSocialFollowAPSchema,
};
