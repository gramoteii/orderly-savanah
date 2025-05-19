
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User } from 'lucide-react';
import { Client } from '../../store/clientStore';

interface CustomerSectionProps {
  clients: Client[];
  selectedClientId: string;
  customer: {
    id: string;
    name: string;
    email: string;
    phone: string;
  };
  onClientSelect: (clientId: string) => void;
}

const CustomerSection: React.FC<CustomerSectionProps> = ({
  clients,
  selectedClientId,
  customer,
  onClientSelect
}) => {
  return (
    <div className="border-t pt-4">
      <h3 className="text-lg font-medium mb-4">Данные клиента</h3>
      <div className="mb-4">
        <Label htmlFor="client">Выберите клиента</Label>
        <Select
          value={selectedClientId}
          onValueChange={onClientSelect}
        >
          <SelectTrigger>
            <SelectValue placeholder="Выберите клиента" />
          </SelectTrigger>
          <SelectContent>
            {clients.map((client) => (
              <SelectItem key={client.id} value={client.id}>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{client.name}</span>
                  {client.company && <span className="text-gray-500">({client.company})</span>}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedClientId && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label>Имя</Label>
            <Input value={customer.name} readOnly className="bg-gray-50" />
          </div>
          <div>
            <Label>Email</Label>
            <Input value={customer.email} readOnly className="bg-gray-50" />
          </div>
          <div>
            <Label>Телефон</Label>
            <Input value={customer.phone} readOnly className="bg-gray-50" />
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerSection;
