
import { Template, TipsPageLinkConfig, MonetizationUseCase } from '../../../types';
import { DEFAULT_PAGE_STYLE } from '../../../constants';

export const serviceWorkerTipJarTemplate: Template<TipsPageLinkConfig> = {
    id: 'tip-jar-service-worker',
    name: "Service Worker Tip Jar",
    useCase: MonetizationUseCase.TIPS,
    description: "A simple, appreciative page for baristas, stylists, or any service professional to receive tips.",
    previewIcon: 'coffee',
    previewColorClass: 'bg-amber-100',
    previewIconColorClass: 'text-amber-700',
    initialData: {
      id: '', pageId: '', tenantId: '', status: 'draft',
      useCase: MonetizationUseCase.TIPS,
      pageSlug: 'thanks-for-the-service',
      pageStyle: { ...DEFAULT_PAGE_STYLE, theme: 'ocean_breeze' },
      mode: 'payment',
      currency: 'USD',
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: { name: 'Tip' },
          custom_unit_amount: { enabled: true, preset_amounts: [100, 200, 500] },
        },
      }],
      after_completion: { type: 'custom_page_session' },
      submit_type: 'donate',
      pageTitle: "Leave a Tip",
      page_description: "If you were happy with the service today, a tip is always appreciated! Thank you for your support.",
      predefinedAmounts: [1, 2, 5],
      afterPaymentBehavior: 'showAfterPaymentPage',
      selectedAfterPaymentTemplateId: 'ap-tip-thank-you-v1',
    } as TipsPageLinkConfig,
  };