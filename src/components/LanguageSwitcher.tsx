
import React, { useEffect } from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from "sonner";

const LanguageSwitcher = () => {
  const { language, setLanguage, t } = useLanguage();

  // Show toast when language changes
  useEffect(() => {
    if (document.readyState === 'complete') {
      const languageName = language === 'ru' 
        ? 'Русский' 
        : language === 'kz' 
          ? 'Қазақша' 
          : 'English';
      toast.success(`${languageName} ${t("language.selected")}`, {
        duration: 2000,
      });
      console.log("Language switched to:", language, "Toast shown for:", languageName);
    }
  }, [language, t]);

  const handleLanguageChange = (lang: 'ru' | 'kz' | 'en') => {
    if (lang !== language) {
      console.log("Changing language from", language, "to", lang);
      setLanguage(lang);
    }
  };

  return (
    <div className="relative inline-block">
      <div className="flex items-center bg-gray-100 rounded-full p-1 border border-gray-200 shadow-sm">
        <button
          onClick={() => handleLanguageChange('ru')}
          className={`px-2 py-1.5 text-sm font-medium rounded-full transition-colors ${
            language === 'ru' ? 'bg-white text-whatsapp shadow-sm' : 'text-gray-600 hover:text-whatsapp'
          }`}
          aria-label="Русский язык"
        >
          {t("lang.ru")}
        </button>
        <button
          onClick={() => handleLanguageChange('kz')}
          className={`px-2 py-1.5 text-sm font-medium rounded-full transition-colors ${
            language === 'kz' ? 'bg-white text-whatsapp shadow-sm' : 'text-gray-600 hover:text-whatsapp'
          }`}
          aria-label="Казахский язык"
        >
          {t("lang.kz")}
        </button>
        <button
          onClick={() => handleLanguageChange('en')}
          className={`px-2 py-1.5 text-sm font-medium rounded-full transition-colors ${
            language === 'en' ? 'bg-white text-whatsapp shadow-sm' : 'text-gray-600 hover:text-whatsapp'
          }`}
          aria-label="English language"
        >
          {t("lang.en")}
        </button>
        <div className="hidden sm:flex items-center justify-center w-6 h-6 ml-1">
          <Globe className="h-4 w-4 text-gray-500" />
        </div>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
