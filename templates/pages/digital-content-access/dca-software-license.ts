import { Template, DigitalContentAccessPageLinkConfig, MonetizationUseCase } from '../../../types';
import { DEFAULT_PAGE_STYLE } from '../../../constants';

export const softwareLicenseTemplate: Template<DigitalContentAccessPageLinkConfig> = {
  id: 'dca-software-license',
  name: 'Software License Key',
  useCase: MonetizationUseCase.DIGITAL_CONTENT_ACCESS,
  description: 'A clean page for selling a license key to unlock software or digital tools.',
  previewIcon: 'vpn_key',
  previewColorClass: 'bg-slate-100',
  previewIconColorClass: 'text-slate-600',
  initialData: {
    id: '', pageId: '', tenantId: '', status: 'draft',
    useCase: MonetizationUseCase.DIGITAL_CONTENT_ACCESS,
    pageSlug: 'pro-editor-license',
    pageStyle: { ...DEFAULT_PAGE_STYLE, theme: 'light' },
    mode: 'payment',
    currency: 'USD',
    line_items: [{
      price_data: {
        currency: 'usd',
        unit_amount: 4900, // $49.00
        product_data: { name: 'Pro Editor - Lifetime License' }
      }
    }],
    after_completion: { type: 'custom_page_session' },
    contentTitle: "Pro Editor - Lifetime License",
    contentDescription: "Unlock all professional features of Pro Editor with a lifetime license key. Your key will be displayed immediately after purchase.",
    previewImageUrlOrVideoUrl: 'https://picsum.photos/seed/softwarelogo/600/400',
    fileTypeOrFormat: 'License Key (Digital)',
    accessInstructions: 'The download link for the software is on our main website.',
    creatorName: 'CodeCraft Inc.',
    afterPaymentBehavior: 'showAfterPaymentPage',
    selectedAfterPaymentTemplateId: 'ap-dc-license-key-v1',
  } as DigitalContentAccessPageLinkConfig,
};
