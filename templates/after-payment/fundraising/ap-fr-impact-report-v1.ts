
import { AfterPaymentTemplate, AfterPaymentTemplateType, FundraisingImpactReportAPData, MonetizationUseCase } from '../../../types';
import { FundraisingImpactReportAPSchema } from '../../../schemas';

export const fundraisingImpactReportAPTemplate: AfterPaymentTemplate<FundraisingImpactReportAPData> = {
    id: 'ap-fr-impact-report-v1',
    name: 'Impact Report',
    useCase: MonetizationUseCase.FUNDRAISING,
    description: "Show donors the impact of their contribution with stats and a progress bar.",
    templateType: AfterPaymentTemplateType.FUNDRAISING_IMPACT_REPORT,
    previewIcon: 'insights',
    previewColorClass: 'bg-green-100',
    previewIconColorClass: 'text-green-600',
    initialData: {
      templateDefinitionId: 'ap-fr-impact-report-v1',
      mainMessage: 'Thank you for contributing to our mission.',
      reportHeadline: "See The Impact You've Made",
      impactStats: [{value: '100+', label: 'Trees Planted'}, {value: '$5K+', label: 'Raised So Far'}],
      nextGoalMessage: 'Help us reach our next goal of $10,000!',
      progressPercentage: 50,
      showSubmittedCustomFields: true,
    },
    schema: FundraisingImpactReportAPSchema,
  };
