'use client';

import { ActionIcon, ActionIconProps, Badge } from '@mantine/core';
import { TablerIconsProps } from '@tabler/icons-react';
import React from 'react';

interface IActionIconBadgeProps extends ActionIconProps {
  icon: (props: TablerIconsProps) => JSX.Element;
  onClick?: () => void;
  data?: string;
}

const ActionIconBadge = (props: IActionIconBadgeProps) => {
  const { icon: ICon, onClick, data, ...rest } = props || {};

  return (
    <div className='relative' onClick={onClick}>
      <ActionIcon variant='default' {...rest}>
        <ICon color='var(--mantine-color-blue-8)' stroke={1.5} />
      </ActionIcon>

      {!!data && (
        <Badge className='absolute bottom-0 right-[-8px]' size='xs' circle>
          1
        </Badge>
      )}
    </div>
  );
};

export default ActionIconBadge;
