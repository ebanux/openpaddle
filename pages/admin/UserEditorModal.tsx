import React from 'react';
import Modal from '../../components/common/Modal';
import JsonSchemaForm from '../../components/forms/JsonSchemaForm';
import { JsonSchema, UserRole } from '../../types';
import { useTranslation } from '../../i18n/I18nContext';

interface UserEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInvite: (user: { email: string; role: UserRole }) => void;
  schema: JsonSchema;
}

const UserEditorModal: React.FC<UserEditorModalProps> = ({
  isOpen,
  onClose,
  onInvite,
  schema,
}) => {
  const { t } = useTranslation();

  const handleFormSubmit = (data: any) => {
    onInvite(data as { email: string; role: UserRole });
  };

  const modalTitle = t('adminPage.team.inviteUser');

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={modalTitle}>
      <JsonSchemaForm
        schema={schema}
        initialData={{ role: UserRole.Viewer }} // Default to viewer
        onSubmit={handleFormSubmit}
        onCancel={onClose}
        submitButtonTitle={modalTitle}
      />
    </Modal>
  );
};

export default UserEditorModal;
