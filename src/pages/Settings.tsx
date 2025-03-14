
import React from 'react';
import Layout from '../components/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Building, Bell, User, Shield, Save } from 'lucide-react';

const Settings: React.FC = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Настройки</h1>
          <p className="text-gray-500">Управляйте настройками системы</p>
        </div>

        <Tabs defaultValue="company" className="space-y-4">
          <TabsList>
            <TabsTrigger value="company">
              <Building className="mr-2 h-4 w-4" />
              Компания
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <Bell className="mr-2 h-4 w-4" />
              Уведомления
            </TabsTrigger>
            <TabsTrigger value="profile">
              <User className="mr-2 h-4 w-4" />
              Профиль
            </TabsTrigger>
            <TabsTrigger value="security">
              <Shield className="mr-2 h-4 w-4" />
              Безопасность
            </TabsTrigger>
          </TabsList>

          <TabsContent value="company" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Информация о компании</CardTitle>
                <CardDescription>
                  Настройте основную информацию о вашей компании
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="company-name">Название компании</Label>
                    <Input id="company-name" defaultValue="Битрикс CRM" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tax-id">ИНН</Label>
                    <Input id="tax-id" defaultValue="1234567890" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Адрес</Label>
                  <Input id="address" defaultValue="г. Москва, ул. Примерная, д. 123" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Телефон</Label>
                    <Input id="phone" defaultValue="+7 (999) 123-4567" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" defaultValue="info@example.com" />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  Сохранить изменения
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Настройки заказов</CardTitle>
                <CardDescription>
                  Настройте параметры работы с заказами
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="auto-numbering">Автоматическая нумерация</Label>
                    <p className="text-sm text-muted-foreground">
                      Автоматически присваивать номера новым заказам
                    </p>
                  </div>
                  <Switch id="auto-numbering" defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="notifications">Уведомления о новых заказах</Label>
                    <p className="text-sm text-muted-foreground">
                      Получать уведомления о новых заказах
                    </p>
                  </div>
                  <Switch id="notifications" defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="tax-calculation">Расчет налогов</Label>
                    <p className="text-sm text-muted-foreground">
                      Автоматически рассчитывать налоги для заказов
                    </p>
                  </div>
                  <Switch id="tax-calculation" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  Сохранить изменения
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Настройки уведомлений</CardTitle>
                <CardDescription>
                  Настройте способы получения уведомлений
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-notifications">Email уведомления</Label>
                    <p className="text-sm text-muted-foreground">
                      Получать уведомления на email
                    </p>
                  </div>
                  <Switch id="email-notifications" defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="sms-notifications">SMS уведомления</Label>
                    <p className="text-sm text-muted-foreground">
                      Получать уведомления по SMS
                    </p>
                  </div>
                  <Switch id="sms-notifications" />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="browser-notifications">Браузерные уведомления</Label>
                    <p className="text-sm text-muted-foreground">
                      Показывать уведомления в браузере
                    </p>
                  </div>
                  <Switch id="browser-notifications" defaultChecked />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Сохранить настройки</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Профиль пользователя</CardTitle>
                <CardDescription>
                  Обновите информацию о вашем профиле
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">Имя</Label>
                    <Input id="first-name" defaultValue="Админ" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Фамилия</Label>
                    <Input id="last-name" defaultValue="Админов" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="user-email">Email</Label>
                  <Input id="user-email" defaultValue="admin@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="job-title">Должность</Label>
                  <Input id="job-title" defaultValue="Администратор" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Обновить профиль</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Безопасность</CardTitle>
                <CardDescription>
                  Управляйте настройками безопасности вашего аккаунта
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Текущий пароль</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">Новый пароль</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Подтвердите пароль</Label>
                  <Input id="confirm-password" type="password" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="two-factor">Двухфакторная аутентификация</Label>
                    <p className="text-sm text-muted-foreground">
                      Включить двухфакторную аутентификацию для дополнительной безопасности
                    </p>
                  </div>
                  <Switch id="two-factor" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Обновить настройки безопасности</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Settings;
