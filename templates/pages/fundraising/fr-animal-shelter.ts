

import { Template, FundraisingPageLinkConfig, MonetizationUseCase } from '../../../types';
import { DEFAULT_PAGE_STYLE } from '../../../constants';

export const animalShelterTemplate: Template<FundraisingPageLinkConfig> = {
    id: 'fr-animal-shelter',
    name: 'Animal Shelter Drive',
    useCase: MonetizationUseCase.FUNDRAISING,
    description: 'A warm and friendly page to raise money for an animal shelter or rescue organization.',
    previewIcon: 'pets',
    previewColorClass: 'bg-orange-100',
    previewIconColorClass: 'text-orange-600',
    initialData: {
      id: '', pageId: '', tenantId: '', status: 'draft',
      useCase: MonetizationUseCase.FUNDRAISING,
      pageSlug: 'save-the-pets',
      pageStyle: { ...DEFAULT_PAGE_STYLE, theme: 'sunset_glow' },
      mode: 'payment',
      currency: 'USD',
      line_items: [{
        price_data: {
          currency: 'usd',
          unit_amount: 0,
          product_data: { name: 'Donation for Animal Welfare' },
          custom_unit_amount: { enabled: true, preset_amounts: [500, 1500, 3000, 6000] },
        },
      }],
      after_completion: { type: 'custom_page_session' },
      submit_type: 'donate',
      header_image_url: 'https://picsum.photos/seed/pets/800/400',
      accessControl: {
        enabled: false,
        verificationType: 'disabled',
        showQRCode: false,
        showAccessLink: false,
      },
      
      pageTitle: 'Give a Pet a Second Chance',
      pageDescription: 'Your donation provides food, shelter, and medical care for homeless animals. Help us find them loving forever homes.',
      predefinedAmounts: [5, 15, 30, 60],
      whyDonatePoints: ["Feed a dog or cat for a week", "Cover vaccination costs", "Support our spay/neuter program"],
      afterPaymentBehavior: 'showAfterPaymentPage',
      selectedAfterPaymentTemplateId: 'ap-fr-donor-wall-v1',
    } as FundraisingPageLinkConfig,
  };
