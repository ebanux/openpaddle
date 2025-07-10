
import { AfterPaymentTemplate, AfterPaymentTemplateType, InvoiceNextStepsRateAPData, MonetizationUseCase } from '../../../types';
import { InvoiceNextStepsRateAPSchema } from '../../../schemas';

export const invoiceNextStepsAPTemplate: AfterPaymentTemplate<InvoiceNextStepsRateAPData> = {
    id: 'ap-invoice-next-steps-v1',
    name: 'Invoice Next Steps & Rating',
    useCase: MonetizationUseCase.SIMPLE_INVOICE,
    description: 'Details next steps after payment and asks for a rating or review.',
    templateType: AfterPaymentTemplateType.INVOICE_NEXT_STEPS_RATE,
    previewIcon: 'star_rate',
    previewColorClass: 'bg-slate-100',
    previewIconColorClass: 'text-slate-600',
    initialData: {
      templateDefinitionId: 'ap-invoice-next-steps-v1',
      mainMessage: 'Thank you for your payment.',
      nextStepsHeadline: "What's Next",
      nextStepsList: ['We will begin processing your order.', 'You will receive a shipping confirmation within 2 business days.'],
      requestFeedbackText: 'How was your experience?',
      showSubmittedCustomFields: false,
    },
    schema: InvoiceNextStepsRateAPSchema,
  };