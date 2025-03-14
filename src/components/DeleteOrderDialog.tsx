
import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useOrderStore } from '../store/orderStore';
import { useToast } from '@/hooks/use-toast';

const DeleteOrderDialog: React.FC = () => {
  const { toast } = useToast();
  const { 
    currentOrder, 
    isDeleteModalOpen, 
    setDeleteModalOpen, 
    deleteOrder 
  } = useOrderStore();

  const handleDelete = () => {
    if (currentOrder) {
      deleteOrder(currentOrder.id);
      toast({
        title: "Успешно",
        description: "Заказ успешно удален"
      });
    }
    setDeleteModalOpen(false);
  };

  return (
    <AlertDialog open={isDeleteModalOpen} onOpenChange={setDeleteModalOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Удалить заказ?</AlertDialogTitle>
          <AlertDialogDescription>
            Вы уверены, что хотите удалить заказ {currentOrder?.number}? 
            Это действие невозможно отменить.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Отмена</AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600"
          >
            Удалить
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteOrderDialog;
