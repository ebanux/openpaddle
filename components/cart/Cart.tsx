
import React from 'react';
import { CartItem as CartItemType } from '../../types';
import Button from '../common/Button';
import CartItem from './CartItem';
import { formatCurrency } from '../../utils';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItemType[];
  onRemoveItem: (id: string) => void;
  onUpdateQuantity: (id: string, newQuantity: number) => void;
  onCheckout: () => void;
  currency: string;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose, items, onRemoveItem, onUpdateQuantity, onCheckout, currency }) => {
  const subtotal = items.reduce((sum, item) => {
    const price = item.lineItem.price_data?.unit_amount || 0;
    return sum + (price * item.quantity);
  }, 0) / 100;

  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-2xl transform transition-transform z-50 flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Shopping Cart</h2>
          <button onClick={onClose} className="text-2xl">&times;</button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-4">
            <i className="material-icons-round text-6xl text-slate-300">shopping_cart_off</i>
            <p className="mt-4 text-slate-500">Your cart is empty.</p>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {items.map(item => (
              <CartItem
                key={item.id}
                item={item}
                onRemove={onRemoveItem}
                onUpdateQuantity={onUpdateQuantity}
                currency={currency}
              />
            ))}
          </div>
        )}

        {items.length > 0 && (
          <div className="p-4 border-t space-y-4">
            <div className="flex justify-between font-semibold text-lg">
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal, currency)}</span>
            </div>
            <Button fullWidth size="lg" onClick={onCheckout}>
              Proceed to Checkout
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
