import { useState } from 'react';
import type { CatalogItem, Product } from '@/types/Catalog';
import Subtitle from '@/components/heading/Subtitle';
import CatalogSearch from './CatalogSearch';
import ModalAddQuantity from './ModalAddQuantity';
import useCatalog from '../../../hooks/useCatalog';

interface Props {
  onAdd: (item: CatalogItem) => void;
}

const Catalog = ({ onAdd }: Props) => {
  const { ready, error } = useCatalog();
  const [selected, setSelected] = useState<Product | null>(null);

  return (
    <div className="flex flex-col gap-4 pr-4">
      <Subtitle title="Catálogo" />
      {error && <p className="text-sm text-ui-error-400">{error}</p>}
      <CatalogSearch enabled={ready} onSelect={setSelected} />
      <ModalAddQuantity
        open={selected !== null}
        onClose={() => setSelected(null)}
        product={selected}
        onConfirm={onAdd}
      />
    </div>
  );
};

export default Catalog;
