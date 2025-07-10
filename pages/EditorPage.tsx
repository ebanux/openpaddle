
import React, { useState, useCallback, useEffect } from 'react';
import { BasePageLinkConfig, PageStyle, CustomerPortalConfig, EditorTab, PreviewStep, ThemeDefinition, AdminDashboardData, MonetizationUseCase, StripeLineItem, AfterPaymentTemplate } from '../types';
import EditorPanel from '../components/editor/EditorPanel';
import PreviewPanel from '../components/editor/PreviewPanel';

interface EditorPageProps {
    editorData: BasePageLinkConfig | null;
    isDirty: boolean;
    showSuccessMessage: string | null;
    customerPortalConfig: CustomerPortalConfig;
    currentUser: string | null;
    isGhostUser: boolean;
    environment: 'test' | 'live';
    adminData: AdminDashboardData;
    activeTheme: ThemeDefinition;
    currentUserSubdomain: string | null;

    onDiscardChanges: () => void;
    onSaveConfig: () => void;
    onPublishPage: () => void;
    handleRequestTemplatePreview: (template: any) => void;
    onRequestAfterPaymentTemplatePreview: (template: any) => void;
    onDataChange: (data: any, type: 'page' | 'checkout' | 'afterPayment' | 'afterPaymentTemplate' | 'portal') => void;
    onStyleChange: (style: PageStyle) => void;
    onLogout: () => void;
    onLogin: () => void;
    onSetLoginModalOpen: () => void;
    onInitiateCheckout: (lineItems: StripeLineItem[], useCase: MonetizationUseCase, specificUseCaseData: any) => void;
    onAddToCart: (lineItem: StripeLineItem, useCaseData?: any) => void;
    onWebShare: (url: string | null, title: string) => void;
}

