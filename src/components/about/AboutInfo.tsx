
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Mail, Phone, MessageSquare } from "lucide-react";

const AboutInfo = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="font-bold text-lg mb-3">{t("about.friendly.title")}</h3>
        <p className="text-gray-600">
          {t("about.friendly.desc")}
        </p>
      </div>
      
      <div className="bg-whatsapp/10 p-6 rounded-lg">
        <h3 className="font-bold text-lg mb-3">{t("about.contacts.title")}</h3>
        <div className="space-y-3">
          <div className="flex items-center">
            <Phone className="h-5 w-5 text-whatsapp mr-3" />
            <span>+7 (993) 349-72-87</span>
          </div>
          <div className="flex items-center">
            <MessageSquare className="h-5 w-5 text-whatsapp mr-3" />
            <span>@nedoorezov</span>
          </div>
          <div className="flex items-center">
            <Mail className="h-5 w-5 text-whatsapp mr-3" />
            <span>sales@s3.ru</span>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="font-bold text-lg mb-3">{t("about.legal.title")}</h3>
        <div className="text-sm text-gray-600 space-y-1">
          <div>ИП КИРЕЕВ А.Ю.</div>
          <div>ИНН: 580903594790</div>
          <div>ОГРН/ОГРНИП 324580000058570</div>
          <div>Веб-сайт: s3-tech.ru</div>
        </div>
      </div>
    </div>
  );
};

export default AboutInfo;
