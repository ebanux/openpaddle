import React from 'react';
import { AdminDashboardData, StripeTaxRate, StripeShippingRate } from '../../types';

interface CheckboxGroupFieldProps {
  id: string;
  label: string;
  value: string[]; // Array of selected IDs
  onChange: (value: string[]) => void;
  optionsSource: 'taxRates' | 'shippingRates';
  adminData?: AdminDashboardData;
  isReadOnly?: boolean;
}

const CheckboxGroupField: React.FC<CheckboxGroupFieldProps> = ({
  id,
  label,
  value = [],
  onChange,
  optionsSource,
  adminData,
  isReadOnly = false,
}) => {
  const options: (StripeTaxRate | StripeShippingRate)[] = adminData?.[optionsSource] || [];

  const handleCheckboxChange = (optionId: string) => {
    if (isReadOnly) return;
    const newValue = [...value];
    const currentIndex = newValue.indexOf(optionId);

    if (currentIndex === -1) {
      newValue.push(optionId);
    } else {
      newValue.splice(currentIndex, 1);
    }
    onChange(newValue);
  };
  
  const getOptionLabel = (option: StripeTaxRate | StripeShippingRate): string => {
      if ('percentage' in option) { // It's a TaxRate
          return `${option.display_name} (${option.percentage}%)`;
      }
      if ('fixed_amount' in option) { // It's a ShippingRate
          const currencySymbol = option.fixed_amount.currency === 'usd' ? '$' : option.fixed_amount.currency;
          const amount = (option.fixed_amount.amount / 100).toFixed(2);
          return `${option.display_name} (${currencySymbol}${amount})`;
      }
      return 'Unknown Option';
  };

  if (!adminData || options.length === 0) {
    return (
      <div className="p-3 border border-slate-200 rounded-lg bg-slate-50 shadow-inner">
        <label className="block text-md font-semibold text-slate-800 mb-2">{label}</label>
        <p className="text-sm text-slate-500 italic">
          No {optionsSource === 'taxRates' ? 'tax rates' : 'shipping rates'} found. Please create them in the Admin Dashboard first.
        </p>
      </div>
    );
  }

  return (
    <div className="mb-4 p-3 border border-slate-200 rounded-lg bg-slate-50/50 shadow-inner">
      <fieldset>
        <legend className="block text-md font-semibold text-slate-800 mb-2">{label}</legend>
        <div className="space-y-2">
          {options.map((option) => (
            <div key={option.id} className="relative flex items-start">
              <div className="flex h-6 items-center">
                <input
                  id={`${id}-${option.id}`}
                  name={`${id}-${option.id}`}
                  type="checkbox"
                  checked={value.includes(option.id)}
                  onChange={() => handleCheckboxChange(option.id)}
                  disabled={isReadOnly || !option.active}
                  className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-600 disabled:opacity-50"
                />
              </div>
              <div className="ml-3 text-sm leading-6">
                <label htmlFor={`${id}-${option.id}`} className={`font-medium ${option.active ? 'text-slate-900' : 'text-slate-400'}`}>
                  {getOptionLabel(option)} {!option.active && '(Inactive)'}
                </label>
              </div>
            </div>
          ))}
        </div>
      </fieldset>
    </div>
  );
};

export default CheckboxGroupField;
