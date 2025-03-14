
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, UserPlus, User, Mail, Phone, Building, Globe, Plus } from 'lucide-react';
import { useClientStore } from '../store/clientStore';
import ClientForm from '../components/ClientForm';

const Clients: React.FC = () => {
  const { 
    filteredClients, 
    searchTerm, 
    setSearchTerm, 
    filterClients, 
    setCurrentClient, 
    setModalOpen 
  } = useClientStore();
  
  useEffect(() => {
    filterClients();
  }, []);

  const handleAddClient = () => {
    setCurrentClient(null);
    setModalOpen(true);
  };

  const handleEditClient = (clientId: string) => {
    const client = filteredClients.find(c => c.id === clientId);
    if (client) {
      setCurrentClient(client);
      setModalOpen(true);
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Клиенты</h1>
          <Button onClick={handleAddClient}>
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
                  <th className="crm-table-header">Компания</th>
                  <th className="crm-table-header">Email</th>
                  <th className="crm-table-header">Телефон</th>
                  <th className="crm-table-header">Веб-сайт</th>
                  <th className="crm-table-header">Заказы</th>
                  <th className="crm-table-header">Действия</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredClients.map((client) => (
                  <tr key={client.id} className="hover:bg-gray-50">
                    <td className="crm-table-cell">{client.id.substring(0, 8)}</td>
                    <td className="crm-table-cell font-medium">
                      <div className="flex items-center gap-2">
                        <div className="bg-blue-100 rounded-full p-1">
                          <User className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <div>{client.name}</div>
                          {client.position && <div className="text-xs text-gray-500">{client.position}</div>}
                        </div>
                      </div>
                    </td>
                    <td className="crm-table-cell">
                      {client.company && (
                        <div className="flex items-center gap-2">
                          <Building className="h-4 w-4 text-gray-400" />
                          {client.company}
                        </div>
                      )}
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
                    <td className="crm-table-cell">
                      {client.website && (
                        <div className="flex items-center gap-2">
                          <Globe className="h-4 w-4 text-gray-400" />
                          <a 
                            href={`https://${client.website}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            {client.website}
                          </a>
                        </div>
                      )}
                    </td>
                    <td className="crm-table-cell">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                        {client.orders}
                      </span>
                    </td>
                    <td className="crm-table-cell">
                      <Button variant="outline" size="sm" onClick={() => handleEditClient(client.id)}>
                        Подробнее
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ClientForm />
    </Layout>
  );
};

export default Clients;
