
import { AfterPaymentTemplate, AfterPaymentTemplateType, InvoicePaidReceiptAPData, MonetizationUseCase } from '../../../types';
import { InvoicePaidReceiptAPSchema } from '../../../schemas';

export const invoicePaidReceiptAPTemplate: AfterPaymentTemplate<InvoicePaidReceiptAPData> = {
    id: 'ap-invoice-receipt-v1',
    name: 'Invoice Paid Receipt',
    useCase: MonetizationUseCase.SIMPLE_INVOICE,
    description: 'A simple receipt confirming an invoice has been paid.',
    templateType: AfterPaymentTemplateType.INVOICE_PAID_RECEIPT,
    previewIcon: 'receipt',
    previewColorClass: 'bg-slate-100',
    previewIconColorClass: 'text-slate-600',
    initialData: {
      templateDefinitionId: 'ap-invoice-receipt-v1',
      mainMessage: 'This invoice has been successfully paid.',
      receiptHeadline: 'Payment Complete',
      showInvoiceNumber: true,
      showPaymentDetails: true,
      showSubmittedCustomFields: true,
    },
    schema: InvoicePaidReceiptAPSchema,
  };
