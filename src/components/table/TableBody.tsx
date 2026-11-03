import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const TableBody = ({ children }: Props) => {
  return (
    <tbody className="divide-y divide-ui-secondary-border divide-dashed">
      {children}
    </tbody>
  );
}

export default TableBody;
