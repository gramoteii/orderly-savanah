
import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import OrderFilter from '../components/OrderFilter';
import OrderTable from '../components/OrderTable';
import OrderForm from '../components/OrderForm';
import DeleteOrderDialog from '../components/DeleteOrderDialog';
import { useOrderStore } from '../store/orderStore';

const Orders: React.FC = () => {
  const { filterOrders } = useOrderStore();

  useEffect(() => {
    filterOrders();
  }, []);

  return (
    <Layout>
      <OrderFilter />
      <OrderTable />
      <OrderForm />
      <DeleteOrderDialog />
    </Layout>
  );
};

export default Orders;
