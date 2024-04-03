import getUsers from '@/actions/getUsers';
import SideBarLayout from '@/components/sections/sidebar/SideBarLayout';
import React from 'react';
import ConversationList from './components/ConversationList';
import getConversations from '@/actions/getConversations';

const Conversation = async ({ children }: { children: React.ReactNode }) => {
  const conversations = await getConversations();
  const users = await getUsers();

  return (
    <SideBarLayout>
      <ConversationList users={users} title='Messages' initialItems={conversations} />
      {children}
    </SideBarLayout>
  );
};

export default Conversation;
