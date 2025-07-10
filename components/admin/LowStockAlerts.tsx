import React, { useMemo } from 'react';
import { ShopProduct } from '../../types';
import Button from '../common/Button';
import { useTranslation } from '../../i18n/I18nContext';

interface LowStockAlertsProps {
  shopProducts: ShopProduct[];
  onNavigate: () => void;
}

const LowStockAlerts: React.FC<LowStockAlertsProps> = ({ shopProducts, onNavigate }) => {
  const { t } = useTranslation();

  const lowStockVariants = useMemo(() => {
    return shopProducts
      .flatMap(product =>
        product.variants.map(variant => ({
          ...variant,
          productTitle: product.title,
        }))
      )
      .filter(variant => variant.inventory_quantity > 0 && variant.inventory_quantity <= 10)
      .sort((a, b) => a.inventory_quantity - b.inventory_quantity);
  }, [shopProducts]);

  return (
    <div>
      <h3 className="text-lg font-semibold text-slate-800 mb-4">{t('adminPage.dashboard.lowStockAlerts.title')}</h3>
      {lowStockVariants.length > 0 ? (
        <div className="space-y-3">
          {lowStockVariants.slice(0, 5).map(variant => (
            <div key={variant.id} className="flex justify-between items-center text-sm p-2 bg-slate-50 rounded-md">
              <div>
                <p className="font-medium text-slate-700">{variant.productTitle}</p>
                <p className="text-xs text-slate-500">{variant.title}</p>
              </div>
              <span className="font-bold text-yellow-600 bg-yellow-100 px-2 py-1 rounded-full text-xs">
                {variant.inventory_quantity} left
              </span>
            </div>
          ))}
          <Button onClick={onNavigate} variant="secondary" fullWidth className="mt-4">
            {t('adminPage.dashboard.lowStockAlerts.viewInventory')}
          </Button>
        </div>
      ) : (
        <p className="text-sm text-slate-500 italic">{t('adminPage.dashboard.lowStockAlerts.noAlerts')}</p>
      )}
    </div>
  );
};

export default LowStockAlerts;
