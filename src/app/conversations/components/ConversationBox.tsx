'use client';

import useOtherUser from '@/hooks/useOtherUser';
import { FullConversationType } from '@/types';
import { Avatar } from '@mantine/core';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { format } from 'date-fns';
import clsx from 'clsx';

interface ConversationBoxProps {
  data: FullConversationType;
  selected?: boolean;
}

const ConversationBox = (props: ConversationBoxProps) => {
  const { data, selected } = props || {};

  const otherUser = useOtherUser(data);
  const session = useSession();
  const router = useRouter();

  const handleClick = React.useCallback(() => {
    router.push(`/conversations/${data.id}`);
  }, [data, router]);

  const lastMessage = React.useMemo(() => {
    const messages = data.messages || [];

    return messages[messages.length - 1];
  }, [data.messages]);

  const userEmail = React.useMemo(() => session.data?.user?.email, [session.data?.user?.email]);

  const hasSeen = React.useMemo(() => {
    if (!lastMessage) {
      return false;
    }

    const seenArray = lastMessage.seen || [];

    if (!userEmail) {
      return false;
    }

    return seenArray.filter(user => user.email === userEmail).length !== 0;
  }, [userEmail, lastMessage]);

  const lastMessageText = React.useMemo(() => {
    if (lastMessage?.image) {
      return 'Sent an image';
    }

    if (lastMessage?.body) {
      return lastMessage?.body;
    }

    return 'Started a conversation';
  }, [lastMessage]);

  console.log('data,data', data);

  return (
    <div
      onClick={handleClick}
      className={clsx(
        `w-full relative flex items-center space-x-3  p-3  hover:bg-neutral-100 rounded-lg transition cursor-pointer`,
        selected ? 'bg-neutral-100' : 'bg-white',
      )}
    >
      <div className='min-w-0 flex-1'>
        <div className='focus:outline-none'>
          <span className='absolute inset-0' aria-hidden='true' />

          {data.isGroup ? <p>Avt ggroup</p> : <Avatar src={data.image} alt='img' />}

          <div className='flex justify-between items-center mb-1'>
            <p className='text-md font-medium text-gray-900'>{data.name || otherUser.name}</p>
            {lastMessage?.createdAt && (
              <p className='text-xs  text-gray-400 font-light'>{format(new Date(lastMessage.createdAt), 'p')}</p>
            )}
          </div>
          <p className={clsx('truncate text-sm', hasSeen ? 'text-gray-500' : 'text-black font-medium')}>
            {lastMessageText}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConversationBox;