import getCurrentUser from '@/actions/getCurrentUsers';
import React from 'react';
import DesktopSideBar from './DesktopSideBar';

interface ISideBarLayoutProps {
  children: React.ReactNode;
}

const SideBarLayout = async (props: ISideBarLayoutProps) => {
  const currentUser = await getCurrentUser();

  return (
    <div className='h-full inline-flex'>
      <DesktopSideBar currentUser={currentUser} />
      <main className='w-[calc(100vw_-_64px)] h-full flex-1 inline-flex'>{props.children}</main>
    </div>
  );
};

export default SideBarLayout;
