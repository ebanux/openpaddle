import { AfterPaymentTemplate, AfterPaymentTemplateType, ProductUpdatesCommunityAPData, MonetizationUseCase } from '../../../types';
import { ProductUpdatesCommunityAPSchema } from '../../../schemas';

export const productCommunityAPTemplate: AfterPaymentTemplate<ProductUpdatesCommunityAPData> = {
    id: 'ap-prod-community-v1',
    name: 'Order Updates & Community',
    useCase: MonetizationUseCase.PRODUCT_SALE,
    description: "Shows order status and links to join a Discord or Facebook community.",
    templateType: AfterPaymentTemplateType.PRODUCT_UPDATES_COMMUNITY,
    previewIcon: 'forum',
    previewColorClass: 'bg-blue-100',
    previewIconColorClass: 'text-blue-600',
    initialData: {
      templateDefinitionId: 'ap-prod-community-v1',
      mainMessage: "Thanks for your order! You're officially one of the first to get this.",
      statusHeadline: "Status: Pre-Order Confirmed",
      communityHeadline: "Join the Community",
      communityMessage: "Get exclusive updates, talk to the developers, and connect with other fans in our official channels.",
      discordLink: "https://discord.gg/example",
      facebookGroupLink: "https://facebook.com/groups/example",
      showSubmittedCustomFields: true,
    },
    schema: ProductUpdatesCommunityAPSchema,
};
