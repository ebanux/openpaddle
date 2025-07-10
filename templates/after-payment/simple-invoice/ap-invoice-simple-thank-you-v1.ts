import { AfterPaymentTemplate, AfterPaymentTemplateType, InvoiceSimpleThankYouAPData, MonetizationUseCase } from '../../../types';
import { InvoiceSimpleThankYouAPSchema } from '../../../schemas';

export const invoiceSimpleThankYouAPTemplate: AfterPaymentTemplate<InvoiceSimpleThankYouAPData> = {
    id: 'ap-invoice-simple-thank-you-v1',
    name: 'Personal Thank You Note',
    useCase: MonetizationUseCase.SIMPLE_INVOICE,
    description: 'A minimal, personal thank you message after an invoice is paid.',
    templateType: AfterPaymentTemplateType.INVOICE_SIMPLE_THANK_YOU,
    previewIcon: 'waving_hand',
    previewColorClass: 'bg-slate-100',
    previewIconColorClass: 'text-slate-600',
    initialData: {
      templateDefinitionId: 'ap-invoice-simple-thank-you-v1',
      title: "Thank You!",
      mainMessage: "Your payment has been received.",
      personalNote: "It was a pleasure working with you on this project. Please don't hesitate to reach out for any future needs!",
      showSubmittedCustomFields: false,
    },
    schema: InvoiceSimpleThankYouAPSchema,
  };
