'use client';

import { ActionIcon, Box, Text } from '@mantine/core';
import { User } from '@prisma/client';
import { IconUsersPlus } from '@tabler/icons-react';
import UserBox from './UserBox';

interface IUserListProps {
  items: User[];
  classNames?: any;
}

const UserList = (props: IUserListProps) => {
  const { items, classNames } = props || {};

  return (
    <div className='flex w-80 flex-col border-r border-solid border-r-gray-200 p-2'>
      <Box className='flex items-center justify-between px-3'>
        <Text fz={24} fw={600} color='gray'>
          Messages
        </Text>

        <ActionIcon radius='lg' variant='light' color='gray' size='md'>
          <IconUsersPlus style={{ width: '70%', height: '70%' }} stroke={1.5} />
        </ActionIcon>
      </Box>

      {items.map((item, idx) => (
        <UserBox data={item} key={idx} />
      ))}
    </div>
  );
};

export default UserList;
