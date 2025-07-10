import { AfterPaymentTemplate, AfterPaymentTemplateType, DigitalContentAccessDownloadAPData, MonetizationUseCase } from '../../../types';
import { DigitalContentAccessDownloadAPSchema } from '../../../schemas';

export const invoiceFinalFilesAPTemplate: AfterPaymentTemplate<DigitalContentAccessDownloadAPData> = {
    id: 'ap-invoice-final-files-v1',
    name: 'Project Complete & Final Files',
    useCase: MonetizationUseCase.SIMPLE_INVOICE,
    description: "Confirms final payment and provides download links for project deliverables.",
    templateType: AfterPaymentTemplateType.DIGITAL_CONTENT_ACCESS_DOWNLOAD,
    previewIcon: 'folder_zip',
    previewColorClass: 'bg-slate-100',
    previewIconColorClass: 'text-slate-600',
    initialData: {
      templateDefinitionId: 'ap-invoice-final-files-v1',
      title: "Project Complete",
      mainMessage: "Thank you for the final payment. Your project files are now available for download.",
      downloadSectionTitle: "Project Deliverables",
      downloadItems: [ 
          { fileName: "logo-assets.zip", downloadLink: "#", fileType: "ZIP", fileSize: "15MB" },
          { fileName: "brand-style-guide.pdf", downloadLink: "#", fileType: "PDF", fileSize: "3MB" }
      ],
      postDownloadInstructions: "Please download and back up your files within 30 days. Let us know if you have any questions!",
      showSubmittedCustomFields: true,
    },
    schema: DigitalContentAccessDownloadAPSchema,
  };
