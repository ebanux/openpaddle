
import * as React from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import Button from '../common/Button';
import { useTranslation } from '../../i18n/I18nContext';

interface SharePanelProps {
    publishedUrl: string | null;
    sessionUrl: string | null;
    pageId: string;
    pageTitle: string;
    onShare: (url: string | null, title: string) => void;
}

type ShareTab = 'link' | 'text';

const TabButton = ({ tabId, children, activeTab, setActiveTab }: { tabId: ShareTab; children: React.ReactNode; activeTab: ShareTab; setActiveTab: (tab: ShareTab) => void; }) => (
    <button
        type="button"
        onClick={() => setActiveTab(tabId)}
        className={`px-3 py-1.5 text-sm font-medium focus:outline-none -mb-px ${
            activeTab === tabId 
            ? 'border-b-2 border-blue-500 text-blue-600' 
            : 'text-slate-500 hover:text-slate-700 border-b-2 border-transparent'
        }`}
    >
        {children}
    </button>
);


export const SharePanel = ({
    publishedUrl,
    sessionUrl,
    pageId,
    pageTitle,
    onShare,
}: SharePanelProps) => {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = React.useState<ShareTab>('link');
    const [showCopyConfirmation, setShowCopyConfirmation] = React.useState<Record<string, boolean>>({});
    
    const mainQrRef = React.useRef<HTMLDivElement>(null);
    const sessionQrRef = React.useRef<HTMLDivElement>(null);

    const copyToClipboard = (text: string | null, id: string) => {
        if (!text) {
          console.error("Attempted to copy null or empty text.");
          return;
        }
        navigator.clipboard.writeText(text).then(() => {
            setShowCopyConfirmation(prev => ({ ...prev, [id]: true }));
            setTimeout(() => setShowCopyConfirmation(prev => ({ ...prev, [id]: false })), 2000);
        }).catch(err => {
            console.error('Failed to copy text: ', err);
            alert("Failed to copy URL.");
        });
    };
    
    const downloadQRCode = (ref: React.RefObject<HTMLDivElement>, filename: string) => {
        if (ref.current) {
            const canvas = ref.current.querySelector('canvas');
            if (canvas) {
                const link = document.createElement('a');
                link.download = `${filename}.png`;
                link.href = canvas.toDataURL('image/png');
                link.click();
            }
        }
    };

    return (
        <div className="p-3 bg-slate-100 border border-slate-300 rounded-lg text-sm space-y-3">
            <div className="flex border-b border-slate-200">
                <TabButton tabId="link" activeTab={activeTab} setActiveTab={setActiveTab}>{t('sharePanel.linkAndQR')}</TabButton>
                <TabButton tabId="text" activeTab={activeTab} setActiveTab={setActiveTab}>{t('sharePanel.payByText')}</TabButton>
            </div>

            {activeTab === 'link' && (
                <div className="space-y-4">
                    {!publishedUrl ? (
                         <div className="p-4 text-center bg-slate-200/50 rounded-md">
                            <p className="text-slate-600">{t('sharePanel.instruction')}</p>
                        </div>
                    ) : (
                    <>
                        {/* Main URL Section */}
                        <div>
                            <p className="font-semibold text-slate-800 mb-1">{t('sharePanel.mainUrlTitle')}</p>
                            <div className="flex items-stretch bg-white p-1 rounded-md border border-slate-200">
                                <input type="text" readOnly value={publishedUrl} className="flex-grow text-xs bg-transparent outline-none px-1" />
                                <Button size="sm" variant="secondary" onClick={() => copyToClipboard(publishedUrl, 'mainUrl')} className="!px-2 !py-1 !text-xs">{showCopyConfirmation['mainUrl'] ? t('common.copied') : t('common.copy')}</Button>
                                <Button size="sm" variant="secondary" onClick={() => onShare(publishedUrl, pageTitle)} className="!px-2 !py-1 !text-xs ml-1">{t('common.share')}</Button>
                            </div>
                            <div className="mt-2 flex items-center space-x-3">
                                <div ref={mainQrRef} className="p-1 bg-white border rounded-md">
                                    <QRCodeCanvas value={publishedUrl} size={80} bgColor={"#ffffff"} fgColor={"#000000"} level={"L"}/>
                                </div>
                                <Button size="sm" variant="outline" onClick={() => downloadQRCode(mainQrRef, 'main-page-qr')} className="!text-xs">
                                    {t('common.downloadQR')}
                                </Button>
                            </div>
                        </div>
                        {/* Session URL Section */}
                        {sessionUrl && (
                            <div className="pt-3 border-t border-slate-200">
                                <p className="font-semibold text-slate-800 mb-1">{t('sharePanel.sessionUrlTitle')}</p>
                                <div className="flex items-stretch bg-white p-1 rounded-md border border-slate-200">
                                    <input type="text" readOnly value={sessionUrl} className="flex-grow text-xs bg-transparent outline-none px-1"/>
                                    <Button size="sm" variant="secondary" onClick={() => copyToClipboard(sessionUrl, 'sessionUrl')} className="!px-2 !py-1 !text-xs">{showCopyConfirmation['sessionUrl'] ? t('common.copied') : t('common.copy')}</Button>
                                    <Button size="sm" variant="secondary" onClick={() => onShare(sessionUrl, `Session for ${pageTitle}`)} className="!px-2 !py-1 !text-xs ml-1">{t('common.share')}</Button>
                                </div>
                                <div className="mt-2 flex items-center space-x-3">
                                    <div ref={sessionQrRef} className="p-1 bg-white border rounded-md">
                                        <QRCodeCanvas value={sessionUrl} size={80} bgColor={"#ffffff"} fgColor={"#000000"} level={"L"}/>
                                    </div>
                                    <Button size="sm" variant="outline" onClick={() => downloadQRCode(sessionQrRef, 'session-qr')} className="!text-xs">
                                        {t('common.downloadQR')}
                                    </Button>
                                </div>
                            </div>
                        )}
                    </>
                    )}
                </div>
            )}
            {activeTab === 'text' && (
                 <div>
                    <p className="font-semibold text-slate-800 mb-1">{t('sharePanel.payByTextTitle')}</p>
                    <p className="text-xs text-slate-600 mb-2">{t('sharePanel.payByTextDescription')}</p>
                     <div className="flex items-stretch bg-white p-1 rounded-md border border-slate-200">
                        <input type="text" readOnly value={pageId} className="flex-grow text-lg tracking-widest font-mono font-bold text-center bg-transparent outline-none px-1" />
                        <Button size="sm" variant="secondary" onClick={() => copyToClipboard(pageId, 'pageId')} className="!px-2 !py-1 !text-xs">{showCopyConfirmation['pageId'] ? t('common.copied') : t('common.copy')}</Button>
                    </div>
                </div>
            )}
        </div>
    );
};