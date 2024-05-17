'use client';

import useConversation from '@/hooks/useConversation';
import { pusherClient } from '@/libs/pusher';
import { FullMessageType } from '@/types';
import { Avatar, Button, Divider, ScrollArea, Text } from '@mantine/core';
import { useWindowScroll } from '@mantine/hooks';
import { Conversation, User } from '@prisma/client';
import { IconPoint } from '@tabler/icons-react';
import axios from 'axios';
import { format } from 'date-fns';
import { find } from 'lodash';
import React from 'react';

interface IBodyProps {
  initialMessages: FullMessageType[];
  conversation?: Conversation & {
    users: User[];
  };
}

const Body = (props: IBodyProps) => {
  const { initialMessages, conversation } = props || {};
  const bottomRef = React.useRef<HTMLDivElement>(null);
  const [messages, setMessages] = React.useState(initialMessages);
  const { conversationId } = useConversation();
  const [scroll, scrollTo] = useWindowScroll();

  const doiphuong = conversation?.users?.[1];

  React.useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`);
  }, [conversationId]);

  React.useEffect(() => {
    pusherClient.subscribe(conversationId);
    bottomRef?.current?.scrollIntoView();

    const messageHandler = (message: FullMessageType) => {
      axios.post(`/api/conversations/${conversationId}/seen`);
      setMessages(current => {
        if (find(current, { id: message.id })) {
          return current;
        }
        return [...current, message];
      });

      bottomRef?.current?.scrollIntoView();
    };

    pusherClient.bind('messages:new', messageHandler);
    return () => {
      pusherClient.unsubscribe(conversationId);
      pusherClient.unbind('messages:new', messageHandler);
    };
  }, [conversationId]);

  return (
    <ScrollArea className='flex-1 overflow-y-scroll'>
      <div className='flex items-center p-3'>
        <div className='pl-3'>
          {doiphuong?.name} - {doiphuong?.email}
        </div>
      </div>

      <Divider label={format(new Date(messages?.[0]?.createdAt || new Date()), 'dd/mm/yyy')} />

      <div className='flex w-full flex-col pb-3 pl-3'>
        {messages?.map((message, i) => {
          return (
            <div>
              {messages[i - 1] && messages[i - 1].senderId === message.senderId ? null : (
                <div className='flex items-center justify-start'>
                  <Avatar src={messages?.[i]?.sender.image} radius='xl' size={'md'} className='mt-3 cursor-pointer' />
                  <p className='text-md cursor-pointer pl-3 pt-3 font-semibold hover:text-blue-400 hover:underline'>
                    {messages?.[i]?.sender.name}
                  </p>
                  <IconPoint className='h-2 w-2 pt-3' />
                  <p className='pt-3 text-sm font-light'>{format(new Date(messages?.[i]?.createdAt), 'p')}</p>
                  <IconPoint className='h-2 w-2 pt-3' />
                  <p className='pt-3 text-sm font-light'>{format(new Date(messages?.[i]?.createdAt), 'dd/mm/yyyy')}</p>
                </div>
              )}

              <div className='flex w-full flex-col pl-12'>
                <p className='font-light hover:bg-slate-300'>{message.body}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className='pt-24' ref={bottomRef} />
    </ScrollArea>
  );
};

export default Body;
