
import { AfterPaymentTemplate, AfterPaymentTemplateType, ParkingActiveInfoAPData, MonetizationUseCase } from '../../../types';
import { ParkingActiveInfoAPSchema } from '../../../schemas';

export const parkingActiveInfoAPTemplate: AfterPaymentTemplate<ParkingActiveInfoAPData> = {
    id: 'ap-park-active-info-v1',
    name: 'Active Parking Session Info',
    useCase: MonetizationUseCase.PARKING_SESSION,
    description: 'Displays active parking session details, including end time.',
    templateType: AfterPaymentTemplateType.PARKING_ACTIVE_INFO,
    previewIcon: 'local_parking',
    previewColorClass: 'bg-blue-100',
    previewIconColorClass: 'text-blue-600',
    initialData: {
      templateDefinitionId: 'ap-park-active-info-v1',
      mainMessage: 'Your parking session is active.',
      showEndTime: true,
      showLocationName: true,
      showZoneId: true,
      showSubmittedCustomFields: true,
    },
    schema: ParkingActiveInfoAPSchema,
  };
