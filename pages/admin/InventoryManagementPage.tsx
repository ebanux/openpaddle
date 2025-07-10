import React, { useMemo, useState, useCallback } from 'react';
import { ShopProduct, Variant } from '../../types';
import { CURRENCY_SYMBOLS } from '../../constants';
import Button from '../../components/common/Button';

interface InventoryManagementPageProps {
  shopProducts: ShopProduct[];
  onVariantUpdate: (productId: string, variantId: string, updatedVariantData: Partial<Variant>) => void;
  currency: string;
}

const InventoryManagementPage: React.FC<InventoryManagementPageProps> = ({ shopProducts, onVariantUpdate, currency }) => {
  const allVariants = useMemo(() => {
    return shopProducts.flatMap(product => 
      product.variants.map(variant => ({
        ...variant,
        productId: product.id,
        productTitle: product.title,
        productImage: product.media?.[0]?.url || 'https://picsum.photos/seed/placeholder/100/100',
      }))
    );
  }, [shopProducts]);

  const [editableStock, setEditableStock] = useState<Record<string, string>>({});

  const handleStockChange = (variantId: string, value: string) => {
    setEditableStock(prev => ({ ...prev, [variantId]: value }));
  };

  const handleStockUpdate = (productId: string, variantId: string) => {
    const newStockString = editableStock[variantId];
    if (newStockString === undefined) return; 

    const newStock = parseInt(newStockString, 10);
    if (!isNaN(newStock) && newStock >= 0) {
      onVariantUpdate(productId, variantId, { inventory_quantity: newStock });
    } else {
      // If input is invalid, reset it to the original value from props
      const originalVariant = allVariants.find(v => v.id === variantId);
      if (originalVariant) {
        setEditableStock(prev => ({...prev, [variantId]: String(originalVariant.inventory_quantity)}));
      }
    }
  };

  const getStatus = (quantity: number) => {
    if (quantity <= 0) {
      return <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-red-100 text-red-700">Out of Stock</span>;
    }
    if (quantity <= 10) {
      return <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-700">Low Stock</span>;
    }
    return <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-green-100 text-green-700">In Stock</span>;
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-slate-800">Inventory Management</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="p-3 font-semibold">Product</th>
              <th className="p-3 font-semibold">Variant</th>
              <th className="p-3 font-semibold">SKU</th>
              <th className="p-3 font-semibold">Price</th>
              <th className="p-3 font-semibold">Stock</th>
              <th className="p-3 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {allVariants.length > 0 ? allVariants.map(variant => {
              const stockValue = editableStock[variant.id] !== undefined ? editableStock[variant.id] : variant.inventory_quantity;
              return (
                <tr key={variant.id} className="border-b border-slate-200 last:border-b-0 hover:bg-slate-50">
                  <td className="p-3 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <img src={variant.media?.[0]?.url || variant.productImage} alt={variant.productTitle} className="w-10 h-10 rounded-md object-cover" />
                      <span className="font-medium text-slate-700">{variant.productTitle}</span>
                    </div>
                  </td>
                  <td className="p-3 whitespace-nowrap">{variant.title}</td>
                  <td className="p-3 whitespace-nowrap font-mono text-xs">{variant.sku}</td>
                  <td className="p-3 whitespace-nowrap font-medium">{CURRENCY_SYMBOLS[currency] || '$'}{(variant.price / 100).toFixed(2)}</td>
                  <td className="p-3 whitespace-nowrap">
                    <input 
                      type="number"
                      value={stockValue}
                      onChange={(e) => handleStockChange(variant.id, e.target.value)}
                      onBlur={() => handleStockUpdate(variant.productId, variant.id)}
                      className="w-20 p-1 border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      aria-label={`Stock for ${variant.title}`}
                    />
                  </td>
                  <td className="p-3 whitespace-nowrap">{getStatus(variant.inventory_quantity)}</td>
                </tr>
              )
            }) : (
              <tr>
                <td colSpan={6} className="text-center p-6 text-slate-500">
                  No products with variants found. Create a product with variants to manage inventory.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryManagementPage;