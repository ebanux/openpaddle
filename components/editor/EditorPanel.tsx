import React from 'react';
import { BasePageLinkConfig, PageStyle, CustomerPortalConfig, EditorTab, MonetizationUseCase } from '../../types';
import { getEditorSchemaForUseCase, AfterPaymentConfigSchema, CheckoutConfigSchema, CustomerPortalConfigSchema } from '../../schemas';
import { APP_TEMPLATES, APP_AFTER_PAYMENT_TEMPLATES } from '../../templates';

import Button from '../common/Button';
import TemplateBrowser from './TemplateBrowser';
import JsonSchemaForm from '../forms/JsonSchemaForm';
import PageStyleEditor from './PageStyleEditor';
import CollapsibleSection from './CollapsibleSection';
import TemplateSelectorCard from '../common/TemplateSelectorCard';

interface EditorPanelProps {
    editorData: BasePageLinkConfig | null;
    isDirty: boolean;
    showSuccessMessage: string | null;
    activeEditorTab: EditorTab;
    customerPortalConfig: CustomerPortalConfig;
    currentUser: string | null;
    onDiscardChanges: () => void;
    onSaveConfig: () => void;
    onRequestTemplatePreview: (template: any) => void;
    onRequestAfterPaymentTemplatePreview: (template: any) => void;
    onSwitchTab: (tab: EditorTab) => void;
    onDataChange: (data: any, type: 'page' | 'checkout' | 'afterPayment' | 'afterPaymentTemplate' | 'portal') => void;
    onStyleChange: (style: PageStyle) => void;
    onLogout: () => void;
    onLogin: () => void;
}

const EditorWizardButton: React.FC<{ active: boolean; onClick: () => void; children: React.ReactNode; className?: string; disabled?: boolean }> = ({ active, onClick, children, className = '', disabled = false }) => {
    const activeClasses = 'bg-blue-600 text-white shadow';
    const inactiveClasses = 'bg-slate-100 text-slate-700 hover:bg-slate-200';
    const disabledClasses = 'bg-slate-100 text-slate-400 cursor-not-allowed';
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            className={`px-3 py-1.5 rounded-md text-sm font-semibold transition-all duration-150 flex items-center justify-center space-x-1.5 ${disabled ? disabledClasses : (active ? activeClasses : inactiveClasses)} ${className}`}
        >
            {children}
        </button>
    );
};


// Helper functions moved from App.tsx
const getMainConfigData = (fullData: BasePageLinkConfig | null): any => {
    if (!fullData) return {};
    const { 
        pageStyle, id, afterPaymentBehavior, redirectUrl, 
        selectedAfterPaymentTemplateId, afterPaymentPageData, enableSessionPage, 
        after_completion, _enableCustomPageSession, _ourCustomAfterPaymentPageId, 
        _ourCustomAfterPaymentPageData,
        currency, submit_type, custom_fields, billing_address_collection, 
        shipping_address_collection,
        consent_collection,
        tax_id_collection,
        automatic_tax,
        phone_number_collection,
        allow_promotion_codes,
        save_payment_details_for_future_use,
        payment_limits,
        ...remainingConfigData 
    } = fullData;

    const flatData: any = { ...remainingConfigData };
    
    if (payment_limits) {
        flatData.payment_limits_enabled = payment_limits.enabled;
        if (payment_limits.max_payments !== undefined) flatData.payment_limits_max_payments = payment_limits.max_payments;
        if (payment_limits.message_after_limit !== undefined) flatData.payment_limits_message_after_limit = payment_limits.message_after_limit;
    }
    
    return flatData;
};

const getCheckoutConfigData = (fullData: BasePageLinkConfig | null): any => {
    if (!fullData) return {};
    const { 
        shipping_address_collection,
        consent_collection,
        tax_id_collection,
        automatic_tax,
        phone_number_collection,
        ...remainingConfigData 
    } = fullData;

    const flatData: any = { ...remainingConfigData };

    if (shipping_address_collection) {
        flatData.shipping_address_collection_enabled = shipping_address_collection.enabled;
        if (shipping_address_collection.allowed_countries !== undefined) {
            flatData.shipping_address_collection_allowed_countries = shipping_address_collection.allowed_countries;
        }
    }
    if (consent_collection) {
        if (consent_collection.terms_of_service !== undefined) flatData.consent_collection_terms_of_service = consent_collection.terms_of_service;
        if (consent_collection.terms_of_service_url !== undefined) flatData.consent_collection_terms_of_service_url = consent_collection.terms_of_service_url;
    }
    if (tax_id_collection) {
        flatData.tax_id_collection_enabled = tax_id_collection.enabled;
    }
    if (automatic_tax) {
        flatData.automatic_tax_enabled = automatic_tax.enabled;
    }
    if (phone_number_collection) {
        flatData.phone_number_collection_enabled = phone_number_collection.enabled;
    }
    
    return flatData;
};

