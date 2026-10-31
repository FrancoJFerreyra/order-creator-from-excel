interface Props {
  headers: string[];
}

const TableHeader = ({ headers }: Props) => {
  return (
    <thead>
      <tr>
        {headers.map((header) => (
          <th key={header}>{header}</th>
        ))}
      </tr>
    </thead>
  );
}

export default TableHeader;
