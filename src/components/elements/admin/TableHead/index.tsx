import clsx from 'clsx';
import React from 'react';
import classes from './style.module.css';

interface ITableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  classNames?: {
    root?: string;
  };
}

const TableHead = (props: ITableHeadProps) => {
  const { className, classNames, children, ...rest } = props || {};

  return (
    <th className={clsx(classes.root, classNames?.root, className)} {...rest}>
      {children}
    </th>
  );
};

export default TableHead;
