import React from 'react';
import Button from '../components/common/Button';
import AuthenticityBadge from '../components/common/AuthenticityBadge';
import { useTranslation } from '../i18n/I18nContext';

interface HowItWorksPageProps {
  onBack: () => void;
}

const Section: React.FC<{
    icon: string;
    title: string;
    children: React.ReactNode;
    iconBgClass?: string;
}> = ({ icon, title, children, iconBgClass = 'bg-blue-100 text-blue-600' }) => (
    <div className="flex flex-col sm:flex-row items-start gap-6">
        <div className={`w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 ${iconBgClass}`}>
            <i className="material-icons-round text-3xl">{icon}</i>
        </div>
        <div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">{title}</h3>
            <div className="text-slate-600 leading-relaxed">{children}</div>
        </div>
    </div>
);

// Helper to parse simple markdown-like strings from translation files
const parseDescription = (lines: string[] | string) => {
    if (!Array.isArray(lines)) {
        return <p>{lines}</p>;
    }
    return lines.map((line, index) => {
        if (line.startsWith('- **')) {
            const content = line.substring(4);
            const parts = content.split(':** ');
            if (parts.length === 2) {
                return <p key={index}><strong className="text-slate-700">{parts[0]}:</strong> {parts[1]}</p>;
            }
        }
        return <p key={index}>{line}</p>;
    });
};

const HowItWorksPage: React.FC<HowItWorksPageProps> = ({ onBack }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-slate-100 min-h-screen">
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-slate-200">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
             <i className="material-icons-round text-3xl text-blue-600">help_outline</i>
             <span>{t('howItWorksPage.title')}</span>
          </h1>
          <Button onClick={onBack} variant="outline">
            <i className="material-icons-round mr-2 text-lg">arrow_back</i>
            {t('common.goBack')}
          </Button>
        </div>
      </header>
      
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto space-y-12">
            <Section icon="edit" title={t('howItWorksPage.step1.title')} iconBgClass="bg-blue-100 text-blue-600">
                <div className="space-y-2">
                    {parseDescription(t('howItWorksPage.step1.description', { returnObjects: true }))}
                </div>
            </Section>

            <Section icon="payments" title={t('howItWorksPage.step2.title')} iconBgClass="bg-green-100 text-green-600">
                <div className="space-y-2">
                    {parseDescription(t('howItWorksPage.step2.description', { returnObjects: true }))}
                </div>
            </Section>
            
            <Section icon="share" title={t('howItWorksPage.step3.title')} iconBgClass="bg-orange-100 text-orange-600">
                 <div className="space-y-2">
                    {parseDescription(t('howItWorksPage.step3.description', { returnObjects: true }))}
                </div>
            </Section>

            <Section icon="qr_code_2" title={t('howItWorksPage.step4.title')} iconBgClass="bg-purple-100 text-purple-600">
                <>
                <div className="space-y-2">
                    {parseDescription(t('howItWorksPage.step4.description', { returnObjects: true }))}
                </div>
                <div className="mt-4 flex flex-wrap gap-4">
                    <AuthenticityBadge status="unverified" />
                    <AuthenticityBadge status="pending" />
                    <AuthenticityBadge status="verified" />
                    <AuthenticityBadge status="revoked" />
                </div>
                </>
            </Section>
        </div>
      </main>
    </div>
  );
};

export default HowItWorksPage;