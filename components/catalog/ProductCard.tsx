
import React from 'react';
import { ShopProduct, StripeLineItem, ThemeDefinition } from '../../types';
import Card from '../common/Card';
import Button from '../common/Button';
import { CURRENCY_SYMBOLS } from '../../constants';

interface ProductCardProps {
  product: ShopProduct;
  onAddToCart: (lineItem: StripeLineItem, useCaseData: any) => void;
  theme: ThemeDefinition;
  currency: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, theme, currency }) => {
  const defaultVariant = product.variants.find(v => v.inventory_quantity > 0) || product.variants[0];
  const currencySymbol = CURRENCY_SYMBOLS[currency] || '$';

  const handleAddToCartClick = () => {
    if (!defaultVariant) {
      alert("This product is currently unavailable.");
      return;
    }
    const lineItem: StripeLineItem = {
      price_data: {
        currency: currency,
        unit_amount: defaultVariant.price,
        product_data: {
          name: `${product.title}`,
          images: product.media?.map(m => m.url) || [],
        },
      },
      quantity: 1,
    };
    onAddToCart(lineItem, { productId: product.id, variantId: defaultVariant.id, quantity: 1 });
  };

  const isOutOfStock = !defaultVariant || defaultVariant.inventory_quantity <= 0;

  return (
    <Card className={`${theme.cardBgClass} flex flex-col h-full`}>
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden">
        <img
          src={product.media?.[0]?.url || 'https://picsum.photos/id/12/300/300'}
          alt={product.title}
          className="w-full h-full object-cover group-hover:opacity-75"
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-md font-semibold truncate">{product.title}</h3>
        <p className="text-sm opacity-70 mt-1 flex-grow">{product.description.substring(0, 50)}...</p>
        <div className="flex justify-between items-center mt-4">
          <p className="text-lg font-bold">{currencySymbol}{(defaultVariant.price / 100).toFixed(2)}</p>
          <Button onClick={handleAddToCartClick} disabled={isOutOfStock} size="sm" className={theme.buttonPrimaryClass}>
            {isOutOfStock ? 'Sold Out' : 'Add to Cart'}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
