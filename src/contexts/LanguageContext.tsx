
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { translations } from '@/translations';

export type Language = 'ru' | 'kz' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Get initial language from localStorage or default to 'ru'
const getInitialLanguage = (): Language => {
  if (typeof window !== 'undefined') {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage === 'ru' || savedLanguage === 'kz' || savedLanguage === 'en') {
      console.log("Initial language from localStorage:", savedLanguage);
      return savedLanguage;
    }
  }
  console.log("No saved language found, defaulting to 'ru'");
  return 'ru';
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(getInitialLanguage());

  // Save language to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('language', language);
    console.log('Language set to:', language);
  }, [language]);

  const t = (key: string): string => {
    // Check if the key exists in translations
    if (!translations[language][key]) {
      console.warn(`Translation missing for key: "${key}" in language: "${language}"`);
      return key;
    }
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
