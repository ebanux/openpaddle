
import React from 'react';
import { CartItem as CartItemType } from '../../types';
import { formatCurrency } from '../../utils';
import Button from '../common/Button';

interface CartItemProps {
  item: CartItemType;
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, newQuantity: number) => void;
  currency: string;
}

const CartItem: React.FC<CartItemProps> = ({ item, onRemove, onUpdateQuantity, currency }) => {
  const { lineItem, quantity, product, variant } = item;
  const unitPrice = (lineItem.price_data?.unit_amount || 0) / 100;
  const image = variant?.media?.[0]?.url || product?.media?.[0]?.url || 'https://picsum.photos/id/15/200/200';

  return (
    <div className="flex items-start space-x-4">
      <img src={image} alt={lineItem.price_data?.product_data?.name} className="w-20 h-20 rounded-md object-cover" />
      <div className="flex-1">
        <h4 className="font-semibold text-sm">{lineItem.price_data?.product_data?.name}</h4>
        <p className="text-sm text-slate-500">{formatCurrency(unitPrice, currency)}</p>
        <div className="flex items-center space-x-2 mt-2">
          <Button size="sm" onClick={() => onUpdateQuantity(item.id, quantity - 1)} className="!w-6 !h-6 !p-0">-</Button>
          <span>{quantity}</span>
          <Button size="sm" onClick={() => onUpdateQuantity(item.id, quantity + 1)} className="!w-6 !h-6 !p-0">+</Button>
        </div>
      </div>
      <button onClick={() => onRemove(item.id)} className="text-slate-400 hover:text-red-500">
        <i className="material-icons-round">close</i>
      </button>
    </div>
  );
};

export default CartItem;
