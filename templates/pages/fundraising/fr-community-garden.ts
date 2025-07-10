import { Template, FundraisingPageLinkConfig, MonetizationUseCase } from '../../../types';
import { DEFAULT_PAGE_STYLE } from '../../../constants';

export const communityGardenTemplate: Template<FundraisingPageLinkConfig> = {
    id: 'fr-community-garden',
    name: 'Community Garden Fundraiser',
    useCase: MonetizationUseCase.FUNDRAISING,
    description: 'A clean, modern page to collect donations for a local community garden project.',
    previewIcon: 'spa',
    previewColorClass: 'bg-green-100',
    previewIconColorClass: 'text-green-600',
    initialData: {
      id: '', pageId: '', tenantId: '', status: 'draft',
      useCase: MonetizationUseCase.FUNDRAISING,
      pageSlug: 'community-garden',
      pageStyle: { ...DEFAULT_PAGE_STYLE, theme: 'forest_canopy' },
      mode: 'payment',
      currency: 'USD',
      line_items: [{
        price_data: {
          currency: 'usd',
          unit_amount: 0,
          product_data: { name: 'Donation for Community Garden' },
          custom_unit_amount: {
            enabled: true,
            preset_amounts: [1000, 2500, 5000, 10000], // $10, $25, $50, $100
          },
        },
      }],
      after_completion: { type: 'custom_page_session' },
      submit_type: 'donate',
      billing_address_collection: 'auto',
      phone_number_collection: { enabled: false },
      allow_promotion_codes: true,
      custom_fields: [
        {
          key: 'donor_name',
          label: {
            type: 'custom',
            custom: 'Your Name (for donor wall)',
          },
          type: 'text',
          optional: true,
        }
      ],
      accessControl: {
        enabled: false,
        verificationType: 'disabled',
        showQRCode: false,
        showAccessLink: false,
      },
      
      pageTitle: 'Help Our Community Garden Grow!',
      pageDescription: 'Every dollar helps us buy seeds, tools, and soil to make our neighborhood greener and more beautiful.',
      predefinedAmounts: [10, 25, 50, 100],
      whyDonatePoints: [
        "Support local biodiversity",
        "Provide fresh produce for the community",
        "Create a beautiful green space for everyone"
      ],
      targetAmount: 5000,
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      showDonorList: true,

      afterPaymentBehavior: 'showAfterPaymentPage',
      selectedAfterPaymentTemplateId: 'ap-fr-impact-report-v1',
    } as FundraisingPageLinkConfig,
  };
