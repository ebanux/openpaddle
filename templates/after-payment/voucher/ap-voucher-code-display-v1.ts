
import { AfterPaymentTemplate, AfterPaymentTemplateType, VoucherCodeDisplayAPData, MonetizationUseCase } from '../../../types';
import { VoucherCodeDisplayAPSchema } from '../../../schemas';

export const voucherCodeDisplayAPTemplate: AfterPaymentTemplate<VoucherCodeDisplayAPData> = {
    id: 'ap-voucher-code-display-v1',
    name: 'Voucher Code Display',
    useCase: MonetizationUseCase.VOUCHER,
    description: 'Displays the purchased voucher code to the customer.',
    templateType: AfterPaymentTemplateType.VOUCHER_CODE_DISPLAY,
    previewIcon: 'qr_code',
    previewColorClass: 'bg-green-100',
    previewIconColorClass: 'text-green-600',
    initialData: {
      templateDefinitionId: 'ap-voucher-code-display-v1',
      headline: 'Your Gift Card is Ready!',
      mainMessage: 'Thank you for your purchase! Your gift card code is below.',
      instructions: 'To redeem, enter this code at checkout on any of our pages. This code is valid for one year from the date of purchase.',
      showQRCodeForCode: true,
      showSubmittedCustomFields: true,
    },
    schema: VoucherCodeDisplayAPSchema,
};
