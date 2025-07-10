
import { Template, ProductPageLinkConfig, MonetizationUseCase } from '../../../types';
import { DEFAULT_PAGE_STYLE } from '../../../constants';

export const onlineCourseTemplate: Template<ProductPageLinkConfig> = {
  id: 'ps-online-course',
  name: 'Online Course Access',
  useCase: MonetizationUseCase.PRODUCT_SALE,
  description: 'A professional page to sell one-time access to an online course, workshop, or video series.',
  previewIcon: 'school',
  previewColorClass: 'bg-teal-100',
  previewIconColorClass: 'text-teal-600',
  initialData: {
    id: '', pageId: '', tenantId: '', status: 'draft',
    useCase: MonetizationUseCase.PRODUCT_SALE,
    pageSlug: 'mastering-javascript-course',
    pageStyle: { ...DEFAULT_PAGE_STYLE, theme: 'ocean_breeze' },
    mode: 'payment',
    currency: 'USD',
    productId: 'shop-prod-course-1', // Link to mock product
    line_items: [], // Deprecated
    after_completion: { type: 'custom_page_session' },
    submit_type: 'book',
    billing_address_collection: 'required',
    afterPaymentBehavior: 'showAfterPaymentPage',
    selectedAfterPaymentTemplateId: 'ap-dc-download-v1', // Can be used to provide a welcome packet
  } as ProductPageLinkConfig,
};