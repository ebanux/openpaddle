
import { AfterPaymentTemplate, AfterPaymentTemplateType, ParkingExtendMapAPData, MonetizationUseCase } from '../../../types';
import { ParkingExtendMapAPSchema } from '../../../schemas';

export const parkingExtendMapAPTemplate: AfterPaymentTemplate<ParkingExtendMapAPData> = {
    id: 'ap-park-extend-map-v1',
    name: 'Extend Parking & Map',
    useCase: MonetizationUseCase.PARKING_SESSION,
    description: 'Allows users to extend their parking session and view a map of the location.',
    templateType: AfterPaymentTemplateType.PARKING_EXTEND_MAP,
    previewIcon: 'explore',
    previewColorClass: 'bg-blue-100',
    previewIconColorClass: 'text-blue-600',
    initialData: {
      templateDefinitionId: 'ap-park-extend-map-v1',
      mainMessage: 'Need more time or help finding your way?',
      extendButtonText: 'Extend Parking',
      locationHelpText: 'Find your car or nearby amenities on the map below.',
      showSubmittedCustomFields: true,
    },
    schema: ParkingExtendMapAPSchema,
  };
