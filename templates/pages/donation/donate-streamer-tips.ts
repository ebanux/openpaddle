
import { Template, DonationPageLinkConfig, MonetizationUseCase } from '../../../types';
import { DEFAULT_PAGE_STYLE } from '../../../constants';

export const streamerTipsTemplate: Template<DonationPageLinkConfig> = {
  id: 'donate-streamer-tips',
  name: 'Streamer Tip Jar',
  useCase: MonetizationUseCase.DONATION,
  description: 'A modern, dynamic page for streamers to collect tips during their live broadcasts.',
  previewIcon: 'live_tv',
  previewColorClass: 'bg-purple-100',
  previewIconColorClass: 'text-purple-600',
  initialData: {
    id: '', pageId: '', tenantId: '', status: 'draft',
    useCase: MonetizationUseCase.DONATION,
    pageSlug: 'tip-streamer',
    pageStyle: { ...DEFAULT_PAGE_STYLE, theme: 'midnight_tech' },
    mode: 'payment',
    currency: 'USD',
    line_items: [{
      price_data: {
        currency: 'usd', unit_amount: 0, product_data: { name: 'Tip for the Stream' },
        custom_unit_amount: { enabled: true, preset_amounts: [100, 500, 1000, 2500] },
      },
    }],
    after_completion: { type: 'custom_page_session' },
    submit_type: 'donate',
    header_image_url: 'https://picsum.photos/seed/streamer/800/200',
    pageTitle: 'Support the Stream!',
    pageDescription: 'Enjoying the content? Your tips help me upgrade my setup and stream more often. Thank you for your support!',
    predefinedAmounts: [1, 5, 10, 25],
    recipientName: 'The Streamer',
    afterPaymentBehavior: 'showAfterPaymentPage',
    selectedAfterPaymentTemplateId: 'ap-donate-personal-note-v1',
  } as DonationPageLinkConfig,
};
