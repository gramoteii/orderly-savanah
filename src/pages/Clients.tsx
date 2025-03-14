
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, UserPlus, User, Mail, Phone } from 'lucide-react';

// Временные данные о клиентах
const clientsData = [
  { id: '1', name: 'Иван Петров', email: 'ivan@example.com', phone: '+7 (999) 123-4567', orders: 3 },
  { id: '2', name: 'Елена Смирнова', email: 'elena@example.com', phone: '+7 (999) 765-4321', orders: 1 },
  { id: '3', name: 'Алексей Козлов', email: 'alexey@example.com', phone: '+7 (999) 555-7777', orders: 2 },
  { id: '4', name: 'Мария Иванова', email: 'maria@example.com', phone: '+7 (999) 888-9999', orders: 1 },
  { id: '5', name: 'Сергей Никитин', email: 'sergey@example.com', phone: '+7 (999) 444-3333', orders: 1 }
];

const Clients: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredClients = searchTerm 
    ? clientsData.filter(client => 
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.phone.includes(searchTerm)
      )
    : clientsData;

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Клиенты</h1>
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Добавить клиента
          </Button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input 
            className="pl-10" 
            placeholder="Поиск клиентов..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="crm-table-header">ID</th>
                  <th className="crm-table-header">Имя</th>
                  <th className="crm-table-header">Email</th>
                  <th className="crm-table-header">Телефон</th>
                  <th className="crm-table-header">Заказы</th>
                  <th className="crm-table-header">Действия</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredClients.map((client) => (
                  <tr key={client.id} className="hover:bg-gray-50">
                    <td className="crm-table-cell">{client.id}</td>
                    <td className="crm-table-cell font-medium">
                      <div className="flex items-center gap-2">
                        <div className="bg-blue-100 rounded-full p-1">
                          <User className="h-4 w-4 text-blue-600" />
                        </div>
                        {client.name}
                      </div>
                    </td>
                    <td className="crm-table-cell">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-gray-400" />
                        {client.email}
                      </div>
                    </td>
                    <td className="crm-table-cell">
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-gray-400" />
                        {client.phone}
                      </div>
                    </td>
                    <td className="crm-table-cell">{client.orders}</td>
                    <td className="crm-table-cell">
                      <Button variant="outline" size="sm">Подробнее</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Clients;
