import { AfterPaymentTemplate, AfterPaymentTemplateType, VoucherSendAsGiftAPData, MonetizationUseCase } from '../../../types';
import { VoucherSendAsGiftAPSchema } from '../../../schemas';

export const voucherSendAsGiftAPTemplate: AfterPaymentTemplate<VoucherSendAsGiftAPData> = {
    id: 'ap-voucher-send-as-gift-v1',
    name: 'Send as a Gift',
    useCase: MonetizationUseCase.VOUCHER,
    description: 'Allows the purchaser to email the voucher directly to a recipient.',
    templateType: AfterPaymentTemplateType.VOUCHER_SEND_AS_GIFT,
    previewIcon: 'forward_to_inbox',
    previewColorClass: 'bg-green-100',
    previewIconColorClass: 'text-green-600',
    initialData: {
      templateDefinitionId: 'ap-voucher-send-as-gift-v1',
      headline: 'Send as a Gift',
      mainMessage: 'You can send this gift card directly to a recipient.',
      sendPrompt: 'Fill out the details below to email the gift card.',
      recipientEmailLabel: "Recipient's Email",
      messageLabel: 'Your Message (Optional)',
      sendButtonText: 'Send Gift',
      showSubmittedCustomFields: true,
    },
    schema: VoucherSendAsGiftAPSchema,
};
