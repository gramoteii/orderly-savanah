
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useTheme } from '../hooks/useTheme';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Sun, Moon, Monitor } from 'lucide-react';

const ThemeSettings: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Настройки темы</CardTitle>
        <CardDescription>
          Настройте внешний вид системы
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center justify-center h-10 w-10 rounded-md bg-primary/10">
            <Sun className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">Светлая тема</p>
            <p className="text-sm text-muted-foreground">
              Использовать светлую тему
            </p>
          </div>
          <Switch 
            checked={theme === 'light'} 
            onCheckedChange={() => theme !== 'light' && setTheme('light')} 
          />
        </div>
        
        <Separator />
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center justify-center h-10 w-10 rounded-md bg-primary/10">
            <Moon className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">Темная тема</p>
            <p className="text-sm text-muted-foreground">
              Использовать темную тему
            </p>
          </div>
          <Switch 
            checked={theme === 'dark'} 
            onCheckedChange={() => theme !== 'dark' && setTheme('dark')} 
          />
        </div>
        
        <Separator />
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center justify-center h-10 w-10 rounded-md bg-primary/10">
            <Monitor className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">Системная тема</p>
            <p className="text-sm text-muted-foreground">
              Следовать настройкам системы
            </p>
          </div>
          <Switch 
            checked={false} 
            onCheckedChange={() => {
              const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
              setTheme(systemTheme);
            }} 
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ThemeSettings;
