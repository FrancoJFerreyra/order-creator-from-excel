import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const TableBody = ({ children }: Props) => {
  return (
    <tbody>
      {children}
    </tbody>
  );
}

export default TableBody;
