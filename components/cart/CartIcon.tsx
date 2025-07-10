
import React from 'react';

interface CartIconProps {
  itemCount: number;
  onClick: () => void;
}

const CartIcon: React.FC<CartIconProps> = ({ itemCount, onClick }) => {
  return (
    <button onClick={onClick} className="relative p-2 rounded-full hover:bg-slate-100">
      <i className="material-icons-round">shopping_cart</i>
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
          {itemCount}
        </span>
      )}
    </button>
  );
};

export default CartIcon;
