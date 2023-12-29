import clsx from 'clsx';
import React from 'react';
import classes from './style.module.css';

interface ITableBodyProps extends React.HTMLAttributes<any> {
  classNames?: {
    root?: string;
  };
}

const TableBody = (props: ITableBodyProps) => {
  const { className, classNames, children, ...rest } = props || {};

  return (
    <tbody className={clsx(classes.root, classNames?.root, className)} {...rest}>
      {children}
    </tbody>
  );
};

export default TableBody;
