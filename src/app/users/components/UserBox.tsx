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
    // setIsLoading(true);
    // axios
    //   .post('/api/conversations', { userId: data.id })
    //   .then(data => {
    //     router.push(`/conversations/${data.data.id}`);
    //   })
    //   .finally(() => setIsLoading(false));
  }, [data, router]);

  return (
    <>
      {isLoading && <p>Loading...</p>}
      <div
        onClick={handleClick}
        className='
          w-full 
          relative 
          flex 
          items-center 
          space-x-3 
          bg-white 
          p-3 
          hover:bg-neutral-100
          rounded-lg
          transition
          cursor-pointer
        '
      >
        <Avatar src={data?.image} color='cyan' radius='xl' className='cursor-pointer'>
          <Text>{data.name?.charAt(0)}</Text>
        </Avatar>

        <div className='min-w-0 flex-1 transition-colors'>
          <div className='focus:outline-none'>
            <span className='absolute inset-0' aria-hidden='true' />
            <div className='flex justify-between items-center mb-1'>
              <p className='text-sm font-medium text-gray-900'>{data.name}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserBox;