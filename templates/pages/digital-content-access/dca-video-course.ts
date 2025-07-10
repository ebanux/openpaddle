import { Template, DigitalContentAccessPageLinkConfig, MonetizationUseCase } from '../../../types';
import { DEFAULT_PAGE_STYLE } from '../../../constants';

export const videoCourseTemplate: Template<DigitalContentAccessPageLinkConfig> = {
  id: 'dca-video-course',
  name: 'Video Course Sales Page',
  useCase: MonetizationUseCase.DIGITAL_CONTENT_ACCESS,
  description: 'A professional landing page for selling a comprehensive video course.',
  previewIcon: 'ondemand_video',
  previewColorClass: 'bg-red-100',
  previewIconColorClass: 'text-red-600',
  initialData: {
    id: '', pageId: '', tenantId: '', status: 'draft',
    useCase: MonetizationUseCase.DIGITAL_CONTENT_ACCESS,
    pageSlug: 'pro-developer-course',
    pageStyle: { ...DEFAULT_PAGE_STYLE, theme: 'ocean_breeze' },
    mode: 'payment',
    currency: 'USD',
    line_items: [{
      price_data: {
        currency: 'usd',
        unit_amount: 29900, // $299.00
        product_data: { name: 'The Complete Web Developer Course 2024' }
      }
    }],
    after_completion: { type: 'custom_page_session' },
    submit_type: 'book',
    contentTitle: "The Complete Web Developer Course 2024",
    contentDescription: "Go from zero to full-stack hero with our comprehensive video course. Includes 50+ hours of video, project files, and access to our student community.",
    previewImageUrlOrVideoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Placeholder trailer
    accessInstructions: 'You will receive an email with instructions on how to access the course portal.',
    creatorName: 'Dev Academy',
    afterPaymentBehavior: 'showAfterPaymentPage',
    selectedAfterPaymentTemplateId: 'ap-dc-community-feedback-v1',
  } as DigitalContentAccessPageLinkConfig,
};
