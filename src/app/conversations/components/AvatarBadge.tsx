'use client';

import useActiveList from '@/hooks/useActiveList';
import { Avatar, Badge } from '@mantine/core';
import { User } from '@prisma/client';
import React from 'react';

interface IAvatarBadgeProps {
  user?: User;
}

const AvatarBadge = (props: IAvatarBadgeProps) => {
  const { user } = props || {};

  const { members } = useActiveList();
  const isActive = members.indexOf(user?.email!) !== -1;

  return (
    <div className='relative inline-block'>
      <Avatar src={user?.image} alt='no image here' />
      <Badge className='absolute top-0 right-[-8px]' size='xs' circle color={isActive ? 'green' : 'gray'} />
    </div>
  );
};

export default AvatarBadge;
