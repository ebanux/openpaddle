

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { CURRENCY_SYMBOLS } from '../constants';
import { ProductPageProps, StripeLineItem, MonetizationUseCase, ShopProduct, Variant, Media } from '../types';

type ProductInfoTab = 'description' | 'specs' | 'shipping';

export const ProductPage: React.FC<ProductPageProps> = ({ onAddToCart, initialData, isLivePreview, theme, environment, adminData }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [activeImageUrl, setActiveImageUrl] = useState<string>('');
  const [activeTab, setActiveTab] = useState<ProductInfoTab>('description');

  const product: ShopProduct | null = useMemo(() => {
    if (!initialData.productId || !adminData?.shopProducts) return null;
    return adminData.shopProducts.find(p => p.id === initialData.productId) || null;
  }, [initialData.productId, adminData?.shopProducts]);

  useEffect(() => {
    if (product) {
      const firstAvailableVariant = product.variants.find(v => v.inventory_quantity > 0);
      const initialOptions = firstAvailableVariant?.options || product.variants[0]?.options || {};
      setSelectedOptions(initialOptions);
      setActiveTab('description');
    }
    setQuantity(1);
  }, [product]);

  const selectedVariant: Variant | undefined = useMemo(() => {
    if (!product || Object.keys(selectedOptions).length === 0) return undefined;
    return product.variants.find(variant => {
      return Object.entries(selectedOptions).every(([key, value]) => variant.options[key] === value);
    });
  }, [product, selectedOptions]);
  
  const currentMediaGallery: Media[] = useMemo(() => {
    return (selectedVariant?.media && selectedVariant.media.length > 0)
      ? selectedVariant.media
      : product?.media || [];
  }, [selectedVariant, product]);
  
  useEffect(() => {
    const isImageInCurrentGallery = activeImageUrl && currentMediaGallery.some(media => media.url === activeImageUrl);
    if (!isImageInCurrentGallery && currentMediaGallery.length > 0) {
      setActiveImageUrl(currentMediaGallery[0].url);
    } else if (!activeImageUrl && currentMediaGallery.length > 0) {
      setActiveImageUrl(currentMediaGallery[0].url);
    }
  }, [currentMediaGallery, activeImageUrl]);


  const handleOptionSelect = (optionName: string, value: string) => {
    setSelectedOptions(prev => ({ ...prev, [optionName]: value }));
    setQuantity(1);
  };
  
  const handleQuantityChange = (delta: number) => {
    setQuantity(prev => Math.max(1, Math.min(prev + delta, selectedVariant?.inventory_quantity || 1)));
  };

  const getAvailableOptions = useCallback((optionNameToCheck: string) => {
    if (!product) return new Set<string>();
    const available = new Set<string>();
    product.variants.forEach(variant => {
        let matches = true;
        for (const optionName in selectedOptions) {
            if (optionName !== optionNameToCheck && selectedOptions[optionName] !== variant.options[optionName]) {
                matches = false;
                break;
            }
        }
        if (matches) {
            available.add(variant.options[optionNameToCheck]);
        }
    });
    return available;
  }, [product, selectedOptions]);

  const handleAddToCartClick = () => {
    if (!selectedVariant) {
      alert("Please select a valid product variant.");
      return;
    }
    const lineItem: StripeLineItem = {
      price_data: {
        currency: initialData.currency,
        unit_amount: selectedVariant.price,
        product_data: {
          name: `${product?.title} - ${selectedVariant.title}`,
          images: selectedVariant.media?.map(m => m.url) || product?.media?.map(m => m.url) || [],
        },
      },
      quantity: quantity,
    };
    onAddToCart(lineItem, { productId: product?.id, variantId: selectedVariant.id, quantity });
  };

  if (!product) {
    return (
      <div className="p-6 text-center opacity-75">
        Product not found or not configured.
        {isLivePreview && " Try selecting a product template or editing."}
      </div>
    );
  }
  
  const currencySymbol = CURRENCY_SYMBOLS[initialData.currency] || '$';
  const isOutOfStock = !selectedVariant || selectedVariant.inventory_quantity === 0;
  const isOnSale = selectedVariant && selectedVariant.compareAtPrice && selectedVariant.compareAtPrice > selectedVariant.price;
  
  const collection = useMemo(() => {
      if (!product.collectionIds || !adminData?.collections) return null;
      return adminData.collections.find(c => c.id === product.collectionIds![0]);
  }, [product.collectionIds, adminData?.collections]);

  const hasMetafields = product.metafields && (product.metafields.specifications || product.metafields.shipping_info);

  return (
    <div className="max-w-2xl mx-auto">
      <Card className={theme.cardBgClass}>
        <div className="h-80 w-full bg-slate-200">
            {activeImageUrl ? (
                <img src={activeImageUrl} alt={product.title} className="w-full h-full object-cover" />
            ) : <div className="w-full h-full flex items-center justify-center text-slate-500">No Image Available</div> }
        </div>

        {currentMediaGallery.length > 1 && (
            <div className="p-2 border-t border-b border-slate-200/50">
                <div className="flex space-x-2 overflow-x-auto pb-1">
                    {currentMediaGallery.map((media, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveImageUrl(media.url)}
                            className={`w-16 h-16 rounded-md overflow-hidden flex-shrink-0 border-2 transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                                activeImageUrl === media.url ? 'border-blue-500' : 'border-transparent hover:border-blue-400'
                            }`}
                            aria-label={`View image ${index + 1}`}
                        >
                            <img src={media.url} alt={media.alt || `Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                        </button>
                    ))}
                </div>
            </div>
        )}
        
        <div className="p-6">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            {collection && <span className="text-sm text-slate-500">in <a href="#" className="underline hover:text-blue-500">{collection.title}</a></span>}
            {product.tags?.map(tag => (
                <span key={tag} className="text-xs font-semibold px-2 py-0.5 bg-slate-200 text-slate-700 rounded-full capitalize">{tag}</span>
            ))}
          </div>

          <h2 className="text-3xl font-bold mb-6">{product.title}</h2>
          
          <div className="space-y-4 mb-6">
            {product.options.map(optionName => {
               const availableValues = getAvailableOptions(optionName);
               return (
                <div key={optionName}>
                    <h3 className="text-sm font-semibold mb-2">{optionName}</h3>
                    <div className="flex flex-wrap gap-2">
                        {[...new Set(product.variants.map(v => v.options[optionName]))].map(value => {
                            const isSelected = selectedOptions[optionName] === value;
                            const isDisabled = !availableValues.has(value);
                            return (
                                <Button
                                    key={value}
                                    onClick={() => handleOptionSelect(optionName, value)}
                                    variant={isSelected ? 'primary' : 'secondary'}
                                    className={`${isSelected ? theme.buttonPrimaryClass : theme.buttonSecondaryClass} ${isDisabled ? '!opacity-25 !cursor-not-allowed' : ''}`}
                                    disabled={isDisabled}
                                >
                                    {value}
                                </Button>
                            )
                        })}
                    </div>
                </div>
               )
            })}
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex items-center space-x-4">
                <label htmlFor="quantity" className="text-sm font-semibold">Quantity</label>
                <div className="flex items-center space-x-2 border rounded-lg">
                    <Button onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1} className={`!p-2 !border-none ${theme.buttonSecondaryClass}`}>-</Button>
                    <span id="quantity" className="w-8 text-center font-medium">{quantity}</span>
                    <Button onClick={() => handleQuantityChange(1)} disabled={isOutOfStock || quantity >= (selectedVariant?.inventory_quantity || 1)} className={`!p-2 !border-none ${theme.buttonSecondaryClass}`}>+</Button>
                </div>
            </div>
            
            <div className="flex items-baseline space-x-2">
              <p className="text-3xl font-bold">
                  {currencySymbol}{(selectedVariant ? selectedVariant.price / 100 : product.variants[0].price / 100).toFixed(2)}
              </p>
              {isOnSale && (
                  <p className="text-lg text-slate-500 line-through">
                      {currencySymbol}{(selectedVariant!.compareAtPrice! / 100).toFixed(2)}
                  </p>
              )}
            </div>

            <Button onClick={handleAddToCartClick} fullWidth size="lg" disabled={isOutOfStock} className={theme.buttonPrimaryClass}>
              {isOutOfStock ? "Out of Stock" : "Add to Cart"}
            </Button>
            {selectedVariant && selectedVariant.inventory_quantity > 0 && selectedVariant.inventory_quantity <= 10 && (
                <p className="text-sm text-center text-red-500 mt-2">Only {selectedVariant.inventory_quantity} left in stock!</p>
            )}
          </div>
          
          {hasMetafields && (
             <div className="border-t pt-4">
                <div className="flex border-b">
                    <button onClick={() => setActiveTab('description')} className={`px-4 py-2 text-sm font-medium ${activeTab === 'description' ? `border-b-2 border-blue-500 text-blue-600` : `text-slate-500`}`}>Description</button>
                    {product.metafields?.specifications && <button onClick={() => setActiveTab('specs')} className={`px-4 py-2 text-sm font-medium ${activeTab === 'specs' ? `border-b-2 border-blue-500 text-blue-600` : `text-slate-500`}`}>Specifications</button>}
                    {product.metafields?.shipping_info && <button onClick={() => setActiveTab('shipping')} className={`px-4 py-2 text-sm font-medium ${activeTab === 'shipping' ? `border-b-2 border-blue-500 text-blue-600` : `text-slate-500`}`}>Shipping</button>}
                </div>
                <div className="py-4 text-sm text-slate-600 leading-relaxed">
                    {activeTab === 'description' && <p>{product.description}</p>}
                    {activeTab === 'specs' && product.metafields?.specifications && (
                        <ul className="space-y-1">
                            {product.metafields.specifications.map((spec: {label: string, value: string}) => (
                                <li key={spec.label} className="flex justify-between"><span className="font-semibold text-slate-700">{spec.label}:</span> <span>{spec.value}</span></li>
                            ))}
                        </ul>
                    )}
                    {activeTab === 'shipping' && <p>{product.metafields?.shipping_info}</p>}
                </div>
             </div>
          )}

        </div>
      </Card>
    </div>
  );
};
export default ProductPage;
