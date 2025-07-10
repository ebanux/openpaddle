import { AfterPaymentTemplate, AfterPaymentTemplateType, EventHypePageAPData, MonetizationUseCase } from '../../../types';
import { EventHypePageAPSchema } from '../../../schemas';

export const eventHypePageAPTemplate: AfterPaymentTemplate<EventHypePageAPData> = {
    id: 'ap-event-hype-v1',
    name: 'Event Hype Page',
    useCase: MonetizationUseCase.EVENT_TICKET_SALES,
    description: "Builds excitement with a countdown timer, venue map, and an event playlist.",
    templateType: AfterPaymentTemplateType.EVENT_HYPE_PAGE,
    previewIcon: 'campaign',
    previewColorClass: 'bg-purple-100',
    previewIconColorClass: 'text-purple-600',
    initialData: {
      templateDefinitionId: 'ap-event-hype-v1',
      mainMessage: "You're on the list! Get ready for an amazing experience.",
      hypeHeadline: "The Countdown Has Begun!",
      showCountdown: true,
      mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019280721252!2d-122.4208883846816!3d37.78309997975813!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c6c8f4d5b%3A0x8f7c9e3e3b0e1e6!2sGolden%20Gate%20Bridge!5e0!3m2!1sen!2sus!4v1628189536815!5m2!1sen!2sus',
      playlistEmbedUrl: 'https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M',
      showSubmittedCustomFields: false,
    },
    schema: EventHypePageAPSchema,
};
