

import { Template, FundraisingPageLinkConfig, MonetizationUseCase } from '../../../types';
import { DEFAULT_PAGE_STYLE } from '../../../constants';

export const techCrowdfundTemplate: Template<FundraisingPageLinkConfig> = {
    id: 'fr-tech-crowdfund',
    name: 'Tech Hub Crowdfund',
    useCase: MonetizationUseCase.FUNDRAISING,
    description: 'A modern, sleek page for crowdfunding a new tech project, startup, or open-source tool.',
    previewIcon: 'code',
    previewColorClass: 'bg-sky-100',
    previewIconColorClass: 'text-sky-600',
    initialData: {
      id: '', pageId: '', tenantId: '', status: 'draft',
      useCase: MonetizationUseCase.FUNDRAISING,
      pageSlug: 'support-tech-hub',
      pageStyle: { ...DEFAULT_PAGE_STYLE, theme: 'midnight_tech' },
      mode: 'payment',
      currency: 'USD',
      line_items: [{
        price_data: {
          currency: 'usd',
          unit_amount: 0,
          product_data: { name: 'Contribution to Tech Hub' },
          custom_unit_amount: { enabled: true, preset_amounts: [1000, 5000, 10000, 50000] },
        },
      }],
      after_completion: { type: 'custom_page_session' },
      submit_type: 'donate',
      accessControl: {
        enabled: false,
        verificationType: 'disabled',
        showQRCode: false,
        showAccessLink: false,
      },
      
      pageTitle: 'Build the Future: Support Our Tech Hub',
      pageDescription: 'We are crowdfunding to launch an open-source library that will benefit developers everywhere. Your support accelerates innovation.',
      predefinedAmounts: [10, 50, 100, 500],
      whyDonatePoints: ["Fund a feature development sprint", "Help cover server and infrastructure costs", "Get early access and a credit in our README"],
      afterPaymentBehavior: 'showAfterPaymentPage',
      selectedAfterPaymentTemplateId: 'ap-fr-impact-report-v1',
    } as FundraisingPageLinkConfig,
  };
