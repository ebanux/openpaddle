
import { Template, TipsPageLinkConfig, MonetizationUseCase } from '../../../types';
import { DEFAULT_PAGE_STYLE } from '../../../constants';

export const eventStaffTipJarTemplate: Template<TipsPageLinkConfig> = {
    id: 'tip-jar-event-staff',
    name: "Event Staff Gratuity",
    useCase: MonetizationUseCase.TIPS,
    description: "A collective tip jar for the hard-working staff at your event, complete with a team photo.",
    previewIcon: 'groups',
    previewColorClass: 'bg-indigo-100',
    previewIconColorClass: 'text-indigo-600',
    initialData: {
      id: '', pageId: '', tenantId: '', status: 'draft',
      useCase: MonetizationUseCase.TIPS,
      pageSlug: 'thank-the-staff',
      pageStyle: { ...DEFAULT_PAGE_STYLE, theme: 'light' },
      mode: 'payment',
      currency: 'USD',
      header_image_url: 'https://picsum.photos/seed/team/800/400',
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: { name: 'Gratuity for Event Staff' },
          custom_unit_amount: { enabled: true, preset_amounts: [500, 1000, 2000, 5000] },
        },
      }],
      after_completion: { type: 'custom_page_session' },
      submit_type: 'donate',
      pageTitle: "Thank the Event Staff",
      page_description: "Our team worked hard to make this event special. If you'd like to leave a gratuity, it will be shared amongst all staff members. Thank you!",
      predefinedAmounts: [5, 10, 20, 50],
      afterPaymentBehavior: 'showAfterPaymentPage',
      selectedAfterPaymentTemplateId: 'ap-tip-support-more-v1',
    } as TipsPageLinkConfig,
  };