import type { CatalogItem } from '@/types/Catalog';
import Subtitle from '@/components/heading/Subtitle';
import TableContainer from '@/components/table/TableContainer';
import TableHeader from '@/components/table/TableHeader';
import TableBody from '@/components/table/TableBody';
import TableRow from '@/components/table/TableRow';
import { Button } from '@/components/button/Button';
import { PlusIcon } from 'lucide-react';

interface Props {
  setItems: (items: CatalogItem[]) => void
}

const Catalog = ({ setItems }: Props) => {
  const catalogItems = []

  const addToOrder = (item: CatalogItem) => {
    console.log(item);
  }

  return (
    <div className="flex flex-col gap-4">
      <Subtitle title="Catálogo" />
      <TableContainer>
        <TableHeader headers={["Referencia", "Nombre", "Cantidad", "Acciones"]} />
        <TableBody>
          {catalogItems.map((item) => (
            <TableRow
              key={item.reference}
              catalogItem={item}
              appendRows={
                <>
                  <td key="quantity">1</td>
                  <td key="actions">
                    <Button variant="solid" size="sm" onClick={() => addToOrder(item)} endIcon={<PlusIcon className="w-4 h-4" />}>
                      Agregar al pedido
                    </Button>
                  </td>
                </>
              }
            />
          ))}
        </TableBody>
      </TableContainer>
    </div>
  );
}

export default Catalog;
