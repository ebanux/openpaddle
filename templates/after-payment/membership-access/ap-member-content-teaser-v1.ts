import { AfterPaymentTemplate, AfterPaymentTemplateType, MembershipContentTeaserAPData, MonetizationUseCase } from '../../../types';
import { MembershipContentTeaserAPSchema } from '../../../schemas';

export const memberContentTeaserAPTemplate: AfterPaymentTemplate<MembershipContentTeaserAPData> = {
    id: 'ap-member-content-teaser-v1',
    name: 'Exclusive Content Teaser',
    useCase: MonetizationUseCase.MEMBERSHIP_ACCESS,
    description: "Immediately shows new members a sneak peek of the content they've just unlocked.",
    templateType: AfterPaymentTemplateType.MEMBERSHIP_CONTENT_TEASER,
    previewIcon: 'auto_awesome',
    previewColorClass: 'bg-indigo-100',
    previewIconColorClass: 'text-indigo-600',
    initialData: {
      templateDefinitionId: 'ap-member-content-teaser-v1',
      title: "You're In!",
      mainMessage: "You've unlocked a world of exclusive content.",
      teaserHeadline: "Here's a Taste of What's Inside",
      teaserItems: [
        { title: "Exclusive Article", imageUrl: "https://picsum.photos/seed/mem-exclusive/300/200", description: "Our latest deep-dive article." },
        { title: "Bonus Video", imageUrl: "https://picsum.photos/seed/mem-bonus/300/200", description: "A members-only video tutorial." }
      ],
      showSubmittedCustomFields: false,
      showPassQRCode: true,
    },
    schema: MembershipContentTeaserAPSchema,
};