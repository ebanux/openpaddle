
import { Template, ProductPageLinkConfig, MonetizationUseCase } from '../../../types';
import { DEFAULT_PAGE_STYLE } from '../../../constants';

export const ebookTemplate: Template<ProductPageLinkConfig> = {
    id: 'ps-ebook',
    name: 'Sell an Ebook',
    useCase: MonetizationUseCase.PRODUCT_SALE,
    description: 'A simple, effective page to sell a digital product like an ebook or guide.',
    previewIcon: 'menu_book',
    previewColorClass: 'bg-blue-100',
    previewIconColorClass: 'text-blue-600',
    initialData: {
      id: '', pageId: '', tenantId: '', status: 'draft',
      useCase: MonetizationUseCase.PRODUCT_SALE,
      pageSlug: 'my-ebook',
      pageStyle: { ...DEFAULT_PAGE_STYLE, theme: 'vintage_paper' },
      mode: 'payment',
      currency: 'USD',
      productId: 'shop-prod-ebook-1', // Link to mock product
      line_items: [], // Deprecated
      after_completion: { type: 'custom_page_session' },
      submit_type: 'pay',
      billing_address_collection: 'required',
      shipping_address_collection: { enabled: false },
      allow_promotion_codes: true,
      
      additionalDetails: ["Instant PDF download", "Over 200 pages of content", "Includes source code for examples"],

      afterPaymentBehavior: 'showAfterPaymentPage',
      selectedAfterPaymentTemplateId: 'ap-dc-download-v1',
    } as ProductPageLinkConfig,
  };