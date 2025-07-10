import { AfterPaymentTemplate, AfterPaymentTemplateType, InvoiceNextStepsRateAPData, MonetizationUseCase } from '../../../types';
import { InvoiceNextStepsRateAPSchema } from '../../../schemas';

export const invoiceTestimonialAPTemplate: AfterPaymentTemplate<InvoiceNextStepsRateAPData> = {
    id: 'ap-invoice-testimonial-v1',
    name: 'Request a Testimonial',
    useCase: MonetizationUseCase.SIMPLE_INVOICE,
    description: 'Thanks the client for their payment and asks them to leave a review or testimonial.',
    templateType: AfterPaymentTemplateType.INVOICE_NEXT_STEPS_RATE,
    previewIcon: 'rate_review',
    previewColorClass: 'bg-slate-100',
    previewIconColorClass: 'text-slate-600',
    initialData: {
      templateDefinitionId: 'ap-invoice-testimonial-v1',
      title: "Thank You for Your Business!",
      mainMessage: "Your invoice has been paid. We appreciate your partnership.",
      nextStepsHeadline: 'Share Your Experience',
      nextStepsList: [],
      requestFeedbackText: "If you were happy with our work, a testimonial would be greatly appreciated!",
      leaveReviewText: "You can leave a review on our public profile:",
      leaveReviewLink: "#",
      showSubmittedCustomFields: true,
    },
    schema: InvoiceNextStepsRateAPSchema,
  };
