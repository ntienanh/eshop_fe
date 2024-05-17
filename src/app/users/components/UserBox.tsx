import axios from 'axios';
import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { User } from '@prisma/client';
import { Avatar, Text } from '@mantine/core';

interface UserBoxProps {
  data: User;
}

const UserBox: React.FC<UserBoxProps> = ({ data }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = useCallback(() => {
    console.log('move to chat conservation to someone');
    setIsLoading(true);
    axios
      .post('/api/conversations', { userId: data.id })
      .then(data => {
        router.push(`/conversations/${data.data.id}`);
      })
      .finally(() => setIsLoading(false));
  }, [data, router]);

  return (
    <>
      {isLoading && <p>Loading...</p>}
      <div
        onClick={handleClick}
        className='
          relative 
          flex 
          w-full 
          cursor-pointer 
          items-center 
          space-x-3 
          rounded-lg 
          bg-white
          p-3
          transition
          hover:bg-neutral-100
        '
      >
        <Avatar src={data?.image} color='cyan' radius='xl' className='cursor-pointer'>
          <Text>{data.name?.charAt(0)}</Text>
        </Avatar>

        <div className='min-w-0 flex-1 transition-colors'>
          <div className='focus:outline-none'>
            <span className='absolute inset-0' aria-hidden='true' />
            <div className='mb-1 flex items-center justify-between'>
              <p className='text-sm font-medium text-gray-900'>{data.name}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserBox;
