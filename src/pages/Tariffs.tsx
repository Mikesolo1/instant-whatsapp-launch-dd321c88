
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Check, ChevronLeft, Info, Calculator } from "lucide-react";
import { Link } from 'react-router-dom';
import ContactDialog from '@/components/ContactDialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";

// Tariff structure
interface TariffRate {
  min: number;
  max: number | null;
  rate: number;
  label: string;
}

const TARIFF_RATES: TariffRate[] = [
  { min: 0, max: 5000, rate: 3.00, label: "до 5 000" },
  { min: 5001, max: 10000, rate: 2.80, label: "5 001 – 10 000" },
  { min: 10001, max: 15000, rate: 2.60, label: "10 001 – 15 000" },
  { min: 15001, max: 20000, rate: 2.40, label: "15 001 – 20 000" },
  { min: 20001, max: 25000, rate: 2.20, label: "20 001 – 25 000" },
  { min: 25001, max: 30000, rate: 2.00, label: "25 001 – 30 000" },
  { min: 30001, max: 40000, rate: 1.80, label: "30 001 – 40 000" },
  { min: 40001, max: 50000, rate: 1.60, label: "40 001 – 50 000" },
  { min: 50001, max: null, rate: 0, label: "свыше 50 000" },
];

const Tariffs = () => {
  const { t } = useLanguage();
  const [clientCount, setClientCount] = useState<number>(12000);
  const [activeRate, setActiveRate] = useState<TariffRate | null>(null);
  const [monthlyCost, setMonthlyCost] = useState<number>(0);

  // Calculate tariff when client count changes
  useEffect(() => {
    calculateTariff(clientCount);
  }, [clientCount]);

  // Calculate the appropriate tariff and cost
  const calculateTariff = (count: number) => {
    // Find the applicable rate
    const rate = TARIFF_RATES.find(
      (rate) => count >= rate.min && (rate.max === null || count <= rate.max)
    );

    if (rate) {
      setActiveRate(rate);
      // For rates over 50000, we don't show a calculation
      if (rate.min >= 50001) {
        setMonthlyCost(0);
      } else {
        setMonthlyCost(count * rate.rate);
      }
    }
  };

  // Handle input change with validation
  const handleClientCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value.replace(/\D/g, ''), 10);
    if (!isNaN(value) && value >= 0) {
      setClientCount(value);
    } else if (e.target.value === '') {
      setClientCount(0);
    }
  };

  // Format number with spaces as thousand separators
  const formatNumber = (num: number): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero section */}
        <section className="py-12 bg-gradient-to-r from-green-50 to-emerald-50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div>
                <Link to="/" className="inline-flex items-center text-gray-600 hover:text-whatsapp mb-4">
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  {t("tariffs.back")}
                </Link>
                <h1 className="text-3xl md:text-4xl font-bold mb-4">{t("tariffs.title")}</h1>
                <p className="text-lg text-gray-600 mb-6 max-w-2xl">{t("tariffs.subtitle")}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Tariff table and calculator section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            {/* Tariff Table */}
            <h2 className="text-2xl font-bold mb-6">{t("tariffs.table.title")}</h2>
            <div className="overflow-x-auto rounded-lg border shadow mb-12">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t("tariffs.table.column1")}</TableHead>
                    <TableHead>{t("tariffs.table.column2")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {TARIFF_RATES.map((rate, index) => (
                    <TableRow key={index}>
                      <TableCell>{rate.label}</TableCell>
                      <TableCell>
                        {rate.min >= 50001 ? "Индивидуально" : `${rate.rate.toFixed(2)} ₽`}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Calculator */}
            <div className="bg-white p-8 rounded-lg border shadow-sm mb-12">
              <div className="flex items-center mb-6">
                <Calculator className="h-6 w-6 mr-2 text-whatsapp" />
                <h2 className="text-2xl font-bold">{t("tariffs.calculator.title")}</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Input Side */}
                <div>
                  <label htmlFor="clientCount" className="block font-medium mb-2">
                    {t("tariffs.calculator.input")}:
                  </label>
                  <Input
                    id="clientCount"
                    type="text"
                    value={formatNumber(clientCount)}
                    onChange={handleClientCountChange}
                    className="mb-2"
                  />
                  <input
                    type="range"
                    min="1"
                    max="100000"
                    value={clientCount}
                    onChange={(e) => setClientCount(parseInt(e.target.value, 10))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>1</span>
                    <span>50000</span>
                    <span>100000+</span>
                  </div>
                </div>

                {/* Result Side */}
                <div className="bg-whatsapp/5 p-6 rounded-lg">
                  {activeRate && (
                    <>
                      <div className="text-lg mb-2">
                        ✅ {t("tariffs.calculator.result.clients").replace("{clients}", formatNumber(clientCount))}
                      </div>
                      
                      {activeRate.min < 50001 ? (
                        <>
                          <div className="text-lg mb-2">
                            💵 {t("tariffs.calculator.result.rate").replace("{rate}", activeRate.rate.toFixed(2))}
                          </div>
                          <div className="text-xl font-bold">
                            💰 {t("tariffs.calculator.result.cost").replace("{cost}", formatNumber(Math.round(monthlyCost)))}
                          </div>
                        </>
                      ) : (
                        <div className="text-lg font-bold">
                          Для расчета свяжитесь с нами
                          <div className="mt-4">
                            <ContactDialog
                              title="Индивидуальный расчет"
                              description="Для клиентских баз свыше 50,000 мы предлагаем индивидуальные условия"
                              includeMessage={true}
                              includeService={true}
                              service="Тариф для базы свыше 50,000"
                              className="bg-whatsapp hover:bg-whatsapp-dark text-white"
                            >
                              Связаться
                            </ContactDialog>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* How it Works */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white p-8 rounded-lg border shadow-sm">
                <h3 className="text-xl font-bold mb-4">{t("tariffs.how.title")}</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-whatsapp mr-2 flex-shrink-0 mt-0.5" />
                    <span>{t("tariffs.how.point1")}</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-whatsapp mr-2 flex-shrink-0 mt-0.5" />
                    <span>{t("tariffs.how.point2")}</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-whatsapp mr-2 flex-shrink-0 mt-0.5" />
                    <span>{t("tariffs.how.point3")}</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-whatsapp mr-2 flex-shrink-0 mt-0.5" />
                    <span>{t("tariffs.how.point4")}</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-lg border shadow-sm">
                <h3 className="text-xl font-bold mb-4">{t("tariffs.example.title")}</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Info className="h-5 w-5 text-whatsapp mr-2 flex-shrink-0 mt-0.5" />
                    <span>{t("tariffs.example.point1")}</span>
                  </li>
                  <li className="flex items-start">
                    <Info className="h-5 w-5 text-whatsapp mr-2 flex-shrink-0 mt-0.5" />
                    <span>{t("tariffs.example.point2")}</span>
                  </li>
                  <li className="flex items-start">
                    <Info className="h-5 w-5 text-whatsapp mr-2 flex-shrink-0 mt-0.5" />
                    <span>{t("tariffs.example.point3")}</span>
                  </li>
                  <li className="flex items-start">
                    <Info className="h-5 w-5 text-whatsapp mr-2 flex-shrink-0 mt-0.5" />
                    <span>{t("tariffs.example.point4")}</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Advantages */}
            <div className="bg-white p-8 rounded-lg border shadow-sm mb-12">
              <h3 className="text-xl font-bold mb-6">{t("tariffs.advantages.title")}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-whatsapp/5 p-4 rounded-lg">
                  <p className="font-medium">{t("tariffs.advantages.point1")}</p>
                </div>
                <div className="bg-whatsapp/5 p-4 rounded-lg">
                  <p className="font-medium">{t("tariffs.advantages.point2")}</p>
                </div>
                <div className="bg-whatsapp/5 p-4 rounded-lg">
                  <p className="font-medium">{t("tariffs.advantages.point3")}</p>
                </div>
                <div className="bg-whatsapp/5 p-4 rounded-lg">
                  <p className="font-medium">{t("tariffs.advantages.point4")}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">{t("tariffs.faq.title")}</h2>
            
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-bold text-lg mb-2">{t("tariffs.faq.q1")}</h3>
                <p className="text-gray-600">{t("tariffs.faq.a1")}</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-bold text-lg mb-2">{t("tariffs.faq.q2")}</h3>
                <p className="text-gray-600">{t("tariffs.faq.a2")}</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-bold text-lg mb-2">{t("tariffs.faq.q3")}</h3>
                <p className="text-gray-600">{t("tariffs.faq.a3")}</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-bold text-lg mb-2">{t("tariffs.faq.q4")}</h3>
                <p className="text-gray-600">{t("tariffs.faq.a4")}</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Tariffs;
