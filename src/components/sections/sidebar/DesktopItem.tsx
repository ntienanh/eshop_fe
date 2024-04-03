'use client';

import { ActionIcon, Tooltip } from '@mantine/core';
import { useRouter } from 'next/navigation';
import React from 'react';
import clsx from 'clsx';

interface DesktopItemProps {
  label: string;
  toolTip: string;
  icon: any;
  href: string;
  onClick?: () => void;
  active?: boolean | string;
}

const DesktopItem = (props: DesktopItemProps) => {
  const { href, icon: ICon, label, active, onClick, toolTip } = props || {};
  const router = useRouter();

  const handleClick = () => {
    if (!!onClick) return onClick();
    return router.push(href);
  };

  return (
    <Tooltip label={toolTip} position='right-start'>
      <ActionIcon
        onClick={handleClick}
        className={clsx('hover:bg-blue-500 transition-colors', active && 'bg-blue-500')}
        size='lg'
        variant='subtle'
      >
        <ICon color='white' stroke={1.5} />
      </ActionIcon>
    </Tooltip>
  );
};

export default DesktopItem;
