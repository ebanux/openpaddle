import React, { useState, useEffect } from 'react';
import { SchemaProperty, JsonSchema, StripeProduct, AdminDashboardData, AIGenConfig } from '../../types'; // Added AdminDashboardData
import ArrayOfObjectsField from './ArrayOfObjectsField';
import ArrayOfSimpleTypeField from './ArrayOfSimpleTypeField'; 
import Button from '../common/Button';
import CheckboxGroupField from './CheckboxGroupField';
import { useTranslation } from '../../i18n/I18nContext';

interface FormFieldProps {
  id: string;
  propertyKey: string;
  schema: SchemaProperty;
  value: any;
  onChange: (value: any) => void;
  onFileChange?: (file: File) => void;
  isReadOnly?: boolean;
  entityType?: string;
  adminData?: AdminDashboardData;
  onOpenAIGenerate?: (config: AIGenConfig, fieldKey: string, fieldLabel: string, currentValue: any, contextValue: string) => void;
  contextData?: any;
}

const FormField: React.FC<FormFieldProps> = ({ id, propertyKey, schema, value, onChange, onFileChange, isReadOnly = false, entityType, adminData, onOpenAIGenerate, contextData }) => {
  const [localJsonString, setLocalJsonString] = useState('');
  const [jsonParseError, setJsonParseError] = useState<string | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (schema.type === 'array' && schema.items && schema.items.type === 'object') {
      setLocalJsonString(JSON.stringify(value || [], null, 2));
      setJsonParseError(null); // Reset error on new value
    }
  }, [value, schema.type, schema.items]);
  
  const handleAITrigger = () => {
    if (schema.aiGenConfig && onOpenAIGenerate) {
        const contextValue = schema.aiGenConfig.contextField && contextData ? contextData[schema.aiGenConfig.contextField] : '';
        onOpenAIGenerate(schema.aiGenConfig, propertyKey, t(schema.title || propertyKey), value, contextValue);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    let newValue: any;
    if (e.target.type === 'checkbox') {
      newValue = (e.target as HTMLInputElement).checked;
    } else {
      newValue = e.target.value;
      if (schema.type === 'number' || schema.type === 'integer') {
        newValue = parseFloat(newValue);
        if (isNaN(newValue)) newValue = undefined; // Allow clearing number field
      }
    }
    onChange(newValue);
  };
  
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && onFileChange) {
      onFileChange(e.target.files[0]);
    }
  };

  const commonInputClasses = "mt-1 block w-full px-3 py-2 bg-slate-100 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm disabled:bg-slate-200 disabled:text-slate-500 read-only:bg-slate-200 read-only:text-slate-500";
  const checkboxClasses = "h-4 w-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500 disabled:bg-slate-200 disabled:text-slate-500";


  const renderInput = () => {
    // SPECIAL CASE FOR PRODUCT DROPDOWN IN PRICE FORM
    if (entityType === 'prices' && propertyKey === 'product') {
      const products = adminData?.products || [];
      return (
        <select
          id={id}
          name={propertyKey}
          value={value || ''}
          onChange={handleChange}
          className={commonInputClasses}
          disabled={isReadOnly}
          aria-describedby={schema.description ? `${id}-description` : undefined}
        >
          <option value="" disabled>Select a product...</option>
          {products.map(product => (
            <option key={product.id} value={product.id}>
              {product.name} ({product.id})
            </option>
          ))}
        </select>
      );
    }
    
    // NEW SPECIAL CASE FOR DIGITAL ASSET DROPDOWN
    if (propertyKey === 'digitalAssetId') {
      const assets = adminData?.digitalAssets || [];
      return (
         <select
          id={id}
          name={propertyKey}
          value={value || ''}
          onChange={handleChange}
          className={commonInputClasses}
          disabled={isReadOnly}
        >
          <option value="" disabled>{t('forms.digital.assetId.description')}</option>
           {assets.map(asset => (
            <option key={asset.id} value={asset.id}>
              {asset.name} ({asset.fileName})
            </option>
          ))}
        </select>
      );
    }
    
    // SPECIAL CASE FOR TRIGGER PAGE ID DROPDOWN IN EMAIL TEMPLATE FORM
    if (entityType === 'emailTemplates' && propertyKey === 'triggerPageId') {
      const pages = adminData?.pages || [];
      return (
          <select
            id={id}
            name={propertyKey}
            value={value || 'all'}
            onChange={handleChange}
            className={commonInputClasses}
            disabled={isReadOnly}
            aria-describedby={schema.description ? `${id}-description` : undefined}
          >
            <option value="all">All Pages</option>
            {pages.map(page => (
              <option key={page.id} value={page.id}>
                {page.name}
              </option>
            ))}
          </select>
        );
    }
    
    // NEW: Handle file upload widget
    if (schema.uiWidget === 'file') {
      return (
        <input
          type="file"
          id={id}
          name={propertyKey}
          onChange={handleFileSelect}
          className={`${commonInputClasses} file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100`}
          disabled={isReadOnly}
        />
      );
    }
    
    // NEW: Handle checkbox group for tax/shipping rates
    if (schema.uiWidget === 'checkboxGroup') {
      return (
        <CheckboxGroupField
          id={id}
          label={t(schema.title || propertyKey)}
          value={value || []}
          onChange={onChange}
          isReadOnly={isReadOnly}
          adminData={adminData}
          optionsSource={propertyKey === 'tax_rate_ids' ? 'taxRates' : 'shippingRates'}
        />
      );
    }

    // Handle array of complex objects
    if (schema.type === 'array' && schema.items?.type === 'object' && schema.items) {
        let itemTitleKey = '';
        if (propertyKey === 'line_items') itemTitleKey = 'price_data.product_data.name';
        else if (propertyKey === 'custom_fields') itemTitleKey = 'label.custom'; // or 'key'

        return (
            <ArrayOfObjectsField
                id={id}
                label={t(schema.title || propertyKey)}
                value={value || []}
                itemSchema={schema.items as JsonSchema} // Cast because we checked type is object
                onChange={onChange}
                isReadOnly={isReadOnly}
                itemTitleKey={itemTitleKey}
            />
        );
    }
    
    // Handle array of simple types (strings or numbers)
    if (schema.type === 'array' && schema.items && (schema.items.type === 'string' || schema.items.type === 'number')) {
      return (
        <ArrayOfSimpleTypeField
            id={id}
            label={t(schema.title || propertyKey)}
            value={value || []}
            itemType={schema.items.type as 'string' | 'number'}
            onChange={onChange}
            isReadOnly={isReadOnly}
            placeholder={t('forms.common.simpleArrayPlaceholder', { type: schema.items.type })}
        />
      );
    }

    if (schema.enum && Array.isArray(schema.enum)) {
      return (
        <select
          id={id}
          name={propertyKey}
          value={value || ''}
          onChange={handleChange}
          className={commonInputClasses}
          disabled={isReadOnly}
          aria-describedby={schema.description ? `${id}-description` : undefined}
        >
          <option value="" disabled>{t('forms.common.selectPlaceholder', { field: t(schema.title || propertyKey) })}</option>
          {schema.enum.map((option) => (
            <option key={String(option)} value={String(option)}>
              {String(option)}
            </option>
          ))}
        </select>
      );
    }

    if (schema.uiWidget === 'textarea') {
        return (
            <textarea
                id={id}
                name={propertyKey}
                value={value || ''}
                onChange={handleChange}
                rows={schema.rows || 3}
                className={commonInputClasses}
                placeholder={t(schema.description || schema.title || propertyKey)}
                disabled={isReadOnly}
                readOnly={isReadOnly}
                aria-describedby={schema.description ? `${id}-description` : undefined}
            />
        );
    }

    switch (schema.type) {
      case 'string':
        return (
          <input
            type="text"
            id={id}
            name={propertyKey}
            value={value || ''}
            onChange={handleChange}
            className={commonInputClasses}
            placeholder={t(schema.description || schema.title || propertyKey)}
            minLength={schema.minLength}
            maxLength={schema.maxLength}
            pattern={schema.pattern}
            disabled={isReadOnly}
            readOnly={isReadOnly}
            aria-describedby={schema.description ? `${id}-description` : undefined}
          />
        );
      case 'number':
      case 'integer':
        return (
          <input
            type="number"
            id={id}
            name={propertyKey}
            value={value === undefined || value === null || isNaN(value) ? '' : String(value)}
            onChange={handleChange}
            className={commonInputClasses}
            placeholder={t(schema.description || schema.title || propertyKey)}
            min={schema.minimum}
            max={schema.maximum}
            step={schema.type === 'integer' ? 1 : 'any'}
            disabled={isReadOnly}
            readOnly={isReadOnly}
            aria-describedby={schema.description ? `${id}-description` : undefined}
          />
        );
      case 'boolean':
        return (
          <div className="mt-2 flex items-center">
            <input
              type="checkbox"
              id={id}
              name={propertyKey}
              checked={!!value} // Ensure value is treated as boolean for checked state
              onChange={handleChange}
              className={checkboxClasses}
              disabled={isReadOnly}
              aria-describedby={schema.description ? `${id}-description` : undefined}
            />
             {/* No label directly next to checkbox for now, title is above */}
          </div>
        );
      default:
        // Fallback for object types that might be nested and not handled by ArrayOfObjectsField
        // This could happen if a schema has a property of type 'object' directly.
        // For now, we'll render it as a JSON string as a basic fallback, similar to complex arrays before ArrayOfObjectsField.
        if (schema.type === 'object') {
            const handleObjectJsonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
                const newJsonString = e.target.value;
                setLocalJsonString(newJsonString);
                try {
                    const parsedObject = JSON.parse(newJsonString);
                    if (typeof parsedObject === 'object' && !Array.isArray(parsedObject) && parsedObject !== null) {
                        onChange(parsedObject);
                        setJsonParseError(null);
                    } else {
                        setJsonParseError("Input must be a valid JSON object.");
                    }
                } catch (error) {
                    setJsonParseError("Invalid JSON syntax for object.");
                }
            };
             useEffect(() => { // Specific useEffect for object type
                setLocalJsonString(JSON.stringify(value || {}, null, 2));
                setJsonParseError(null);
             }, [value]);


            return (
                 <>
                    <textarea
                        id={id}
                        name={propertyKey}
                        value={localJsonString}
                        onChange={handleObjectJsonChange}
                        rows={4}
                        className={`${commonInputClasses} font-mono text-xs ${jsonParseError ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
                        placeholder={`Enter JSON for ${t(schema.title || propertyKey)}`}
                        disabled={isReadOnly}
                        aria-describedby={schema.description ? `${id}-description` : undefined}
                        aria-invalid={!!jsonParseError}
                    />
                    {jsonParseError && <p className="mt-1 text-xs text-red-600">{jsonParseError}</p>}
                </>
            );
        }
        return <p className="text-red-500 text-sm py-2">Unsupported field type: {schema.type} for "{t(schema.title || propertyKey)}"</p>;
    }
  };

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center">
        <label htmlFor={id} className="block text-sm font-medium text-slate-700">
          {t(schema.title || propertyKey)}
        </label>
        {schema.aiGenConfig && onOpenAIGenerate && (
          <Button onClick={handleAITrigger} size="sm" variant="secondary" className="ml-2 !px-2 !py-1 !text-xs">
            <i className="material-icons-round text-sm mr-1">auto_awesome</i>
            AI Generate
          </Button>
        )}
      </div>
      {renderInput()}
      {schema.description && (
         <p className="mt-1 text-xs text-slate-500" id={`${id}-description`}>{t(schema.description)}</p>
       )}
    </div>
  );
};

export default FormField;
