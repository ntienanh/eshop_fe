'use client';

import { ActionIcon, Divider, Popover, Text } from '@mantine/core';
import { IconMenu2, IconSearch, IconShoppingCart, IconUserCircle } from '@tabler/icons-react';
import clsx from 'clsx';
import { Kumbh_Sans } from 'next/font/google';
import React from 'react';

const Test = () => {
  return (
    <main>
      <header>
        <div className='py-[10px] bg-[#63AB45] bg-repeat bg-[top_left] bg-header-logo'>
          <div className='px-[15px] flex justify-end gap-x-[12px] items-center leading-[34px] font-medium text-[15px]'>
            <div className='text-white'>Booking Now</div>
            <div className='text-white'>About</div>
            <IconShoppingCart className='w-[22px] h-[22px] text-white' />
          </div>
        </div>

        <div className='flex h-[72px] px-[15px]'>
          <div className='w-2/5 flex items-center'>
            <a href='#' className=''>
              <img
                className='h-auto w-full'
                alt='img'
                src='https://gaviaspreview.com/wp/gowilds/wp-content/uploads/2023/01/logo.png'
              />
            </a>
          </div>

          <div className='w-3/5 flex justify-end gap-x-3 items-center'>
            <IconMenu2 className='w-[30px] h-[30px] text-gray-600' />
            <div className='h-[30px]'>
              <Divider orientation='vertical' className='h-[30px] items-center' />
            </div>
            <IconSearch className='w-[30px] h-[30px] text-gray-600' />

            <Popover width={250} position='bottom' withArrow shadow='md'>
              <Popover.Target>
                <ActionIcon variant='filled' color='#63AB45' size='xl' radius='xl' aria-label='Settings'>
                  <IconUserCircle style={{ width: '70%', height: '70%' }} stroke={1.5} />
                </ActionIcon>
              </Popover.Target>

              <Popover.Dropdown>
                <Text>This is uncontrolled popover, it is opened when button is clicked</Text>
              </Popover.Dropdown>
            </Popover>
          </div>
        </div>
      </header>

      {/*  */}
    </main>
  );

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='absolute w-[60px] h-[60px] animate-[upDown_2.5s_linear_0s_infinite]'>
        <img
          decoding='async'
          draggable={'false'}
          className='transition-all duration-[5s]'
          alt='logo'
          onDragStart={e => e.preventDefault()}
          src='https://images.pexels.com/photos/7190303/pexels-photo-7190303.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        />
      </div>
    </div>
  );
};

export default Test;
