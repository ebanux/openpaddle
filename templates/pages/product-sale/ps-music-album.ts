
import { Template, ProductPageLinkConfig, MonetizationUseCase } from '../../../types';
import { DEFAULT_PAGE_STYLE } from '../../../constants';

export const musicAlbumTemplate: Template<ProductPageLinkConfig> = {
  id: 'ps-music-album',
  name: 'Digital Music Album',
  useCase: MonetizationUseCase.PRODUCT_SALE,
  description: 'A page designed for musicians and bands to sell their latest album or single.',
  previewIcon: 'album',
  previewColorClass: 'bg-purple-100',
  previewIconColorClass: 'text-purple-600',
  initialData: {
    id: '', pageId: '', tenantId: '', status: 'draft',
    useCase: MonetizationUseCase.PRODUCT_SALE,
    pageSlug: 'new-album-release',
    pageStyle: { ...DEFAULT_PAGE_STYLE, theme: 'midnight_tech' },
    mode: 'payment',
    currency: 'USD',
    productId: 'shop-prod-album-1', // Link to mock product
    line_items: [], // Deprecated
    after_completion: { type: 'custom_page_session' },
    submit_type: 'pay',
    allow_promotion_codes: true,
    afterPaymentBehavior: 'showAfterPaymentPage',
    selectedAfterPaymentTemplateId: 'ap-dc-download-v1',
  } as ProductPageLinkConfig,
};