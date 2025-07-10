
import { AfterPaymentTemplate, AfterPaymentTemplateType, TipsSocialShoutoutAPData, MonetizationUseCase } from '../../../types';
import { TipsSocialShoutoutAPSchema } from '../../../schemas';

export const tipsSocialShoutoutAPTemplate: AfterPaymentTemplate<TipsSocialShoutoutAPData> = {
    id: 'ap-tip-social-shoutout-v1',
    name: 'Social Media Shout-Out',
    useCase: MonetizationUseCase.TIPS,
    description: "Thanks the user and encourages them to give a shout-out on social media.",
    templateType: AfterPaymentTemplateType.TIPS_SOCIAL_SHOUTOUT,
    previewIcon: 'campaign',
    previewColorClass: 'bg-pink-100',
    previewIconColorClass: 'text-pink-600',
    initialData: {
      templateDefinitionId: 'ap-tip-social-shoutout-v1',
      mainMessage: "Your support is amazing! Help spread the word with a shout-out.",
      socialPlatform: 'Twitter',
      prewrittenText: "Just left a tip for @creator! They're awesome!",
      creatorHandle: "@creator",
      showSubmittedCustomFields: true,
    },
    schema: TipsSocialShoutoutAPSchema,
};