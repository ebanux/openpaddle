
import { AfterPaymentTemplate, AfterPaymentTemplateType, FundraisingUpdatesSignupAPData, MonetizationUseCase } from '../../../types';
import { FundraisingUpdatesSignupAPSchema } from '../../../schemas';

export const fundraisingUpdatesSignupAPTemplate: AfterPaymentTemplate<FundraisingUpdatesSignupAPData> = {
    id: 'ap-fr-updates-signup-v1',
    name: 'Updates Signup',
    useCase: MonetizationUseCase.FUNDRAISING,
    description: "Encourage donors to sign up for email updates on the campaign's progress.",
    templateType: AfterPaymentTemplateType.FUNDRAISING_UPDATES_SIGNUP,
    previewIcon: 'mail',
    previewColorClass: 'bg-green-100',
    previewIconColorClass: 'text-green-600',
    initialData: {
      templateDefinitionId: 'ap-fr-updates-signup-v1',
      mainMessage: 'Thank you for your donation!',
      signupHeadline: 'Stay Updated on Our Progress',
      signupBlurb: 'Sign up with your email to receive occasional updates about our campaign.',
      showEmailSignupForm: true,
      formButtonText: 'Subscribe',
      showSubmittedCustomFields: false,
    },
    schema: FundraisingUpdatesSignupAPSchema,
  };
