import { AfterPaymentTemplate, AfterPaymentTemplateType, VoucherCorporateBrandedAPData, MonetizationUseCase } from '../../../types';
import { VoucherCorporateBrandedAPSchema } from '../../../schemas';

export const voucherCorporateBrandedAPTemplate: AfterPaymentTemplate<VoucherCorporateBrandedAPData> = {
    id: 'ap-voucher-corporate-branded-v1',
    name: 'Corporate Branded Voucher',
    useCase: MonetizationUseCase.VOUCHER,
    description: 'A formal voucher display suitable for corporate gifts.',
    templateType: AfterPaymentTemplateType.VOUCHER_CORPORATE_BRANDED,
    previewIcon: 'business',
    previewColorClass: 'bg-green-100',
    previewIconColorClass: 'text-green-600',
    initialData: {
      templateDefinitionId: 'ap-voucher-corporate-branded-v1',
      headline: 'Corporate Gift Voucher',
      mainMessage: 'Thank you for your business purchase.',
      companyNameLabel: 'Gift From:',
      issuedByLabel: 'Issued By:',
      showSubmittedCustomFields: true,
    },
    schema: VoucherCorporateBrandedAPSchema,
};
