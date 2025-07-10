import React, { useState, useEffect } from 'react';
import JsonSchemaForm from '../../components/forms/JsonSchemaForm';
import { JsonSchema, AdminDashboardData, SchemaProperty, Variant, AdminEntityType } from '../../types';
import Button from '../../components/common/Button';
import { generateFakeDataForEntityType, MOCK_TSHIRT_PRODUCT } from '../../constants';
import AIGenerationModal from '../../components/ai/AIGenerationModal';
import { useTranslation } from '../../i18n/I18nContext';
import VariantEditorModal from './VariantEditorModal';
import { VariantSchema } from '../../schemas';
import { generateRandomId } from '../../utils';

interface EntityEditorPageProps {
  entityType: AdminEntityType;
  schema?: JsonSchema;
  initialData?: any | null;
  adminData: AdminDashboardData;
  onSave: (entityType: string, data: any) => void;
  onCancel: () => void;
  onUpdateShopProductVariant: (productId: string, variantId: string, updatedVariantData: Partial<Variant>) => void;
}

const EntityEditorPage: React.FC<EntityEditorPageProps> = ({
  entityType,
  schema,
  initialData,
  adminData,
  onSave,
  onCancel,
  onUpdateShopProductVariant,
}) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState(initialData || {});

  const [isVariantEditorOpen, setIsVariantEditorOpen] = useState(false);
  const [editingVariant, setEditingVariant] = useState<Variant | null>(null);
  const [editingVariantIndex, setEditingVariantIndex] = useState<number | null>(null);
  
  useEffect(() => {
    setFormData(initialData || {});
  }, [initialData]);

  const handleDataChange = (data: any) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const handleSaveClick = () => {
    onSave(entityType, formData);
  };
  
  const isShopProduct = entityType === 'products' && formData && 'variants' in formData;

  const getTitle = () => {
    if (initialData?.id) {
      return `Editing ${entityType.slice(0, -1)}: ${initialData.name || initialData.title || initialData.id}`;
    }
    return `Create New ${entityType.slice(0, -1)}`;
  }

  // --- Variant Management ---
  const handleAddNewVariant = () => {
    setEditingVariant({} as Variant); // Open with empty variant
    setEditingVariantIndex(null);
    setIsVariantEditorOpen(true);
  };
  
  const handleEditVariant = (variant: Variant, index: number) => {
    setEditingVariant(variant);
    setEditingVariantIndex(index);
    setIsVariantEditorOpen(true);
  };

  const handleDeleteVariant = (index: number) => {
    if (window.confirm("Are you sure you want to delete this variant?")) {
        setFormData((prev: any) => {
            const newVariants = [...prev.variants];
            newVariants.splice(index, 1);
            return { ...prev, variants: newVariants };
        });
    }
  };

  const handleSaveVariant = (variantData: Variant) => {
    setFormData((prev: any) => {
        const newVariants = [...(prev.variants || [])];
        if (editingVariantIndex !== null) {
            newVariants[editingVariantIndex] = variantData;
        } else {
            newVariants.push({ ...variantData, id: `var_${generateRandomId()}` });
        }
        return { ...prev, variants: newVariants };
    });
    setIsVariantEditorOpen(false);
    setEditingVariant(null);
    setEditingVariantIndex(null);
  };

  if (!schema) {
    return <div className="p-4 bg-white rounded-lg shadow-md">Schema not found for entity type: {entityType}</div>;
  }

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md space-y-6">
      <div className="flex justify-between items-center pb-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
            <Button onClick={onCancel} variant="secondary" size="sm" className="!p-2">
                <i className="material-icons-round text-xl">arrow_back</i>
            </Button>
            <h2 className="text-xl font-semibold text-slate-800">{getTitle()}</h2>
        </div>
        <div className="flex items-center gap-3">
          <Button onClick={onCancel} variant="secondary">{t('common.cancel')}</Button>
          <Button onClick={handleSaveClick} variant="primary">{t('entityEditor.saveChanges')}</Button>
        </div>
      </div>
      
      <JsonSchemaForm
        key={initialData?.id || 'new'}
        schema={schema}
        initialData={formData}
        onSubmit={() => {}} // Submission is handled by header button
        onDataChange={handleDataChange}
        onCancel={() => {}} // Cancellation is handled by header button
        hideButtons
        entityType={entityType}
        adminData={adminData}
      />

       {isShopProduct && (
        <div className="mt-4 pt-4 border-t border-slate-200">
            <h4 className="text-lg font-semibold text-slate-800 mb-2">{t('entityEditor.variant.manageTitle')}</h4>
            <div className="space-y-2 max-h-96 overflow-y-auto p-2 bg-slate-50 rounded-md border">
               {(formData.variants || []).map((variant: Variant, index: number) => (
                   <div key={variant.id || index} className="flex items-center justify-between bg-white p-2 rounded shadow-sm border">
                       <div>
                            <p className="font-medium text-slate-700">{variant.title}</p>
                            <p className="text-xs text-slate-500">SKU: {variant.sku} | Stock: {variant.inventory_quantity}</p>
                       </div>
                       <div className="space-x-2">
                           <Button size="sm" variant="secondary" onClick={() => handleEditVariant(variant, index)}>{t('common.edit')}</Button>
                           <Button size="sm" variant="danger" onClick={() => handleDeleteVariant(index)}>{t('common.delete')}</Button>
                       </div>
                   </div>
               ))}
               {(formData.variants || []).length === 0 && (
                   <p className="text-sm text-slate-500 text-center py-4">No variants created yet.</p>
               )}
            </div>
            <Button onClick={handleAddNewVariant} variant="outline" size="sm" className="mt-3">
               {t('entityEditor.variant.add')}
            </Button>
        </div>
      )}

      {isVariantEditorOpen && (
        <VariantEditorModal
          isOpen={isVariantEditorOpen}
          onClose={() => setIsVariantEditorOpen(false)}
          onSave={handleSaveVariant}
          initialData={editingVariant}
          schema={VariantSchema}
        />
      )}
    </div>
  );
};

export default EntityEditorPage;