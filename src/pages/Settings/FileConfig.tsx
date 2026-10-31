import type { ColumnHeader } from '@/types/FileConfig';

interface Props {
  headers: ColumnHeader[];
}

const FileConfig = ({ headers }: Props) => {
  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        {headers.map((header) => (
          <div key={header.index}>
            <p>{header.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FileConfig;
