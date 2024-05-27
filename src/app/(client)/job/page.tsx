'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import JobCarousel from './components/JobCarousel';
import JobCard from './components/JobCard';
import { CarouselSlide } from '@mantine/carousel';
import { divide } from 'lodash';

const JobPage = () => {
  const companiesData = useQuery({
    queryKey: ['posts'],
    queryFn: () => axios.get('http://localhost:1337/api/posts?populate=*').then(res => res.data),
  });

  const dataSource = companiesData?.data?.data?.map((item: any) => {
    const { id, attributes } = item;
    return { id, ...attributes };
  });

  console.log('dataSource', dataSource);

  return (
    <div className='mx-auto flex max-w-[1028px] flex-col gap-10 px-4 py-10 lg:px-0'>
      <p className='text-[32px] font-semibold'>Tất cả các công việc</p>

      <div className='flex w-full gap-10'>
        <div className='flex flex-[3] flex-col gap-6'>
          {dataSource?.map((item: any) => (
            <div key={item}>
              <JobCard {...item} className={{ root: '' }} />
            </div>
          ))}
        </div>

        <div className='flex flex-[2] flex-col self-start rounded border border-red-300'>
          <div className='border-b-2 border-b-red-400 bg-red-200 p-4 font-semibold'>Việc làm nổi bật</div>

          <div className='p-4'>List 2 3 jobs ở đây</div>
        </div>
      </div>

      {/* <JobCarousel>
        {['1', '2', '3', '4', '5', '6', '7', '8'].map(item => (
          <CarouselSlide key={item}>
            <JobCard item={item} />
          </CarouselSlide>
        ))}
      </JobCarousel> */}
    </div>
  );
};

export default JobPage;
