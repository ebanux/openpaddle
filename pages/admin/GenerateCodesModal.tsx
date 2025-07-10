
import React, { useState, useEffect } from 'react';
import { AdminMonetizationPage } from '../../types';
import Modal from '../../components/common/Modal';
import Button from '../../components/common/Button';
import { useTranslation } from '../../i18n/I18nContext';

interface GenerateCodesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerate: (pageId: string, quantity: number) => void;
  pages: AdminMonetizationPage[];
  initialPageId?: string | null;
}

const GenerateCodesModal: React.FC<GenerateCodesModalProps> = ({
  isOpen,
  onClose,
  onGenerate,
  pages,
  initialPageId,
}) => {
  const { t } = useTranslation();
  const [selectedPageId, setSelectedPageId] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(10);

  useEffect(() => {
    if (initialPageId) {
      setSelectedPageId(initialPageId);
    } else if (pages.length > 0) {
      setSelectedPageId(pages[0].id);
    }
  }, [initialPageId, pages]);

  const handleGenerateClick = () => {
    if (selectedPageId && quantity > 0) {
      onGenerate(selectedPageId, quantity);
    } else {
      alert("Please select a page and enter a valid quantity.");
    }
  };
  
  const inputClasses = "mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm";


  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('generateCodesModal.title')}>
      <div className="space-y-4">
        <div>
          <label htmlFor="page-select" className="block text-sm font-medium text-slate-700">
            {t('generateCodesModal.pageLabel')}
          </label>
          <select
            id="page-select"
            value={selectedPageId}
            onChange={(e) => setSelectedPageId(e.target.value)}
            className={inputClasses}
          >
            {pages.length === 0 ? (
                <option disabled>{t('generateCodesModal.noPages')}</option>
            ) : (
                 pages.map(page => (
                    <option key={page.id} value={page.id}>
                        {page.name}
                    </option>
                ))
            )}
          </select>
        </div>
        <div>
          <label htmlFor="quantity-input" className="block text-sm font-medium text-slate-700">
            {t('generateCodesModal.quantityLabel')}
          </label>
          <input
            type="number"
            id="quantity-input"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10) || 1))}
            min="1"
            max="1000"
            className={inputClasses}
          />
        </div>
        <div className="flex justify-end space-x-3 pt-2">
          <Button variant="secondary" onClick={onClose}>
            {t('common.cancel')}
          </Button>
          <Button variant="primary" onClick={handleGenerateClick} disabled={!selectedPageId || pages.length === 0}>
            {t('generateCodesModal.cta')}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default GenerateCodesModal;
