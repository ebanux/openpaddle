import { AfterPaymentTemplate, AfterPaymentTemplateType, VoucherInteractiveRevealAPData, MonetizationUseCase } from '../../../types';
import { VoucherInteractiveRevealAPSchema } from '../../../schemas';

export const voucherInteractiveRevealAPTemplate: AfterPaymentTemplate<VoucherInteractiveRevealAPData> = {
    id: 'ap-voucher-interactive-reveal-v1',
    name: 'Interactive Reveal',
    useCase: MonetizationUseCase.VOUCHER,
    description: 'An engaging experience where the user clicks to reveal their voucher code.',
    templateType: AfterPaymentTemplateType.VOUCHER_INTERACTIVE_REVEAL,
    previewIcon: 'auto_awesome',
    previewColorClass: 'bg-green-100',
    previewIconColorClass: 'text-green-600',
    initialData: {
      templateDefinitionId: 'ap-voucher-interactive-reveal-v1',
      headline: 'Click to Reveal Your Gift',
      mainMessage: 'Your gift is ready!',
      revealPrompt: 'A special surprise is waiting for you.',
      revealButtonText: '🎁 Reveal Now',
      showSubmittedCustomFields: false,
    },
    schema: VoucherInteractiveRevealAPSchema,
};
