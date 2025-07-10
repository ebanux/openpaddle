
import { Template, TipsPageLinkConfig, MonetizationUseCase } from '../../../types';
import { DEFAULT_PAGE_STYLE } from '../../../constants';

export const qrCodeTipJarTemplate: Template<TipsPageLinkConfig> = {
    id: 'tip-jar-qr-code',
    name: "Minimal QR Code Tip Jar",
    useCase: MonetizationUseCase.TIPS,
    description: "A super minimal page designed for use with a QR code on a countertop or sign.",
    previewIcon: 'qr_code_2',
    previewColorClass: 'bg-slate-100',
    previewIconColorClass: 'text-slate-600',
    initialData: {
      id: '', pageId: '', tenantId: '', status: 'draft',
      useCase: MonetizationUseCase.TIPS,
      pageSlug: 'scan-to-tip',
      pageStyle: { ...DEFAULT_PAGE_STYLE, theme: 'light' },
      mode: 'payment',
      currency: 'USD',
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: { name: 'Tip' },
          custom_unit_amount: { enabled: true, preset_amounts: [100, 300, 500] },
        },
      }],
      after_completion: { type: 'custom_page_session' },
      submit_type: 'donate',
      pageTitle: "Scan to Tip",
      page_description: "Thank you for your support!",
      predefinedAmounts: [1, 3, 5],
      afterPaymentBehavior: 'showAfterPaymentPage',
      selectedAfterPaymentTemplateId: 'ap-tip-thank-you-v1',
    } as TipsPageLinkConfig,
  };