import { useState } from "react";
import type { CatalogItem } from '@/types/Catalog';
import Catalog from "./Catalog/Catalog";
import Order from "./Order";
import Subtitle from "@/components/heading/Subtitle";
import Card from "@/components/card/Card";
import { warningAlert } from "@/utils/sweetAlert.utils";

const Home = () => {
  const [items, setItems] = useState<CatalogItem[]>([]);

  const addItem = (item: CatalogItem) => {
    setItems((current) => {
      const existing = current.find((candidate) => candidate.reference === item.reference);

      if (!existing) return [...current, item];

      return current.map((candidate) =>
        candidate.reference === item.reference
          ? { ...candidate, quantity: candidate.quantity + item.quantity }
          : candidate
      );
    });
  };

  const confirmRemoveItem = (reference: string) => {
    warningAlert({
      title: '¿Estás seguro que quieres eliminar este item del pedido?',
      text: 'Esta acción no se puede deshacer.',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      onConfirm: () => removeItem(reference),
      showCancelButton: true,
    })
  }

  const removeItem = (reference: string) => {
    setItems((current) => current.filter((item) => item.reference !== reference));
  };

  return (
    <div className="flex flex-col gap-4 flex-1">
      <Subtitle title="Crear pedidos" />
      <Card className="flex-1 flex flex-col">
        <div className="grid grid-cols-2 gap-4 divide-x divide-ui-secondary-border divide-dashed flex-1">
          <Catalog onAdd={addItem} />
          <Order items={items} onRemove={confirmRemoveItem} onClear={() => setItems([])} />
        </div>
      </Card>
    </div>
  );
}

export default Home;
