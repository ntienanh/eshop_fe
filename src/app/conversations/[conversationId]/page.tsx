import getConversationById from '@/actions/getConversationById';
import getMessages from '@/actions/getMessages';
import EmptyState from '@/components/sections/EmptyState';
import React from 'react';
import Header from '../components/Header';
import Body from '../components/Body';
import Form from '../components/Form';

interface IConversationsIdProps {
  conversationId: string;
}

const ConversationsId = async (props: IConversationsIdProps) => {
  const { conversationId } = props || {};

  const conversation = await getConversationById('660d90f84de8c7c45f13bd2f');
  const messages = await getMessages(conversationId);

  if (!conversation) {
    return (
      <div className='w-full h-screen'>
        <EmptyState />
      </div>
    );
  }

  return (
    <div className='w-full h-screen'>
      <Header className='sticky top-0' conversation={conversation} />
      <Body initialMessages={messages} />
      <Form className='absolute bottom-0 w-[calc(100vw_-_64px-_320px)] p-3 border-t-gray-200 border-t border-solid' />
    </div>
  );
};

export default ConversationsId;
