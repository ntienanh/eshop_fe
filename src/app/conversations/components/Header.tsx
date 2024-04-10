'use client';

import useActiveList from '@/hooks/useActiveList';
import useOtherUser from '@/hooks/useOtherUser';
import { Conversation, User } from '@prisma/client';
import React, { useMemo } from 'react';
import AvatarBadge from './AvatarBadge';
import clsx from 'clsx';

interface IHeaderProps {
  conversation: Conversation & {
    users: User[];
  };
  className?: string;
}

const Header = (props: IHeaderProps) => {
  const { conversation, className } = props || {};
  const { members } = useActiveList();
  const otherUser = useOtherUser(conversation);

  const isActive = members.indexOf(otherUser?.email!) !== -1;

  const statusText = useMemo(() => {
    if (conversation?.isGroup) {
      return `${conversation.users.length} members`;
    }

    return isActive ? 'Active' : 'Offline';
  }, [conversation, isActive]);

  return (
    <div
      className={clsx(
        'p-2 gap-x-4 flex items-center border-b-[var(--mantine-color-gray-3)] border-b border-solid',
        className,
      )}
    >
      <AvatarBadge />
      {conversation?.name || otherUser?.name}
    </div>
  );
};

export default Header;
