import { JobType, Position } from '@/types/enum';
import { Avatar } from '@mantine/core';
import { IconArrowRight, IconBellFilled, IconChevronDown, IconSearch, IconUserCircle } from '@tabler/icons-react';
import React from 'react';

const listHeaderItems = [
  {
    name: 'Việc làm IT',
    subItem: [
      { name: 'By Levels', subsubItem: [{ name: 'Subsub1', link: '1111' }] },
      { name: 'By Jobs Type', subsubItem: [{ name: 'Subsub2', link: '2222' }] },
    ],
  },
  {
    name: 'Công ty IT',
    subItem: [],
  },
];

const listLevels = [
  { name: Position.Intern, href: '/jobs/intern' },
  { name: Position.Fresher, href: '/jobs/fresher' },
  { name: Position.Junior, href: '/jobs/junior' },
  { name: Position.Middle, href: '/jobs/middle' },
  { name: Position.Senior, href: '/jobs/senior' },
  { name: Position.Leader, href: '/jobs/leader' },
  { name: Position.Manager, href: '/jobs/manager' },
  { name: Position.AllLevels, href: '/jobs/all' },
];

const listTypes = [
  { name: JobType.Hybird, href: '/jobs/hybird' },
  { name: JobType.Office, href: '/jobs/office' },
  { name: JobType.Oversea, href: '/jobs/oversea' },
  { name: JobType.Remote, href: '/jobs/remote' },
];

const listLocation = [
  { name: 'Hồ Chí Minh', href: '/jobs/hochiminh' },
  { name: 'Hà Nội', href: '/jobs/hanoi' },
  { name: 'Đà Nẵng', href: '/jobs/danang' },
  { name: 'Cần Thơ', href: '/jobs/cantho' },
];

const listSkills = [
  { name: 'Javascript', href: '/jobs/javascript' },
  { name: 'Java', href: '/jobs/java' },
  { name: '.NET', href: '/jobs/net' },
  { name: 'C#', href: '/jobs/csharp' },
  { name: 'PHP', href: '/jobs/php' },
  { name: 'Python', href: '/jobs/python' },
  { name: 'Tester', href: '/jobs/tester' },
  { name: 'Mobile', href: '/jobs/mobile' },
];

