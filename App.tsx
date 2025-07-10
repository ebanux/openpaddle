
import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { MonetizationUseCase, JsonSchema, Template, PageStyle, CheckoutItem, PageSessionData, AfterPaymentTemplate, BasePageLinkConfig, CustomerPortalConfig, AdminMonetizationPage, StripeLineItem, SessionStatus, EditorTab, PreviewStep, AppView, ThemeDefinition, StripeShippingRate, TenantSettings, PlatformPayoutDetails, EmailTemplate, MembershipAccessPageProps, Variant, AdminEntityType, CartItem, CatalogPageLinkConfig } from './types';
import { THEMES, DEFAULT_CUSTOMER_PORTAL_CONFIG, MOCK_TSHIRT_PRODUCT } from './constants';
import { APP_TEMPLATES, APP_AFTER_PAYMENT_TEMPLATES } from './templates';
import { useAppStore } from './hooks/useAppStore';
import { generatePageId, generateRandomId } from './utils';
import { useTranslation } from './i18n/I18nContext';

import Header from './components/layout/Header';
import SandboxBanner from './components/layout/SandboxBanner';
import TemplatePreviewModal from './components/editor/TemplatePreviewModal';
import AfterPaymentTemplatePreviewModal from './components/editor/AfterPaymentTemplatePreviewModal'; 
import { AdminPage } from './pages/admin/AdminPage';
import EditorPage from './pages/EditorPage';
import SessionPage from './pages/SessionPage';
import { LandingPage } from './pages/LandingPage';
import HowItWorksPage from './pages/HowItWorksPage';
import EventTicketsSolutionPage from './pages/solutions/EventTicketsSolutionPage';
import EventTicketsSolutionPageOld from './pages/solutions/EventTicketsSolutionPageOld';
import { SubscriptionSolutionPage } from './pages/solutions/SubscriptionSolutionPage';
import ParkingSolutionPage from './pages/solutions/ParkingSolutionPage';
import ClaimPage from './pages/ClaimPage';
import GenerateCodesModal from './pages/admin/GenerateCodesModal';
import VerificationPage from './pages/VerificationPage';
import LoginModal from './components/auth/LoginModal';
import PayoutsPage from './pages/admin/PayoutsPage';
import AIGenerationModal from './components/ai/AIGenerationModal';
import { CatalogPage } from './pages/CatalogPage';
import Cart from './components/cart/Cart';
import Button from './components/common/Button';


interface EditingEntityState {
  type: AdminEntityType;
  data: any | null; // null for new, object for editing
}


