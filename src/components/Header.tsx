
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { PhoneCall, Menu, X } from "lucide-react";
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import { Link } from 'react-router-dom';
import ContactDialog from './ContactDialog';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Header = () => {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);

  const menuItems = [
    { title: t("menu.features"), href: "/#features" },
    { title: t("menu.cases"), href: "/#cases" },
    { title: t("menu.pricing"), href: "/tariffs" },
    { title: t("menu.about"), href: "/#about" },
    { title: t("menu.partner"), href: "https://partners.s3-tech.ru/", external: true },
    { title: t("menu.help"), href: "/help" }
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur-sm">
      <div className="container mx-auto flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-whatsapp">S3</span>
          </Link>
        </div>
        
        {/* Desktop menu */}
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
          <a 
            href="https://partners.s3-tech.ru/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm font-medium text-gray-800 hover:text-whatsapp transition-colors"
          >
            {t("menu.partner")}
          </a>
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
          
          {/* Mobile menu button */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[80%] sm:w-[350px] pt-10">
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-center mb-6">
                  <Link to="/" onClick={() => setOpen(false)} className="text-2xl font-bold text-whatsapp">
                    S3
                  </Link>
                  <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                
                <Accordion type="single" collapsible className="w-full">
                  {menuItems.map((item, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="py-2">
                        {item.title}
                      </AccordionTrigger>
                      <AccordionContent>
                        {item.external ? (
                          <a 
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setOpen(false)}
                            className="block py-2 px-4 text-sm hover:text-whatsapp"
                          >
                            {item.title}
                          </a>
                        ) : (
                          <Link 
                            to={item.href} 
                            onClick={() => setOpen(false)}
                            className="block py-2 px-4 text-sm hover:text-whatsapp"
                          >
                            {item.title}
                          </Link>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
                
                <div className="mt-auto pt-6 border-t">
                  <Button 
                    variant="outline" 
                    className="w-full mb-4"
                    onClick={() => setOpen(false)}
                  >
                    {t("button.login")}
                  </Button>
                  
                  <ContactDialog
                    title={t("header.contactTitle")}
                    description={t("header.contactDescription")}
                    className="bg-whatsapp hover:bg-whatsapp-dark text-white w-full"
                  >
                    <PhoneCall className="h-4 w-4 mr-1" />
                    {t("button.contact")}
                  </ContactDialog>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
