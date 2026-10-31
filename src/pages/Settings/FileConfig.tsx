import type { ColumnHeader, FileSheet } from '@/types/FileConfig';

interface Props {
  headers: ColumnHeader[];
  sheets: FileSheet[];
}

const FileConfig = ({ headers, sheets }: Props) => {
  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
      </div>
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
