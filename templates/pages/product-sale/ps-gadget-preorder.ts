
import { Template, ProductPageLinkConfig, MonetizationUseCase } from '../../../types';
import { DEFAULT_PAGE_STYLE } from '../../../constants';

export const gadgetPreorderTemplate: Template<ProductPageLinkConfig> = {
  id: 'ps-gadget-preorder',
  name: 'Gadget Pre-Order',
  useCase: MonetizationUseCase.PRODUCT_SALE,
  description: 'Generate excitement and secure early sales for a new hardware product.',
  previewIcon: 'memory',
  previewColorClass: 'bg-slate-100',
  previewIconColorClass: 'text-slate-600',
  initialData: {
    id: '', pageId: '', tenantId: '', status: 'draft',
    useCase: MonetizationUseCase.PRODUCT_SALE,
    pageSlug: 'preorder-nova-smartwatch',
    pageStyle: { ...DEFAULT_PAGE_STYLE, theme: 'midnight_tech' },
    mode: 'payment',
    currency: 'USD',
    productId: 'shop-prod-gadget-1', // Link to mock product
    line_items: [], // Deprecated
    custom_fields: [
      {
        key: 'color_choice',
        type: 'dropdown',
        label: { type: 'custom', custom: 'Choose Your Color' },
        dropdown: {
          options: [
            { label: 'Midnight Black', value: 'black' },
            { label: 'Starlight Silver', value: 'silver' },
            { label: 'Ocean Blue', value: 'blue' },
          ]
        },
        optional: false,
      }
    ],
    after_completion: { type: 'custom_page_session' },
    submit_type: 'book',
    shipping_address_collection: { enabled: true, allowed_countries: [] },
    afterPaymentBehavior: 'showAfterPaymentPage',
    selectedAfterPaymentTemplateId: 'ap-prod-community-v1',
  } as ProductPageLinkConfig,
};