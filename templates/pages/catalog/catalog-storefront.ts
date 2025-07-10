
import { Template, CatalogPageLinkConfig, MonetizationUseCase } from '../../../types';
import { DEFAULT_PAGE_STYLE } from '../../../constants';

export const catalogStorefrontTemplate: Template<CatalogPageLinkConfig> = {
  id: 'catalog-storefront',
  name: 'Storefront',
  useCase: MonetizationUseCase.CATALOG,
  description: 'A beautiful storefront to display your product collections.',
  previewIcon: 'storefront',
  previewColorClass: 'bg-indigo-100',
  previewIconColorClass: 'text-indigo-600',
  initialData: {
    id: '', pageId: '', tenantId: '', status: 'draft',
    useCase: MonetizationUseCase.CATALOG,
    pageSlug: 'store',
    pageStyle: { ...DEFAULT_PAGE_STYLE, theme: 'light' },
    mode: 'payment',
    currency: 'USD',
    line_items: [], // Catalog doesn't use line_items directly
    after_completion: { type: 'hosted_confirmation' },
    accessControl: { enabled: false, verificationType: 'disabled', showQRCode: false, showAccessLink: false },
    
    pageTitle: 'Our Store',
    pageDescription: 'Welcome! Browse our collections below.',
    collectionIds: ['col-apparel-1', 'col-accessories-1'],

  } as CatalogPageLinkConfig,
};
