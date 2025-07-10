import { Template, ProductPageLinkConfig, MonetizationUseCase } from '../../../types';
import { DEFAULT_PAGE_STYLE } from '../../../constants';

export const tshirtTemplate: Template<ProductPageLinkConfig> = {
    id: 'ps-tshirt',
    name: 'Merchandise T-Shirt',
    useCase: MonetizationUseCase.PRODUCT_SALE,
    description: 'A stylish page to sell branded apparel, like a t-shirt with different sizes and colors.',
    previewIcon: 'checkroom',
    previewColorClass: 'bg-gray-100',
    previewIconColorClass: 'text-gray-600',
    initialData: {
      id: '', pageId: '', tenantId: '', status: 'draft',
      useCase: MonetizationUseCase.PRODUCT_SALE,
      pageSlug: 'cool-tshirt',
      pageStyle: { ...DEFAULT_PAGE_STYLE, theme: 'midnight_tech' },
      mode: 'payment',
      currency: 'USD',
      productId: 'shop-prod-tshirt-1', // NEW: Reference the ShopProduct
      line_items: [], // Deprecated for this use case, but schema expects it.
      after_completion: { type: 'custom_page_session' },
      submit_type: 'pay',
      billing_address_collection: 'required',
      shipping_address_collection: { enabled: true, allowed_countries: ['US', 'CA', 'GB', 'DE'] },
      allow_promotion_codes: true,
      
      additionalDetails: ["100% Combed Cotton", "Ships in 3-5 business days"],

      afterPaymentBehavior: 'showAfterPaymentPage',
      selectedAfterPaymentTemplateId: 'ap-prod-tracking-v1',
    } as ProductPageLinkConfig,
  };
