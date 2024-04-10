'use client';

import useConversation from '@/hooks/useConversation';
import { pusherClient } from '@/libs/pusher';
import { FullMessageType } from '@/types';
import axios from 'axios';
import React from 'react';
import { find } from 'lodash';
import MessageBox from './MessageBox';

interface IBodyProps {
  initialMessages: FullMessageType[];
}

const Body = (props: IBodyProps) => {
  const { initialMessages } = props || {};
  const bottomRef = React.useRef<HTMLDivElement>(null);
  const [messages, setMessages] = React.useState(initialMessages);
  const { conversationId } = useConversation();

  // React.useEffect(() => {
  //   axios.post(`/api/conversations/${conversationId}/seen`);
  // }, [conversationId]);

  // React.useEffect(() => {
  //   pusherClient.subscribe(conversationId);
  //   bottomRef?.current?.scrollIntoView();

  //   const messageHandler = (message: FullMessageType) => {
  //     axios.post(`/api/conversations/${conversationId}/seen`);

  //     setMessages(current => {
  //       if (find(current, { id: message.id })) {
  //         return current;
  //       }

  //       return [...current, message];
  //     });

  //     bottomRef?.current?.scrollIntoView();
  //   };
  // });

  return (
    <div className='flex-1 overflow-y-auto'>
      body
      {messages?.map((message, i) => (
        <MessageBox isLast={i === messages.length - 1} key={message.id} data={message} />
      ))}
      <div className='pt-24' ref={bottomRef} />
    </div>
  );
};

export default Body;
