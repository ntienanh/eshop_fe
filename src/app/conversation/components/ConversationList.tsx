import { User } from '@prisma/client';
import React from 'react';

interface IConversationListProps {
  users: User[];
  title: string;
  initialItems: any;
}

const ConversationList = (props: IConversationListProps) => {
  return <div>ConversationList</div>;
};

export default ConversationList;
