import { User } from '@prisma/client';
import React from 'react';

interface IUserListProps {
  items: User[];
}

const UserList = (props: IUserListProps) => {
  const { items } = props || {};

  return <div>{items.map(item => item.name)}</div>;
};

export default UserList;
