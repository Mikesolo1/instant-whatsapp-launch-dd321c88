
import React from 'react';
import { Button } from "@/components/ui/button";
import { PhoneCall } from "lucide-react";
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import { Link } from 'react-router-dom';
import ContactDialog from './ContactDialog';

const Header = () => {
  const { t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur-sm">
      <div className="container mx-auto flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-whatsapp">S3</span>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <a href="/#features" className="text-sm font-medium text-gray-800 hover:text-whatsapp transition-colors">
            {t("menu.features")}
          </a>
          <a href="/#cases" className="text-sm font-medium text-gray-800 hover:text-whatsapp transition-colors">
            {t("menu.cases")}
          </a>
          <Link to="/tariffs" className="text-sm font-medium text-gray-800 hover:text-whatsapp transition-colors">
            {t("menu.pricing")}
          </Link>
          <a href="/#about" className="text-sm font-medium text-gray-800 hover:text-whatsapp transition-colors">
            {t("menu.about")}
          </a>
          <Link to="/partner-program" className="text-sm font-medium text-gray-800 hover:text-whatsapp transition-colors">
            {t("menu.partner")}
          </Link>
          <Link to="/help" className="text-sm font-medium text-gray-800 hover:text-whatsapp transition-colors">
            {t("menu.help")}
          </Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          <LanguageSwitcher />
          <Button variant="outline" className="mr-2 hidden md:flex">
            {t("button.login")}
          </Button>
          <ContactDialog
            title={t("header.contactTitle")}
            description={t("header.contactDescription")}
            className="bg-whatsapp hover:bg-whatsapp-dark text-white flex items-center gap-1"
          >
            <PhoneCall className="h-4 w-4 mr-1" />
            {t("button.contact")}
          </ContactDialog>
        </div>
      </div>
    </header>
  );
};

export default Header;
