

import { Template, FundraisingPageLinkConfig, MonetizationUseCase } from '../../../types';
import { DEFAULT_PAGE_STYLE } from '../../../constants';

export const scholarshipFundTemplate: Template<FundraisingPageLinkConfig> = {
    id: 'fr-scholarship-fund',
    name: 'University Scholarship Fund',
    useCase: MonetizationUseCase.FUNDRAISING,
    description: 'Raise funds for student scholarships with a formal, trustworthy donation page.',
    previewIcon: 'school',
    previewColorClass: 'bg-indigo-100',
    previewIconColorClass: 'text-indigo-600',
    initialData: {
      id: '', pageId: '', tenantId: '', status: 'draft',
      useCase: MonetizationUseCase.FUNDRAISING,
      pageSlug: 'university-scholarship',
      pageStyle: { ...DEFAULT_PAGE_STYLE, theme: 'light' },
      mode: 'payment',
      currency: 'USD',
      line_items: [{
        price_data: {
          currency: 'usd',
          unit_amount: 0,
          product_data: { name: 'Donation to Scholarship Fund' },
          custom_unit_amount: {
            enabled: true,
            preset_amounts: [2500, 5000, 10000, 25000], // $25, $50, $100, $250
          },
        },
      }],
      after_completion: { type: 'custom_page_session' },
      submit_type: 'donate',
      billing_address_collection: 'required',
      accessControl: {
        enabled: false,
        verificationType: 'disabled',
        showQRCode: false,
        showAccessLink: false,
      },
      
      pageTitle: 'Support the Next Generation of Leaders',
      pageDescription: 'Your generous gift provides scholarships to deserving students, helping them achieve their academic dreams.',
      predefinedAmounts: [25, 50, 100, 250],
      whyDonatePoints: [
        "Empower talented students",
        "Invest in future innovation",
        "Receive a tax-deductible receipt"
      ],

      afterPaymentBehavior: 'showAfterPaymentPage',
      selectedAfterPaymentTemplateId: 'ap-fr-thank-you-share-v1',
    } as FundraisingPageLinkConfig,
  };
