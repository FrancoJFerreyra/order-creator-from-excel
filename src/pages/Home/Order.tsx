import { useEffect, useState } from 'react';
import type { CatalogItem } from '@/types/Catalog';
import FormInput from '@/components/form/FormInput';
import TableContainer from '@/components/table/TableContainer';
import TableHeader from '@/components/table/TableHeader';
import TableBody from '@/components/table/TableBody';
import TableRow from '@/components/table/TableRow';
import Subtitle from '@/components/heading/Subtitle';
import { Button } from '@/components/button/Button';
import { CopyIcon, EraserIcon, TrashIcon } from 'lucide-react';
import ItemsLayout from '@/pages/Layout/home/ItemsLayout';
import { writeText } from '@tauri-apps/plugin-clipboard-manager';
import { errorAlert, warningAlert } from '@/utils/sweetAlert.utils';
import { toClipboardRows } from '@/utils/order.utils';

interface Props {
  items: CatalogItem[]
  onRemove: (reference: string) => void
  onClear: () => void
}

const Order = ({ items, onRemove, onClear }: Props) => {
  const [customerName, setCustomerName] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 1500);
    return () => clearTimeout(timer);
  }, [copied]);

  const copyOrder = async () => {
    try {
      await writeText(toClipboardRows(items, customerName));
      setCopied(true);
    } catch (reason) {
      errorAlert({ title: 'No se pudo copiar el pedido', text: String(reason) });
    }
  };

  const confirmClearOrder = () => {
    warningAlert({
      title: '¿Estás seguro que quieres limpiar el pedido?',
      text: 'Se eliminarán todos los items y el nombre del cliente.',
      confirmButtonText: 'Limpiar',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      onConfirm: () => {
        setCustomerName('');
        onClear();
      },
    })
  }

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
      <ItemsLayout>
        <TableContainer>
          <TableHeader headers={["Referencia", "Nombre", "Cantidad", "Acciones"]} />
          <TableBody>
            {items.map((item) => (
              <TableRow
                key={item.reference}
                catalogItem={item}
                appendRows={
                  <>
                    <td>{item.quantity}</td>
                    <td className="text-right">
                      <Button variant="solid" color="error" className="mx-auto" size="md" onClick={() => onRemove(item.reference)}>
                        <TrashIcon className="size-4" />
                      </Button>
                    </td>
                  </>
                }
              />
            ))}
          </TableBody>
        </TableContainer>
      </ItemsLayout>
      <div className="flex justify-end gap-2">
        <Button
          variant="solid"
          size="sm"
          disabled={items.length === 0}
          onClick={copyOrder}
          endIcon={<CopyIcon className="w-4 h-4" />}
        >
          {copied ? 'Copiado' : 'Copiar'}
        </Button>
        <Button
          variant="solid"
          color="error"
          size="sm"
          disabled={items.length === 0 && !customerName}
          onClick={confirmClearOrder}
          endIcon={<EraserIcon className="w-4 h-4" />}
        >
          Limpiar
        </Button>
      </div>
    </div>
  );
}

export default Order;
