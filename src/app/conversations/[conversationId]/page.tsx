import getConversationById from '@/actions/getConversationById';
import getMessages from '@/actions/getMessages';
import EmptyState from '@/components/sections/EmptyState';
import React from 'react';
import Header from '../components/Header';
import Body from '../components/Body';
import Form from '../components/Form';
import { useSearchParams } from 'next/navigation';

interface IConversationsIdProps {
  conversationId: string;
}

const ConversationsId = async ({ params }: { params: IConversationsIdProps }) => {
  const conversation = await getConversationById(params.conversationId);
  const messages = await getMessages(params.conversationId);

  // const conversation = await getConversationById('660d90f84de8c7c45f13bd2f');

  if (!conversation) {
    return (
      <div className='w-full h-screen'>
        <EmptyState />
      </div>
    );
  }

  return (
    <div className='w-full h-screen flex flex-col'>
      <Header className='flex' conversation={conversation} />
      <Body initialMessages={messages} conversation={conversation} />
      <Form className='absolute bottom-0 w-[calc(100vw_-_64px-_320px)] p-3 border-t-gray-200 border-t border-solid bg-white' />
    </div>
  );
};

export default ConversationsId;
