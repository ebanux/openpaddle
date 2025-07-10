
import React, { createContext, useState, useContext, ReactNode, useMemo, useCallback, useEffect } from 'react';

type Language = 'en' | 'es';
type Translations = { [key in Language]?: any };

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, options?: any) => any;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

// Helper to get nested value from an object using a dot-notation string
const getNestedValue = (obj: any, path: string): any => {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
};

export const I18nProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState<Language>('en');
    const [translations, setTranslations] = useState<Translations>({});
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const translationFiles = ['common', 'app', 'landing', 'solutions', 'howItWorks', 'admin', 'editor', 'pages', 'forms'];
        
        const fetchLanguage = async (lang: Language) => {
            const promises = translationFiles.map(file => fetch(`/i18n/locales/${lang}/${file}.json`));
            const responses = await Promise.all(promises);
            
            for (const res of responses) {
                if (!res.ok) throw new Error(`Failed to fetch ${res.url}`);
            }
            
            const jsonPromises = responses.map(res => res.json());
            const jsons = await Promise.all(jsonPromises);
            
            return jsons.reduce((acc, json) => ({ ...acc, ...json }), {});
        };

        const fetchAllTranslations = async () => {
            try {
                const enData = await fetchLanguage('en');
                const esData = await fetchLanguage('es');
                setTranslations({ en: enData, es: esData });
            } catch (error) {
                console.error("Failed to load modular translation files:", error);
                setTranslations({ en: {}, es: {} });
            } finally {
                setIsLoaded(true);
            }
        };

        fetchAllTranslations();
    }, []);

    const t = useCallback((key: string, options?: { returnObjects?: boolean, [key: string]: any }) => {
        const langTranslations = translations[language];
        let translatedValue = getNestedValue(langTranslations, key);

        if (translatedValue === undefined) {
            // Fallback to English if key not found in current language
            const fallbackTranslations = translations['en'];
            translatedValue = getNestedValue(fallbackTranslations, key);
        }
        
        if (translatedValue === undefined) {
          console.warn(`Translation key "${key}" not found.`);
          return key; // Return the key if no translation is found at all
        }

        // If we want the object/array itself (e.g., for mapping features)
        if (options?.returnObjects === true) {
            return translatedValue;
        }

        let finalString = typeof translatedValue === 'string' ? translatedValue : key;
        
        if (options && typeof finalString === 'string') {
            Object.keys(options).forEach(optKey => {
                if(optKey !== 'returnObjects') {
                   finalString = finalString.replace(new RegExp(`{{${optKey}}}`, 'g'), String(options[optKey]));
                }
            });
        }

        return finalString;
    }, [language, translations]);

    const value = useMemo(() => ({
        language,
        setLanguage,
        t
    }), [language, t]);
    
    // Don't render children until translations are loaded to prevent showing keys
    if (!isLoaded) {
        return (
            <div className="flex items-center justify-center h-screen bg-slate-100">
                Loading Application...
            </div>
        );
    }

    return (
        <I18nContext.Provider value={value}>
            {children}
        </I18nContext.Provider>
    );
};

export const useTranslation = () => {
    const context = useContext(I18nContext);
    if (context === undefined) {
        throw new Error('useTranslation must be used within an I18nProvider');
    }
    return context;
};