const getAfterPaymentConfigData = (fullData: any): { afterPaymentBehavior?: string; redirectUrl?: string, enableSessionPage?: boolean } => {
    if (!fullData) return { afterPaymentBehavior: 'showAfterPaymentPage', redirectUrl: '', enableSessionPage: false };
    return {
        afterPaymentBehavior: fullData.afterPaymentBehavior || 'showAfterPaymentPage',
        redirectUrl: fullData.redirectUrl || '',
        enableSessionPage: fullData.enableSessionPage
    };
};


const EditorPanel: React.FC<EditorPanelProps> = ({
    editorData,
    isDirty,
    showSuccessMessage,
    activeEditorTab,
    customerPortalConfig,
    currentUser,
    onDiscardChanges,
    onSaveConfig,
    onRequestTemplatePreview,
    onRequestAfterPaymentTemplatePreview,
    onSwitchTab,
    onDataChange,
    onStyleChange,
    onLogout,
    onLogin,
}) => {
    const getEditorTitle = () => {
        if (!editorData) return "Create a new Page";
        return `Editing: ${editorData.pageSlug || "Untitled Page"}`;
    };

    const renderEditorContent = () => {
        if (!editorData) {
          return (
            <div className="p-4 space-y-4">
              <h2 className="text-xl font-bold text-slate-800">Create a New Page</h2>
              <TemplateBrowser
                allTemplates={APP_TEMPLATES}
                onRequestTemplatePreview={onRequestTemplatePreview}
              />
            </div>
          );
        }
        
        const mainConfigSchema = getEditorSchemaForUseCase(editorData.useCase);
        const selectedApTemplateDefinition = APP_AFTER_PAYMENT_TEMPLATES.find(apt => apt.id === editorData.selectedAfterPaymentTemplateId);
        
        const currentTemplate = editorData._templateId ? APP_TEMPLATES.find(t => t.id === editorData._templateId) : null;
        const templateSectionTitle = currentTemplate ? `Template: ${currentTemplate.name}` : "Page Type & Template";
    
    
        return (
          <div className="p-4 space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-slate-800 truncate pr-4">{getEditorTitle()}</h2>
                <div className="flex space-x-2">
                    <Button variant="secondary" size="sm" onClick={onDiscardChanges} disabled={!isDirty}>Discard</Button>
                    <Button variant="primary" size="sm" onClick={onSaveConfig} disabled={!isDirty}>Save</Button>
                </div>
            </div>
             {showSuccessMessage && (
                <div className="bg-green-100 border border-green-300 text-green-800 text-sm px-4 py-2 rounded-md transition-opacity duration-300" role="alert">
                    {showSuccessMessage}
                </div>
            )}
    
            <CollapsibleSection title={templateSectionTitle} defaultOpen={!currentTemplate}>
              {currentTemplate && (
                    <div className="flex items-center space-x-3 mb-4 p-3 bg-slate-100 rounded-lg border border-slate-200">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl shrink-0 ${currentTemplate.previewColorClass} ${currentTemplate.previewIconColorClass}`}>
                          <i className="material-icons-round">{currentTemplate.previewIcon}</i>
                      </div>
                      <div>
                          <p className="font-semibold text-sm text-slate-800">{currentTemplate.name}</p>
                      </div>
                  </div>
              )}
              <TemplateBrowser
                allTemplates={APP_TEMPLATES}
                onRequestTemplatePreview={onRequestTemplatePreview}
              />
            </CollapsibleSection>
    
            <div className="bg-slate-200 p-1 rounded-lg flex justify-between items-center">
                <div className="flex space-x-1">
                    <EditorWizardButton active={activeEditorTab === 'config'} onClick={() => onSwitchTab('config')}>Config</EditorWizardButton>
                    <EditorWizardButton active={activeEditorTab === 'checkout'} onClick={() => onSwitchTab('checkout')}>Checkout</EditorWizardButton>
                    <EditorWizardButton active={activeEditorTab === 'afterPayment'} onClick={() => onSwitchTab('afterPayment')}>After Payment</EditorWizardButton>
                    {editorData && [MonetizationUseCase.SUBSCRIPTION_RENTAL, MonetizationUseCase.MEMBERSHIP_ACCESS].includes(editorData.useCase) && (
                        <EditorWizardButton active={activeEditorTab === 'portal'} onClick={() => onSwitchTab('portal')}>Portal</EditorWizardButton>
                    )}
                </div>
                <div className="flex space-x-1">
                    <EditorWizardButton active={activeEditorTab === 'style'} onClick={() => onSwitchTab('style')}>
                        <i className="material-icons-round" style={{ fontSize: '20px' }}>palette</i>
                        <span>Style</span>
                    </EditorWizardButton>
                </div>
            </div>
            
            {activeEditorTab === 'config' && (
              <CollapsibleSection title="Page Content & Settings" defaultOpen>
                <JsonSchemaForm
                  key={`main-${editorData.id}-${editorData._templateId}`}
                  schema={mainConfigSchema}
                  initialData={getMainConfigData(editorData)}
                  onSubmit={(data) => onDataChange(data, 'page')}
                  onDataChange={(data) => onDataChange(data, 'page')}
                  onCancel={() => {}} 
                  hideButtons
                />
              </CollapsibleSection>
            )}
            {activeEditorTab === 'checkout' && (
               <CollapsibleSection title="Checkout & Payment Form" defaultOpen>
                  <JsonSchemaForm
                    key={`checkout-${editorData.id}`}
                    schema={CheckoutConfigSchema}
                    initialData={getCheckoutConfigData(editorData)}
                    onSubmit={(data) => onDataChange(data, 'checkout')}
                    onDataChange={(data) => onDataChange(data, 'checkout')}
                    onCancel={() => {}}
                    hideButtons
                  />
              </CollapsibleSection>
            )}
            {activeEditorTab === 'afterPayment' && (
              <div className="space-y-4">
                  <CollapsibleSection title="Choose Behavior After Payment" defaultOpen>
                    <JsonSchemaForm
                        key={`ap-behavior-${editorData.id}`}
                        schema={AfterPaymentConfigSchema}
                        initialData={getAfterPaymentConfigData(editorData)}
                        onSubmit={(data) => onDataChange(data, 'afterPayment')}
                        onDataChange={(data) => onDataChange(data, 'afterPayment')}
                        onCancel={() => {}}
                        hideButtons
                    />
                  </CollapsibleSection>
                  
                  <CollapsibleSection title="Choose an 'After Payment' Template" defaultOpen>
                    <TemplateSelectorCard
                      useCase={editorData.useCase}
                      templates={APP_AFTER_PAYMENT_TEMPLATES.filter(t => t.useCase === editorData.useCase)}
                      onRequestPreview={onRequestAfterPaymentTemplatePreview}
                    />
                  </CollapsibleSection>
                
                  {editorData.afterPaymentBehavior === 'showAfterPaymentPage' && selectedApTemplateDefinition && (
                       <CollapsibleSection title={`Configure: "${selectedApTemplateDefinition.name}"`} defaultOpen>
                        <JsonSchemaForm
                            key={`ap-template-${editorData.selectedAfterPaymentTemplateId}`}
                            schema={selectedApTemplateDefinition.schema}
                            initialData={editorData.afterPaymentPageData}
                            onSubmit={(data) => onDataChange(data, 'afterPaymentTemplate')}
                            onDataChange={(data) => onDataChange(data, 'afterPaymentTemplate')}
                            onCancel={() => {}}
                            hideButtons
                        />
                      </CollapsibleSection>
                  )}
              </div>
            )}
            {activeEditorTab === 'style' && editorData?.pageStyle && (
              <PageStyleEditor currentStyle={editorData.pageStyle} onStyleChange={onStyleChange} />
            )}
             {activeEditorTab === 'portal' && (
                <CollapsibleSection title="Customer Portal Settings" defaultOpen>
                  <JsonSchemaForm
                    key={`portal-config`}
                    schema={CustomerPortalConfigSchema}
                    initialData={customerPortalConfig}
                    onSubmit={(data) => onDataChange(data, 'portal')}
                    onDataChange={(data) => onDataChange(data, 'portal')}
                    onCancel={() => {}}
                    hideButtons
                  />
                </CollapsibleSection>
              )}
    
          </div>
        );
      };

    return (
        <div className="bg-white/80 backdrop-blur-sm h-full rounded-xl shadow-lg border border-slate-200/50 flex flex-col overflow-hidden">
            <div className="flex-shrink-0 p-3 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
                <div>
                    <h2 className="font-semibold text-slate-800">Editor</h2>
                </div>
                <div>
                    {currentUser ? (
                        <Button variant="secondary" size="sm" onClick={onLogout}>Logout ({currentUser})</Button>
                    ) : (
                        <Button variant="secondary" size="sm" onClick={onLogin}>Login</Button>
                    )}
                </div>
            </div>
            <div className="flex-1 overflow-y-auto p-2">
                {renderEditorContent()}
            </div>
        </div>
    )
};

export default EditorPanel;
