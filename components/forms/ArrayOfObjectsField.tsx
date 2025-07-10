

import React from 'react';
import { JsonSchema, SchemaProperty } from '../../types';
import FormField from './FormField'; // Assuming FormField is in the same directory or correct relative path
import Button from '../common/Button'; // Assuming Button is in components/common

interface ArrayOfObjectsFieldProps {
  id: string;
  label: string;
  value: any[];
  itemSchema: JsonSchema; // Schema for each object in the array
  onChange: (value: any[]) => void;
  isReadOnly?: boolean;
  itemTitleKey?: string; // Key to use for titling each item's "card"
}

const getNestedValue = (obj: any, path: string): string => {
  if (!path || !obj) return '';
  const keys = path.split('.');
  let result = obj;
  for (const key of keys) {
    result = result?.[key];
    if (result === undefined || result === null) return '';
  }
  return String(result);
};

const ArrayOfObjectsField: React.FC<ArrayOfObjectsFieldProps> = ({
  id,
  label,
  value = [], // Ensure value is always an array
  itemSchema,
  onChange,
  isReadOnly = false,
  itemTitleKey,
}) => {
  const handleAddItem = () => {
    const newItem: { [key: string]: any } = {};
    // Initialize with default values from schema if available
    if (itemSchema.properties) {
      Object.keys(itemSchema.properties).forEach(propKey => {
        const prop = itemSchema.properties![propKey] as SchemaProperty;
        if (prop.default !== undefined) {
          newItem[propKey] = prop.default;
        } else {
          // Basic type defaults
          if (prop.type === 'string') newItem[propKey] = '';
          else if (prop.type === 'number' || prop.type === 'integer') newItem[propKey] = 0;
          else if (prop.type === 'boolean') newItem[propKey] = false;
          else if (prop.type === 'array') newItem[propKey] = [];
          else if (prop.type === 'object') newItem[propKey] = {};
        }
      });
    }
    onChange([...value, newItem]);
  };

  const handleRemoveItem = (index: number) => {
    const newValue = [...value];
    newValue.splice(index, 1);
    onChange(newValue);
  };

  const handleItemChange = (index: number, propertyKey: string, propertyValue: any) => {
    const newValue = [...value];
    newValue[index] = {
      ...newValue[index],
      [propertyKey]: propertyValue,
    };
    onChange(newValue);
  };

  const handleMoveItem = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === value.length - 1) return;

    const newArray = [...value];
    const itemToMove = newArray[index];
    newArray.splice(index, 1); // Remove item from original position

    const newIndex = direction === 'up' ? index - 1 : index + 1;
    newArray.splice(newIndex, 0, itemToMove); // Insert item at new position

    onChange(newArray);
  };


  const singularLabel = label.endsWith('s') ? label.slice(0, -1) : label;

  return (
    <div className="mb-4 p-3 border border-slate-200 rounded-lg bg-slate-50/50 shadow-inner">
      <label className="block text-md font-semibold text-slate-800 mb-3">{label}</label>
      {value.map((item, index) => {
        const itemTitle = itemTitleKey ? getNestedValue(item, itemTitleKey) : '';
        const displayTitle = itemTitle || `${singularLabel} ${index + 1}`;

        return (
          <div key={index} className="mb-4 p-4 border border-slate-300 rounded-lg bg-white shadow-md relative">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-semibold text-slate-700 truncate pr-2" title={displayTitle}>
                {displayTitle}
              </h4>
              <div className="flex space-x-1 flex-shrink-0">
                <Button
                    onClick={() => handleMoveItem(index, 'up')}
                    disabled={index === 0 || isReadOnly}
                    variant="secondary"
                    size="sm"
                    className="!p-1.5"
                    aria-label={`Move ${displayTitle} up`}
                >
                    <i className="material-icons-round text-base">arrow_upward</i>
                </Button>
                 <Button
                    onClick={() => handleMoveItem(index, 'down')}
                    disabled={index === value.length - 1 || isReadOnly}
                    variant="secondary"
                    size="sm"
                    className="!p-1.5"
                    aria-label={`Move ${displayTitle} down`}
                >
                   <i className="material-icons-round text-base">arrow_downward</i>
                </Button>
                {!isReadOnly && (
                  <Button
                    onClick={() => handleRemoveItem(index)}
                    variant="danger"
                    size="sm"
                    className="!p-1.5"
                    aria-label={`Remove ${displayTitle}`}
                  >
                    <i className="material-icons-round text-base">delete</i>
                  </Button>
                )}
              </div>
            </div>
            {itemSchema.properties && Object.keys(itemSchema.properties).map(propKey => {
              const propSchema = itemSchema.properties![propKey] as SchemaProperty;
              return (
                <FormField
                  key={`${id}-${index}-${propKey}`}
                  id={`${id}-${index}-${propKey}`}
                  propertyKey={propKey}
                  schema={propSchema}
                  value={item[propKey]}
                  onChange={(propValue) => handleItemChange(index, propKey, propValue)}
                  onFileChange={() => {
                    // This is a placeholder. File uploads within ArrayOfObjectsField are not supported in this way.
                    console.warn('File uploads are not supported within this array editor.');
                  }}
                  isReadOnly={isReadOnly}
                />
              );
            })}
          </div>
        );
      })}
      {!isReadOnly && (
        <Button onClick={handleAddItem} variant="secondary" size="sm">
          <i className="material-icons-round text-base mr-1.5">add</i>
          Add New {singularLabel}
        </Button>
      )}
      {value.length === 0 && isReadOnly && (
        <p className="text-sm text-slate-500 italic">No {label.toLowerCase()} configured.</p>
      )}
    </div>
  );
};

export default ArrayOfObjectsField;