export const App: React.FC = () => {
  const {
    allTenantData, allPageConfigs, allPortalConfigs, allTenantSettings, activeTenantId,
    currentUser, currentUserSubdomain, isGhostUser, environment, schemas, allEmailTemplates,
    cart, addToCart, removeFromCart, updateCartQuantity, clearCart,
    handleLogin, handleLogout, handleEnvironmentChange, handleLoadSampleData, handleSelectStripeConnect, handleSavePlatformPayoutDetails,
    saveEntity, deleteEntity, savePageConfig, savePortalConfig, deletePageConfig, updateShopProductVariant,
    publishPage, createSession, updateSessionStatus, generateAccessCodes,
    claimAccessCode, revokeSession, anchorAllProofs, sendTestEmail,
  } = useAppStore();
  
  // I18n
  const { t, language, setLanguage } = useTranslation();

  // UI State
  const [activeView, setActiveView] = useState<AppView>('landing');
  const [previousView, setPreviousView] = useState<AppView>('landing');
  const [editingEntity, setEditingEntity] = useState<EditingEntityState | null>(null);
  const [activePageId, setActivePageId] = useState<string | null>(null);
  const [editorData, setEditorData] = useState<BasePageLinkConfig | null>(null); 
  const [isDirty, setIsDirty] = useState<boolean>(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState<string | null>(null);
  const [templateToPreview, setTemplateToPreview] = useState<Template<any> | null>(null);
  const [isTemplatePreviewModalOpen, setIsTemplatePreviewModalOpen] = useState(false);
  const [templatePreviewContext, setTemplatePreviewContext] = useState<'landing' | 'editor'>('landing');
  const [apTemplateToPreview, setAPTemplateToPreview] = useState<AfterPaymentTemplate<any> | null>(null);
  const [isAPTemplatePreviewModalOpen, setIsAPTemplatePreviewModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [loginModalTitle, setLoginModalTitle] = useState("Login Required");
  const [sessionToRender, setSessionToRender] = useState<PageSessionData | null>(null);
  const [sessionToClaim, setSessionToClaim] = useState<PageSessionData | null>(null);
  const [sessionToVerify, setSessionToVerify] = useState<PageSessionData | null>(null);
  const [isGenerateCodesModalOpen, setIsGenerateCodesModalOpen] = useState(false);
  const [pageToGenerateCodesFor, setPageToGenerateCodesFor] = useState<AdminMonetizationPage | null>(null);
  const [isRedirectingToCheckout, setIsRedirectingToCheckout] = useState(false);
  const [aiModalState, setAiModalState] = useState<{ isOpen: boolean; config: any; fieldKey: string; fieldLabel: string; contextValue: any; currentValue: any; } | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Derived State
  const activeAdminData = useMemo(() => activeTenantId ? allTenantData[activeTenantId] : null, [allTenantData, activeTenantId]);
  const activePageConfigs = useMemo(() => activeTenantId ? allPageConfigs[activeTenantId] || [] : [], [allPageConfigs, activeTenantId]);
  const activePortalConfig = useMemo(() => activeTenantId ? allPortalConfigs[activeTenantId] || { ...DEFAULT_CUSTOMER_PORTAL_CONFIG, tenantId: activeTenantId } : DEFAULT_CUSTOMER_PORTAL_CONFIG, [allPortalConfigs, activeTenantId]);
  const activeTenantSettings = useMemo(() => activeTenantId ? allTenantSettings[activeTenantId] : null, [allTenantSettings, activeTenantId]);
  const activeEmailTemplates = useMemo(() => activeTenantId ? allEmailTemplates[activeTenantId] || [] : [], [allEmailTemplates, activeTenantId]);
  const activeTheme = useMemo(() => THEMES.find(t => t.id === editorData?.pageStyle?.theme) || THEMES[0], [editorData?.pageStyle?.theme]);
  const adminPagesData = useMemo((): AdminMonetizationPage[] => activePageConfigs.map(p => ({ id: p.id, tenantId: p.tenantId, name: p.pageSlug || p.id, useCase: p.useCase, status: p.status, revenue: 0, transactions: 0, createdAt: p.createdAt || new Date().toISOString() })), [activePageConfigs]);

  const handleOpenLoginModal = useCallback((titleKey: 'loginRequired' | 'createToPublish' | 'createToSave' | 'login' = 'loginRequired') => {
      setLoginModalTitle(t(`app.loginModal.title.${titleKey}`));
      setIsLoginModalOpen(true);
  }, [t]);


  const handleStartBuilding = () => {
    setActiveView('editor');
    if(isGhostUser) {
        handleOpenLoginModal('createToSave');
    }
  };

  const handleApplyTemplateAndStart = (template: Template<any>) => {
     const newId = generateRandomId();
     const newPageId = generatePageId();
     const newConfig = { ...template.initialData, id: newId, pageId: newPageId, _templateId: template.id, createdAt: new Date().toISOString() };
     setEditorData(newConfig);
     setActivePageId(newId);
     setActiveView('editor');
  }

  const handleRequestTemplatePreview = (template: Template<any>, context: 'landing' | 'editor') => {
    setTemplateToPreview(template);
    setTemplatePreviewContext(context);
    setIsTemplatePreviewModalOpen(true);
  };
  
  const handleApplyTemplateFromPreview = (template: Template<any>) => {
    if (templatePreviewContext === 'landing') {
      handleApplyTemplateAndStart(template);
    } else { // 'editor'
        if (editorData && !window.confirm(t('app.alerts.confirmTemplateOverwrite'))) {
            setIsTemplatePreviewModalOpen(false);
            return;
        }
        const newConfig = { ...template.initialData, id: editorData?.id || generateRandomId(), pageId: editorData?.pageId || generatePageId(), _templateId: template.id, createdAt: new Date().toISOString() };
        setEditorData(newConfig);
        setActivePageId(newConfig.id);
        setIsDirty(true);
    }
    setIsTemplatePreviewModalOpen(false);
  };

  const handleDataChange = useCallback((data: any, type: 'page' | 'checkout' | 'afterPayment' | 'afterPaymentTemplate' | 'portal') => {
    setIsDirty(true);
    if (type === 'page') {
      setEditorData(prev => ({ ...prev!, ...data }));
    } else if (type === 'checkout') {
      setEditorData(prev => ({ ...prev!, ...data }));
    } else if (type === 'afterPayment') {
       setEditorData(prev => ({ ...prev!, ...data }));
    } else if (type === 'afterPaymentTemplate') {
       setEditorData(prev => ({ ...prev!, afterPaymentPageData: data }));
    } else if (type === 'portal') {
       if (activeTenantId) {
          const portalConf = allPortalConfigs[activeTenantId] || DEFAULT_CUSTOMER_PORTAL_CONFIG;
          savePortalConfig({...portalConf, ...data});
       }
    }
  }, [activeTenantId, allPortalConfigs, savePortalConfig]);
  
  const handleStyleChange = (style: PageStyle) => {
    setEditorData(prev => prev ? ({ ...prev, pageStyle: style }) : null);
    setIsDirty(true);
  };
  
  const handleDiscard = () => {
    if (activePageId) {
      const originalConfig = activePageConfigs.find(p => p.id === activePageId);
      setEditorData(originalConfig || null);
    }
    setIsDirty(false);
  };

  const handleSave = () => {
    if (editorData) {
      if (!currentUser) {
        handleOpenLoginModal('createToSave');
        return;
      }
      savePageConfig(editorData);
      setShowSuccessMessage(t('app.alerts.saveSuccess', { pageName: editorData.pageSlug || 'Untitled Page' }));
      setTimeout(() => setShowSuccessMessage(null), 3000);
      setIsDirty(false);
    }
  };
  
  const handleAddToCart = useCallback((lineItem: StripeLineItem, useCaseData?: any) => {
    const product = useCaseData?.productId ? (activeAdminData?.shopProducts || []).find(p => p.id === useCaseData.productId) : undefined;
    const variant = product && useCaseData?.variantId ? product.variants.find(v => v.id === useCaseData.variantId) : undefined;

    const cartItem: Omit<CartItem, 'id' | 'addedAt'> = {
        lineItem: { ...lineItem, quantity: useCaseData?.quantity || 1 },
        quantity: useCaseData?.quantity || 1,
        product,
        variant,
    };
    addToCart(cartItem);
    setIsCartOpen(true);
  }, [addToCart, activeAdminData?.shopProducts]);

  const handleCartCheckout = useCallback(() => {
    if (!cart.length || !activeTenantId) return;

    // Use a generic page config for checkout. In a real app, this might be more complex.
    const primaryPageConfig: BasePageLinkConfig = {
      id: 'cart-checkout',
      tenantId: activeTenantId,
      status: 'published',
      pageId: 'CART',
      useCase: MonetizationUseCase.PRODUCT_SALE,
      pageSlug: 'cart',
      pageStyle: { theme: 'light' },
      mode: 'payment',
      currency: cart[0].lineItem.price_data?.currency || 'USD',
      line_items: cart.map(item => item.lineItem),
      after_completion: { type: 'custom_page_session' },
      afterPaymentBehavior: 'showAfterPaymentPage',
      enableSessionPage: true,
      selectedAfterPaymentTemplateId: 'ap-prod-tracking-v1', // A sensible default
      accessControl: {enabled: false, verificationType: 'disabled', showAccessLink: false, showQRCode: false}
    };

    const subtotal = cart.reduce((sum, item) => sum + ((item.lineItem.price_data?.unit_amount || 0) * item.quantity), 0);

    const checkoutDetailsForSession = {
        items: cart.map(item => ({
            name: item.lineItem.price_data?.product_data?.name || 'Item',
            price: (item.lineItem.price_data?.unit_amount || 0) / 100,
            quantity: item.quantity,
        })),
        totalAmount: subtotal / 100,
        currency: primaryPageConfig.currency || 'USD',
        paymentTimestamp: new Date().toISOString(),
    };

    const newSession = createSession(primaryPageConfig, checkoutDetailsForSession, MonetizationUseCase.PRODUCT_SALE);
    if (newSession) {
      setIsRedirectingToCheckout(true);
      setTimeout(() => {
        setIsRedirectingToCheckout(false);
        if (newSession.pageConfig.afterPaymentBehavior === 'redirect' && newSession.pageConfig.redirectUrl) {
            window.open(newSession.pageConfig.redirectUrl.replace('{CHECKOUT_SESSION_ID}', newSession.sessionId), '_blank');
        } else if (newSession.pageConfig.enableSessionPage) {
            handleNavigateToSession(newSession);
        }
        clearCart();
        setIsCartOpen(false);
      }, 1500);
    } else {
      alert(t('app.alerts.sessionFailed'));
    }
  }, [cart, activeTenantId, createSession, clearCart, t]);

  const handleWebShare = (url: string | null, title: string) => {
    if (!url) {
        alert(t('app.alerts.shareNeedsPublish'));
        return;
    }
    if (navigator.share) {
        navigator.share({
            title: title,
            text: `Check out this page: ${title}`,
            url: url,
        }).catch((error) => console.log('Error sharing', error));
    } else {
        navigator.clipboard.writeText(url);
        alert(t('app.alerts.urlCopied', { url: url }));
    }
  };

  const handlePublishPage = (page: AdminMonetizationPage | null) => {
      if (!page) return;
      const config = activePageConfigs.find(p => p.id === page.id);
      if (config) {
          if (!config.pageSlug) {
              alert(t('app.alerts.publishNeedsSlug'));
              return;
          }
          if(isGhostUser) {
              handleOpenLoginModal('createToPublish');
              return;
          }
          publishPage(config.id);
      }
  };

  const handlePublishCurrentPage = useCallback(() => {
    if (editorData) {
      handlePublishPage({
        ...editorData,
        name: editorData.pageSlug || editorData.id,
        revenue: 0,
        transactions: 0,
        createdAt: editorData.createdAt || new Date().toISOString(),
      });
    }
  }, [editorData, handlePublishPage]);
  
  const handleSharePage = (page: AdminMonetizationPage) => {
    const config = activePageConfigs.find(p => p.id === page.id);
    if (!config) return;
    if (config.status !== 'published') {
        alert(t('app.alerts.shareNeedsPublish'));
        return;
    }
    if (!config.pageSlug) {
        alert(t('app.alerts.shareNeedsSlug'));
        return;
    }
    const url = `${window.location.origin}/u/${currentUserSubdomain}/${config.pageSlug}`;
    handleWebShare(url, config.pageSlug);
  };
  
  const handleNavigateToSession = (session: PageSessionData) => {
      setSessionToRender(session);
      setPreviousView(activeView);
      setActiveView('session');
  };

  const handleCreateNewPage = () => {
    setEditorData(null);
    setActivePageId(null);
    setIsDirty(false);
    setActiveView('editor');
  };
  
  const handleEditPage = (pageId: string) => {
    const config = activePageConfigs.find(p => p.id === pageId);
    if (config) {
        setActivePageId(pageId);
        setEditorData(config);
        setActiveView('editor');
        setIsDirty(false);
    }
  };
  
  const handleDeletePage = (pageId: string) => {
    if(window.confirm(t('app.alerts.confirmDeletePage'))) {
        deletePageConfig(pageId);
        if(activePageId === pageId) {
            handleCreateNewPage();
        }
    }
  }

  const handleSaveEntityAndClose = (entityType: string, data: any) => {
    saveEntity(entityType, data);
    setEditingEntity(null);
  };

  const handleOpenGenerateCodesModal = (page: AdminMonetizationPage | null) => {
      setPageToGenerateCodesFor(page);
      setIsGenerateCodesModalOpen(true);
  };
  
  const handleNavigateToClaim = (accessCode: string) => {
      const session = claimAccessCode(accessCode);
      if (session) {
          setSessionToClaim(session);
          setPreviousView(activeView);
          setActiveView('claim');
      } else {
          alert(t('app.alerts.accessCodeNotFound'));
      }
  };
  
  const handleNavigateToVerify = (accessCode: string) => {
      let session: PageSessionData | undefined;
      for (const tenantId in allTenantData) {
          session = allTenantData[tenantId].sessions.find(s => s.accessCode === accessCode);
          if (session) break;
      }
       if (session) {
          setSessionToVerify(session);
          setPreviousView(activeView);
          setActiveView('verify');
      } else {
          alert(t('app.alerts.verificationCodeNotFound'));
      }
  };
  
  const handleOpenAIModal = (config: any, fieldKey: string, fieldLabel: string, currentValue: any, contextValue: string) => {
    setAiModalState({ isOpen: true, config, fieldKey, fieldLabel, contextValue, currentValue });
  };
  
  const handleAIGeneratedContent = (newValue: string) => {
    if (aiModalState && editorData) {
        const updatedData = { ...editorData, [aiModalState.fieldKey]: newValue };
        setEditorData(updatedData);
        setIsDirty(true);
    }
    setAiModalState(null);
  };

  const handleViewChange = (view: AppView) => {
    setPreviousView(activeView);
    setActiveView(view);
  }
  
  const initiateCheckoutFromPage = (lineItems: StripeLineItem[], useCase: MonetizationUseCase, specificUseCaseData: any) => {
      if (!activeTenantId || !editorData) return;
      
      const totalAmount = lineItems.reduce((sum, item) => sum + ((item.price_data?.unit_amount || 0) * (item.quantity || 1)), 0);

      const checkoutDetailsForSession = {
          items: lineItems.map(item => ({
              name: item.price_data?.product_data?.name || 'Item',
              price: (item.price_data?.unit_amount || 0) / 100,
              quantity: item.quantity || 1,
          })),
          totalAmount: totalAmount / 100,
          currency: editorData.currency,
          paymentTimestamp: new Date().toISOString(),
      };

      const newSession = createSession(editorData, checkoutDetailsForSession, useCase, specificUseCaseData);
      if (newSession) {
          setIsRedirectingToCheckout(true);
          setTimeout(() => {
              setIsRedirectingToCheckout(false);
              if (newSession.pageConfig.afterPaymentBehavior === 'redirect' && newSession.pageConfig.redirectUrl) {
                  window.open(newSession.pageConfig.redirectUrl.replace('{CHECKOUT_SESSION_ID}', newSession.sessionId), '_blank');
              } else if (newSession.pageConfig.enableSessionPage) {
                  handleNavigateToSession(newSession);
              }
          }, 1500);
      }
  };

  const renderView = () => {
    switch(activeView) {
      case 'landing':
        return <LandingPage 
            onStartBuilding={handleStartBuilding} 
            onApplyTemplateAndStart={handleApplyTemplateAndStart} 
            onNavigateToHowItWorks={() => setActiveView('how-it-works')} 
            onNavigateToSolutionPage={(solution) => {
                if (solution === 'event-tickets') setActiveView('solution-event-tickets');
                else if (solution === 'subscriptions') setActiveView('solution-subscriptions');
                else if (solution === 'parking') setActiveView('solution-parking');
            }} 
            onRequestTemplatePreview={(template) => handleRequestTemplatePreview(template, 'landing')} 
        />;
      case 'editor':
        return <EditorPage 
                editorData={editorData}
                isDirty={isDirty}
                showSuccessMessage={showSuccessMessage}
                customerPortalConfig={activePortalConfig}
                currentUser={currentUser}
                isGhostUser={isGhostUser}
                environment={environment}
                adminData={activeAdminData!}
                activeTheme={activeTheme}
                currentUserSubdomain={currentUserSubdomain}
                onDiscardChanges={handleDiscard}
                onSaveConfig={handleSave}
                onPublishPage={handlePublishCurrentPage}
                handleRequestTemplatePreview={(template) => handleRequestTemplatePreview(template, 'editor')}
                onRequestAfterPaymentTemplatePreview={setAPTemplateToPreview}
                onDataChange={handleDataChange}
                onStyleChange={handleStyleChange}
                onLogout={handleLogout}
                onLogin={() => handleOpenLoginModal('login')}
                onSetLoginModalOpen={() => handleOpenLoginModal('login')}
                onInitiateCheckout={initiateCheckoutFromPage}
                onAddToCart={handleAddToCart}
                onWebShare={handleWebShare}
                />;
      case 'catalog':
        const catalogPage = activePageConfigs.find(p => p.useCase === MonetizationUseCase.CATALOG) as CatalogPageLinkConfig | undefined;
        if (catalogPage) {
             return <CatalogPage 
                initialData={catalogPage} 
                isLivePreview={false} 
                theme={activeTheme} 
                adminData={activeAdminData!}
                onAddToCart={handleAddToCart} 
            />
        }
        return (
            <div className="p-6 text-center">
                <p className="text-lg font-semibold">Catalog Page Not Found</p>
                <p className="text-sm text-slate-600 mt-2">To view the storefront, please create a 'Catalog' page from the editor.</p>
                <Button onClick={handleCreateNewPage} className="mt-4">Go to Editor</Button>
            </div>
        );
      case 'admin':
        return activeAdminData ? <AdminPage 
                dashboardData={activeAdminData}
                editingEntity={editingEntity}
                onEditEntity={setEditingEntity}
                onSaveEntity={handleSaveEntityAndClose}
                onDeleteEntity={deleteEntity}
                onLoadSampleData={handleLoadSampleData}
                onCreateNewPage={handleCreateNewPage}
                onEditPage={handleEditPage}
                onDeletePage={handleDeletePage}
                onPublishPage={handlePublishPage}
                onSharePage={handleSharePage}
                onViewSessionPage={handleNavigateToSession}
                onOpenGenerateCodesModal={handleOpenGenerateCodesModal}
                onViewCodesForPage={() => {}} // Placeholder
                onRevokeSession={revokeSession}
                onAnchorProofs={anchorAllProofs}
                onVerifyCode={handleNavigateToVerify}
                onTestEmailTemplate={(template: EmailTemplate) => {
                    const content = sendTestEmail(template.id);
                    alert(`Test Email Sent (Simulated)\n\nSubject: ${content?.subject}\n\nBody:\n${content?.body}`);
                }}
                onUpdateShopProductVariant={updateShopProductVariant}
                tenantSettings={activeTenantSettings}
                onSelectStripeConnect={handleSelectStripeConnect}
                onSavePlatformPayoutDetails={handleSavePlatformPayoutDetails}
                /> : <div>Loading Admin Data...</div>;
        case 'session':
            return sessionToRender ? <SessionPage session={sessionToRender} onUpdateSession={updateSessionStatus} /> : <div>Session not found.</div>;
        case 'how-it-works':
            return <HowItWorksPage onBack={() => setActiveView(previousView)} />;
        case 'solution-event-tickets':
            return <EventTicketsSolutionPage onBack={() => setActiveView('landing')} onStartBuildingWithTemplate={() => handleApplyTemplateAndStart(APP_TEMPLATES.find(t => t.id === 'event-music-fest')!)} onSeeLiveExample={() => {}} onNavigateToOldPage={() => setActiveView('solution-event-tickets-old')} />;
        case 'solution-event-tickets-old':
             return <EventTicketsSolutionPageOld onBack={() => setActiveView('solution-event-tickets')} onStartBuildingWithTemplate={() => {}} onSeeLiveExample={() => {}} />;
        case 'solution-subscriptions':
            return <SubscriptionSolutionPage onBack={() => setActiveView('landing')} onStartBuildingWithTemplate={() => handleApplyTemplateAndStart(APP_TEMPLATES.find(t => t.id === 'sub-software')!)} />;
        case 'solution-parking':
            return <ParkingSolutionPage onBack={() => setActiveView('landing')} onStartBuildingWithTemplate={() => handleApplyTemplateAndStart(APP_TEMPLATES.find(t => t.id === 'park-city-center')!)} />;
        case 'claim':
            return sessionToClaim ? <ClaimPage sessionToClaim={sessionToClaim} onClaim={() => {}} theme={activeTheme} /> : <div>No session to claim.</div>;
        case 'verify':
            return sessionToVerify ? <VerificationPage sessionToVerify={sessionToVerify} theme={activeTheme} /> : <div>No session to verify.</div>;
      default:
        return <div>Unknown View</div>;
    }
  }

  return (
    <div className={`app-container font-sans flex flex-col min-h-screen ${activeTheme.bgClass}`}>
      <Header 
        title={t('app.title')}
        activeView={activeView === 'editor' || activeView === 'admin' ? activeView : undefined}
        isLoggedIn={!!currentUser}
        onViewChange={(v) => setActiveView(v)}
        onNavigateToHowItWorks={() => setActiveView('how-it-works')}
        currentUser={currentUser}
        isGhostUser={isGhostUser}
        environment={environment}
        onEnvironmentChange={handleEnvironmentChange}
        onLogout={handleLogout}
        onLogin={() => handleOpenLoginModal('login')}
        language={language}
        onLanguageChange={setLanguage}
        cartItemCount={cart.length}
        onCartClick={() => setIsCartOpen(!isCartOpen)}
      />
      
      {isGhostUser && activeView !== 'landing' && (
        <SandboxBanner onCreateAccount={() => handleOpenLoginModal('createToSave')} />
      )}
      
      <main className="flex-1 flex flex-col overflow-y-auto">
        {renderView()}
      </main>

      <Cart 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onRemoveItem={removeFromCart}
        onUpdateQuantity={updateCartQuantity}
        onCheckout={handleCartCheckout}
        currency={'USD'}
      />

      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleLogin}
        title={loginModalTitle}
      />

      <TemplatePreviewModal 
        isOpen={isTemplatePreviewModalOpen}
        onClose={() => setIsTemplatePreviewModalOpen(false)}
        template={templateToPreview}
        onApplyTemplate={handleApplyTemplateFromPreview}
        environment={environment}
        onAddToCart={handleAddToCart}
      />

      <AfterPaymentTemplatePreviewModal
        isOpen={!!apTemplateToPreview}
        onClose={() => setAPTemplateToPreview(null)}
        template={apTemplateToPreview}
        onApplyAfterPaymentTemplate={(template) => {
            setEditorData(prev => prev ? ({...prev, selectedAfterPaymentTemplateId: template.id, afterPaymentPageData: template.initialData }) : null);
            setIsDirty(true);
            setAPTemplateToPreview(null);
        }}
        activeTheme={activeTheme}
        environment={environment}
        onInitiateCheckout={initiateCheckoutFromPage}
        onAddToCart={handleAddToCart}
      />

      {pageToGenerateCodesFor && (
        <GenerateCodesModal 
            isOpen={isGenerateCodesModalOpen}
            onClose={() => setIsGenerateCodesModalOpen(false)}
            onGenerate={generateAccessCodes}
            pages={adminPagesData}
            initialPageId={pageToGenerateCodesFor.id}
        />
      )}

      {aiModalState?.isOpen && (
        <AIGenerationModal 
            {...aiModalState}
            onClose={() => setAiModalState(null)}
            onGenerate={handleAIGeneratedContent}
        />
      )}
    </div>
  );
}
