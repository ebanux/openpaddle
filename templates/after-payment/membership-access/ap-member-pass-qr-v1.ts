
import { AfterPaymentTemplate, AfterPaymentTemplateType, MembershipPassQRAPData, MonetizationUseCase } from '../../../types';
import { MembershipPassQRAPSchema } from '../../../schemas';

export const membershipPassQRAPTemplate: AfterPaymentTemplate<MembershipPassQRAPData> = {
    id: 'ap-member-pass-qr-v1',
    name: 'Membership Pass with QR Code',
    useCase: MonetizationUseCase.MEMBERSHIP_ACCESS,
    description: 'Displays a digital membership pass with member details and a QR code for check-in.',
    templateType: AfterPaymentTemplateType.MEMBERSHIP_PASS_QR,
    previewIcon: 'qr_code_2',
    previewColorClass: 'bg-indigo-100',
    previewIconColorClass: 'text-indigo-600',
    initialData: {
      templateDefinitionId: 'ap-member-pass-qr-v1',
      title: "Your Membership Pass",
      mainMessage: "Welcome to the club! Present this pass for access.",
      qrCodeInfoText: "Scan for Entry",
      showMembershipDetails: true,
      additionalInstructions: "This pass is non-transferable.",
      showSubmittedCustomFields: true,
    },
    schema: MembershipPassQRAPSchema,
  };
