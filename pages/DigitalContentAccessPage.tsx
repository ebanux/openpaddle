

import React, { useState, useEffect, useMemo } from 'react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { CURRENCY_SYMBOLS } from '../constants';
import { DigitalContentAccessPageProps, StripeLineItem, MonetizationUseCase, StripeCustomField } from '../types';

const DigitalContentAccessPage: React.FC<DigitalContentAccessPageProps> = ({ onAddToCart, initialData, isLivePreview, theme, environment, adminData }) => {
  const [currentData, setCurrentData] = useState<DigitalContentAccessPageProps['initialData']>(initialData);
  const [customFieldValues, setCustomFieldValues] = useState<{ [key: string]: string | number }>({});

  const price = useMemo(() => {
    if (!initialData.line_items || initialData.line_items.length === 0) return 0;
    const lineItem = initialData.line_items[0];

    if (lineItem.price_data) {
        return (lineItem.price_data.unit_amount || 0) / 100;
    } else if (lineItem.price && adminData) {
        const priceInfo = adminData.prices.find(p => p.id === lineItem.price);
        return priceInfo ? (priceInfo.unit_amount || 0) / 100 : 0;
    }
    return 0;
  }, [initialData.line_items, adminData]);


  useEffect(() => {
    setCurrentData(initialData);
    setCustomFieldValues({});
  }, [initialData]);

  const currencySymbol = CURRENCY_SYMBOLS[currentData.currency] || '$';

  const handleCustomFieldChange = (key: string, value: string | number) => {
    setCustomFieldValues(prev => ({ ...prev, [key]: value }));
  };

  const handleBuyNow = () => {
    if (!currentData || price === undefined) return;

    // Validate custom fields
    for (const field of currentData.custom_fields || []) {
        if (!field.optional && !customFieldValues[field.key]) {
            alert(`Please fill out the required field: ${field.label.custom}`);
            return;
        }
    }

    const lineItemToPurchase = currentData.line_items[0]; 
    if (!lineItemToPurchase) {
        alert("Content configuration error. Please check settings.");
        return;
    }
    
    onAddToCart({ ...lineItemToPurchase, quantity: 1 }, { customFieldsData: customFieldValues });
  };
  
  if (!currentData || !currentData.contentTitle) {
    return (
      <div className="p-6 text-center opacity-75">
        Digital content data is not available.
        {isLivePreview && " Try selecting a template or editing."}
      </div>
    );
  }

  const accentColorClass = theme.buttonPrimaryClass.includes('sky') ? 'text-sky-500' : 
                         theme.buttonPrimaryClass.includes('cyan') ? 'text-cyan-500' :
                         theme.buttonPrimaryClass.includes('red') ? 'text-red-500' :
                         theme.buttonPrimaryClass.includes('lime') ? 'text-lime-400' :
                         theme.buttonPrimaryClass.includes('purple') ? 'text-purple-500' :
                         'text-blue-600';
  const inputClasses = `w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 ${theme.inputBgClass || 'bg-slate-50'} ${theme.inputTextClass || ''} ${theme.inputBorderClass || 'border-slate-300'}`;

  const isVideoUrl = (url: string = '') => {
    return url.includes('youtube.com') || url.includes('youtu.be') || url.includes('vimeo.com');
  }
  
  const getEmbedUrl = (url: string = '') => {
    if (url.includes('youtube.com/watch?v=')) {
      return url.replace('watch?v=', 'embed/');
    }
    if (url.includes('youtu.be/')) {
      return url.replace('youtu.be/', 'youtube.com/embed/');
    }
    if (url.includes('vimeo.com/')) {
      const videoId = url.substring(url.lastIndexOf('/') + 1);
      return `https://player.vimeo.com/video/${videoId}`;
    }
    return url;
  }

  return (
    <div className="max-w-xl mx-auto space-y-6">
      {(currentData.previewImageUrlOrVideoUrl || currentData.header_image_url) && (
        <Card className={`overflow-hidden ${theme.cardBgClass}`}>
          {isVideoUrl(currentData.previewImageUrlOrVideoUrl || currentData.header_image_url) ? (
            <div className="aspect-w-16 aspect-h-9">
              <iframe 
                src={getEmbedUrl(currentData.previewImageUrlOrVideoUrl || currentData.header_image_url)}
                title={`${currentData.contentTitle} preview video`}
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          ) : (
            <img 
              src={currentData.previewImageUrlOrVideoUrl || currentData.header_image_url} 
              alt={`${currentData.contentTitle} preview`} 
              className="w-full h-auto object-cover max-h-96" 
            />
          )}
        </Card>
      )}

      <Card className={theme.cardBgClass}>
        <div className="p-6">
          <h2 className="text-3xl font-bold mb-2">{currentData.contentTitle}</h2>
          {currentData.creatorName && (
            <p className={`text-md font-medium ${accentColorClass} mb-3`}>By {currentData.creatorName}</p>
          )}
          <p className="opacity-90 mb-4 whitespace-pre-line">{currentData.page_description || currentData.contentDescription}</p>
          
          <div className={`${theme.inputBgClass || 'bg-slate-50'} p-4 rounded-lg my-6 text-center shadow-inner`}>
            <p className={`text-2xl font-bold ${accentColorClass}`}>
              Price: {currencySymbol}{price.toFixed(2)}
            </p>
          </div>
          
          <Button onClick={handleBuyNow} fullWidth size="lg" className={`${theme.buttonPrimaryClass} mt-6`}>
            Add to Cart
          </Button>

          {currentData.accessInstructions && (
            <div className={`mt-6 p-3 rounded-md ${theme.inputBgClass || 'bg-slate-100'} border ${theme.inputBorderClass || 'border-slate-200'}`}>
              <h4 className="font-semibold opacity-90 mb-1 text-sm">How to Access:</h4>
              <p className="text-xs opacity-80 whitespace-pre-line">{currentData.accessInstructions}</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default DigitalContentAccessPage;
