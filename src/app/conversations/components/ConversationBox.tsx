'use client';

import useOtherUser from '@/hooks/useOtherUser';
import { FullConversationType } from '@/types';
import { Avatar } from '@mantine/core';
import { useSession } from 'next-auth/react';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';
import { format } from 'date-fns';
import clsx from 'clsx';
import ActionIconBadge from '@/components/elements/ActionIconBadge';
import { IconCircle } from '@tabler/icons-react';
import AvatarBadge from './AvatarBadge';

interface ConversationBoxProps {
  data: FullConversationType;
  selected?: boolean;
}

const ConversationBox = (props: ConversationBoxProps) => {
  const { data, selected } = props || {};
  const params = useParams()

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

  return (
    <div
      onClick={handleClick}
      className={clsx(`w-full relative flex items-center space-x-3  p-3  hover:bg-neutral-100 rounded-lg transition cursor-pointer`,
        selected ? 'bg-neutral-100' : 'bg-white',
      )}
    >
      <div className='flex gap-x-5 items-end flex-1'>
        <AvatarBadge user={otherUser} />

        <div className='flex flex-col w-full'>
          <div className='flex items-center justify-between'>
            <p className='text-md font-medium text-gray-900'>{data.name || otherUser.name}</p>

            {lastMessage?.createdAt && (
              <p className='text-xs  text-gray-400 font-light'>{format(new Date(lastMessage.createdAt), 'p')}</p>
            )}
          </div>

          <p className={clsx('truncate text-sm', hasSeen ? 'text-gray-500' : 'text-black font-medium')}>
            {lastMessageText}
          </p>
        </div>

        <div>
        </div>
      </div>
    </div>
  );
};

export default ConversationBox;
