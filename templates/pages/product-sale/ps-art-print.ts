
import { Template, ProductPageLinkConfig, MonetizationUseCase } from '../../../types';
import { DEFAULT_PAGE_STYLE } from '../../../constants';

export const artPrintTemplate: Template<ProductPageLinkConfig> = {
  id: 'ps-art-print',
  name: 'Limited Edition Art Print',
  useCase: MonetizationUseCase.PRODUCT_SALE,
  description: 'A page focused on selling high-value, limited-run physical art prints.',
  previewIcon: 'palette',
  previewColorClass: 'bg-rose-100',
  previewIconColorClass: 'text-rose-600',
  initialData: {
    id: '', pageId: '', tenantId: '', status: 'draft',
    useCase: MonetizationUseCase.PRODUCT_SALE,
    pageSlug: 'art-print-genesis',
    pageStyle: { ...DEFAULT_PAGE_STYLE, theme: 'vintage_paper' },
    mode: 'payment',
    currency: 'USD',
    productId: 'shop-prod-artprint-1', // Link to mock product
    line_items: [], // Deprecated
    payment_limits: { enabled: true, max_payments: 50 },
    after_completion: { type: 'custom_page_session' },
    submit_type: 'pay',
    shipping_address_collection: { enabled: true, allowed_countries: ['US', 'CA', 'GB', 'AU'] },
    afterPaymentBehavior: 'showAfterPaymentPage',
    selectedAfterPaymentTemplateId: 'ap-prod-tracking-v1',
  } as ProductPageLinkConfig,
};