
import { Template, TipsPageLinkConfig, MonetizationUseCase } from '../../../types';
import { DEFAULT_PAGE_STYLE } from '../../../constants';

export const musicianTipJarTemplate: Template<TipsPageLinkConfig> = {
    id: 'tip-jar-musician',
    name: "Musician's Tip Jar",
    useCase: MonetizationUseCase.TIPS,
    description: "Let your audience show their appreciation with a quick and easy digital tip jar.",
    previewIcon: 'music_note',
    previewColorClass: 'bg-pink-100',
    previewIconColorClass: 'text-pink-600',
    initialData: {
      id: '', pageId: '', tenantId: '', status: 'draft',
      useCase: MonetizationUseCase.TIPS,
      pageSlug: 'tip-the-band',
      pageStyle: { ...DEFAULT_PAGE_STYLE, theme: 'sunset_glow' },
      mode: 'payment',
      currency: 'USD',
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: { name: 'Tip for the awesome music!' },
          custom_unit_amount: { enabled: true, preset_amounts: [100, 200, 500, 1000] },
        },
      }],
      after_completion: { type: 'custom_page_session' },
      submit_type: 'donate',
      pageTitle: "Thanks for the Support!",
      page_description: "If you enjoyed the music, feel free to leave a tip. Every little bit helps us keep playing!",
      predefinedAmounts: [1, 2, 5, 10],
      whyTipText: 'Your tips help us cover travel costs, buy new gear, and continue making music for you to enjoy.',
      afterPaymentBehavior: 'showAfterPaymentPage',
      selectedAfterPaymentTemplateId: 'ap-tip-thank-you-v1',
    } as TipsPageLinkConfig,
  };
