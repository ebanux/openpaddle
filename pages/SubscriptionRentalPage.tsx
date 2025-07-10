

import React, { useState, useEffect, useMemo } from 'react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { CURRENCY_SYMBOLS, ThemeDefinition } from '../constants'; 
import { SubscriptionPlan, SubscriptionPageLinkConfig, SubscriptionRentalPageProps, StripeLineItem, MonetizationUseCase, StripeCustomField } from '../types'; 

interface SubscriptionPlanCardDisplayProps {
  plan: SubscriptionPlan; 
  onSelect: (plan: SubscriptionPlan) => void;
  theme: ThemeDefinition; 
  isSelected: boolean;
}

const SubscriptionPlanCardDisplay: React.FC<SubscriptionPlanCardDisplayProps> = ({ plan, onSelect, theme, isSelected }) => {
  const currencySymbol = CURRENCY_SYMBOLS[plan.currency] || '$';
  const isPopular = plan.id === 'sub_premium' || plan.id === 'sw_pro' || plan.id === 'coffee_double'; 
  
  let buttonClass = theme.buttonSecondaryClass;
  if (isSelected) {
      buttonClass = theme.buttonPrimaryClass;
  }

  return (
    <Card className={`relative text-center p-6 transition-all duration-200 cursor-pointer ${theme.cardBgClass} ${isSelected ? `ring-2 ${theme.buttonPrimaryClass.includes('sky') ? 'ring-sky-500' : theme.buttonPrimaryClass.includes('cyan') ? 'ring-cyan-500' : theme.buttonPrimaryClass.includes('red') ? 'ring-red-500' : 'ring-blue-500'}` : ''}`} onClick={() => onSelect(plan)}>
      {isPopular && (
         <div className={`absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-semibold px-3 py-1 rounded-full z-10 ${theme.buttonPrimaryClass}`}>
          Popular
        </div>
      )}
      <div className="p-6 flex flex-col h-full">
        <h3 className="text-2xl font-semibold mb-2">{plan.name}</h3>
        <p className={`text-3xl font-bold ${theme.buttonPrimaryClass.includes('sky') ? 'text-sky-500' : theme.buttonPrimaryClass.includes('cyan') ? 'text-cyan-500' : theme.buttonPrimaryClass.includes('red') ? 'text-red-500' : 'text-blue-600'} mb-1`}>
          {currencySymbol}{plan.price.toFixed(2)}
          <span className="text-sm font-normal opacity-75">/{plan.billingCycle}</span>
        </p>
        <p className="opacity-75 mb-4 text-sm">Billed {plan.billingCycle}</p>
        
        <ul className="space-y-2 opacity-90 mb-6 flex-grow text-left">
          {(plan.features || []).map((feature, index) => (
            <li key={index} className="flex items-center">
              <svg className={`w-5 h-5 ${theme.buttonPrimaryClass.includes('lime') ? 'text-lime-400' : 'text-green-500'} mr-2 shrink-0`} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
              </svg>
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
};

const SubscriptionRentalPage: React.FC<SubscriptionRentalPageProps> = ({ onAddToCart, initialData, isLivePreview, theme, environment, adminData }) => {
  const [currentData, setCurrentData] = useState<SubscriptionPageLinkConfig>(initialData);
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [customFieldValues, setCustomFieldValues] = useState<{ [key: string]: string | number }>({});

  const plans = useMemo((): SubscriptionPlan[] => {
    if (!currentData.line_items) return [];
    
    return currentData.line_items.map(li => {
      if (li.price_data) {
        // Unsaved template
        return {
          id: li.id || li.price || `price_${li.price_data.product_data.name}`,
          name: li.price_data.product_data.name || '',
          price: (li.price_data.unit_amount || 0) / 100,
          billingCycle: li.price_data.recurring?.interval === 'year' ? 'yearly' : 'monthly',
          features: (li.price_data.product_data.description || '').split(','),
          currency: (li.price_data.currency || 'usd').toUpperCase(),
        };
      } else if (li.price && adminData) {
        // Saved page
        const priceInfo = adminData.prices.find(p => p.id === li.price);
        if (priceInfo) {
          const productInfo = adminData.products.find(p => p.id === priceInfo.product);
          return {
            id: priceInfo.id,
            name: productInfo?.name || '',
            price: (priceInfo.unit_amount || 0) / 100,
            billingCycle: priceInfo.recurring?.interval === 'year' ? 'yearly' : 'monthly',
            features: (productInfo?.description || '').split(','),
            currency: (priceInfo.currency || 'usd').toUpperCase(),
          };
        }
      }
      return null;
    }).filter((p): p is SubscriptionPlan => p !== null);
  }, [currentData.line_items, adminData]);

  useEffect(() => {
    setCurrentData(initialData);
    if (plans && plans.length > 0) {
        const popularPlan = plans.find(p => p.id === 'sub_premium' || p.id === 'sw_pro' || p.id === 'coffee_double');
        setSelectedPlanId(popularPlan ? popularPlan.id : plans[0].id);
    } else {
        setSelectedPlanId(null);
    }
    setCustomFieldValues({});
  }, [initialData, plans]);
  
  const handleCustomFieldChange = (key: string, value: string | number) => {
    setCustomFieldValues(prev => ({ ...prev, [key]: value }));
  };

  const handleSubscribe = () => {
    const planFromUI = plans.find(p => p.id === selectedPlanId);
    if (!planFromUI) {
      alert("Please select a plan.");
      return;
    }

    const lineItemToPurchase = currentData.line_items.find(li => 
        li.price === planFromUI.id || (li.price_data && (li.id === planFromUI.id || li.price_data.product_data.name === planFromUI.name))
    );

    if (!lineItemToPurchase) {
        alert("Selected plan details are missing in the configuration.");
        return;
    }

    onAddToCart(lineItemToPurchase, { customFieldsData: customFieldValues });
  };

  if (!currentData || !currentData.pageTitle) {
     return (
      <div className="p-6 text-center opacity-75">
        Subscription page data is not available.
        {isLivePreview && " Try selecting a template or editing."}
      </div>
    );
  }

  const gridLayoutClasses = 'grid grid-cols-1 md:grid-cols-3 gap-6';
  
  const inputClasses = `w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 ${theme.inputBgClass || 'bg-slate-50'} ${theme.inputTextClass || ''} ${theme.inputBorderClass || 'border-slate-300'}`;

  return (
    <div className="space-y-8">
      <div className="text-center">
        {currentData.header_image_url && <img src={currentData.header_image_url} alt={`${currentData.pageTitle} header`} className="w-full h-48 object-cover rounded-lg mb-4 shadow-md" />}
        <h2 className="text-3xl font-bold mb-2">{currentData.pageTitle}</h2>
        <p className="opacity-90 max-w-xl mx-auto">
          {currentData.page_description || currentData.pageDescription}
        </p>
      </div>

      <div className={gridLayoutClasses}>
        {plans.map((plan) => (
          <SubscriptionPlanCardDisplay 
            key={plan.id} 
            plan={plan} 
            onSelect={(p) => setSelectedPlanId(p.id)}
            theme={theme} 
            isSelected={selectedPlanId === plan.id}
          />
        ))}
         {plans.length === 0 && (
            <Card className={`p-6 text-center opacity-75 md:col-span-2 lg:col-span-3 ${theme.cardBgClass}`}>
                No subscription plans available for this template.
            </Card>
        )}
      </div>

      <div className="text-center">
          <Button onClick={handleSubscribe} size="lg" className={theme.buttonPrimaryClass} disabled={!selectedPlanId}>
              Subscribe Now
          </Button>
      </div>

    </div>
  );
};

export default SubscriptionRentalPage;
