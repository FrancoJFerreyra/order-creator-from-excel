import { useState } from 'react';
import type { CatalogItem } from '@/types/Catalog';
import FormInput from '@/components/form/FormInput';
import TableContainer from '@/components/table/TableContainer';
import TableHeader from '@/components/table/TableHeader';
import TableBody from '@/components/table/TableBody';
import TableRow from '@/components/table/TableRow';
import Subtitle from '@/components/heading/Subtitle';

interface Props {
  items: CatalogItem[]
}

const Order = ({ items }: Props) => {
  const [customerName, setCustomerName] = useState("");

  return (
    <div className="flex flex-col gap-4">
      <Subtitle title="Pedido" />
      <FormInput
        label="Nombre del cliente"
        name="customer"
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
        required
      />
      <TableContainer>
        <TableHeader headers={["Referencia", "Nombre", "Cantidad"]} />
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.reference} catalogItem={item} />
          ))}
        </TableBody>
      </TableContainer>
    </div>
  );
}

export default Order;
