import clsx from 'clsx';
import React from 'react';
import classes from './style.module.css';

interface ITableProps extends React.HTMLAttributes<HTMLTableElement> {
  classNames?: {
    root?: string;
  };
}

const Table = (props: ITableProps) => {
  const { className, classNames, children, ...rest } = props || {};

  return (
    <table className={clsx(classes.root, classNames?.root, className)} {...rest}>
      {children}
    </table>
  );
};

export default Table;
