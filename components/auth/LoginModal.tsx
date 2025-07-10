
import React, { useState } from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import { SIMULATED_USERS } from '../../constants';
import { useTranslation } from '../../i18n/I18nContext';

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
    onLogin: (selectedUser: string) => void;
    title: string;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLogin, title }) => {
    const [selectedUser, setSelectedUser] = useState<string>(SIMULATED_USERS[0].name);
    const { t } = useTranslation();

    const handleInternalLogin = () => {
        onLogin(selectedUser);
        onClose(); // Close modal on successful login
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={title}>
            <div className="space-y-4">
                <p className="text-sm text-slate-600">
                    {t('loginModal.prompt')}
                </p>
                <div>
                    <label htmlFor="user-select" className="block text-sm font-medium text-slate-700 mb-1">
                        {t('loginModal.selectUser')}
                    </label>
                    <select
                        id="user-select"
                        value={selectedUser}
                        onChange={(e) => setSelectedUser(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                        {SIMULATED_USERS.map(userObj => (
                            <option key={userObj.name} value={userObj.name}>{userObj.name} {userObj.subdomain ? `(${userObj.subdomain})` : ''}</option>
                        ))}
                    </select>
                </div>
                <div className="flex justify-end space-x-3 pt-2">
                    <Button variant="secondary" onClick={onClose}>{t('common.cancel')}</Button>
                    <Button variant="primary" onClick={handleInternalLogin}>{t('header.login')} & Continue</Button>
                </div>
            </div>
        </Modal>
    );
};

export default LoginModal;
