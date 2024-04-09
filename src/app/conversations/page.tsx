'use client';

import EmptyState from '@/components/sections/EmptyState';
import useConversation from '@/hooks/useConversation';
import clsx from 'clsx';
import React from 'react';

const ConsersationPage = () => {
  const { isOpen } = useConversation();

  return (
    <div className={clsx('h-screen lg:block w-full', isOpen ? 'block' : 'hidden')}>
      <EmptyState />
    </div>
  );
};

export default ConsersationPage;
