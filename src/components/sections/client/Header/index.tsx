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
    <header className='bg-gray h-[84px] sticky top-0 z-20 bg-white shadow-sm'>
      <div className='px-4 flex justify-between items-center h-full'>
        <div className='flex gap-x-4 items-center'>
          <div className='p-7 cursor-pointer'>
            <img src='https://cdn.topdev.vn/v4/assets/images/td-logo.png' alt='img' className='h-[30px]' />
          </div>

          <div className='p-7 cursor-pointer flex gap-x-2 font-bold capitalize hover:text-red-600 group relative'>
            <button>Việc làm IT</button>
            <IconChevronDown className='group-hover:text-red-600' />

            <ul className='mt-12 absolute invisible text-gray-700 group-hover:visible bg-white w-72 box-border border p-4 list-none text-sm font-semibold'>
              <li className='group/item pb-2'>
                <a className='rounded bg-[#F4F5F5] group-hover/item:bg-slate-300 hover:text-red-600 group-hover/item:text-red-600 py-2 px-4 whitespace-no-wrap flex justify-between items-center relative group'>
                  <p className='flex justify-between gap-x-4 text-sm font-semibold items-center'>
                    <IconSearch className='text-red-600' />
                    By Levels
                  </p>
                  <p className='group/edit invisible group-hover/item:visible'>
                    <IconArrowRight />
                  </p>
                </a>

                <div className='z-20 flex flex-col gap-y-2 invisible group-hover/item:visible absolute left-64 top-0 ml-[14px] w-52 box-border border p-4 bg-white z-12 shadow-[1px_6px_23px_-6px_rgba(0,0,0,0.73)]'>
                  {listLevels.map(submenu => {
                    return (
                      <button className='flex justify-between gap-x-4 text-sm font-semibold items-center rounded bg-[#F4F5F5] hover:bg-slate-300 px-4 py-2'>
                        {submenu.name}
                      </button>
                    );
                  })}
                </div>
              </li>

              <li className='group/item pb-2'>
                <a className='rounded bg-[#F4F5F5] group-hover/item:bg-slate-300 hover:text-red-600 group-hover/item:text-red-600 py-2 px-4 whitespace-no-wrap flex justify-between items-center relative group'>
                  <p className='flex justify-between gap-x-4 text-sm font-semibold items-center'>
                    <IconSearch className='text-red-600' />
                    By Job Type
                  </p>
                  <p className='group/edit invisible group-hover/item:visible'>
                    <IconArrowRight />
                  </p>
                </a>

                <div className='z-20 flex flex-col gap-y-2 invisible group-hover/item:visible absolute left-64 top-0 ml-[14px] w-52 box-border border p-4 bg-white z-12 shadow-[1px_6px_23px_-6px_rgba(0,0,0,0.73)]'>
                  {listTypes.map(submenu => {
                    return (
                      <button className='flex justify-between gap-x-4 text-sm font-semibold items-center rounded bg-[#F4F5F5] hover:bg-slate-300 px-4 py-2'>
                        {submenu.name}
                      </button>
                    );
                  })}
                </div>
              </li>

              <li className='group/item pb-2'>
                <a className='rounded bg-[#F4F5F5] group-hover/item:bg-slate-300 hover:text-red-600 group-hover/item:text-red-600 py-2 px-4 whitespace-no-wrap flex justify-between items-center relative group'>
                  <p className='flex justify-between gap-x-4 text-sm font-semibold items-center'>
                    <IconSearch className='text-red-600' />
                    By Location
                  </p>
                  <p className='group/edit invisible group-hover/item:visible'>
                    <IconArrowRight />
                  </p>
                </a>

                <div className='z-20 flex flex-col gap-y-2 invisible group-hover/item:visible absolute left-64 top-0 ml-[14px] w-52 box-border border p-4 bg-white z-12 shadow-[1px_6px_23px_-6px_rgba(0,0,0,0.73)]'>
                  {listLocation.map(submenu => {
                    return (
                      <button className='flex justify-between gap-x-4 text-sm font-semibold items-center rounded bg-[#F4F5F5] hover:bg-slate-300 px-4 py-2'>
                        {submenu.name}
                      </button>
                    );
                  })}
                </div>
              </li>

              <li className='group/item pb-2'>
                <a className='rounded bg-[#F4F5F5] group-hover/item:bg-slate-300 hover:text-red-600 group-hover/item:text-red-600 py-2 px-4 whitespace-no-wrap flex justify-between items-center relative group'>
                  <p className='flex justify-between gap-x-4 text-sm font-semibold items-center'>
                    <IconSearch className='text-red-600' />
                    By Skills
                  </p>
                  <p className='group/edit invisible group-hover/item:visible'>
                    <IconArrowRight />
                  </p>
                </a>

                <div className='z-20 flex flex-col gap-y-2 invisible group-hover/item:visible absolute left-64 top-0 ml-[14px] w-52 box-border border p-4 bg-white z-12 shadow-[1px_6px_23px_-6px_rgba(0,0,0,0.73)]'>
                  {listSkills.map(submenu => {
                    return (
                      <button className='flex justify-between gap-x-4 text-sm font-semibold items-center rounded bg-[#F4F5F5] hover:bg-slate-300 px-4 py-2'>
                        {submenu.name}
                      </button>
                    );
                  })}
                </div>
              </li>
            </ul>
          </div>

          <div className='p-7 cursor-pointer font-bold capitalize hover:text-red-600'>Công ty IT</div>
        </div>

        <div className='flex gap-x-4 items-center'>
          <IconBellFilled className='cursor-pointer rounded text-center transition-all hover:bg-gray-200 focus:bg-gray-200' />
          <div className='p-4 flex gap-x-4 cursor-pointer items-center'>
            <div className='font-bold capitalize'>Nguyễn Tiến Ánh</div>
            <IconChevronDown className='cursor-pointer' />
          </div>

          <p className='hover:text-red-600 cursor-pointer'>EN</p>
          <p>|</p>
          <p className='hover:text-red-600 cursor-pointer'>VI</p>
        </div>
      </div>
    </header>
  );
};

export default HeaderGuest;
