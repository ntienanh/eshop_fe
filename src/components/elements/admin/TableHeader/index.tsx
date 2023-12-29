import clsx from 'clsx';
import React from 'react';
import classes from './style.module.css';

interface ITableHeaderProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  classNames?: {
    root?: string;
  };
}

const TableHeader = (props: ITableHeaderProps) => {
  const { className, classNames, children, ...rest } = props || {};

  return (
    <thead className={clsx(classes.root, classNames?.root, className)} {...rest}>
      {children}
    </thead>
  );
};

export default TableHeader;
