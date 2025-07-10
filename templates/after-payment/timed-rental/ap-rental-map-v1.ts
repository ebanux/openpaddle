import { AfterPaymentTemplate, AfterPaymentTemplateType, RentalFindOnMapAPData, MonetizationUseCase } from '../../../types';
import { RentalFindOnMapAPSchema } from '../../../schemas';

export const rentalMapAPTemplate: AfterPaymentTemplate<RentalFindOnMapAPData> = {
    id: 'ap-rental-map-v1',
    name: 'Find Your Rental on a Map',
    useCase: MonetizationUseCase.TIMED_RENTAL,
    description: "Shows an embedded map with a pin marking the location of the reserved item.",
    templateType: AfterPaymentTemplateType.RENTAL_FIND_ON_MAP,
    previewIcon: 'pin_drop',
    previewColorClass: 'bg-orange-100',
    previewIconColorClass: 'text-orange-600',
    initialData: {
      templateDefinitionId: 'ap-rental-map-v1',
      mainMessage: "You're all set! Find your ride at the location below.",
      mapHeadline: "Your Scooter is Waiting Here:",
      mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019280721252!2d-122.4208883846816!3d37.78309997975813!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c6c8f4d5b%3A0x8f7c9e3e3b0e1e6!2sGolden%20Gate%20Bridge!5e0!3m2!1sen!2sus!4v1628189536815!5m2!1sen!2sus",
      showSubmittedCustomFields: false,
    },
    schema: RentalFindOnMapAPSchema,
};
