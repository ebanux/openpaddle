

import React, { useState, useEffect, useMemo } from 'react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { CURRENCY_SYMBOLS } from '../constants';
import { EventTicketSalesPageProps, TicketType, StripeLineItem, MonetizationUseCase, StripeCustomField } from '../types'; 

const EventTicketSalesPage: React.FC<EventTicketSalesPageProps> = ({ onAddToCart, initialData, isLivePreview, theme, environment, adminData }) => {
  const [currentData, setCurrentData] = useState<EventTicketSalesPageProps['initialData']>(initialData);
  const [customFieldValues, setCustomFieldValues] = useState<{ [key: string]: string | number }>({});
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const ticketTypes = useMemo((): TicketType[] => {
    if (!currentData.line_items) return [];

    return currentData.line_items.map(li => {
        if (li.price_data) {
            return {
                id: li.id || li.price || `price_${li.price_data.product_data.name}`,
                name: li.price_data.product_data.name || '',
                price: (li.price_data.unit_amount || 0) / 100,
                description: li.price_data.product_data.description || '',
            };
        } else if (li.price && adminData) {
            const priceInfo = adminData.prices.find(p => p.id === li.price);
            if (priceInfo) {
                const productInfo = adminData.products.find(p => p.id === priceInfo.product);
                return {
                    id: priceInfo.id,
                    name: productInfo?.name || '',
                    price: (priceInfo.unit_amount || 0) / 100,
                    description: productInfo?.description || '',
                };
            }
        }
        return null;
    }).filter((p): p is TicketType => p !== null);
  }, [currentData.line_items, adminData]);


  useEffect(() => {
    setCurrentData(initialData);
    setCustomFieldValues({});
    setQuantities({});
  }, [initialData]);

  const currencySymbol = CURRENCY_SYMBOLS[currentData.currency] || '$';

  const handleCustomFieldChange = (key: string, value: string | number) => {
    setCustomFieldValues(prev => ({ ...prev, [key]: value }));
  };
  
  const handleQuantityChange = (ticketId: string, delta: number) => {
    setQuantities(prev => ({
        ...prev,
        [ticketId]: Math.max(1, (prev[ticketId] || 1) + delta)
    }));
  };

  const handleBuyTicket = (ticket: TicketType) => {
    const lineItemToPurchase = currentData.line_items.find(li => 
      li.price === ticket.id || (li.price_data && (li.price_data.product_data.name === ticket.name || li.id === ticket.id))
    );

    if (!lineItemToPurchase) {
        alert(`Configuration error: Ticket type "${ticket.name}" not found in line items.`);
        return;
    }
    
    // Validate custom fields
    for (const field of currentData.custom_fields || []) {
        if (!field.optional && !customFieldValues[field.key]) {
            alert(`Please fill out the required field: ${field.label.custom}`);
            return;
        }
    }
    
    const quantity = quantities[ticket.id] || 1;

    const lineItemForCart: StripeLineItem = { ...lineItemToPurchase, quantity: quantity };
    
    const specificData = { 
        ticketTypeId: ticket.id, 
        quantity: quantity,
        customFieldsData: customFieldValues,
    };
    
    onAddToCart(lineItemForCart, specificData);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Date TBD';
    try {
      return new Date(dateString + 'T00:00:00Z').toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
    } catch (e) {
      return dateString; 
    }
  };

  const formatTime = (timeString: string) => {
    if (!timeString) return 'Time TBD';
    const [hours, minutes] = timeString.split(':');
    if (!hours || !minutes) return timeString;
    const h = parseInt(hours, 10);
    const m = parseInt(minutes, 10);
    if (isNaN(h) || isNaN(m)) return timeString;
    
    const ampm = h >= 12 ? 'PM' : 'AM';
    const displayHours = h % 12 || 12; 
    return `${displayHours}:${minutes.padStart(2, '0')} ${ampm}`;
  };
  
  if (!currentData || !currentData.eventTitle) {
     return (
      <div className="p-6 text-center opacity-75">
        Event ticket sales data is not available.
        {isLivePreview && " Try selecting a template or editing."}
      </div>
    );
  }

  const accentColorClass = theme.buttonPrimaryClass.includes('sky') ? 'text-sky-500' : 
                         theme.buttonPrimaryClass.includes('cyan') ? 'text-cyan-500' :
                         theme.buttonPrimaryClass.includes('red') ? 'text-red-500' :
                         theme.buttonPrimaryClass.includes('lime') ? 'text-lime-400' :
                         'text-blue-600';
  const inputClasses = `w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 ${theme.inputBgClass || 'bg-slate-50'} ${theme.inputTextClass || ''} ${theme.inputBorderClass || 'border-slate-300'}`;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {(currentData.eventBannerImageUrl || currentData.header_image_url) && (
        <Card className={`overflow-hidden ${theme.cardBgClass}`}>
          <img 
            src={currentData.eventBannerImageUrl || currentData.header_image_url} 
            alt={`${currentData.eventTitle} banner`} 
            className="w-full h-48 sm:h-64 object-cover" 
          />
        </Card>
      )}

      <Card className={theme.cardBgClass}>
        <div className="p-6">
          <h2 className="text-3xl font-bold mb-3">{currentData.eventTitle}</h2>
          
          <div className="space-y-2 mb-4 opacity-90">
            <p className="flex items-center">
              <i className={`material-icons-round text-lg mr-2 ${accentColorClass}`}>calendar_today</i>
              <span className="font-medium">{formatDate(currentData.eventDate)}</span>
            </p>
            <p className="flex items-center">
              <i className={`material-icons-round text-lg mr-2 ${accentColorClass}`}>schedule</i>
              <span className="font-medium">{formatTime(currentData.eventTime)}</span>
            </p>
            <p className="flex items-center">
              <i className={`material-icons-round text-lg mr-2 ${accentColorClass}`}>location_on</i>
              <span className="font-medium">{currentData.eventLocation}</span>
            </p>
            {currentData.organizerName && (
               <p className="flex items-center">
                <i className={`material-icons-round text-lg mr-2 ${accentColorClass}`}>person</i>
                Organized by: {currentData.organizerName}
              </p>
            )}
          </div>

          <p className="opacity-90 mb-6 whitespace-pre-line">{currentData.page_description || currentData.eventDescription}</p>

          {currentData.contactEmail && (
            <p className="text-sm opacity-75 mb-6">
              Questions? Contact <a href={`mailto:${currentData.contactEmail}`} className={`${accentColorClass} hover:underline`}>{currentData.contactEmail}</a>
            </p>
          )}

          {currentData.custom_fields && currentData.custom_fields.length > 0 && (
            <div className={`my-6 p-4 border rounded-lg ${theme.inputBgClass || 'bg-slate-100'}`}>
              <h3 className="text-lg font-semibold mb-3">Additional Information</h3>
              {currentData.custom_fields.map((field: StripeCustomField) => (
                <div key={field.key} className="mb-3">
                  <label htmlFor={field.key} className="block text-sm font-medium opacity-90 mb-1">
                    {field.label.custom} {!field.optional && <span className="text-red-500">*</span>}
                  </label>
                  {field.type === 'dropdown' && field.dropdown?.options ? (
                    <select
                      id={field.key}
                      value={customFieldValues[field.key] || ''}
                      onChange={(e) => handleCustomFieldChange(field.key, e.target.value)}
                      className={inputClasses}
                      required={!field.optional}
                    >
                      <option value="">Select {field.label.custom}</option>
                      {field.dropdown.options.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type === 'numeric' ? 'number' : 'text'}
                      id={field.key}
                      value={customFieldValues[field.key] || ''}
                      onChange={(e) => handleCustomFieldChange(field.key, e.target.value)}
                      className={inputClasses}
                      required={!field.optional}
                      placeholder={field.label.custom}
                      minLength={field.text?.minimum_length}
                      maxLength={field.text?.maximum_length}
                    />
                  )}
                </div>
              ))}
            </div>
          )}

          <h3 className={`text-xl font-semibold opacity-95 mb-4 pt-4 border-t ${theme.inputBorderClass || 'border-slate-200'}`}>Get Your Tickets</h3>
          {(ticketTypes.length > 0) ? (
            <div className="space-y-4">
              {ticketTypes.map((ticket) => {
                const lineItemConfig = currentData.line_items.find(li => li.price === ticket.id || (li.price_data && li.price_data.product_data.name === ticket.name));
                const quantity = quantities[ticket.id] || 1;
                return (
                  <Card key={ticket.id} className={`${theme.inputBgClass || 'bg-slate-50'} border ${theme.inputBorderClass || 'border-slate-200'} shadow-sm hover:shadow-md`}>
                    <div className="p-4">
                        <div className="sm:flex sm:justify-between sm:items-start">
                           <div className="mb-3 sm:mb-0">
                            <h4 className="text-lg font-semibold">{ticket.name}</h4>
                            {ticket.description && <p className="text-sm opacity-80 mt-1 max-w-xs">{ticket.description}</p>}
                            </div>
                            <div className="flex items-center space-x-4 flex-shrink-0">
                                <p className={`text-xl font-bold ${accentColorClass}`}>
                                    {currencySymbol}{ticket.price.toFixed(2)}
                                </p>
                                {lineItemConfig?.adjustable_quantity?.enabled && (
                                    <div className="flex items-center space-x-2" role="group" aria-label={`Quantity for ${ticket.name}`}>
                                        <Button type="button" size="sm" onClick={() => handleQuantityChange(ticket.id, -1)} disabled={quantity <= 1} className={`!p-1.5 w-8 h-8 ${theme.buttonSecondaryClass}`} aria-label={`Decrease quantity for ${ticket.name}`}>-</Button>
                                        <span className="text-lg font-medium w-8 text-center opacity-90" aria-live="polite" aria-atomic="true">{quantity}</span>
                                        <Button type="button" size="sm" onClick={() => handleQuantityChange(ticket.id, 1)} disabled={quantity >= (lineItemConfig.adjustable_quantity?.maximum || 10)} className={`!p-1.5 w-8 h-8 ${theme.buttonSecondaryClass}`} aria-label={`Increase quantity for ${ticket.name}`}>+</Button>
                                    </div>
                                )}
                            </div>
                        </div>
                        {lineItemConfig?.adjustable_quantity?.enabled && (
                            <div className="mt-4 pt-4 border-t border-dashed flex justify-end items-center space-x-4">
                                <p className="font-semibold text-slate-700">
                                    Total: {currencySymbol}{(ticket.price * quantity).toFixed(2)}
                                </p>
                                <Button type="button" onClick={() => handleBuyTicket(ticket)} size="md" className={theme.buttonPrimaryClass}>
                                    Add to Cart
                                </Button>
                            </div>
                        )}
                        {!lineItemConfig?.adjustable_quantity?.enabled && (
                             <div className="mt-4 pt-4 border-t border-dashed flex justify-end">
                                 <Button type="button" onClick={() => handleBuyTicket(ticket)} size="md" className={theme.buttonPrimaryClass}>
                                    Add to Cart
                                </Button>
                            </div>
                        )}
                    </div>
                  </Card>
                )
            })}
            </div>
          ) : (
            <p className="opacity-75">No ticket types currently available for this event.</p>
          )}
        </div>
      </Card>
    </div>
  );
};

export default EventTicketSalesPage;
