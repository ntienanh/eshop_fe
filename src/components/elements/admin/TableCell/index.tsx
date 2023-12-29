import clsx from 'clsx';
import React from 'react';
import classes from './style.module.css';

interface ITableCellProps extends React.HTMLAttributes<any> {
  classNames?: {
    root?: string;
  };
}

const TableCell = (props: ITableCellProps) => {
  const { className, classNames, children, ...rest } = props || {};

  return (
    <td className={clsx(classes.root, classNames?.root, className)} {...rest}>
      {children}
    </td>
  );
};

export default TableCell;