const HeaderGuest = () => {
  return (
    <header className='bg-gray sticky top-0 z-20 h-[84px] w-full bg-white bg-opacity-70 shadow-md backdrop-blur-[9px]'>
      <div className='mx-auto flex h-full max-w-[1536px] items-center justify-between px-4 md:px-0'>
        <div className='flex items-center gap-x-4'>
          <div className='cursor-pointer p-7 pl-0'>
            <img src={'./images/logo.png'} alt='img' className='h-[80px] w-[200px]' />
          </div>

          <div className='group relative flex cursor-pointer gap-x-2 p-7 font-bold capitalize hover:text-red-600 '>
            <button>Việc làm IT</button>
            <IconChevronDown className='group-hover:text-red-600' />

            <ul className='invisible absolute mt-12 box-border w-72 list-none border bg-white p-4 text-sm font-semibold text-gray-700 shadow-[1px_6px_23px_-6px_rgba(0,0,0,0.73)] group-hover:visible'>
              <li className='group/item pb-2'>
                <a className='whitespace-no-wrap group relative flex items-center justify-between rounded bg-[#F4F5F5] px-4 py-2 hover:text-red-600 group-hover/item:bg-slate-300 group-hover/item:text-red-600'>
                  <p className='flex items-center justify-between gap-x-4 text-sm font-semibold'>
                    <IconSearch className='text-red-600' />
                    By Levels
                  </p>
                  <p className='group/edit invisible group-hover/item:visible'>
                    <IconArrowRight />
                  </p>
                </a>

                <div className='z-12 invisible absolute left-64 top-0 z-20 ml-[14px] box-border flex w-52 flex-col gap-y-2 border bg-white p-4 shadow-[1px_6px_23px_-6px_rgba(0,0,0,0.73)] group-hover/item:visible'>
                  {listLevels.map(submenu => {
                    return (
                      <button className='flex items-center justify-between gap-x-4 rounded bg-[#F4F5F5] px-4 py-2 text-sm font-semibold hover:bg-slate-300'>
                        {submenu.name}
                      </button>
                    );
                  })}
                </div>
              </li>

              <li className='group/item pb-2'>
                <a className='whitespace-no-wrap group relative flex items-center justify-between rounded bg-[#F4F5F5] px-4 py-2 hover:text-red-600 group-hover/item:bg-slate-300 group-hover/item:text-red-600'>
                  <p className='flex items-center justify-between gap-x-4 text-sm font-semibold'>
                    <IconSearch className='text-red-600' />
                    By Job Type
                  </p>
                  <p className='group/edit invisible group-hover/item:visible'>
                    <IconArrowRight />
                  </p>
                </a>

                <div className='z-12 invisible absolute left-64 top-0 z-20 ml-[14px] box-border flex w-52 flex-col gap-y-2 border bg-white p-4 shadow-[1px_6px_23px_-6px_rgba(0,0,0,0.73)] group-hover/item:visible'>
                  {listTypes.map(submenu => {
                    return (
                      <button className='flex items-center justify-between gap-x-4 rounded bg-[#F4F5F5] px-4 py-2 text-sm font-semibold hover:bg-slate-300'>
                        {submenu.name}
                      </button>
                    );
                  })}
                </div>
              </li>

              <li className='group/item pb-2'>
                <a className='whitespace-no-wrap group relative flex items-center justify-between rounded bg-[#F4F5F5] px-4 py-2 hover:text-red-600 group-hover/item:bg-slate-300 group-hover/item:text-red-600'>
                  <p className='flex items-center justify-between gap-x-4 text-sm font-semibold'>
                    <IconSearch className='text-red-600' />
                    By Location
                  </p>
                  <p className='group/edit invisible group-hover/item:visible'>
                    <IconArrowRight />
                  </p>
                </a>

                <div className='z-12 invisible absolute left-64 top-0 z-20 ml-[14px] box-border flex w-52 flex-col gap-y-2 border bg-white p-4 shadow-[1px_6px_23px_-6px_rgba(0,0,0,0.73)] group-hover/item:visible'>
                  {listLocation.map(submenu => {
                    return (
                      <button className='flex items-center justify-between gap-x-4 rounded bg-[#F4F5F5] px-4 py-2 text-sm font-semibold hover:bg-slate-300'>
                        {submenu.name}
                      </button>
                    );
                  })}
                </div>
              </li>

              <li className='group/item pb-2'>
                <a className='whitespace-no-wrap group relative flex items-center justify-between rounded bg-[#F4F5F5] px-4 py-2 hover:text-red-600 group-hover/item:bg-slate-300 group-hover/item:text-red-600'>
                  <p className='flex items-center justify-between gap-x-4 text-sm font-semibold'>
                    <IconSearch className='text-red-600' />
                    By Skills
                  </p>
                  <p className='group/edit invisible group-hover/item:visible'>
                    <IconArrowRight />
                  </p>
                </a>

                <div className='z-12 invisible absolute left-64 top-0 z-20 ml-[14px] box-border flex w-52 flex-col gap-y-2 border bg-white p-4 shadow-[1px_6px_23px_-6px_rgba(0,0,0,0.73)] group-hover/item:visible'>
                  {listSkills.map(submenu => {
                    return (
                      <button className='flex items-center justify-between gap-x-4 rounded bg-[#F4F5F5] px-4 py-2 text-sm font-semibold hover:bg-slate-300'>
                        {submenu.name}
                      </button>
                    );
                  })}
                </div>
              </li>
            </ul>
          </div>

          <div className='cursor-pointer p-7 font-bold capitalize hover:text-red-600'>Công ty IT</div>
        </div>

        <div className='flex items-center gap-x-4'>
          <p className='cursor-pointer hover:text-red-600'>EN</p>
          <p>|</p>
          <p className='cursor-pointer hover:text-red-600'>VI</p>
        </div>
      </div>
    </header>
  );
};

export default HeaderGuest;
