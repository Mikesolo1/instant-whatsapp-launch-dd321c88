
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { ChevronLeft, Calculator, TrendingDown, TrendingUp, Check, ArrowDown, Database, Users } from "lucide-react";
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
import { useIsMobile } from '@/hooks/use-mobile';

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

// Competitor pricing (average cost per message)
const COMPETITOR_MIN_RATE = 3.5;
const COMPETITOR_MAX_RATE = 7.0;

const Tariffs = () => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  const [clientCount, setClientCount] = useState<number>(12000);
  const [messagesPerClient, setMessagesPerClient] = useState<number>(3);
  const [activeRate, setActiveRate] = useState<TariffRate | null>(null);
  const [monthlyCost, setMonthlyCost] = useState<number>(0);
  const [competitorMinCost, setCompetitorMinCost] = useState<number>(0);
  const [competitorMaxCost, setCompetitorMaxCost] = useState<number>(0);
  const [savingsAmount, setSavingsAmount] = useState<number>(0);
  const [savingsPercent, setSavingsPercent] = useState<number>(0);

  // Calculate tariff when client count or messages change
  useEffect(() => {
    calculateTariff(clientCount, messagesPerClient);
  }, [clientCount, messagesPerClient]);

  // Calculate the appropriate tariff and cost
  const calculateTariff = (count: number, messages: number) => {
    // Find the applicable rate
    const rate = TARIFF_RATES.find(
      (rate) => count >= rate.min && (rate.max === null || count <= rate.max)
    );

    if (rate) {
      setActiveRate(rate);
      
      // For rates over 50000, we don't show a calculation
      if (rate.min >= 50001) {
        setMonthlyCost(0);
        setCompetitorMinCost(0);
        setCompetitorMaxCost(0);
        setSavingsAmount(0);
        setSavingsPercent(0);
      } else {
        // Our pricing
        const ourCost = count * rate.rate;
        setMonthlyCost(ourCost);
        
        // Competitor pricing (depends on message count)
        const minCompetitorCost = count * messages * COMPETITOR_MIN_RATE;
        const maxCompetitorCost = count * messages * COMPETITOR_MAX_RATE;
        
        setCompetitorMinCost(minCompetitorCost);
        setCompetitorMaxCost(maxCompetitorCost);
        
        // Calculate savings
        const maxSavings = maxCompetitorCost - ourCost;
        setSavingsAmount(maxSavings);
        setSavingsPercent(Math.round((maxSavings / maxCompetitorCost) * 100));
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
  
  // Handle message count change
  const handleMessageCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value.replace(/\D/g, ''), 10);
    if (!isNaN(value) && value >= 1) {
      setMessagesPerClient(value);
    } else if (e.target.value === '') {
      setMessagesPerClient(1);
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
        <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Link to="/" className="inline-flex items-center text-gray-600 hover:text-indigo-600 mb-6">
                <ChevronLeft className="h-4 w-4 mr-1" />
                {t("tariffs.back")}
              </Link>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{t("tariffs.title")}</h1>
              <p className="text-lg text-gray-600 mb-4 max-w-3xl mx-auto">{t("tariffs.subtitle")}</p>
              <p className="text-indigo-600 font-medium border border-indigo-200 bg-indigo-50 rounded-lg py-3 px-4 max-w-3xl mx-auto">
                {t("tariffs.active.info")}
              </p>
            </div>
          </div>
        </section>

        {/* Tariff table section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              {/* Tariff Table */}
              <h2 className="text-2xl font-bold mb-6 text-center">{t("tariffs.table.title")}</h2>
              <div className="overflow-x-auto rounded-lg border shadow-sm mb-16">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="font-semibold text-gray-800">{t("tariffs.table.column1")}</TableHead>
                      <TableHead className="font-semibold text-gray-800">{t("tariffs.table.column2")}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {TARIFF_RATES.map((rate, index) => (
                      <TableRow key={index} className={clientCount >= rate.min && (rate.max === null || clientCount <= rate.max) ? 
                        "bg-indigo-50" : "hover:bg-gray-50"}>
                        <TableCell className="font-medium">{rate.label}</TableCell>
                        <TableCell>
                          {rate.min >= 50001 ? 
                            "Индивидуально" : 
                            <span className={clientCount >= rate.min && (rate.max === null || clientCount <= rate.max) ? 
                              "font-semibold text-indigo-700" : ""}>
                              {rate.rate.toFixed(2)} ₽
                            </span>
                          }
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </section>

        {/* Calculator section */}
        <section className="py-12 bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              {/* Calculator */}
              <div className="bg-white p-8 rounded-xl border shadow-sm mb-16">
                <div className="flex items-center mb-8">
                  <Calculator className="h-6 w-6 mr-2 text-indigo-600" />
                  <h2 className="text-2xl font-bold">{t("tariffs.calculator.title")}</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Input Side */}
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="clientCount" className="block font-medium mb-2 text-gray-700">
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
                        className="w-full accent-indigo-600"
                      />
                      <div className="flex justify-between text-sm text-gray-500 mt-1">
                        <span>1</span>
                        <span>50000</span>
                        <span>100000</span>
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="messageCount" className="block font-medium mb-2 text-gray-700">
                        {t("tariffs.calculator.messages")}:
                      </label>
                      <Input
                        id="messageCount"
                        type="text"
                        value={messagesPerClient}
                        onChange={handleMessageCountChange}
                        className="mb-2"
                      />
                      <input
                        type="range"
                        min="1"
                        max="20"
                        value={messagesPerClient}
                        onChange={(e) => setMessagesPerClient(parseInt(e.target.value, 10))}
                        className="w-full accent-indigo-600"
                      />
                      <div className="flex justify-between text-sm text-gray-500 mt-1">
                        <span>1</span>
                        <span>10</span>
                        <span>20</span>
                      </div>
                    </div>
                  </div>

                  {/* Result Side */}
                  <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-100">
                    {activeRate && (
                      <>
                        <div className="text-lg mb-4 font-medium">
                          {t("tariffs.calculator.result.clients").replace("{clients}", formatNumber(clientCount))}
                        </div>
                        
                        {activeRate.min < 50001 ? (
                          <>
                            <div className="text-lg mb-2">
                              {t("tariffs.calculator.result.rate").replace("{rate}", activeRate.rate.toFixed(2))}
                            </div>
                            <div className="text-xl font-bold mb-4 text-indigo-700">
                              {t("tariffs.calculator.result.cost").replace("{cost}", formatNumber(Math.round(monthlyCost)))}
                            </div>
                            
                            <div className="h-px bg-indigo-200 my-4"></div>
                            
                            {/* Competitor comparison */}
                            <div className="text-lg mb-2">
                              {t("tariffs.calculator.result.competitors")
                                .replace("{minCost}", formatNumber(Math.round(competitorMinCost)))
                                .replace("{maxCost}", formatNumber(Math.round(competitorMaxCost)))}
                            </div>
                            
                            {savingsAmount > 0 && (
                              <div className="flex items-center text-xl font-bold text-green-600">
                                <TrendingDown className="h-5 w-5 mr-1" />
                                {t("tariffs.calculator.result.savings")
                                  .replace("{savings}", formatNumber(Math.round(savingsAmount)))
                                  .replace("{percent}", savingsPercent.toString())}
                              </div>
                            )}
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
                                className="bg-indigo-600 hover:bg-indigo-700 text-white"
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
            </div>
          </div>
        </section>

        {/* NEW: CRM Integration Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl font-bold mb-10 text-center">{t("tariffs.crm.title")}</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-xl border shadow-sm flex flex-col h-full">
                  <div className="flex items-center mb-4">
                    <Database className="h-8 w-8 mr-3 text-indigo-600" />
                    <h3 className="text-xl font-semibold">{t("tariffs.crm.api")}</h3>
                  </div>
                  <div className="flex-grow">
                    <p className="mb-6">API интеграция позволяет гибко настроить обмен данными между нашей системой и вашим CRM.</p>
                  </div>
                  <div className="mt-4">
                    <div className="inline-block bg-green-100 text-green-800 font-semibold px-4 py-2 rounded-lg">
                      {t("tariffs.crm.api.price")}
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-xl border shadow-sm flex flex-col h-full">
                  <div className="flex items-center mb-4">
                    <Database className="h-8 w-8 mr-3 text-indigo-600" />
                    <h3 className="text-xl font-semibold">{t("tariffs.crm.amo")}</h3>
                  </div>
                  <div className="flex-grow">
                    <p className="mb-6">Готовый виджет для AMO CRM с настроенной синхронизацией контактов, сделок и сообщений. Быстрое подключение без разработки.</p>
                  </div>
                  <div className="mt-4">
                    <div className="inline-block bg-indigo-100 text-indigo-800 font-semibold px-4 py-2 rounded-lg">
                      {t("tariffs.crm.amo.price")}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* NEW: Personal Manager Section */}
        <section className="py-12 bg-gradient-to-br from-indigo-50 to-purple-50">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="bg-white p-8 rounded-xl border shadow-sm">
                <div className="flex items-center mb-6">
                  <Users className="h-8 w-8 mr-3 text-indigo-600" />
                  <h2 className="text-2xl font-bold">{t("tariffs.manager.title")}</h2>
                </div>
                
                <p className="text-lg mb-8">{t("tariffs.manager.description")}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-green-50 p-6 rounded-lg border border-green-100">
                    <div className="flex items-center mb-4">
                      <Check className="h-6 w-6 text-green-500 mr-2" />
                      <h3 className="text-xl font-semibold text-green-700">{t("tariffs.manager.free")}</h3>
                    </div>
                    <p>Получите персонального CRM маркетолога бесплатно при оплате тарифа на базу от 5 000 активных клиентов</p>
                  </div>
                  
                  <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                    <div className="flex items-center mb-4">
                      <h3 className="text-xl font-semibold text-blue-700">{t("tariffs.manager.paid")}</h3>
                    </div>
                    <p>Для тарифов с меньшей клиентской базой персональный менеджер доступен за дополнительную плату</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Competitors comparison section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl font-bold mb-6 text-center">{t("tariffs.competitors.title")}</h2>
              
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-xl border shadow-sm mb-12">
                <div className="text-center mb-8">
                  <p className="text-lg mb-4">{t("tariffs.competitors.subtitle")}</p>
                  <div className="flex items-center justify-center font-semibold text-lg text-indigo-700">
                    <TrendingDown className="h-5 w-5 mr-1" /> 
                    {t("tariffs.competitors.advantage")}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <h3 className="font-semibold text-lg mb-4 text-indigo-700">Наше решение:</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Фиксированная цена за клиента</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Нет наценки на сообщения</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Чем больше сообщений, тем выше экономия</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowDown className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Снижение стоимости при масштабировании</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <h3 className="font-semibold text-lg mb-4 text-red-500">Конкуренты:</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <TrendingUp className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Наценка 3,5-7₽ на каждое сообщение</span>
                      </li>
                      <li className="flex items-start">
                        <TrendingUp className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Стоимость растет с каждым сообщением</span>
                      </li>
                      <li className="flex items-start">
                        <TrendingUp className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Непредсказуемые расходы</span>
                      </li>
                      <li className="flex items-start">
                        <TrendingUp className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Отсутствие защиты юнит-экономики</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How it works and examples section */}
        <section className="py-12 bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="bg-white p-8 rounded-xl border shadow-sm">
                  <h3 className="text-xl font-bold mb-6 text-indigo-700">{t("tariffs.how.title")}</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-indigo-600 mr-3 flex-shrink-0 mt-0.5" />
                      <span>{t("tariffs.how.point1")}</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-indigo-600 mr-3 flex-shrink-0 mt-0.5" />
                      <span>{t("tariffs.how.point2")}</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-indigo-600 mr-3 flex-shrink-0 mt-0.5" />
                      <span>{t("tariffs.how.point3")}</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-indigo-600 mr-3 flex-shrink-0 mt-0.5" />
                      <span>{t("tariffs.how.point4")}</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white p-8 rounded-xl border shadow-sm">
                  <h3 className="text-xl font-bold mb-6 text-indigo-700">{t("tariffs.example.title")}</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="bg-indigo-100 text-indigo-700 rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">1</div>
                      <span>{t("tariffs.example.point1")}</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-indigo-100 text-indigo-700 rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">2</div>
                      <span>{t("tariffs.example.point2")}</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-indigo-100 text-indigo-700 rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">3</div>
                      <span>{t("tariffs.example.point3")}</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-indigo-100 text-indigo-700 rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">4</div>
                      <span>{t("tariffs.example.point4")}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Advantages section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h3 className="text-2xl font-bold mb-8 text-center">{t("tariffs.advantages.title")}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-6 rounded-lg shadow-sm border border-indigo-100">
                  <p className="font-medium text-center">{t("tariffs.advantages.point1")}</p>
                </div>
                <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-6 rounded-lg shadow-sm border border-indigo-100">
                  <p className="font-medium text-center">{t("tariffs.advantages.point2")}</p>
                </div>
                <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-6 rounded-lg shadow-sm border border-indigo-100">
                  <p className="font-medium text-center">{t("tariffs.advantages.point3")}</p>
                </div>
                <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-6 rounded-lg shadow-sm border border-indigo-100">
                  <p className="font-medium text-center">{t("tariffs.advantages.point4")}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-10 text-center">{t("tariffs.faq.title")}</h2>
            
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-bold text-lg mb-2 text-gray-800">{t("tariffs.faq.q1")}</h3>
                <p className="text-gray-600">{t("tariffs.faq.a1")}</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-bold text-lg mb-2 text-gray-800">{t("tariffs.faq.q2")}</h3>
                <p className="text-gray-600">{t("tariffs.faq.a2")}</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-bold text-lg mb-2 text-gray-800">{t("tariffs.faq.q3")}</h3>
                <p className="text-gray-600">{t("tariffs.faq.a3")}</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-bold text-lg mb-2 text-gray-800">{t("tariffs.faq.q4")}</h3>
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
