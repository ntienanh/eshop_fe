'use client';

import UserBox from '@/app/users/components/UserBox';
import useConversation from '@/hooks/useConversation';
import { ActionIcon, Box, Text } from '@mantine/core';
import { Conversation, User } from '@prisma/client';
import { IconUsersPlus } from '@tabler/icons-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react';
import ConversationBox from './ConversationBox';
import { FullConversationType } from '@/types';

interface IConversationListProps {
  users: User[];
  title: string;
  initialItems: FullConversationType[];
}

const ConversationList = (props: IConversationListProps) => {
  const { initialItems, title, users } = props || {};

  const [items, setItems] = React.useState(initialItems);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const router = useRouter();
  const session = useSession();

  const { conversationId, isOpen } = useConversation();

  return (
    <div className='min-w-80 p-2 border-r-gray-200 border-r border-solid'>
      <Box className='flex justify-between items-center px-3'>
        <Text fz={24} fw={600} color='gray'>
          Messages
        </Text>

        <ActionIcon radius='lg' variant='light' color='gray' size='md'>
          <IconUsersPlus style={{ width: '70%', height: '70%' }} stroke={1.5} />
        </ActionIcon>
      </Box>

      {items.map((item, idx) => (
        <ConversationBox key={item.id} data={item} selected={conversationId === item.id} />
      ))}
    </div>
  );
};

export default ConversationList;
