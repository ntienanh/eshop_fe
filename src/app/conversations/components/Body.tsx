'use client';

import useConversation from '@/hooks/useConversation';
import { FullMessageType } from '@/types';
import { Avatar, Divider } from '@mantine/core';
import { Conversation, User } from '@prisma/client';
import { IconPoint } from '@tabler/icons-react';
import { format } from 'date-fns';
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

  const doiphuong = conversation?.users?.[1];

  console.log('messages', messages);

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
      <div className='p-3 flex items-center'>
        {/* {initialMessages.map(item=>{
          if(item.conversationId === conversationId && conversation?.id)
          return <Avatar src={initialMessages?.[0]?.image} radius="xl" size={'xl'} />
        })} */}

        <div className='pl-3'>
          {doiphuong?.name} - {doiphuong?.email}
        </div>
      </div>

      <Divider label={format(new Date(messages?.[0]?.createdAt || new Date()), 'dd/mm/yyy')} />

      <div className='flex flex-col gap-y-1 pl-3 w-full pt-3'>
        {messages?.map((message, i) => {
          return (
            <div className=''>
              {messages[i - 1] && messages[i - 1].senderId === message.senderId ? null : (
                <Avatar src={messages?.[i]?.sender.image} radius='xl' size={'md'} className='cursor-pointer' />
              )}

              <div className='flex flex-col w-full'>
                <div className='flex  justify-start items-center'>
                  {messages[i - 1] && messages[i - 1].senderId === message.senderId ? null : (
                    <div className='flex justify-start items-center'>
                      <p className='font-semibold text-md hover:text-blue-400 hover:underline cursor-pointer'>
                        {messages?.[i]?.sender.name}
                      </p>
                      <IconPoint className='w-2 h-2' />
                      <p className='text-sm font-light'>{format(new Date(messages?.[i]?.createdAt), 'p')}</p>
                      <IconPoint className='w-2 h-2' />
                      <p className='text-sm font-light'>{format(new Date(messages?.[i]?.createdAt), 'dd/mm/yyyy')}</p>
                    </div>
                  )}
                </div>

                <p className='font-light hover:bg-slate-300'>{message.body}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className='pt-24' ref={bottomRef} />
    </div>
  );
};

export default Body;
