import { AfterPaymentTemplate, AfterPaymentTemplateType, DigitalContentCommunityFeedbackAPData, MonetizationUseCase } from '../../../types';
import { DigitalContentCommunityFeedbackAPSchema } from '../../../schemas';

export const digitalContentCommunityFeedbackAPTemplate: AfterPaymentTemplate<DigitalContentCommunityFeedbackAPData> = {
    id: 'ap-dc-community-feedback-v1',
    name: 'Community & Feedback',
    useCase: MonetizationUseCase.DIGITAL_CONTENT_ACCESS,
    description: 'After download, invites the user to a community and asks for a review.',
    templateType: AfterPaymentTemplateType.DIGITAL_CONTENT_COMMUNITY_FEEDBACK,
    previewIcon: 'forum',
    previewColorClass: 'bg-blue-100',
    previewIconColorClass: 'text-blue-600',
    initialData: {
      templateDefinitionId: 'ap-dc-community-feedback-v1',
      title: "Thanks for your purchase!",
      mainMessage: "We hope you enjoy your new content. Consider joining our community to connect with other creators!",
      communityHeadline: "Join the Creator Hub",
      communityJoinLink: "#",
      communityButtonText: "Join our Discord",
      feedbackHeadline: "Love the content?",
      feedbackFormLink: "#",
      feedbackButtonText: "Leave a Review",
      showSubmittedCustomFields: false,
    },
    schema: DigitalContentCommunityFeedbackAPSchema,
};
