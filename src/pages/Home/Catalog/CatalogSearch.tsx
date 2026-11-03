import { useEffect, useState } from 'react';
import type { Product } from '@/types/Catalog';
import { searchProducts } from '@/infraestructure/tauri/commands';
import TableContainer from '@/components/table/TableContainer';
import TableHeader from '@/components/table/TableHeader';
import TableBody from '@/components/table/TableBody';
import TableRow from '@/components/table/TableRow';
import FormInput from '@/components/form/FormInput';
import ItemsLayout from '@/pages/Layout/home/ItemsLayout';
import { Button } from '@/components/button/Button';
import { PlusIcon } from 'lucide-react';

interface Props {
  enabled: boolean;
  onSelect: (product: Product) => void;
}

const CatalogSearch = ({ enabled, onSelect }: Props) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [error, setError] = useState('');
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    const term = query.trim();

    if (!enabled || !term) {
      setResults([]);
      setError('');
      setSearching(false);
      return;
    }

    setSearching(true);

    const timer = setTimeout(() => {
      searchProducts(term)
        .then(setResults)
        .catch((reason) => setError(String(reason)))
        .finally(() => setSearching(false));
    }, 200);

    return () => {
      clearTimeout(timer);
      setSearching(false);
    };
  }, [query, enabled]);

  const hasQuery = query.trim().length > 0;

  const emptyMessage = !hasQuery
    ? 'Escribe en la barra de búsqueda para obtener items.'
    : searching
      ? 'Buscando...'
      : 'No hay productos que coincidan con la búsqueda.';

  return (
    <>
      <FormInput
        label="Buscar producto"
        name="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Referencia o nombre"
      />
      {error && <p className="text-sm text-ui-error-400">{error}</p>}
      <ItemsLayout>
        <TableContainer>
          <TableHeader headers={["Referencia", "Nombre", "Acciones"]} />
          <TableBody>
            {results.map((product) => (
              <TableRow
                key={product.sourceRow}
                catalogItem={{ reference: product.reference, name: product.name, quantity: 1 }}
                appendRows={
                  <td>
                    <Button
                      variant="solid"
                      size="sm"
                      onClick={() => onSelect(product)}
                      endIcon={<PlusIcon className="w-4 h-4" />}
                    >
                      Agregar al pedido
                    </Button>
                  </td>
                }
              />
            ))}
            {results.length === 0 && !error && (
              <tr>
                <td colSpan={3} className="h-[40vh] text-center align-middle text-sm text-ui-muted-foreground">
                  {emptyMessage}
                </td>
              </tr>
            )}
          </TableBody>
        </TableContainer>
      </ItemsLayout>
    </>
  );
};

export default CatalogSearch;
