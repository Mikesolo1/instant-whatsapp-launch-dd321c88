
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { 
  HandshakeIcon, 
  GlobeIcon, 
  TrendingUpIcon, 
  CoinsIcon, 
  BarChart2Icon, 
  UsersIcon,
  MailIcon,
  ExternalLink
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactDialog from '@/components/ContactDialog';

const PartnerProgram = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      <Header />
      
      <main>
        {/* Partners Portal Banner */}
        <section className="bg-whatsapp py-4">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="text-white mb-3 md:mb-0">
                <span className="font-medium">{t("partner.detailed.portal.registered")}</span>
                {" "}
                <span className="font-bold">{t("partner.detailed.portal.title")}</span>
              </div>
              <Button 
                variant="outline" 
                className="bg-white text-whatsapp hover:bg-gray-100 flex items-center gap-2"
                onClick={() => window.open("https://partners.s3-tech.ru/", "_blank")}
              >
                {t("partner.detailed.portal.button")}
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-r from-purple-100 to-violet-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto text-center">
              <span className="inline-block bg-whatsapp/20 text-whatsapp font-medium rounded-full px-4 py-1 mb-6">
                {t("partner.badge")}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                {t("partner.detailed.title")}
              </h1>
              <p className="text-xl text-gray-700 mb-10 max-w-3xl mx-auto">
                {t("partner.detailed.subtitle")}
              </p>
              <ContactDialog
                title={t("partner.detailed.formTitle")}
                description={t("partner.detailed.formDescription")}
                includeMessage={true}
                includeService={true}
                service={t("partner.service")}
                className="bg-whatsapp hover:bg-whatsapp-dark text-white px-8 py-6 rounded-lg text-lg flex items-center gap-2 mx-auto"
              >
                <HandshakeIcon className="w-5 h-5 mr-2" />
                {t("partner.detailed.button")}
              </ContactDialog>
            </div>
          </div>
        </section>
        
        {/* Benefits */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                {t("partner.detailed.benefits.title")}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
                  <CoinsIcon className="w-12 h-12 text-whatsapp mb-4" />
                  <h3 className="text-xl font-bold mb-2">{t("partner.detailed.benefits.earning.title")}</h3>
                  <p className="text-gray-600">{t("partner.detailed.benefits.earning.desc")}</p>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
                  <GlobeIcon className="w-12 h-12 text-whatsapp mb-4" />
                  <h3 className="text-xl font-bold mb-2">{t("partner.detailed.benefits.remote.title")}</h3>
                  <p className="text-gray-600">{t("partner.detailed.benefits.remote.desc")}</p>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
                  <TrendingUpIcon className="w-12 h-12 text-whatsapp mb-4" />
                  <h3 className="text-xl font-bold mb-2">{t("partner.detailed.benefits.growth.title")}</h3>
                  <p className="text-gray-600">{t("partner.detailed.benefits.growth.desc")}</p>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
                  <BarChart2Icon className="w-12 h-12 text-whatsapp mb-4" />
                  <h3 className="text-xl font-bold mb-2">{t("partner.detailed.benefits.analytics.title")}</h3>
                  <p className="text-gray-600">{t("partner.detailed.benefits.analytics.desc")}</p>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
                  <UsersIcon className="w-12 h-12 text-whatsapp mb-4" />
                  <h3 className="text-xl font-bold mb-2">{t("partner.detailed.benefits.support.title")}</h3>
                  <p className="text-gray-600">{t("partner.detailed.benefits.support.desc")}</p>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
                  <HandshakeIcon className="w-12 h-12 text-whatsapp mb-4" />
                  <h3 className="text-xl font-bold mb-2">{t("partner.detailed.benefits.trust.title")}</h3>
                  <p className="text-gray-600">{t("partner.detailed.benefits.trust.desc")}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* How It Works */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                {t("partner.detailed.how.title")}
              </h2>
              
              <div className="space-y-8">
                <div className="flex flex-col md:flex-row items-center p-6 bg-white rounded-2xl shadow-sm">
                  <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center rounded-full bg-whatsapp/20 text-whatsapp font-bold text-2xl mb-4 md:mb-0 md:mr-6">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">{t("partner.detailed.how.step1.title")}</h3>
                    <p className="text-gray-600">{t("partner.detailed.how.step1.desc")}</p>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row items-center p-6 bg-white rounded-2xl shadow-sm">
                  <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center rounded-full bg-whatsapp/20 text-whatsapp font-bold text-2xl mb-4 md:mb-0 md:mr-6">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">{t("partner.detailed.how.step2.title")}</h3>
                    <p className="text-gray-600">{t("partner.detailed.how.step2.desc")}</p>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row items-center p-6 bg-white rounded-2xl shadow-sm">
                  <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center rounded-full bg-whatsapp/20 text-whatsapp font-bold text-2xl mb-4 md:mb-0 md:mr-6">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">{t("partner.detailed.how.step3.title")}</h3>
                    <p className="text-gray-600">{t("partner.detailed.how.step3.desc")}</p>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row items-center p-6 bg-white rounded-2xl shadow-sm">
                  <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center rounded-full bg-whatsapp/20 text-whatsapp font-bold text-2xl mb-4 md:mb-0 md:mr-6">
                    4
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">{t("partner.detailed.how.step4.title")}</h3>
                    <p className="text-gray-600">{t("partner.detailed.how.step4.desc")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Commission Structure */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                {t("partner.detailed.commission.title")}
              </h2>
              
              <div className="bg-gray-50 rounded-2xl p-8 shadow-sm mb-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-whatsapp">{t("partner.detailed.commission.first.title")}</h3>
                    <p className="text-gray-600 mb-4">{t("partner.detailed.commission.first.desc")}</p>
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <span className="block text-4xl font-bold text-whatsapp mb-1">20%</span>
                      <span className="text-gray-600">{t("partner.detailed.commission.first.rate")}</span>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-whatsapp">{t("partner.detailed.commission.recurring.title")}</h3>
                    <p className="text-gray-600 mb-4">{t("partner.detailed.commission.recurring.desc")}</p>
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <span className="block text-4xl font-bold text-whatsapp mb-1">10–20%</span>
                      <span className="text-gray-600">{t("partner.detailed.commission.recurring.rate")}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <p className="text-lg font-medium mb-6">{t("partner.detailed.commission.note")}</p>
                <Button className="bg-whatsapp hover:bg-whatsapp-dark text-white px-8 py-3 rounded-lg">
                  {t("partner.detailed.commission.button")}
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* FAQ */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                {t("partner.detailed.faq.title")}
              </h2>
              
              <div className="space-y-6">
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h3 className="text-xl font-bold mb-2">{t("partner.detailed.faq.q1")}</h3>
                  <p className="text-gray-600">{t("partner.detailed.faq.a1")}</p>
                </div>
                
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h3 className="text-xl font-bold mb-2">{t("partner.detailed.faq.q2")}</h3>
                  <p className="text-gray-600">{t("partner.detailed.faq.a2")}</p>
                </div>
                
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h3 className="text-xl font-bold mb-2">{t("partner.detailed.faq.q3")}</h3>
                  <p className="text-gray-600">{t("partner.detailed.faq.a3")}</p>
                </div>
                
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h3 className="text-xl font-bold mb-2">{t("partner.detailed.faq.q4")}</h3>
                  <p className="text-gray-600">{t("partner.detailed.faq.a4")}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA */}
        <section className="py-16 bg-gradient-to-r from-whatsapp/20 to-whatsapp/10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                {t("partner.detailed.cta.title")}
              </h2>
              <p className="text-xl text-gray-700 mb-10">
                {t("partner.detailed.cta.subtitle")}
              </p>
              <ContactDialog
                title={t("partner.detailed.cta.formTitle")}
                description={t("partner.detailed.cta.formDescription")}
                includeMessage={true}
                includeService={true}
                service={t("partner.service")}
                className="bg-whatsapp hover:bg-whatsapp-dark text-white px-8 py-6 rounded-lg text-lg flex items-center gap-2 mx-auto"
              >
                <MailIcon className="w-5 h-5" />
                {t("partner.detailed.cta.button")}
              </ContactDialog>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default PartnerProgram;
