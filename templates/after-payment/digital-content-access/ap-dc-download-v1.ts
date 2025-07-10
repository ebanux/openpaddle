
import { AfterPaymentTemplate, AfterPaymentTemplateType, DigitalContentAccessDownloadAPData, MonetizationUseCase } from '../../../types';
import { DigitalContentAccessDownloadAPSchema } from '../../../schemas';

export const digitalContentDownloadAPTemplate: AfterPaymentTemplate<DigitalContentAccessDownloadAPData> = {
    id: 'ap-dc-download-v1',
    name: 'Digital Content Download',
    useCase: MonetizationUseCase.DIGITAL_CONTENT_ACCESS,
    description: 'Provides immediate access to download purchased digital files.',
    templateType: AfterPaymentTemplateType.DIGITAL_CONTENT_ACCESS_DOWNLOAD,
    previewIcon: 'download',
    previewColorClass: 'bg-blue-100',
    previewIconColorClass: 'text-blue-600',
    initialData: {
      templateDefinitionId: 'ap-dc-download-v1',
      mainMessage: 'Thank you for your purchase. Your files are ready for download below.',
      downloadSectionTitle: 'Your Downloads',
      downloadItems: [ { fileName: 'my-ebook.pdf', downloadLink: '#', fileType: 'PDF', fileSize: '2.5MB' } ],
      showSubmittedCustomFields: false,
    },
    schema: DigitalContentAccessDownloadAPSchema,
  };
