import { Box, Button, Card, Flex, Image, Text } from '@mantine/core';
import React from 'react';
import { Carousel } from '@mantine/carousel';
import CarouselBase from '@/components/elements/client/Carousel';

async function getJob() {
  const data = await fetch(
    'https://api.topdev.vn/td/v2/jobs?features=superhotjob,superhotjobweb&ordering=newest_job&page_size=12&locale=en_US&fields[job]=id,company,title,skills_ids,salary,addresses,published,detail_url,slug',
  );
  return data.json();
}

async function getSkills() {
  const data = await fetch('https://api.topdev.vn/td/v2/taxonomies?fields=skills');
  return data.json();
}

const JobsToday = async () => {
  const data = await getJob();
  const dataSkills = await getSkills();

  const listSkills = dataSkills?.data?.skills;

  const topCompanies = data.data?.map((item: any, idx: any) => {
    const { company, title, skills_ids } = item || {};
    const { display_name, image_logo, detail_url, slug } = company || {};

    return (
      <Carousel.Slide className='flex w-full' key={idx}>
        <Card
          shadow='sm'
          padding='lg'
          radius='md'
          withBorder
          className='flex flex-col items-center justify-center gap-y-2 py-10'
        >
          <Card.Section>
            <Image src={image_logo} h={60} alt='No way!' />
          </Card.Section>

          <Text fz={15}>{display_name}</Text>
          <Text fw={700} className='min-h-[50px] w-full'>
            {title}
          </Text>

          <Flex columnGap={4} h={'100%'} className='flex-wrap justify-center gap-y-2'>
            {listSkills
              .filter((item: any, idx: string) => skills_ids.includes(item.id))
              .map((val: any) => (
                <Button variant='default' key={item.slug}>
                  {val.text}
                </Button>
              ))}
          </Flex>
        </Card>
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
      <div className='container mx-auto flex flex-col gap-4 py-6 lg:gap-8'>
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
