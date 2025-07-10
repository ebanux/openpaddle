
import React from 'react';
import { Collection, ThemeDefinition } from '../../types';
import Card from '../common/Card';

interface CollectionCardProps {
  collection: Collection;
  theme: ThemeDefinition;
  onClick: () => void;
  productCount: number;
}

const CollectionCard: React.FC<CollectionCardProps> = ({ collection, theme, onClick, productCount }) => {
  return (
    <Card interactive className={`${theme.cardBgClass}`} onClick={onClick}>
      <div className="relative pt-[56.25%]"> {/* 16:9 Aspect Ratio */}
        <img
          src={`https://picsum.photos/seed/${collection.id}/400/225`}
          alt={collection.title}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold">{collection.title}</h3>
        <p className="text-sm opacity-70">{productCount} products</p>
      </div>
    </Card>
  );
};

export default CollectionCard;
