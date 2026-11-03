import { useEffect, useState } from 'react';
import type { CatalogItem, Product } from '@/types/Catalog';
import Modal from '@/components/modal/Modal';
import FormInput from '@/components/form/FormInput';
import { Button } from '@/components/button/Button';

interface Props {
  open: boolean;
  onClose: () => void;
  product: Product | null;
  onConfirm: (item: CatalogItem) => void;
}

const ModalAddQuantity = ({ open, onClose, product, onConfirm }: Props) => {
  const [quantity, setQuantity] = useState('1');

  useEffect(() => {
    if (open) setQuantity('1');
  }, [open]);

  const parsedQuantity = Number(quantity);
  const isValidQuantity = Number.isInteger(parsedQuantity) && parsedQuantity > 0;

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!product || !isValidQuantity) return;

    onConfirm({
      reference: product.reference,
      name: product.name,
      quantity: parsedQuantity,
    });
    setQuantity('1');
    onClose();
  };

  const onCancel = () => {
    setQuantity('1');
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="Agregar al pedido">
      {product && (
        <form className="flex flex-col gap-4" onSubmit={submit}>
          <div className="flex flex-col gap-1 bg-ui-secondary p-2 rounded-md">
            <p className="text-md font-bold">
              Producto Seleccionado:
            </p>
            <p className="text-sm text-ui-muted-foreground">
              {product.reference} — {product.name}
            </p>
          </div>
          <FormInput
            label="Ingrese la cantidad a agregar"
            name="quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            error={isValidQuantity ? undefined : 'Ingresá una cantidad mayor a 0.'}
            required
          />
          <div className="flex justify-end gap-2">
            <Button type="button" variant="solid" color="secondary" onClick={onCancel}>
              Cancelar
            </Button>
            <Button type="submit" disabled={!isValidQuantity}>
              Agregar
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
};

export default ModalAddQuantity;
