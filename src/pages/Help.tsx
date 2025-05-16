
import React from 'react';
import { Clock, Mail, Phone, MessageSquare, CalendarDays } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Help = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-whatsapp">{t("help.title")}</h1>
          
          <div className="prose max-w-none">
            <Card className="mb-8 overflow-hidden border-whatsapp/20">
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold text-whatsapp mb-4 flex items-center">
                  <Mail className="mr-2 h-6 w-6" /> {t("help.support.title")}
                </h2>
                <p className="text-gray-700 mb-6">
                  {t("help.support.description")}
                </p>
                
                <div className="bg-whatsapp/5 p-4 rounded-lg mb-6">
                  <h3 className="font-semibold text-lg flex items-center gap-2 mb-3">
                    <Clock className="h-5 w-5 text-whatsapp" /> {t("help.schedule.title")}
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium flex items-center gap-2 text-whatsapp">
                        <span className="bg-whatsapp text-white p-1 rounded-md">
                          <MessageSquare className="h-4 w-4" />
                        </span>
                        {t("help.schedule.technical.title")}
                      </h4>
                      <Table>
                        <TableBody>
                          <TableRow>
                            <TableCell className="py-2 pl-8">⏰ {t("help.schedule.technical.hours")}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="py-2 pl-8">💬 {t("help.schedule.technical.response")}</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                    
                    <div>
                      <h4 className="font-medium flex items-center gap-2 text-whatsapp">
                        <span className="bg-whatsapp text-white p-1 rounded-md">
                          <Phone className="h-4 w-4" />
                        </span>
                        {t("help.schedule.account.title")}
                      </h4>
                      <Table>
                        <TableBody>
                          <TableRow>
                            <TableCell className="py-2 pl-8">⏰ {t("help.schedule.account.hours")}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="py-2 pl-8">{t("help.schedule.account.description")}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="py-2 pl-8">💬 {t("help.schedule.account.response")}</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                    
                    <div>
                      <h4 className="font-medium flex items-center gap-2 text-whatsapp">
                        <span className="bg-whatsapp text-white p-1 rounded-md">
                          <CalendarDays className="h-4 w-4" />
                        </span>
                        {t("help.schedule.offhours.title")}
                      </h4>
                      <p className="py-2 pl-8">
                        {t("help.schedule.offhours.description")}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="border-l-4 border-whatsapp pl-4 mb-6">
                  <h3 className="font-semibold text-lg mb-3">{t("help.request.title")}</h3>
                  <p className="text-gray-700 mb-3">{t("help.request.description")}</p>
                  
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="text-whatsapp">
                        {t("help.request.technical.title")}
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="list-disc pl-5 space-y-2">
                          <li>{t("help.request.technical.time")}</li>
                          <li>{t("help.request.technical.phone")}</li>
                          <li>{t("help.request.technical.issue")}</li>
                          <li>{t("help.request.technical.screenshot")}</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger className="text-whatsapp">
                        {t("help.request.other.title")}
                      </AccordionTrigger>
                      <AccordionContent>
                        <p>{t("help.request.other.description")}</p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
                
                <div className="text-center border-t border-gray-200 pt-6">
                  <p className="mb-2">{t("help.closure.thanks")}</p>
                  <p>{t("help.closure.regards")}</p>
                  
                  <Button 
                    variant="default" 
                    className="mt-4 bg-whatsapp hover:bg-whatsapp-dark"
                  >
                    <MessageSquare className="mr-2 h-4 w-4" />
                    {t("help.contact_button")}
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-semibold mb-4">{t("help.faq.title")}</h3>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="faq-1">
                  <AccordionTrigger>{t("help.faq.item1.question")}</AccordionTrigger>
                  <AccordionContent>
                    {t("help.faq.item1.answer")}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="faq-2">
                  <AccordionTrigger>{t("help.faq.item2.question")}</AccordionTrigger>
                  <AccordionContent>
                    {t("help.faq.item2.answer")}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="faq-3">
                  <AccordionTrigger>{t("help.faq.item3.question")}</AccordionTrigger>
                  <AccordionContent>
                    {t("help.faq.item3.answer")}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Help;