const EditorPage: React.FC<EditorPageProps> = ({
    editorData,
    isDirty,
    showSuccessMessage,
    customerPortalConfig,
    currentUser,
    isGhostUser,
    environment,
    adminData,
    activeTheme,
    currentUserSubdomain,
    onDiscardChanges,
    onSaveConfig,
    onPublishPage,
    handleRequestTemplatePreview,
    onRequestAfterPaymentTemplatePreview,
    onDataChange,
    onStyleChange,
    onLogout,
    onLogin,
    onSetLoginModalOpen,
    onInitiateCheckout,
    onAddToCart,
    onWebShare,
}) => {
    const [isMobileView, setIsMobileView] = useState(window.innerWidth < 1024);
    const [editorWidth, setEditorWidth] = useState(40);
    const [isResizing, setIsResizing] = useState(false);
    const [activeEditorTab, setActiveEditorTab] = useState<EditorTab>('config');
    const [previewStep, setPreviewStep] = useState<PreviewStep>('page');
    const [publishedUrl, setPublishedUrl] = useState<string | null>(null);
    const [sessionUrl, setSessionUrl] = useState<string | null>(null);

    useEffect(() => {
        const handleResize = () => setIsMobileView(window.innerWidth < 1024);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsResizing(true);
    };

    const handleMouseUp = useCallback(() => {
        setIsResizing(false);
    }, []);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (!isResizing) return;
        const newWidth = (e.clientX / window.innerWidth) * 100;
        const clampedWidth = Math.max(30, Math.min(70, newWidth));
        setEditorWidth(clampedWidth);
    }, [isResizing]);

    useEffect(() => {
        const moveHandler = (e: MouseEvent) => handleMouseMove(e);
        const upHandler = () => handleMouseUp();
        if (isResizing) {
            window.addEventListener('mousemove', moveHandler);
            window.addEventListener('mouseup', upHandler);
        }
        return () => {
            window.removeEventListener('mousemove', moveHandler);
            window.removeEventListener('mouseup', upHandler);
        };
    }, [isResizing, handleMouseMove, handleMouseUp]);

    const clearPublishedUrl = useCallback(() => {
        setPublishedUrl(null);
        setSessionUrl(null);
    }, []);

    useEffect(() => {
        if (editorData?.status === 'published' && !isGhostUser && currentUserSubdomain) {
            const isSessionPageEnabled = editorData.enableSessionPage === true;
            const pageId = editorData.pageId;
            const pageSlug = editorData.pageSlug;

            const url = isSessionPageEnabled && pageId
                ? `/p/${pageId}` // Short URL for session-enabled pages
                : (pageSlug ? `/u/${currentUserSubdomain}/${pageSlug}` : null); // Long URL only if slug exists

            setPublishedUrl(url ? `${window.location.origin}${url}` : null);
        } else {
            clearPublishedUrl();
        }
    }, [editorData, environment, currentUserSubdomain, isGhostUser, clearPublishedUrl]);

    // Effect to reset tab if use case changes away from Subscriptions while on Portal tab
    useEffect(() => {
        if (editorData && ![MonetizationUseCase.SUBSCRIPTION_RENTAL, MonetizationUseCase.MEMBERSHIP_ACCESS].includes(editorData.useCase) && activeEditorTab === 'portal') {
            setActiveEditorTab('config');
            setPreviewStep('page');
        }
    }, [editorData?.useCase, activeEditorTab]);


    const handleSwitchEditorTab = (tab: EditorTab) => {
        setActiveEditorTab(tab);
        switch (tab) {
            case 'config':
            case 'style':
                setPreviewStep('page');
                break;
            case 'checkout':
                setPreviewStep('checkout');
                break;
            case 'afterPayment':
                setPreviewStep('afterPayment');
                break;
            case 'portal':
                setPreviewStep('portal');
                break;
            default:
                setPreviewStep('page');
        }
    };
    
    const handlePublish = () => {
      if (isGhostUser || !currentUserSubdomain) {
          onSetLoginModalOpen();
          return;
      }
      if (!editorData || !editorData.id) {
          alert("Please select and configure a page first.");
          return;
      }
      onPublishPage();
    };


    return (
        <div className={`p-4 ${isMobileView ? 'flex-col' : 'flex'} gap-4 flex-1 overflow-hidden`}>
            {/* Editor Panel */}
            <div
                className={`transition-all duration-300 ease-in-out ${isMobileView ? 'w-full mb-4' : 'h-full flex-shrink-0'}`}
                style={{ width: isMobileView ? '100%' : `${editorWidth}%` }}
            >
                <EditorPanel
                    editorData={editorData}
                    isDirty={isDirty}
                    showSuccessMessage={showSuccessMessage}
                    activeEditorTab={activeEditorTab}
                    customerPortalConfig={customerPortalConfig}
                    currentUser={currentUser}
                    onDiscardChanges={onDiscardChanges}
                    onSaveConfig={onSaveConfig}
                    onRequestTemplatePreview={handleRequestTemplatePreview}
                    onRequestAfterPaymentTemplatePreview={onRequestAfterPaymentTemplatePreview}
                    onSwitchTab={handleSwitchEditorTab}
                    onDataChange={onDataChange}
                    onStyleChange={onStyleChange}
                    onLogout={onLogout}
                    onLogin={onLogin}
                />
            </div>

            {!isMobileView && (
                <div onMouseDown={handleMouseDown} className="w-1.5 h-full bg-slate-300/50 hover:bg-slate-400/80 cursor-col-resize rounded-full flex-shrink-0"></div>
            )}

            {/* Preview Panel */}
            <div className={`flex-1 min-w-0 transition-all duration-300 ease-in-out ${isMobileView ? 'block' : 'block'}`}>
                <PreviewPanel
                    editorData={editorData}
                    previewStep={previewStep}
                    environment={environment}
                    publishedUrl={publishedUrl}
                    sessionUrl={sessionUrl}
                    activeTheme={activeTheme}
                    customerPortalConfig={customerPortalConfig}
                    adminData={adminData}
                    onPreviewStepChange={setPreviewStep}
                    onPublish={handlePublish}
                    onShare={onWebShare}
                    onInitiateCheckout={onInitiateCheckout}
                    onAddToCart={onAddToCart}
                />
            </div>
        </div>
    );
};

export default EditorPage;
