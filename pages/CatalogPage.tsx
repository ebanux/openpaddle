

import React, { useState, useMemo } from 'react';
import { CatalogPageProps, Collection } from '../types';
import CollectionCard from '../components/catalog/CollectionCard';
import ProductCard from '../components/catalog/ProductCard';

export const CatalogPage: React.FC<CatalogPageProps> = ({ initialData, adminData, onAddToCart, theme }) => {
  const [selectedCollection, setSelectedCollection] = useState<Collection | null>(null);

  const collections = useMemo(() => {
    return initialData.collectionIds
      .map(id => adminData.collections?.find(c => c.id === id))
      .filter((c): c is Collection => !!c);
  }, [initialData.collectionIds, adminData.collections]);

  const productsInSelectedCollection = useMemo(() => {
    if (!selectedCollection || !selectedCollection.productIds) return [];
    return selectedCollection.productIds
      .map(id => adminData.shopProducts?.find(p => p.id === id))
      .filter(p => !!p);
  }, [selectedCollection, adminData.shopProducts]);

  const renderCollectionView = () => (
    <>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold">{initialData.pageTitle}</h2>
        <p className="mt-2 text-lg opacity-80">{initialData.pageDescription}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {collections.map(collection => (
          <CollectionCard
            key={collection.id}
            collection={collection}
            theme={theme}
            onClick={() => setSelectedCollection(collection)}
            productCount={collection.productIds?.length || 0}
          />
        ))}
      </div>
    </>
  );

  const renderProductView = () => {
    if (!selectedCollection) return null;
    return (
      <div>
        <div className="mb-8">
            <button onClick={() => setSelectedCollection(null)} className="flex items-center text-sm font-semibold text-blue-600 hover:text-blue-800">
                <i className="material-icons-round mr-1">arrow_back</i>
                Back to Collections
            </button>
            <h2 className="text-3xl font-bold mt-2">{selectedCollection.title}</h2>
            <p className="mt-1 text-lg opacity-80">{selectedCollection.description}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {productsInSelectedCollection.map(product => 
            product ? <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} theme={theme} currency={initialData.currency} /> : null
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto p-4 sm:p-6">
      {selectedCollection ? renderProductView() : renderCollectionView()}
    </div>
  );
};

export default CatalogPage;