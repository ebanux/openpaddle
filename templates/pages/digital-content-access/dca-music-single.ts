import { Template, DigitalContentAccessPageLinkConfig, MonetizationUseCase } from '../../../types';
import { DEFAULT_PAGE_STYLE } from '../../../constants';

export const musicSingleTemplate: Template<DigitalContentAccessPageLinkConfig> = {
  id: 'dca-music-single',
  name: 'Music Single/Album Release',
  useCase: MonetizationUseCase.DIGITAL_CONTENT_ACCESS,
  description: 'A stylish page for an artist to sell a new music release, featuring album art.',
  previewIcon: 'music_note',
  previewColorClass: 'bg-purple-100',
  previewIconColorClass: 'text-purple-600',
  initialData: {
    id: '', pageId: '', tenantId: '', status: 'draft',
    useCase: MonetizationUseCase.DIGITAL_CONTENT_ACCESS,
    pageSlug: 'new-horizons-single',
    pageStyle: { ...DEFAULT_PAGE_STYLE, theme: 'midnight_tech' },
    mode: 'payment',
    currency: 'USD',
    line_items: [{
      price_data: {
        currency: 'usd',
        unit_amount: 129, // $1.29
        product_data: { name: 'Single: New Horizons' }
      }
    }],
    after_completion: { type: 'custom_page_session' },
    contentTitle: "New Single: New Horizons",
    contentDescription: "The latest track from an up-and-coming artist. Includes high-quality MP3 and WAV files.",
    previewImageUrlOrVideoUrl: 'https://picsum.photos/seed/newsingle/600/600',
    fileTypeOrFormat: 'MP3, WAV',
    creatorName: 'Echo Collective',
    afterPaymentBehavior: 'showAfterPaymentPage',
    selectedAfterPaymentTemplateId: 'ap-dc-download-v1',
  } as DigitalContentAccessPageLinkConfig,
};
