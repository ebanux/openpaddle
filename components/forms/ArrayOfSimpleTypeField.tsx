
import React from 'react';
import Button from '../common/Button';

interface ArrayOfSimpleTypeFieldProps {
  id: string;
  label: string;
  value: (string | number)[];
  itemType: 'string' | 'number';
  onChange: (value: (string | number)[]) => void;
  isReadOnly?: boolean;
  placeholder?: string;
}

const ArrayOfSimpleTypeField: React.FC<ArrayOfSimpleTypeFieldProps> = ({
  id,
  label,
  value = [],
  itemType,
  onChange,
  isReadOnly = false,
  placeholder = '',
}) => {
  const handleAddItem = () => {
    onChange([...value, itemType === 'number' ? 0 : '']);
  };

  const handleRemoveItem = (index: number) => {
    const newValue = [...value];
    newValue.splice(index, 1);
    onChange(newValue);
  };

  const handleItemChange = (index: number, itemValue: string) => {
    const newValue = [...value];
    newValue[index] = itemType === 'number' ? parseFloat(itemValue) || 0 : itemValue;
    onChange(newValue);
  };

  const inputClasses = "flex-grow px-3 py-2 bg-slate-100 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm disabled:bg-slate-200 disabled:text-slate-500";

  return (
    <div className="mb-4 p-3 border border-slate-200 rounded-lg bg-slate-50/50 shadow-inner">
      <label className="block text-md font-semibold text-slate-800 mb-2">{label}</label>
      {value.map((item, index) => (
        <div key={index} className="flex items-center space-x-2 mb-2">
          <input
            type={itemType === 'number' ? 'number' : 'text'}
            id={`${id}-${index}`}
            value={item}
            onChange={(e) => handleItemChange(index, e.target.value)}
            className={inputClasses}
            placeholder={placeholder}
            disabled={isReadOnly}
            aria-label={`${label} item ${index + 1}`}
          />
          {!isReadOnly && (
            <Button
              onClick={() => handleRemoveItem(index)}
              variant="danger"
              size="sm"
              className="!p-1.5 flex-shrink-0"
              aria-label={`Remove ${label} item ${index + 1}`}
            >
              <i className="material-icons-round text-base">delete</i>
            </Button>
          )}
        </div>
      ))}
      {!isReadOnly && (
        <Button onClick={handleAddItem} variant="secondary" size="sm" className="mt-1">
           <i className="material-icons-round text-base mr-1.5">add</i>
          Add New Item
        </Button>
      )}
      {value.length === 0 && isReadOnly && (
        <p className="text-sm text-slate-500 italic">No items.</p>
      )}
    </div>
  );
};

export default ArrayOfSimpleTypeField;