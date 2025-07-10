
import { AfterPaymentTemplate, AfterPaymentTemplateType, FundraisingDonorWallAPData, MonetizationUseCase } from '../../../types';
import { FundraisingDonorWallAPSchema } from '../../../schemas';

export const fundraisingDonorWallAPTemplate: AfterPaymentTemplate<FundraisingDonorWallAPData> = {
    id: 'ap-fr-donor-wall-v1',
    name: 'Donor Wall',
    useCase: MonetizationUseCase.FUNDRAISING,
    description: "Recognize supporters by showing their names on a virtual donor wall.",
    templateType: AfterPaymentTemplateType.FUNDRAISING_DONOR_WALL,
    previewIcon: 'groups',
    previewColorClass: 'bg-green-100',
    previewIconColorClass: 'text-green-600',
    initialData: {
      templateDefinitionId: 'ap-fr-donor-wall-v1',
      mainMessage: 'You are a vital part of our community.',
      donorWallHeadline: 'A Huge Thank You to Our Supporters',
      anonymizeDonors: false,
      donorWallMessage: 'Every donation, big or small, makes a huge difference.',
      displayLevels: true,
      showSubmittedCustomFields: false,
    },
    schema: FundraisingDonorWallAPSchema,
  };
