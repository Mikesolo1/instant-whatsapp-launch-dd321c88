
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { HandshakeIcon } from 'lucide-react';
import ContactDialog from './ContactDialog';

const Partner = () => {
  const { t } = useLanguage();

  return (
    <section id="partner" className="py-16 bg-gradient-to-r from-purple-50 to-violet-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("partner.title")}</h2>
            <p className="text-lg text-gray-600 mb-6">{t("partner.subtitle")}</p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8">
                <img 
                  src="/placeholder.svg" 
                  alt="Partner Program" 
                  className="rounded-lg w-full h-auto"
                />
              </div>
              <div className="md:w-1/2">
                <h3 className="text-2xl font-bold mb-4 text-whatsapp">{t("partner.benefits.title")}</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-whatsapp mr-2">✓</span>
                    <span>{t("partner.benefits.point1")}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-whatsapp mr-2">✓</span>
                    <span>{t("partner.benefits.point2")}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-whatsapp mr-2">✓</span>
                    <span>{t("partner.benefits.point3")}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-whatsapp mr-2">✓</span>
                    <span>{t("partner.benefits.point4")}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="text-center">
<ContactDialog 
  title={t("partner.formTitle")}
  description={t("partner.formDescription")}
  includeMessage={true}
  includeService={true}
  service={t("partner.service")}
>
  <Button className="bg-whatsapp hover:bg-whatsapp-dark text-white px-8 py-6 rounded-lg text-lg flex items-center gap-2">
    <HandshakeIcon className="w-5 h-5 mr-2" />
    {t("partner.button")}
  </Button>
</ContactDialog>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partner;
