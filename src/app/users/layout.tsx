import getUsers from '@/actions/getUsers';
import SideBarLayout from '@/components/sections/sidebar/SideBarLayout';
import React from 'react';
import UserList from './components/UserList';

const Conversation = async ({ children }: { children: React.ReactNode }) => {
  const users = await getUsers();

  return (
    <SideBarLayout>
      <UserList items={users} />
      <main className='h-screen flex-1'>{children}</main>
    </SideBarLayout>
  );
};

export default Conversation;
