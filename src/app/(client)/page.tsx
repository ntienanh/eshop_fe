'use client';

import JobsToday from '@/components/sections/client/JobsToday';
import { JobType } from '@/types/enum';
import { Badge, Box, Button, Flex, Input, MultiSelect, Select, Text } from '@mantine/core';
import { IconFilterX } from '@tabler/icons-react';

const dataLocation = [
  { label: 'All Locations', value: 'all' },
  { label: 'Hồ Chí Minh', value: 'hochiminh' },
  { label: 'Hà Nội', value: 'hanoi' },
  { label: 'Đà Nẵng', value: 'danang' },
  { label: 'Cần Thơ', value: 'cantho' },
];

const dataLevels = [
  { label: 'All Levels', value: 'all' },
  { label: 'Hồ Chí Minh', value: 'hochiminh' },
  { label: 'Hà Nội', value: 'hanoi' },
  { label: 'Đà Nẵng', value: 'danang' },
  { label: 'Cần Thơ', value: 'cantho' },
];

const dataTypes = [
  { label: JobType.Office, value: 'office' },
  { label: JobType.Hybird, value: 'hybird' },
  { label: JobType.Remote, value: 'remote' },
];

const dataContracts = [
  { label: 'Fulltime', value: 'fulltime' },
  { label: 'Part-time', value: 'parttime' },
  { label: 'Freelance', value: 'freelance' },
];

export default function Home() {
  return (
    <Box>
      <div
        className='h-auto w-full bg-no-repeat py-8'
        style={{
          backgroundImage: `url("https://c.topdevvn.com/v4/assets/images/bg-search.jpg")`,
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className='mx-auto max-w-[1536px] px-4'>
          <div className=' flex  items-center gap-x-2 '>
            <Text fz={25} fw={500}>
              Search your
            </Text>

            <Badge color='#DD3F24' size='xl' radius='xs'>
              Anyt IT Job you want
            </Badge>
          </div>
        </div>

        {/* Form */}
        <div className='mx-auto flex max-w-[1536px] flex-col gap-y-4 px-4 pt-5'>
          <Input
            className='flex-1 shadow-[2px_6px_22px_0px_rgba(0,0,0,0.45)]'
            size='xl'
            placeholder='Search by Skills, Position, Company,...'
            rightSection={
              <Button color='#DD3F24' className='pointer-events-auto mr-3 hover:cursor-pointer' size='lg'>
                Search
              </Button>
            }
            rightSectionPointerEvents='auto'
            rightSectionWidth={140}
          />

          {/* <Box className='flex flex-1 items-center justify-between gap-x-3'>
            <Select
              className='flex-1'
              size='lg'
              placeholder='Locations'
              defaultValue={dataLocation[0].value}
              data={dataLocation}
            />

            <MultiSelect
              className='flex-1'
              size='lg'
              placeholder='Levels'
              defaultValue={[dataLevels[0].value]}
              data={dataLevels}
            />

            <MultiSelect
              className='flex-1'
              size='lg'
              placeholder='Job types'
              defaultValue={[dataTypes[0].value]}
              data={dataTypes}
            />
            <Button
              color='var(--mantine-color-gray-7)                                     '
              size='lg'
              leftSection={<IconFilterX />}
            >
              Clear filter
            </Button>
          </Box> */}
        </div>

        <Flex align={'start'} columnGap={8} className='mx-auto max-w-[1536px] px-4 pt-6'>
          <div className='text-[20px] font-semibold'>Suggested keywords:</div>
          <Button variant='default'>Java</Button>
          <Button variant='default'>C++</Button>
          <Button variant='default'>Javascript</Button>
          <Button variant='default'>UI/UX</Button>
          <Button variant='default'>C#</Button>
          <Button variant='default'>Fresher</Button>
          <Button variant='default'>Python</Button>
          <Button variant='default'>PHP</Button>
          <Button variant='default'>Mobile</Button>
        </Flex>
      </div>

      <JobsToday />
    </Box>
  );
}
