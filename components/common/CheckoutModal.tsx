
import React, { useState } from 'react';
import Modal from './Modal';
import Button from './Button';
import { CheckoutItem, CheckoutModalProps } from '../../types';
import { CURRENCY_SYMBOLS } from '../../constants';
import { useTranslation } from '../../i18n/I18nContext';

const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  onConfirmWithStripe,
  title,
  items,
  totalAmount,
  currency,
  isProcessingExternally,
  externalError,
  environment,
  originalTotalAmount,
  appliedPromotionCode,
  discountAmountApplied,
}) => {
  const { t } = useTranslation();
  const currencySymbol = CURRENCY_SYMBOLS[currency] || '$';
  const effectiveError = externalError;
  const isProcessing = isProcessingExternally;
  const hasDiscount = appliedPromotionCode && originalTotalAmount !== undefined && discountAmountApplied !== undefined;

  const handleConfirm = () => {
    // In a real app, this would get a paymentMethodId from Stripe Elements
    // For this simulation, we pass a mock ID.
    onConfirmWithStripe('pm_mock_id');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('checkoutModal.title', { pageTitle: title })}>
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="flex justify-between items-center py-2 border-b border-slate-200 last:border-b-0">
            <div>
              <p className="font-medium text-slate-700">{item.name}</p>
              {item.quantity && item.quantity > 1 && <p className="text-sm text-slate-500">Quantity: {item.quantity}</p>}
            </div>
            <p className="text-slate-700">{currencySymbol}{item.price.toFixed(2)}</p>
          </div>
        ))}
        
        <div className="pt-2">
            <label htmlFor="card-element" className="block text-sm font-medium text-slate-700 mb-1">
                {t('checkoutModal.cardDetails')}
            </label>
            <div className="text-center p-4 my-2 bg-slate-100 border border-slate-200 rounded-md">
                <p className="text-sm text-slate-500">{t('checkoutModal.formDisabled')}</p>
            </div>
        </div>

        {effectiveError && (
          <div className="text-red-600 text-sm p-3 bg-red-100 rounded-md">
            {t('checkoutModal.error')} {effectiveError}
          </div>
        )}
        
        {hasDiscount && (
          <div className="space-y-1 py-2 border-t border-b border-slate-200">
              <div className="flex justify-between text-sm text-slate-600">
                  <p>{t('checkoutModal.subtotal')}:</p>
                  <p>{currencySymbol}{originalTotalAmount!.toFixed(2)}</p>
              </div>
              <div className="flex justify-between text-sm text-green-600">
                  <p>{t('checkoutModal.discount', { code: appliedPromotionCode })}:</p>
                  <p>-{currencySymbol}{discountAmountApplied!.toFixed(2)}</p>
              </div>
          </div>
        )}

        <div className="flex justify-between items-center pt-2 font-semibold text-lg text-slate-800">
          <p>{t('checkoutModal.total')}:</p>
          <p>{currencySymbol}{totalAmount.toFixed(2)}</p>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <Button type="button" variant="secondary" onClick={onClose} disabled={isProcessing}>
            {t('common.cancel')}
          </Button>
          <Button type="button" onClick={handleConfirm} variant="primary" disabled={isProcessing}>
            {isProcessing ? t('common.processing') : t('checkoutModal.pay', { symbol: currencySymbol, amount: totalAmount.toFixed(2) })}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default CheckoutModal;
