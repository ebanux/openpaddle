
import { AfterPaymentTemplate, AfterPaymentTemplateType, DonationExploreContentAPData, MonetizationUseCase } from '../../../types';
import { DonationExploreContentAPSchema } from '../../../schemas';

export const donationExploreContentAPTemplate: AfterPaymentTemplate<DonationExploreContentAPData> = {
  id: 'ap-donate-explore-content-v1',
  name: 'Explore More Content',
  useCase: MonetizationUseCase.DONATION,
  description: 'Thanks the donor and shows them links to other content or projects.',
  templateType: AfterPaymentTemplateType.DONATION_EXPLORE_CONTENT,
  previewIcon: 'explore',
  previewColorClass: 'bg-red-100',
  previewIconColorClass: 'text-red-600',
  initialData: {
    templateDefinitionId: 'ap-donate-explore-content-v1',
    mainMessage: "Your support helps keep this project alive. Thank you!",
    exploreHeadline: "While you're here, check out...",
    contentLinks: [
      { title: 'Read the Project Documentation', link: '#' },
      { title: 'Visit our Main Website', link: '#' },
      { title: 'Check out our other projects', link: '#' },
    ],
  },
  schema: DonationExploreContentAPSchema,
};
