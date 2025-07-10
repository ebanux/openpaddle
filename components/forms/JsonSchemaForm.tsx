

import React, { useState, useEffect, useCallback } from 'react';
import { JsonSchema, SchemaProperty, AdminDashboardData } from '../../types';
import FormField from './FormField';
import Button from '../common/Button';

interface JsonSchemaFormProps {
  schema: JsonSchema;
  initialData: any; 
  onSubmit: (data: any) => void; 
  onCancel: () => void;
  isReadOnly?: (fieldKey: string) => boolean;
  onDataChange?: (data: any) => void; 
  submitButtonTitle?: string;
  hideButtons?: boolean;
  entityType?: string;
  adminData?: AdminDashboardData;
  onOpenAIGenerate?: (config: any, fieldKey: string, fieldLabel: string, currentValue: any, contextValue: string) => void;
}

const JsonSchemaForm: React.FC<JsonSchemaFormProps> = ({ 
  schema, 
  initialData, 
  onSubmit, 
  onCancel, 
  isReadOnly, 
  onDataChange,
  submitButtonTitle = "Save Config",
  hideButtons = false,
  entityType,
  adminData,
  onOpenAIGenerate,
}) => {
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    const newFormData: any = {};
    if (schema.type === 'object' && schema.properties) {
      for (const key in schema.properties) {
        if (initialData && initialData.hasOwnProperty(key) && initialData[key] !== undefined) {
          newFormData[key] = initialData[key];
        } else {
          const propSchema = schema.properties[key] as SchemaProperty;
          if (propSchema.default !== undefined) {
            // Deep copy default value to avoid modifying the schema's default
            let defaultValue = JSON.parse(JSON.stringify(propSchema.default));
            
            // If schema expects an array but default is a comma-separated string (for simple types)
            if (propSchema.type === 'array' && 
                (propSchema.items?.type === 'string' || propSchema.items?.type === 'number') && 
                typeof defaultValue === 'string') {
              const parts = defaultValue.split(',').map((s:string) => s.trim()).filter((s:string) => s);
              if (propSchema.items.type === 'number') {
                newFormData[key] = parts.map(Number).filter((n:number) => !isNaN(n));
              } else {
                newFormData[key] = parts;
              }
            } else {
              newFormData[key] = defaultValue;
            }
          } else if (propSchema.type === 'array') {
             newFormData[key] = []; // Default to empty array if no schema default
          } else if (propSchema.type === 'object') {
             newFormData[key] = {}; // Default to empty object
          }
          // Other types will remain undefined if no initialData and no schema default
        }
      }
      setFormData(newFormData);
    } else if (schema.type === 'array' && (schema.items?.type === 'number' || schema.items?.type === 'string')) {
      // This specific block handles cases where THE SCHEMA ITSELF is an array of simple types.
      // The form UI for this currently uses a single comma-separated text input.
      let arrayValueToConvert: any[] = [];
      if (initialData && Array.isArray(initialData)) {
        arrayValueToConvert = initialData;
      } else if (schema.default !== undefined && Array.isArray(schema.default)) {
        arrayValueToConvert = JSON.parse(JSON.stringify(schema.default));
      }
      setFormData({ arrayData: arrayValueToConvert.join(', ') });
    } else {
      setFormData(initialData || {}); // Fallback for other schema types or if initialData is null
    }
  }, [initialData, schema]);


  const handleInputChange = useCallback((key: string, value: any) => {
    setFormData((prev: any) => {
      const updatedData = { ...prev, [key]: value };
      if (onDataChange) {
        onDataChange(updatedData); 
      }
      return updatedData;
    });
  }, [onDataChange]);
  
  const handleFileChange = useCallback((key: string, file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
        setFormData((prev: any) => {
            const updatedData = {
                ...prev,
                [key]: reader.result, // fileUrl
                fileName: file.name,
                fileType: file.type || 'unknown',
                fileSize: Math.round(file.size / 1024), // in KB
            };
            if (onDataChange) {
                onDataChange(updatedData);
            }
            return updatedData;
        });
    };
    reader.onerror = () => {
        console.error("Error reading file.");
        alert("There was an error reading the file.");
    };
    reader.readAsDataURL(file);
  }, [onDataChange]);


  const handleSubmitInternal = (e: React.FormEvent) => {
    e.preventDefault();
    let processedData = { ...formData }; // Operate on a copy

    // If the schema itself is an array of simple types, process 'arrayData'
    if (schema.type === 'array' && (schema.items?.type === 'number' || schema.items?.type === 'string')) {
      const parts = (formData.arrayData || '').split(',').map((s: string) => s.trim()).filter((s: string) => s !== '');
      if (schema.items?.type === 'number') {
        processedData = parts.map(Number).filter((n: number) => !isNaN(n));
      } else {
        processedData = parts;
      }
    }
    
    if (onDataChange) { 
        onDataChange(processedData);
    }
    onSubmit(processedData); 
  };
  
  if (!schema) return <p>No schema provided.</p>;

  return (
    <>
      <form onSubmit={handleSubmitInternal} className="space-y-6 bg-white p-6 shadow-lg rounded-lg">
        <h3 className="text-lg font-semibold leading-6 text-slate-800">{schema.title || 'Edit Page Configuration'}</h3>
        
        {schema.type === 'object' && schema.properties && Object.keys(schema.properties).map((key) => {
          const propSchema = schema.properties![key] as SchemaProperty;
          const fieldId = `form-${key}`;
          return (
            <FormField
              key={key}
              id={fieldId}
              propertyKey={key}
              schema={propSchema}
              value={formData[key]}
              onChange={(value) => handleInputChange(key, value)}
              onFileChange={(file) => handleFileChange(key, file)}
              isReadOnly={isReadOnly ? isReadOnly(key) : propSchema.readOnly || (key === 'id')}
              entityType={entityType}
              adminData={adminData}
              onOpenAIGenerate={onOpenAIGenerate}
              contextData={formData}
            />
          );
        })}

        {/* This part is for when the entire schema is an array of simple types (e.g. a list of tags) */}
        {schema.type === 'array' && (schema.items?.type === 'number' || schema.items?.type === 'string') && (
          <div>
            <label htmlFor="arrayData" className="block text-sm font-medium text-slate-700">
              {schema.title || 'Items (comma-separated)'}
            </label>
            <input
              type="text"
              id="arrayData"
              name="arrayData"
              value={formData.arrayData || ''} // This uses the 'arrayData' field specifically for this schema type
              onChange={(e) => handleInputChange('arrayData', e.target.value)} 
              className="mt-1 block w-full px-3 py-2 bg-slate-100 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder={schema.description || "Enter values separated by commas"}
            />
            {schema.description && (
              <p className="mt-1 text-xs text-slate-500">{schema.description}</p>
            )}
          </div>
        )}

        {!hideButtons && (
          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="secondary" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              {submitButtonTitle}
            </Button>
          </div>
        )}
      </form>
    </>
  );
};

export default JsonSchemaForm;
