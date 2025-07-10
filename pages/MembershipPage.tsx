

import React, { useState, useEffect, useMemo } from 'react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { CURRENCY_SYMBOLS, ThemeDefinition } from '../constants'; 
import { SubscriptionPlan, MembershipAccessPageProps, StripeLineItem, MonetizationUseCase, StripeCustomField } from '../types'; 

interface PlanCardProps {
  plan: SubscriptionPlan; 
  onSelect: (plan: SubscriptionPlan) => void;
  theme: ThemeDefinition; 
  isSelected: boolean;
}

const PlanCard: React.FC<PlanCardProps> = ({ plan, onSelect, theme, isSelected }) => {
  const currencySymbol = CURRENCY_SYMBOLS[plan.currency] || '$';
  
  const accentColorClass = theme.buttonPrimaryClass.includes('sky') ? 'text-sky-500' : 
                         theme.buttonPrimaryClass.includes('cyan') ? 'text-cyan-500' :
                         theme.buttonPrimaryClass.includes('red') ? 'text-red-500' :
                         theme.buttonPrimaryClass.includes('lime') ? 'text-lime-400' :
                         'text-blue-600';

  let borderClass = isSelected ? `border-2 ${accentColorClass.replace('text-','border-')}` : `border ${theme.inputBorderClass || 'border-slate-300'}`;

  return (
    <Card className={`relative text-center p-6 transition-all duration-200 cursor-pointer ${theme.cardBgClass} ${borderClass}`} onClick={() => onSelect(plan)}>
      {plan.name.toLowerCase().includes('year') && (
         <div className={`absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-semibold px-3 py-1 rounded-full z-10 ${theme.buttonPrimaryClass}`}>
          Best Value
        </div>
      )}
      <h3 className="text-2xl font-semibold mb-2">{plan.name}</h3>
      <p className={`text-3xl font-bold ${accentColorClass} mb-1`}>
        {currencySymbol}{plan.price.toFixed(2)}
        <span className="text-sm font-normal opacity-75">/{plan.billingCycle}</span>
      </p>
      <p className="opacity-75 mb-4 text-sm">Billed {plan.billingCycle}</p>
    </Card>
  );
};

const MembershipPage: React.FC<MembershipAccessPageProps> = ({ onAddToCart, initialData, isLivePreview, theme, environment }) => {
  const [currentData, setCurrentData] = useState(initialData);
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [customFieldValues, setCustomFieldValues] = useState<{ [key: string]: string | number }>({});

  const plans = useMemo((): SubscriptionPlan[] => {
    return (currentData.line_items || []).map(li => ({
        id: li.id || li.price || `price_${li.price_data?.product_data?.name}`,
        name: li.price_data?.product_data?.name || '',
        price: (li.price_data?.unit_amount || 0) / 100,
        billingCycle: li.price_data?.recurring?.interval === 'year' ? 'yearly' : 'monthly',
        features: (li.price_data?.product_data?.description || '').split(','),
        currency: (li.price_data?.currency || 'usd').toUpperCase(),
    }));
  }, [currentData.line_items]);

  useEffect(() => {
    setCurrentData(initialData);
    if (plans && plans.length > 0) {
        const yearlyPlan = plans.find(p => p.billingCycle === 'yearly');
        setSelectedPlanId(yearlyPlan ? yearlyPlan.id : plans[0].id);
    }
    setCustomFieldValues({});
  }, [initialData, plans]);
  
  const handleCustomFieldChange = (key: string, value: string | number) => {
    setCustomFieldValues(prev => ({ ...prev, [key]: value }));
  };

  const handleSubscribe = () => {
    const selectedPlan = plans.find(p => p.id === selectedPlanId);
    if (!selectedPlan) {
        alert("Please select a membership plan.");
        return;
    }
    const lineItemToPurchase = currentData.line_items.find(li => 
        li.id === selectedPlan.id || li.price === selectedPlan.id
    );

    if (!lineItemToPurchase) {
        alert("Selected plan configuration is missing.");
        return;
    }
    
    onAddToCart(lineItemToPurchase, { customFieldsData: customFieldValues });
  };

  if (!currentData || !currentData.pageTitle) {
     return (
      <div className="p-6 text-center opacity-75">
        Membership page data is not available.
        {isLivePreview && " Try selecting a template or editing."}
      </div>
    );
  }

  const inputClasses = `w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 ${theme.inputBgClass || 'bg-slate-50'} ${theme.inputTextClass || ''} ${theme.inputBorderClass || 'border-slate-300'}`;

  return (
    <div className="space-y-8 max-w-lg mx-auto">
      <Card className={`${theme.cardBgClass} text-center`}>
        <div className="p-6">
            {currentData.header_image_url && <img src={currentData.header_image_url} alt={`${currentData.pageTitle} header`} className="w-24 h-24 object-cover rounded-full mb-4 shadow-md mx-auto" />}
            <h2 className="text-3xl font-bold mb-2">{currentData.pageTitle}</h2>
            <p className="opacity-90 max-w-xl mx-auto">
            {currentData.pageDescription}
            </p>
        </div>
      </Card>
      
      <Card className={theme.cardBgClass}>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-4">Choose Your Plan</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {plans.map((plan) => (
                <PlanCard 
                    key={plan.id} 
                    plan={plan} 
                    onSelect={(p) => setSelectedPlanId(p.id)}
                    theme={theme} 
                    isSelected={selectedPlanId === plan.id}
                />
                ))}
            </div>
            
            <h3 className="text-xl font-semibold mb-4 pt-4 border-t">Membership Includes:</h3>
            <ul className="space-y-2 opacity-90 mb-6 text-sm">
                {(currentData.benefits || []).map((feature, index) => (
                    <li key={index} className="flex items-center">
                    <i className="material-icons-round text-green-500 mr-2 shrink-0">check_circle</i>
                    {feature}
                    </li>
                ))}
            </ul>
            
            {currentData.custom_fields && currentData.custom_fields.length > 0 && (
                <div className="my-6">
                {currentData.custom_fields.map((field: StripeCustomField) => (
                    <div key={field.key} className="mb-4">
                    <label htmlFor={field.key} className="block text-sm font-medium opacity-90 mb-1">
                        {field.label.custom} {!field.optional && <span className="text-red-500">*</span>}
                    </label>
                    <input
                        type={field.type === 'numeric' ? 'number' : 'text'}
                        id={field.key}
                        value={customFieldValues[field.key] || ''}
                        onChange={(e) => handleCustomFieldChange(field.key, e.target.value)}
                        className={inputClasses}
                        required={!field.optional}
                        placeholder={field.label.custom}
                    />
                    </div>
                ))}
                </div>
            )}

            <Button onClick={handleSubscribe} fullWidth size="lg" className={theme.buttonPrimaryClass}>Join Now</Button>

          </div>
      </Card>
    </div>
  );
};

export default MembershipPage;
