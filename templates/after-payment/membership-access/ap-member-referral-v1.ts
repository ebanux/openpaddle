import { AfterPaymentTemplate, AfterPaymentTemplateType, MembershipReferralAPData, MonetizationUseCase } from '../../../types';
import { MembershipReferralAPSchema } from '../../../schemas';

export const memberReferralAPTemplate: AfterPaymentTemplate<MembershipReferralAPData> = {
    id: 'ap-member-referral-v1',
    name: 'Member-Get-Member Referral',
    useCase: MonetizationUseCase.MEMBERSHIP_ACCESS,
    description: "Encourages members to refer friends for a mutual discount or reward.",
    templateType: AfterPaymentTemplateType.MEMBERSHIP_REFERRAL,
    previewIcon: 'group_add',
    previewColorClass: 'bg-indigo-100',
    previewIconColorClass: 'text-indigo-600',
    initialData: {
      templateDefinitionId: 'ap-member-referral-v1',
      mainMessage: "Love being a member? Share the love!",
      referralHeadline: "Refer a Friend, Get a Free Month",
      referralMessage: "Share your unique link below. When a friend signs up for a yearly plan, you'll get one month of your membership for free!",
      referralCode: "MEMBERUP",
      socialShareText: "I'm loving this community! Use my link to join.",
      showSubmittedCustomFields: false,
      showPassQRCode: true,
    },
    schema: MembershipReferralAPSchema,
};