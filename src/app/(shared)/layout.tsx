import getUsers from '@/actions/getUsers';
import SideBarLayout from '@/components/sections/sidebar/SideBarLayout';
import React from 'react';

const Conversation = async ({ children }: { children: React.ReactNode }) => {
  const users = await getUsers();

  return <SideBarLayout userList={users} children={children} />;
};

export default Conversation;
