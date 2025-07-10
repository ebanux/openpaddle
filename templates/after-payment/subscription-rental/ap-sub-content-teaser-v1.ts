
import { AfterPaymentTemplate, AfterPaymentTemplateType, SubscriptionContentTeaserAPData, MonetizationUseCase } from '../../../types';
import { SubscriptionContentTeaserAPSchema } from '../../../schemas';

export const subscriptionContentTeaserAPTemplate: AfterPaymentTemplate<SubscriptionContentTeaserAPData> = {
    id: 'ap-sub-content-teaser-v1',
    name: 'Exclusive Content Teaser',
    useCase: MonetizationUseCase.SUBSCRIPTION_RENTAL,
    description: "Engages new subscribers by showing them a sneak peek of the exclusive content they've unlocked.",
    templateType: AfterPaymentTemplateType.SUBSCRIPTION_CONTENT_TEASER,
    previewIcon: 'auto_awesome',
    previewColorClass: 'bg-indigo-100',
    previewIconColorClass: 'text-indigo-600',
    initialData: {
      templateDefinitionId: 'ap-sub-content-teaser-v1',
      mainMessage: "You've unlocked exclusive content!",
      teaserHeadline: "A Sneak Peek of What's Inside",
      teaserItems: [
        { title: "Exclusive Interview with our Founder", imageUrl: "https://picsum.photos/seed/exclusive/300/200", link: "#" },
        { title: "Early Access: The Future of Our Product", imageUrl: "https://picsum.photos/seed/earlyaccess/300/200", link: "#" }
      ],
      showSubmittedCustomFields: false,
    },
    schema: SubscriptionContentTeaserAPSchema,
};
