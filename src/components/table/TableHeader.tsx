interface Props {
  headers: string[];
}

const TableHeader = ({ headers }: Props) => {
  return (
    <thead className="bg-ui-secondary sticky top-0">
      <tr>
        {headers.map((header) => (
          <th key={header}>{header}</th>
        ))}
      </tr>
    </thead>
  );
}

export default TableHeader;
