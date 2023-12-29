import clsx from 'clsx';
import React from 'react';
import classes from './style.module.css';

interface ITableRowProps extends React.HTMLAttributes<any> {
  classNames?: {
    root?: string;
  };
}

const TableRow = (props: ITableRowProps) => {
  const { className, classNames, children, ...rest } = props || {};

  return (
    <tr className={clsx(classes.root, classNames?.root, className)} {...rest}>
      {children}
    </tr>
  );
};

export default TableRow;
