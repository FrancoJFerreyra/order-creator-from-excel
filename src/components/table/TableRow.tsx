import type { CatalogItem } from '../../types/Catalog';

interface Props {
  appendRows?: React.ReactNode;
  catalogItem: CatalogItem;
}

const TableRow = ({ catalogItem, appendRows }: Props) => {
  return (
    <tr>
      <td>
        {catalogItem.reference}
      </td>
      <td>
        {catalogItem.name}
      </td>
      {appendRows}
    </tr>
  );
}

export default TableRow;
