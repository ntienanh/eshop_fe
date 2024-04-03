'use client';

import useRoutes from '@/hooks/useRoutes';
import { Avatar } from '@mantine/core';
import { User } from '@prisma/client';
import DesktopItem from './DesktopItem';

interface DesktopSidebarProps {
  currentUser: User | null;
}

const DesktopSideBar = (props: DesktopSidebarProps) => {
  const { currentUser } = props || {};
  const routes = useRoutes();

  return (
    <div className='bg-blue-400 w-14 border-r-gray-200 border-r border-solid flex justify-start items-center py-3 flex-col gap-y-3 h-screen'>
      <Avatar
        src={currentUser?.image || 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-10.png'}
        alt='Avatar'
      >
        {currentUser?.name?.charAt(0) || '???'}
      </Avatar>

      {routes?.map((items, idx) => {
        const { href, icon, label, active, onClick, toolTip } = items || {};

        return (
          <DesktopItem
            href={href}
            icon={icon}
            label={label}
            toolTip={toolTip}
            active={active}
            key={idx}
            onClick={onClick}
          />
        );
      })}
    </div>
  );
};

export default DesktopSideBar;
