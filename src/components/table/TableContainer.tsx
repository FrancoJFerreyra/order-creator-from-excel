import React from 'react';

interface Props {
  children: React.ReactNode;
}

const TableContainer = ({ children }: Props) => {
  return (
    <table className="w-full text-left table-auto min-w-max">
      {children}
    </table>
  );
}

export default TableContainer;
