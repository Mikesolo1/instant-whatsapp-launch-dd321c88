
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowLeft, Code, FileCode, Terminal } from 'lucide-react';

const ApiDocs = () => {
  const { t } = useLanguage();
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pt-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <Link to="/">
              <Button variant="outline" size="sm" className="mb-4">
                <ArrowLeft className="mr-1 h-4 w-4" />
                {t("tariffs.back")}
              </Button>
            </Link>
            <h1 className="text-4xl font-bold mb-4">S3 WhatsApp Business API</h1>
            <p className="text-lg text-gray-600 mb-4">v1.1</p>
          </div>
          
          <div className="grid grid-cols-1 gap-8">
            {/* Introduction */}
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-semibold mb-4">Введение</h2>
                <p className="mb-4">S3 WhatsApp Business API предоставляет доступ к функциональности WhatsApp Business через REST API.</p>
                <p className="mb-4">С помощью этого API вы можете:</p>
                <ul className="list-disc pl-6 mb-4">
                  <li className="mb-2">Отправлять и получать сообщения</li>
                  <li className="mb-2">Управлять контактами</li>
                  <li className="mb-2">Создавать шаблоны сообщений</li>
                  <li className="mb-2">Получать статистику и отчеты</li>
                </ul>
              </CardContent>
            </Card>
            
            {/* Authentication */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <Terminal className="mr-2 h-5 w-5" />
                  <h2 className="text-2xl font-semibold">Аутентификация</h2>
                </div>
                <p className="mb-4">Для доступа к API необходимо использовать токен авторизации. Токен можно получить в личном кабинете.</p>
                <div className="bg-gray-100 p-4 rounded-md mb-4">
                  <code className="text-sm">
                    Authorization: Bearer YOUR_API_TOKEN
                  </code>
                </div>
                <p className="text-sm text-gray-600">Включайте этот заголовок во все запросы к API.</p>
              </CardContent>
            </Card>
            
            {/* Base URL */}
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-semibold mb-4">Базовый URL</h2>
                <div className="bg-gray-100 p-4 rounded-md mb-4">
                  <code className="text-sm">
                    https://api.s-3.tech/v1.1
                  </code>
                </div>
                <p>Все запросы к API должны использовать этот базовый URL.</p>
              </CardContent>
            </Card>
            
            {/* Endpoints */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <FileCode className="mr-2 h-5 w-5" />
                  <h2 className="text-2xl font-semibold">Конечные точки</h2>
                </div>
                
                <div className="mb-8">
                  <h3 className="text-xl font-medium mb-3">Отправка сообщений</h3>
                  <div className="bg-gray-100 p-4 rounded-md mb-4">
                    <code className="text-sm">POST /messages</code>
                  </div>
                  <p className="mb-4">Отправляет новое сообщение контакту.</p>
                  <p className="font-medium mb-2">Параметры запроса:</p>
                  <div className="overflow-auto mb-4">
                    <table className="min-w-full divide-y divide-gray-300">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Параметр</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Тип</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Описание</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        <tr>
                          <td className="px-4 py-2 text-sm font-medium">to</td>
                          <td className="px-4 py-2 text-sm">String</td>
                          <td className="px-4 py-2 text-sm">Номер телефона получателя в формате WhatsApp</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 text-sm font-medium">type</td>
                          <td className="px-4 py-2 text-sm">String</td>
                          <td className="px-4 py-2 text-sm">Тип сообщения (text, template, media)</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 text-sm font-medium">content</td>
                          <td className="px-4 py-2 text-sm">Object</td>
                          <td className="px-4 py-2 text-sm">Содержимое сообщения, зависит от типа</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="font-medium mb-2">Пример запроса:</p>
                  <div className="bg-gray-100 p-4 rounded-md mb-4 overflow-auto">
                    <pre className="text-sm">
{`{
  "to": "79001234567",
  "type": "text",
  "content": {
    "text": "Привет! Это тестовое сообщение."
  }
}`}
                    </pre>
                  </div>
                </div>
                
                <div className="mb-8">
                  <h3 className="text-xl font-medium mb-3">Получение сообщений</h3>
                  <div className="bg-gray-100 p-4 rounded-md mb-4">
                    <code className="text-sm">GET /messages</code>
                  </div>
                  <p className="mb-4">Получает список сообщений.</p>
                  <p className="font-medium mb-2">Параметры запроса:</p>
                  <div className="overflow-auto mb-4">
                    <table className="min-w-full divide-y divide-gray-300">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Параметр</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Тип</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Описание</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        <tr>
                          <td className="px-4 py-2 text-sm font-medium">limit</td>
                          <td className="px-4 py-2 text-sm">Number</td>
                          <td className="px-4 py-2 text-sm">Максимальное количество сообщений (по умолчанию 50)</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 text-sm font-medium">offset</td>
                          <td className="px-4 py-2 text-sm">Number</td>
                          <td className="px-4 py-2 text-sm">Смещение для пагинации</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 text-sm font-medium">phone</td>
                          <td className="px-4 py-2 text-sm">String</td>
                          <td className="px-4 py-2 text-sm">Фильтр по номеру телефона</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                
                <div className="mb-8">
                  <h3 className="text-xl font-medium mb-3">Отправка шаблонов</h3>
                  <div className="bg-gray-100 p-4 rounded-md mb-4">
                    <code className="text-sm">POST /templates/send</code>
                  </div>
                  <p className="mb-4">Отправляет сообщение на основе шаблона.</p>
                  <p className="font-medium mb-2">Пример запроса:</p>
                  <div className="bg-gray-100 p-4 rounded-md mb-4 overflow-auto">
                    <pre className="text-sm">
{`{
  "to": "79001234567",
  "template": {
    "name": "welcome_message",
    "language": "ru",
    "components": [
      {
        "type": "body",
        "parameters": [
          {
            "type": "text",
            "text": "Иван"
          }
        ]
      }
    ]
  }
}`}
                    </pre>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium mb-3">Медиа-файлы</h3>
                  <div className="bg-gray-100 p-4 rounded-md mb-4">
                    <code className="text-sm">POST /media</code>
                  </div>
                  <p className="mb-4">Загружает медиа-файл для последующей отправки.</p>
                  <p className="font-medium mb-2">Пример запроса:</p>
                  <p className="mb-2">Используйте multipart/form-data для загрузки файла:</p>
                  <div className="bg-gray-100 p-4 rounded-md mb-4">
                    <code className="text-sm">
                      file: [бинарные данные файла]<br/>
                      type: image
                    </code>
                  </div>
                  <p className="mb-4">Поддерживаемые типы: image, document, audio, video, sticker</p>
                </div>
              </CardContent>
            </Card>
            
            {/* Error Codes */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <Code className="mr-2 h-5 w-5" />
                  <h2 className="text-2xl font-semibold">Коды ошибок</h2>
                </div>
                <div className="overflow-auto">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Код</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Описание</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      <tr>
                        <td className="px-4 py-2 text-sm font-medium">400</td>
                        <td className="px-4 py-2 text-sm">Неверный запрос</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 text-sm font-medium">401</td>
                        <td className="px-4 py-2 text-sm">Неавторизован</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 text-sm font-medium">404</td>
                        <td className="px-4 py-2 text-sm">Ресурс не найден</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 text-sm font-medium">429</td>
                        <td className="px-4 py-2 text-sm">Слишком много запросов</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 text-sm font-medium">500</td>
                        <td className="px-4 py-2 text-sm">Внутренняя ошибка сервера</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
            
            {/* Contact */}
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-semibold mb-4">Поддержка</h2>
                <p className="mb-4">Если у вас возникли вопросы или проблемы с API, пожалуйста, свяжитесь с нашей службой поддержки:</p>
                <p className="mb-2">
                  <span className="font-medium">Email:</span> support@s-3.tech
                </p>
                <p>
                  <span className="font-medium">Телефон:</span> +7 (800) 123-45-67
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ApiDocs;
