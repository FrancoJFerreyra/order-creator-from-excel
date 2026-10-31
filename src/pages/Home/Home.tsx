import { useState } from "react";
import type { CatalogItem } from '@/types/Catalog';
import Container from "@/components/container/Container";
import Catalog from "./Catalog";
import Order from "./Order";


const Home = () => {
  const [items, setItems] = useState<CatalogItem[]>([]);

  return (
    <Container size="5xl" className="mx-auto">
      <div className="flex flex-col gap-4 flex-1">
        <h1 className="text-2xl font-bold text-center">Crear pedidos</h1>
        <div className="grid grid-cols-2 gap-4 divide-x divide-ui-secondary-border divide-dashed flex-1">
          <Catalog setItems={setItems} />
          <Order items={items} />
        </div>
      </div>
    </Container >
  );
}

export default Home;
