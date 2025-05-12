import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowLeft, Code, FileCode, Terminal, Key, Server, MessageSquare, Upload, Search, Info, AlertCircle, Database } from 'lucide-react';

const ApiDocs = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("curl");
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <Link to="/">
              <Button variant="outline" size="sm" className="mb-4">
                <ArrowLeft className="mr-1 h-4 w-4" />
                {t("tariffs.back")}
              </Button>
            </Link>
            <div className="flex flex-wrap gap-2 items-center mb-4">
              <Link to="/" className="text-sm text-gray-500 hover:text-gray-900">Главная</Link>
              <span className="text-sm text-gray-500">→</span>
              <span className="text-sm text-gray-500">API</span>
              <span className="text-sm text-gray-500">→</span>
              <span className="text-sm font-medium">Документация</span>
            </div>
            <h1 className="text-4xl font-bold mb-4">S3 WhatsApp Business API</h1>
            <p className="text-lg text-gray-600 mb-8">v1.1</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-3">
              <Card className="mb-8">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4 gap-2">
                    <Info className="h-5 w-5 text-primary" />
                    <h2 className="text-2xl font-semibold">Введение</h2>
                  </div>
                  <p className="mb-4">S3 API помогает подключить ваш бизнес к WhatsApp Business для эффективной и автоматизированной коммуникации с клиентами. Вы получаете:</p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Автоматизацию коммуникаций с клиентами</li>
                    <li>Поддержку текстовых, медиа и шаблонных сообщений</li>
                    <li>Прием и обработку входящих сообщений через webhook</li>
                    <li>Безопасную интеграцию с вашими системами</li>
                  </ul>
                  <p>Для начала работы зарегистрируйтесь в личном кабинете S3 и настройте соответствующие параметры.</p>
                </CardContent>
              </Card>

              <Card className="mb-8">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4 gap-2">
                    <Key className="h-5 w-5 text-primary" />
                    <h2 className="text-2xl font-semibold">Авторизация</h2>
                  </div>
                  <p className="mb-4">Все запросы к API S3 требуют авторизации с использованием API-ключа, передаваемого в заголовке запроса. Вы можете получить свой API-ключ в настройках профиля аккаунта S3.</p>
                  
                  <Tabs defaultValue="curl" value={activeTab} onValueChange={setActiveTab} className="mb-4">
                    <TabsList className="grid w-full grid-cols-3 md:w-auto">
                      <TabsTrigger value="curl">cURL</TabsTrigger>
                      <TabsTrigger value="go">Go</TabsTrigger>
                      <TabsTrigger value="python">Python</TabsTrigger>
                    </TabsList>
                    <TabsContent value="curl" className="mt-4">
                      <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md mb-4 overflow-auto">
                        <pre className="text-sm whitespace-pre-wrap">
{`curl -X POST https://s-3.tech/api/v1.1/ \\
  -H "Authorization: YOUR_API_KEY" \\
  -H "Content-Type: application/json"`}
                        </pre>
                      </div>
                    </TabsContent>
                    <TabsContent value="go" className="mt-4">
                      <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md mb-4 overflow-auto">
                        <pre className="text-sm whitespace-pre-wrap">
{`package main

import (
    "fmt"
    "io/ioutil"
    "net/http"
    "strings"
)

func main() {
    url := "https://s-3.tech/api/v1.1/"
    method := "POST"

    payload := strings.NewReader("")
    client := &http.Client{}
    req, err := http.NewRequest(method, url, payload)

    if err != nil {
        fmt.Println(err)
        return
    }
    req.Header.Add("Authorization", "YOUR_API_KEY")
    req.Header.Add("Content-Type", "application/json")

    res, err := client.Do(req)
    if err != nil {
        fmt.Println(err)
        return
    }
    defer res.Body.Close()

    body, err := ioutil.ReadAll(res.Body)
    if err != nil {
        fmt.Println(err)
        return
    }
    fmt.Println(string(body))
}`}
                        </pre>
                      </div>
                    </TabsContent>
                    <TabsContent value="python" className="mt-4">
                      <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md mb-4 overflow-auto">
                        <pre className="text-sm whitespace-pre-wrap">
{`import requests

url = "https://s-3.tech/api/v1.1/"
headers = {
    "Authorization": "YOUR_API_KEY",
    "Content-Type": "application/json"
}

response = requests.post(url, headers=headers)
print(response.text)`}
                        </pre>
                      </div>
                    </TabsContent>
                  </Tabs>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-medium mb-2">Пояснение к параметрам</h3>
                    <ul className="list-disc pl-6 mb-4 space-y-1">
                      <li><span className="font-medium">Authorization</span> — API-ключ для авторизации запросов</li>
                      <li><span className="font-medium">Content-Type</span> — тип контента запроса (application/json)</li>
                    </ul>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-medium mb-2">Важно знать</h3>
                    <ul className="list-disc pl-6 mb-4 space-y-1">
                      <li>API-ключ выдается на бизнес-аккаунт, а не на конкретного пользователя</li>
                      <li>Ключ можно получить в личном кабинете S3 после регистрации</li>
                      <li>Храните API-ключ в безопасном месте и не передавайте его третьим лицам</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Типичные ошибки</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li><span className="font-medium">401 Unauthorized</span> — неверный или отсутствующий API-ключ</li>
                      <li><span className="font-medium">400 Bad Request</span> — неверный формат номера телефона или сообщения</li>
                      <li><span className="font-medium">429 Too Many Requests</span> — превышен лимит запросов</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="mb-8">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4 gap-2">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    <h2 className="text-2xl font-semibold">Webhook-сообщения</h2>
                  </div>
                  <p className="mb-4">Чтобы получать входящие сообщения от клиентов через WhatsApp, необходимо настроить webhook в личном кабинете S3 в разделе API.</p>
                  
                  <Tabs defaultValue="json" className="mb-4">
                    <TabsList className="grid w-full grid-cols-5 md:w-auto">
                      <TabsTrigger value="json">JSON</TabsTrigger>
                      <TabsTrigger value="go">Go</TabsTrigger>
                      <TabsTrigger value="python">Python</TabsTrigger>
                      <TabsTrigger value="php">PHP</TabsTrigger>
                      <TabsTrigger value="nodejs">Node.js</TabsTrigger>
                    </TabsList>
                    <TabsContent value="json" className="mt-4">
                      <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md mb-4 overflow-auto">
                        <pre className="text-sm whitespace-pre-wrap">
{`{
  "wa_id": "1234567890",
  "name": "Имя клиента",
  "phone_number_id": "12345",
  "phone_number": "+79998887766",
  "message_id": "ABCD123",
  "status": "delivered",
  "file_path": "/media/abc123.png",
  "content": { "text": "Пример текста" },
  "text": "Пример текста",
  "type": "text",
  "direction": "incoming",
  "timestamp": "2025-05-03T12:00:00Z"
}`}
                        </pre>
                      </div>
                    </TabsContent>
                    <TabsContent value="go" className="mt-4">
                      <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md mb-4 overflow-auto">
                        <pre className="text-sm whitespace-pre-wrap">
{`// Go code example`}
                        </pre>
                      </div>
                    </TabsContent>
                    <TabsContent value="python" className="mt-4">
                      <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md mb-4 overflow-auto">
                        <pre className="text-sm whitespace-pre-wrap">
{`// Python code example`}
                        </pre>
                      </div>
                    </TabsContent>
                    <TabsContent value="php" className="mt-4">
                      <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md mb-4 overflow-auto">
                        <pre className="text-sm whitespace-pre-wrap">
{`// PHP code example`}
                        </pre>
                      </div>
                    </TabsContent>
                    <TabsContent value="nodejs" className="mt-4">
                      <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md mb-4 overflow-auto">
                        <pre className="text-sm whitespace-pre-wrap">
{`// Node.js code example`}
                        </pre>
                      </div>
                    </TabsContent>
                  </Tabs>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-medium mb-2">Пояснение к параметрам</h3>
                    <div className="overflow-auto">
                      <table className="min-w-full divide-y divide-gray-300">
                        <thead className="bg-gray-50 dark:bg-gray-800">
                          <tr>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Параметр</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Описание</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white dark:bg-gray-900 dark:divide-gray-700">
                          <tr>
                            <td className="px-4 py-2 text-sm font-medium">wa_id</td>
                            <td className="px-4 py-2 text-sm">Уникальный идентификатор бизнес-аккаунт в WhatsApp</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2 text-sm font-medium">name</td>
                            <td className="px-4 py-2 text-sm">Имя контакта (если доступно)</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2 text-sm font-medium">phone_number_id</td>
                            <td className="px-4 py-2 text-sm">ID вашего номера WhatsApp Business</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2 text-sm font-medium">phone_number</td>
                            <td className="px-4 py-2 text-sm">Номер телефона клиента</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2 text-sm font-medium">message_id</td>
                            <td className="px-4 py-2 text-sm">Уникальный ID сообщения</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2 text-sm font-medium">content</td>
                            <td className="px-4 py-2 text-sm">Полное содержимое сообщения</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2 text-sm font-medium">text</td>
                            <td className="px-4 py-2 text-sm">Текст сообщения (если текстовое)</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2 text-sm font-medium">type</td>
                            <td className="px-4 py-2 text-sm">Тип сообщения (text, image, video и т.д.)</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2 text-sm font-medium">direction</td>
                            <td className="px-4 py-2 text-sm">Направление сообщения (incoming/outgoing)</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2 text-sm font-medium">timestamp</td>
                            <td className="px-4 py-2 text-sm">Время создания сообщения</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-medium mb-2">Сценарий использования</h3>
                    <p className="mb-2">Webhook-сообщения используются для:</p>
                    <ul className="list-disc pl-6 mb-4 space-y-1">
                      <li>Получения входящих сообщений от клиентов</li>
                      <li>Обработки медиафайлов и документов</li>
                      <li>Интеграции с системами автоматизации</li>
                    </ul>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-medium mb-2">Важно знать</h3>
                    <ul className="list-disc pl-6 mb-4 space-y-1">
                      <li>Webhook должен быть настроен в личном кабинете S3</li>
                      <li>URL webhook должен быть доступен из интернета</li>
                      <li>Рекомендуется использовать HTTPS для безопасности</li>
                      <li>Сервер должен отвечать 200 OK на все запросы</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Типичные ошибки</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li><span className="font-medium">Timeout</span> — сервер не отвечает в течение 15 секунд</li>
                      <li><span className="font-medium">Invalid Response</span> — сервер вернул неверный статус</li>
                      <li><span className="font-medium">Network Error</span> — проблемы с доступностью сервера</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="mb-8">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4 gap-2">
                    <Server className="h-5 w-5 text-primary" />
                    <h2 className="text-2xl font-semibold">Отправка сообщений</h2>
                  </div>
                  <p className="mb-4">Для отправки сообщений необходимо отправить POST-запрос на эндпоинт:</p>
                  
                  <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md mb-6 overflow-auto">
                    <pre className="text-sm whitespace-pre-wrap">
{`curl -X POST https://s-3.tech/api/v1.1/messages/send-message \\
  -H "Authorization: YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
  "recipient_phone": "123123123123",
  "phone_id": "12345667890",
  "text": "Hello, world!",
  "message_type": "button",
  "components": [
    {
      "type": "button",
      "buttons": [
        {
          "type": "reply",
          "text": "Перейти на сайт",
          "url": "https://example.com"
        }
      ]
    }
  ]
}'`}
                    </pre>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-medium mb-2">Пояснение к эндпоинту</h3>
                    <ul className="list-disc pl-6 mb-4 space-y-1">
                      <li><span className="font-medium">URL</span> — https://s-3.tech/api/v1.1/messages/send-message</li>
                      <li><span className="font-medium">Метод</span> — POST</li>
                      <li><span className="font-medium">Заголовки</span>:
                        <ul className="list-disc pl-6 mt-1 space-y-1">
                          <li>Authorization — API-ключ для авторизации</li>
                          <li>Content-Type — application/json</li>
                        </ul>
                      </li>
                      <li><span className="font-medium">Тело запроса</span> — JSON-объект с параметрами сообщения</li>
                    </ul>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-xl font-medium mb-2">Отправка шаблонного сообщения</h3>
                    <p className="mb-4">Для отправки шаблонного сообщения необходимо отправить POST-запрос на эндпоинт:</p>
                    
                    <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md mb-6 overflow-auto">
                      <pre className="text-sm whitespace-pre-wrap">
{`curl -X POST https://s-3.tech/api/v1.1/messages/send-template-message \\
  -H "Authorization: YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "facebook_id": "12121233123123",
    "recipient_phone": "79600071655",
    "display_phone_number": "+7 906 007-16-53",
    "user_comps": ["Анна"]
  }'`}
                      </pre>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="text-lg font-medium mb-2">Пояснение к параметрам шаблонного сообщения</h4>
                      <ul className="list-disc pl-6 mb-4 space-y-1">
                        <li><span className="font-medium">facebook_id</span> — ID шаблона в Facebook</li>
                        <li><span className="font-medium">recipient_phone</span> — номер телефона получателя в международном формате</li>
                        <li><span className="font-medium">display_phone_number</span> — отображаемый номер телефона отправителя (указать точно так, как в личном кабинете)</li>
                        <li><span className="font-medium">user_comps</span> — массив значений для подстановки в шаблон</li>
                      </ul>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="text-lg font-medium mb-2">Важно знать</h4>
                      <ul className="list-disc pl-6 mb-4 space-y-1">
                        <li>Шаблонное сообщение можно отправить в любое время, даже если 24-часовое окно истекло</li>
                        <li>Шаблон должен быть предварительно одобрен в личном кабинете S3</li>
                        <li>Количество переменных в шаблоне ограничено (обычно до 4)</li>
                        <li>Значения в user_comps должны соответствовать порядку переменных в шаблоне</li>
                      </ul>
                    </div>
                    
                    <p className="mb-4">API S3 поддерживает два основных типа исходящих сообщений:</p>
                    <ul className="list-disc pl-6 mb-4 space-y-1">
                      <li>Обычные сообщения (текстовые и медиа) — можно отправлять только в течение активной сессии (24 часа после последнего сообщения клиента)</li>
                      <li>Шаблонные сообщения — можно отправлять в любое время при наличии одобренного шаблона</li>
                    </ul>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-xl font-medium mb-2">Отправка текстового сообщения</h3>
                    <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md mb-4 overflow-auto">
                      <pre className="text-sm whitespace-pre-wrap">
{`{
  "recipient_phone": "123123123123",
  "phone_id": "12345667890",
  "text": "Hello, world!",
  "message_type": "button",
  "components": [
    {
      "type": "button",
      "buttons": [
        {
          "type": "reply",
          "text": "Перейти на сайт",
          "url": "https://example.com"
        }
      ]
    }
  ]
}`}
                      </pre>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="text-lg font-medium mb-2">Пояснение к параметрам</h4>
                      <ul className="list-disc pl-6 mb-4 space-y-1">
                        <li><span className="font-medium">recipient_phone</span> — номер телефона получателя в международном формате</li>
                        <li><span className="font-medium">phone_id</span> — ID вашего номера WhatsApp Business. Его можно найти в профиле аккаунта S3, нажав кнопку «Показать все номера». Идентификатор будет указан как PhoneId рядом с соответствующим номером.</li>
                        <li><span className="font-medium">message_type</span> — тип сообщения (button, cta_url для сообщений с кнопками)</li>
                        <li><span className="font-medium">text</span> — текст сообщения</li>
                        <li><span className="font-medium">components</span> — массив компонентов сообщения</li>
                      </ul>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="text-lg font-medium mb-2">Сценарий использования</h4>
                      <p className="mb-2">Текстовые сообщения используются для:</p>
                      <ul className="list-disc pl-6 mb-4 space-y-1">
                        <li>Отправки уведомлений клиентам</li>
                        <li>Ответов на запросы клиентов</li>
                        <li>Информационных рассылок</li>
                        <li>Подтверждений и напоминаний</li>
                      </ul>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="text-lg font-medium mb-2">Важно знать</h4>
                      <ul className="list-disc pl-6 mb-4 space-y-1">
                        <li>Сообщения можно отправлять только в течение 24-часового окна после последнего сообщения клиента</li>
                        <li>Максимальная длина текста — 4096 символов</li>
                        <li>Поддерживаются эмодзи и специальные символы</li>
                        <li>Рекомендуется использовать шаблонные сообщения для рассылок</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-medium mb-2">Типичные ошибки</h4>
                      <ul className="list-disc pl-6 space-y-1">
                        <li><span className="font-medium">Session Expired</span> — 24-часовое окно истекло</li>
                        <li><span className="font-medium">Invalid Phone Number</span> — неверный формат номера</li>
                        <li><span className="font-medium">Text Too Long</span> — превышена максимальная длина</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="mb-8">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4 gap-2">
                    <Upload className="h-5 w-5 text-primary" />
                    <h2 className="text-2xl font-semibold">Отправка медиафайла</h2>
                  </div>
                  
                  <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md mb-4 overflow-auto">
                    <pre className="text-sm whitespace-pre-wrap">
{`{
  "recipient_phone": "1231231231231",
  "phone_id": "12345667890",
  "message_type": "image",
  "media_file": "https://s3.ai/uploads/abc123.jpg"
}`}
                    </pre>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="text-lg font-medium mb-2">Пояснение к параметрам</h3>
                    <ul className="list-disc pl-6 mb-4 space-y-1">
                      <li><span className="font-medium">recipient_phone</span> — номер телефона получателя в международном формате</li>
                      <li><span className="font-medium">phone_id</span> — ID вашего номера WhatsApp Business</li>
                      <li><span className="font-medium">message_type</span> — тип сообщения (image, document, audio, video)</li>
                      <li><span className="font-medium">media_file</span> — Название файла, полученный после загрузки</li>
                    </ul>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="text-lg font-medium mb-2">Сценарий использования</h3>
                    <p className="mb-2">Изображения используются для:</p>
                    <ul className="list-disc pl-6 mb-4 space-y-1">
                      <li>Отправки фотографий товаров</li>
                      <li>Демонстрации примеров работ</li>
                      <li>Отправки чеков и документов</li>
                      <li>Визуального подтверждения</li>
                    </ul>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="text-lg font-medium mb-2">Важно знать</h3>
                    <ul className="list-disc pl-6 mb-4 space-y-1">
                      <li>Максимальный размер файла — 16 МБ</li>
                      <li>Поддерживаемые форматы: JPG, PNG</li>
                      <li>URL файла действителен 30 дней</li>
                      <li>Рекомендуется сжимать изображения перед отправкой</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Типичные ошибки</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li><span className="font-medium">Invalid URL</span> — неверный формат URL или файл не найден</li>
                      <li><span className="font-medium">File Too Large</span> — превышен максимальный размер</li>
                      <li><span className="font-medium">Invalid Format</span> — неподдерживаемый формат файла</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="mb-8">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4 gap-2">
                    <Database className="h-5 w-5 text-primary" />
                    <h2 className="text-2xl font-semibold">Загрузка медиа</h2>
                  </div>
                  <p className="mb-4">Для отправки медиафайлов (изображений, видео, документов) необходимо сначала загрузить их на сервер S3. После загрузки вы получите URL, который можно использовать в параметре media_file при отправке сообщений.</p>
                  
                  <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md mb-4 overflow-auto">
                    <pre className="text-sm whitespace-pre-wrap">
{`curl -X POST https://api.s3.ai/v1/media/upload \\
  -H "Authorization: YOUR_API_KEY" \\
  -F "media=@/path/to/file.jpg"`}
                    </pre>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="text-lg font-medium mb-2">Пояснение к параметрам</h3>
                    <ul className="list-disc pl-6 mb-4 space-y-1">
                      <li><span className="font-medium">Authorization</span> — API-ключ для авторизации запросов</li>
                      <li><span className="font-medium">media</span> — файл для загрузки (изображение, видео или документ)</li>
                    </ul>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="text-lg font-medium mb-2">Сценарий использования</h3>
                    <p className="mb-2">Загрузка медиафайлов используется для:</p>
                    <ul className="list-disc pl-6 mb-4 space-y-1">
                      <li>Отправки изображений товаров</li>
                      <li>Передачи видеоинструкций</li>
                      <li>Отправки документов и чеков</li>
                      <li>Обмена медиафайлами с клиентами</li>
                    </ul>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="text-lg font-medium mb-2">Важно знать</h3>
                    <ul className="list-disc pl-6 mb-4 space-y-1">
                      <li>Максимальный размер файла: 16 МБ</li>
                      <li>Поддерживаемые форматы: JPG, PNG, MP4, PDF, DOC, XLS</li>
                      <li>URL файла действителен в течение 30 дней</li>
                      <li>Рекомендуется сжимать файлы перед загрузкой</li>
                    </ul>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-medium mb-2">Типичные ошибки</h3>
                    <ul className="list-disc pl-6 mb-4 space-y-1">
                      <li><span className="font-medium">File Too Large</span> — превышен максимальный размер файла</li>
                      <li><span className="font-medium">Invalid Format</span> — неподдерживаемый формат файла</li>
                      <li><span className="font-medium">Upload Failed</span> — ошибка при загрузке файла</li>
                    </ul>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="text-lg font-medium mb-2">Пример ответа</h3>
                    <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md mb-4 overflow-auto">
                      <pre className="text-sm whitespace-pre-wrap">
{`{
  "filename": "abc123.jpg",
  "filepath": "/app/uploads/store/1/484878305_18068262740494440_7132870574118905013_n..jpg",
}`}
                      </pre>
                    </div>
                    
                    <h4 className="text-md font-medium mb-2">Пояснение к параметрам ответа</h4>
                    <ul className="list-disc pl-6 mb-4 space-y-1">
                      <li><span className="font-medium">filename</span> — Имя медиафайла для использования в апи</li>
                      <li><span className="font-medium">filepath</span> — Технический параметр</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4 gap-2">
                    <AlertCircle className="h-5 w-5 text-primary" />
                    <h2 className="text-2xl font-semibold">Служба поддержки</h2>
                  </div>
                  <p className="mb-4">Наша команда всегда готова помочь вам с интеграцией и использованием API S3:</p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Email: <a href="mailto:info@s-3.tech" className="text-blue-600 hover:underline">info@s-3.tech</a></li>
                    <li>Рабочие часы поддержки: Пн-Пт с 9:00 до 18:00 (МСК)</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            
            <div className="md:col-span-1">
              <div className="sticky top-24">
                <Card>
                  <CardContent className="pt-6">
                    <div className="mb-6">
                      <h3 className="font-semibold text-lg flex items-center gap-2 mb-3">
                        <Search className="h
