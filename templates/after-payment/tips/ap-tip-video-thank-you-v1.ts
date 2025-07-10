import { AfterPaymentTemplate, AfterPaymentTemplateType, TipsVideoThankYouAPData, MonetizationUseCase } from '../../../types';
import { TipsVideoThankYouAPSchema } from '../../../schemas';

export const tipsVideoThankYouAPTemplate: AfterPaymentTemplate<TipsVideoThankYouAPData> = {
    id: 'ap-tip-video-thank-you-v1',
    name: 'Video Thank You',
    useCase: MonetizationUseCase.TIPS,
    description: "A unique page that displays an embedded video thank you from the creator.",
    templateType: AfterPaymentTemplateType.TIPS_VIDEO_THANK_YOU,
    previewIcon: 'videocam',
    previewColorClass: 'bg-pink-100',
    previewIconColorClass: 'text-pink-600',
    initialData: {
      templateDefinitionId: 'ap-tip-video-thank-you-v1',
      mainMessage: "Your support means the world to me!",
      thankYouHeadline: "A Personal Thank You From Me to You",
      videoEmbedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // A classic choice
      showSubmittedCustomFields: true,
    },
    schema: TipsVideoThankYouAPSchema,
};
