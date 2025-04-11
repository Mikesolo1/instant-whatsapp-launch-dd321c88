
import React from 'react';
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import ContactDialog from './ContactDialog';

const Hero = () => {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50 py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in-up">
            <div className="inline-flex items-center rounded-full border border-gray-200 bg-white px-3 py-1 text-sm">
              <span className="rounded-full bg-whatsapp h-2 w-2 mr-1"></span>
              <span className="font-medium">{t("hero.badge")}</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight">
              {t("hero.title").split("WhatsApp").map((part, i, arr) => (
                <React.Fragment key={i}>
                  {part}
                  {i < arr.length - 1 && <span className="text-whatsapp">WhatsApp</span>}
                </React.Fragment>
              ))}
            </h1>
            
            <p className="text-xl text-gray-600 max-w-lg">
              {t("hero.subtitle")}
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center">
                <CheckCircle2 className="h-5 w-5 text-whatsapp mr-2" />
                <span className="text-gray-700">{t("hero.point1")}</span>
              </div>
              <div className="flex items-center">
                <CheckCircle2 className="h-5 w-5 text-whatsapp mr-2" />
                <span className="text-gray-700">{t("hero.point2")}</span>
              </div>
              <div className="flex items-center">
                <CheckCircle2 className="h-5 w-5 text-whatsapp mr-2" />
                <span className="text-gray-700">{t("hero.point3")}</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <ContactDialog
                title={t("hero.startTitle")}
                description={t("hero.startDescription")}
                className="bg-whatsapp hover:bg-whatsapp-dark text-white px-8 py-6 text-lg rounded-lg"
              >
                {t("hero.button.start")}
              </ContactDialog>
              
              <Link to="/tariffs">
                <Button variant="outline" className="px-8 py-6 text-lg rounded-lg w-full sm:w-auto">
                  {t("hero.button.price")}
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="relative animate-float">
            <div className="absolute inset-0 bg-gradient-to-tr from-whatsapp/20 to-transparent rounded-3xl transform rotate-3"></div>
            <div className="relative bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-whatsapp flex items-center justify-center text-white font-bold text-xl mr-3">
                  S3
                </div>
                <div>
                  <div className="font-medium">{t("hero.chat.title")}</div>
                  <div className="text-sm text-gray-500">{t("hero.chat.subtitle")}</div>
                </div>
              </div>
              
              <div className="bg-whatsapp-light rounded-lg p-4 mb-4">
                <p className="text-gray-700">{t("hero.chat.message")}</p>
              </div>
              
              <div className="flex justify-between">
                <div className="text-xs text-gray-500">{t("hero.chat.time")}</div>
                <div className="text-xs text-gray-500">{t("hero.chat.read")} ✓✓</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
