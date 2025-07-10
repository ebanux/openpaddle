import { AfterPaymentTemplate, AfterPaymentTemplateType, InvoiceUpsellServicesAPData, MonetizationUseCase } from '../../../types';
import { InvoiceUpsellServicesAPSchema } from '../../../schemas';

export const invoiceUpsellAPTemplate: AfterPaymentTemplate<InvoiceUpsellServicesAPData> = {
    id: 'ap-invoice-upsell-v1',
    name: 'Upsell Other Services',
    useCase: MonetizationUseCase.SIMPLE_INVOICE,
    description: "After payment, this page suggests other relevant services the client might be interested in.",
    templateType: AfterPaymentTemplateType.INVOICE_UPSELL_SERVICES,
    previewIcon: 'add_shopping_cart',
    previewColorClass: 'bg-slate-100',
    previewIconColorClass: 'text-slate-600',
    initialData: {
      templateDefinitionId: 'ap-invoice-upsell-v1',
      title: "Payment Received!",
      mainMessage: "Thank you for your payment. We hope you were satisfied with our work.",
      upsellSectionTitle: "Need Help With Anything Else?",
      upsellItems: [
          { name: "Monthly Maintenance Retainer", description: "Keep your website secure and up-to-date.", price: "$250/mo", link: "#" },
          { name: "SEO & Content Strategy", description: "Drive more traffic to your new site.", price: "Starts at $500", link: "#" }
      ],
      showSubmittedCustomFields: false,
    },
    schema: InvoiceUpsellServicesAPSchema,
  };
