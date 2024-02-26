import { IconBellFilled, IconChevronDown, IconUserCircle } from '@tabler/icons-react';
import React from 'react';

const HeaderGuest = () => {
  return (
    <header className='bg-gray h-[84px] sticky top-0 z-20 bg-white shadow-sm'>
      <div className='px-4 flex justify-between items-center h-full'>
        <div className='flex gap-x-4 items-center'>
          <div className='p-7 cursor-pointer'>
            <img src='https://cdn.topdev.vn/v4/assets/images/td-logo.png' alt='img' className='h-[30px]' />
          </div>
          <div className='p-7 cursor-pointer flex gap-x-2 font-bold capitalize hover:text-red-600'>
            <p>Việc làm IT</p>
            <IconChevronDown />
          </div>
          <div className='p-7 cursor-pointer font-bold capitalize hover:text-red-600'>Công ty IT</div>
        </div>

        <div className='flex gap-x-4 items-center'>
          <IconBellFilled className='cursor-pointer rounded text-center transition-all hover:bg-gray-200 focus:bg-gray-200' />
          <div className='p-4 flex gap-x-4 cursor-pointer'>
            <IconUserCircle />
            <p className='font-bold capitalize'>Nguyễn Tiến Ánh</p>
            <IconChevronDown className='cursor-pointer' />
          </div>

          <div className='p-4 cursor-pointer font-bold capitalize hover:text-red-600'>Theme | VI</div>
        </div>
      </div>
    </header>
  );
};

export default HeaderGuest;
