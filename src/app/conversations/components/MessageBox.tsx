'use client';

import { FullMessageType } from '@/types';
import clsx from 'clsx';
import { useSession } from 'next-auth/react';
import React from 'react';
import AvatarBadge from './AvatarBadge';
import { Divider } from '@mantine/core';

interface IMessageBoxProps {
  data: FullMessageType;
  isLast?: boolean;
}

const MessageBox = (props: IMessageBoxProps) => {
  const { data, isLast } = props || {};
  const session = useSession();

  // Xác định tin nhắn bên nào của mình thì phải / đối phương trái

  const seenList = (data.seen || [])
    .filter(user => user.email !== data?.sender?.email)
    .map(user => user.name)
    .join(', ');

  return (
    <div className='flex justify-start w-full'>
      {/* <AvatarBadge user={data.sender} /> */}
      {data.body}
    </div>
  );
};

export default MessageBox;
