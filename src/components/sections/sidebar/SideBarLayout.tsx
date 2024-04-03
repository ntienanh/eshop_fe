import getCurrentUser from '@/actions/getCurrentUsers';
import { ActionIcon, Box, Input } from '@mantine/core';
import { IconSearch, IconUserPlus, IconUsersPlus } from '@tabler/icons-react';
import React from 'react';
import DesktopSideBar from './DesktopSideBar';
import UserList from '@/app/(shared)/users/components/UserList';
import { User } from '@prisma/client';

interface ISideBarLayoutProps {
  children: React.ReactNode;
  userList?: User[];
}

const SideBarLayout = async (props: ISideBarLayoutProps) => {
  const currentUser = await getCurrentUser();

  return (
    <div className='grid grid-cols-12'>
      <div className='col-span-3 flex'>
        {/* SideBarLayout Left */}
        <DesktopSideBar currentUser={currentUser} />
        <div>{props.children}</div>

        {/* SideBarLayout Right */}
        {/* <div className='flex-1 flex-col gap-x-3 px-2 border-r-gray-200 border-r border-solid  py-3'>
          <Box className='flex gap-x-2 items-center justify-between pb-3 border-b-gray-200 border-b border-solid'>
            <Input size='sm' placeholder='Your email' leftSection={<IconSearch size={16} />} />

            <ActionIcon
              className='hover:bg-gray-400 transition-colors hover:text-white'
              color='gray'
              size='md'
              variant='light'
            >
              <IconUserPlus style={{ width: '70%', height: '70%' }} stroke={1.5} />
            </ActionIcon>
            <ActionIcon
              className='hover:bg-gray-400 transition-colors hover:text-white'
              color='gray'
              size='md'
              variant='light'
            >
              <IconUsersPlus style={{ width: '70%', height: '70%' }} stroke={1.5} />
            </ActionIcon>
          </Box>

          <Box className='pt-2'>
            <UserList items={props.userList} />
          </Box>
        </div> */}
      </div>

      {/* SideBarLayout main content */}
    </div>
  );
};

export default SideBarLayout;
