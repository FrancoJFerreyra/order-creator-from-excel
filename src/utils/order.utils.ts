import type { CatalogItem } from '@/types/Catalog';

const pad = (value: number) => String(value).padStart(2, '0');

const today = () => {
  const now = new Date();
  return `${pad(now.getDate())}/${pad(now.getMonth() + 1)}/${now.getFullYear()}`;
};

// Queue format: cliente, fecha, referencia, nombre; quantity is embedded as "{quantity}, {name}"
// and follow-up rows leave cliente/fecha empty. See README "Why a clipboard export".
export const toClipboardRows = (items: CatalogItem[], customer: string) =>
  items
    .map((item, index) =>
      [
        index === 0 ? customer.trim() : '',
        index === 0 ? today() : '',
        item.reference,
        `${item.quantity}, ${item.name}`,
      ].join('\t'),
    )
    .join('\n');
