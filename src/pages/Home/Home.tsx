import { useState } from "react";
import type { CatalogItem } from '@/types/Catalog';
import Catalog from "./Catalog";
import Order from "./Order";
import Subtitle from "@/components/heading/Subtitle";
import Card from "@/components/card/Card";


const Home = () => {
  const [items, setItems] = useState<CatalogItem[]>([]);

  return (
    <div className="flex flex-col gap-4 flex-1">
      <Subtitle title="Crear pedidos" />
      <Card className="flex-1 flex flex-col">
        <div className="grid grid-cols-2 gap-4 divide-x divide-ui-secondary-border divide-dashed flex-1">
          <Catalog setItems={setItems} />
          <Order items={items} />
        </div>
      </Card>
    </div>
  );
}

export default Home;
