
import { Template, DigitalContentAccessPageLinkConfig, MonetizationUseCase } from '../../../types';
import { DEFAULT_PAGE_STYLE } from '../../../constants';

export const photoPackTemplate: Template<DigitalContentAccessPageLinkConfig> = {
    id: 'dca-photo-pack',
    name: 'Digital Photo Pack',
    useCase: MonetizationUseCase.DIGITAL_CONTENT_ACCESS,
    description: 'Sell access to a collection of high-resolution photos or other digital assets.',
    previewIcon: 'photo_library',
    previewColorClass: 'bg-cyan-100',
    previewIconColorClass: 'text-cyan-600',
    initialData: {
      id: '', pageId: '', tenantId: '', status: 'draft',
      useCase: MonetizationUseCase.DIGITAL_CONTENT_ACCESS,
      pageSlug: 'nature-photos',
      pageStyle: { ...DEFAULT_PAGE_STYLE, theme: 'forest_canopy' },
      mode: 'payment',
      currency: 'USD',
      line_items: [{
        price_data: {
          currency: 'usd',
          unit_amount: 1500, // $15.00
          product_data: { name: 'High-Resolution Nature Photo Pack' }
        }
      }],
      after_completion: { type: 'custom_page_session' },
      contentTitle: "Nature's Beauty: Photo Pack",
      contentDescription: 'Get instant access to 20 stunning, high-resolution nature photographs perfect for wallpapers, projects, or printing.',
      previewImageUrlOrVideoUrl: 'https://picsum.photos/seed/naturepack/800/600',
      fileTypeOrFormat: 'ZIP (contains 20 JPG files)',
      accessInstructions: 'Your download link will be available immediately after payment.',
      creatorName: 'Photography by Jane',
      afterPaymentBehavior: 'showAfterPaymentPage',
      selectedAfterPaymentTemplateId: 'ap-dc-download-v1',
    } as DigitalContentAccessPageLinkConfig,
  };
