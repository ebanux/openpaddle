import React from 'react';
import Button from '../common/Button';
import { CheckoutItem } from '../../types';
import { CURRENCY_SYMBOLS } from '../../constants';

// Based on CheckoutModalProps but simplified for non-interactive preview
interface CheckoutPreviewProps {
  title: string;
  items: CheckoutItem[];
  totalAmount: number;
  currency: string;
  environment: 'test' | 'live';
  originalTotalAmount?: number;
  appliedPromotionCode?: string;
  discountAmountApplied?: number;
}

const CheckoutPreview: React.FC<CheckoutPreviewProps> = ({
  title,
  items,
  totalAmount,
  currency,
  environment,
  originalTotalAmount,
  appliedPromotionCode,
  discountAmountApplied,
}) => {
  const currencySymbol = CURRENCY_SYMBOLS[currency] || '$';
  const hasDiscount = appliedPromotionCode && originalTotalAmount !== undefined && discountAmountApplied !== undefined;

  return (
    <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md transform transition-all duration-300 ease-in-out scale-100 opacity-100">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-slate-800">Confirm: {title}</h2>
        </div>
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
                <label className="block text-sm font-medium text-slate-700 mb-1">
                    Card Details
                </label>
                {environment === 'test' && (
                <p className="text-xs text-slate-500 mb-2">
                    Users would enter card details here. (This is a static preview)
                </p>
                )}
                <div className="p-3 border border-slate-300 rounded-md bg-slate-100 h-[50px] flex items-center"> 
                    <p className="text-slate-400 text-sm">💳 Mock Card Input</p>
                </div>
            </div>

            {hasDiscount && (
            <div className="space-y-1 py-2 border-t border-b border-slate-200">
                <div className="flex justify-between text-sm text-slate-600">
                    <p>Subtotal:</p>
                    <p>{currencySymbol}{originalTotalAmount!.toFixed(2)}</p>
                </div>
                <div className="flex justify-between text-sm text-green-600">
                    <p>Discount ({appliedPromotionCode}):</p>
                    <p>-{currencySymbol}{discountAmountApplied!.toFixed(2)}</p>
                </div>
            </div>
            )}

            <div className="flex justify-between items-center pt-2 font-semibold text-lg text-slate-800">
            <p>Total:</p>
            <p>{currencySymbol}{totalAmount.toFixed(2)}</p>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
            <Button type="button" variant="secondary" disabled>
                Cancel
            </Button>
            <Button type="button" variant="primary" disabled>
                Pay {currencySymbol}{totalAmount.toFixed(2)}
            </Button>
            </div>
             <p className="text-xs text-slate-500 text-center pt-2">
                This is a preview of the checkout step.
            </p>
        </div>
    </div>
  );
};

export default CheckoutPreview;
