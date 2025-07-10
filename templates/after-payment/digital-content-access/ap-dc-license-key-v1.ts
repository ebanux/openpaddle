import { AfterPaymentTemplate, AfterPaymentTemplateType, DigitalContentLicenseKeyAPData, MonetizationUseCase } from '../../../types';
import { DigitalContentLicenseKeyAPSchema } from '../../../schemas';

export const digitalContentLicenseKeyAPTemplate: AfterPaymentTemplate<DigitalContentLicenseKeyAPData> = {
    id: 'ap-dc-license-key-v1',
    name: 'Display License Key',
    useCase: MonetizationUseCase.DIGITAL_CONTENT_ACCESS,
    description: 'Shows the purchased software license key and provides activation instructions.',
    templateType: AfterPaymentTemplateType.DIGITAL_CONTENT_LICENSE_KEY,
    previewIcon: 'vpn_key',
    previewColorClass: 'bg-blue-100',
    previewIconColorClass: 'text-blue-600',
    initialData: {
      templateDefinitionId: 'ap-dc-license-key-v1',
      title: "Your Software License",
      mainMessage: "Thank you for purchasing! Your license key is below.",
      licenseKeyHeadline: "Your License Key",
      licenseKey: "XXXXX-XXXXX-XXXXX-XXXXX-XXXXX",
      activationInstructions: "1. Download the software from our website.\n2. Install and open the application.\n3. When prompted, enter the license key above to activate.",
      showSubmittedCustomFields: true,
    },
    schema: DigitalContentLicenseKeyAPSchema,
};
