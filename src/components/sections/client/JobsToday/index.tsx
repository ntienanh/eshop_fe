import { Box } from '@mantine/core';
import React from 'react';
import { Carousel } from '@mantine/carousel';
import CarouselBase from '@/components/elements/client/Carousel';

async function getData() {
  const res = await fetch(
    'https://api.topdev.vn/td/v2/jobs?features=superhotjob,superhotjobweb&ordering=newest_job&page_size=12&locale=en_US&fields[job]=id,company,title,skills_ids,salary,addresses,published,detail_url,slug',
  );

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  // https://api.topdev.vn/td/v2/taxonomies?fields=skills
  return res.json();
}

const JobsToday = async () => {
  const data = await getData();

  const topCompanies = data.data?.map((item: any, idx: any) => {
    const { company, title, skills_ids } = item || {};
    const { display_name, image_logo, detail_url, slug } = company || {};

    return (
      <Carousel.Slide
        className='flex flex-row justify-between items-center hover:shadow-[0_10px_30px_rgba(14,166,59,0.2)]'
        key={idx}
      >
        <div className='bg-white hover:shadow-[0_10px_30px_rgba(14,166,59,0.2)] hover:border-[#33c172] border boder-solid broder-gray-200 rounded-xl h-52 w-full flex justify-center items-center relative p-4'>
          <div className='flex flex-col gap-y-4 pt-4'>
            <img
              className='h-20 w-full object-contain px-4 cursor-pointer'
              src={image_logo}
              alt='Logo'
              // onClick={() => router.push(`/company/${item.id}`)}
            />
            <h3 className='flex text-center justify-center items-center text-[#212f3f] font-bold text-sm leading-5'>
              {display_name}
            </h3>
            {title}
            <div className='flex gap-x-4'>
              {skills_ids.map((item: any) => (
                <p>{item}</p>
              ))}
            </div>
          </div>
        </div>
      </Carousel.Slide>
    );
  });

  return (
    <section
      style={{
        background: `linear-gradient(295.89deg,#ff4b2d -101.99%,#fffdf9 102.52%)`,
      }}
      className='min-h-[332px] lg:min-h-[485px]'
    >
      <div className='py-6 container mx-auto flex flex-col gap-4 lg:gap-8'>
        <h2 className='text-xl font-bold lg:text-4xl'>
          🔥
          <span>Super hot jobs</span>
        </h2>

        <Box>
          <CarouselBase content={topCompanies} />
        </Box>
      </div>
    </section>
  );
};

export default JobsToday;
