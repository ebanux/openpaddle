import React from 'react';
import Modal from '../../components/common/Modal';
import JsonSchemaForm from '../../components/forms/JsonSchemaForm';
import { JsonSchema, Variant } from '../../types';
import { useTranslation } from '../../i18n/I18nContext';

interface VariantEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Variant) => void;
  schema: JsonSchema;
  initialData?: Variant | null;
}

const VariantEditorModal: React.FC<VariantEditorModalProps> = ({
  isOpen,
  onClose,
  onSave,
  schema,
  initialData,
}) => {
  const { t } = useTranslation();

  if (!isOpen) {
    return null;
  }

  const handleFormSubmit = (data: any) => {
    onSave(data as Variant);
  };

  const modalTitle = initialData?.id ? t('entityEditor.variant.editTitle') : t('entityEditor.variant.addTitle');

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={modalTitle}>
      <JsonSchemaForm
        schema={schema}
        initialData={initialData || {}}
        onSubmit={handleFormSubmit}
        onCancel={onClose}
        submitButtonTitle={initialData?.id ? t('entityEditor.saveChanges') : t('common.create')}
      />
    </Modal>
  );
};

export default VariantEditorModal;
