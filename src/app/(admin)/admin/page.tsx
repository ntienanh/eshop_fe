'use client';

import { listTech } from '@/jsons/listTech';
import { Accordion, Badge, Box, Card, Flex, Grid, Image, List, ListItem, Text, ThemeIcon, rem } from '@mantine/core';
import { IconInbox } from '@tabler/icons-react';
import {
  IconBrandAmongUs,
  IconBrandDatabricks,
  IconBuilding,
  IconChartArrowsVertical,
  IconCircleCheck,
  IconFileTypography,
  IconMapPin,
  IconSquareRoundedLetterS,
} from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import CountUp from 'react-countup';

const AdminPage = () => {
  const [count, setCount] = React.useState<any[]>([]);

  const companiesData = useQuery({
    queryKey: ['companies'],
    queryFn: () => axios.get('http://localhost:1337/api/companies?populate=*').then(res => res.data),
  });
  const skillsData = useQuery({
    queryKey: ['skills'],
    queryFn: () => axios.get('http://localhost:1337/api/skills?populate=*').then(res => res.data),
  });
  const levelsData = useQuery({
    queryKey: ['levels'],
    queryFn: () => axios.get('http://localhost:1337/api/levels?populate=*').then(res => res.data),
  });
  const typesData = useQuery({
    queryKey: ['types'],
    queryFn: () => axios.get('http://localhost:1337/api/types?populate=*').then(res => res.data),
  });
  const locationData = useQuery({
    queryKey: ['locations'],
    queryFn: () => axios.get('http://localhost:1337/api/locations?populate=*').then(res => res.data),
  });
  const postsData = useQuery({
    queryKey: ['posts'],
    queryFn: () => axios.get('http://localhost:1337/api/posts?populate=*').then(res => res.data),
  });

  const countData = (res: any, title: string, icon: any) => ({
    count: res?.data?.data?.length,
    title: title,
    icon: icon,
  });

  return (
    <Box className='mx-[auto] my-[0] w-4/5'>
      <Flex direction={'column'} rowGap={16}>
        <Flex align={'flex-end'} justify={'flex-start'} columnGap={12}>
          <Flex className='gap-x-3 text-3xl font-semibold'>
            👋
            <Text className='bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-4xl font-semibold text-transparent'>
              Chào mừng bạn `Admin`
            </Text>
          </Flex>
          <Badge variant='light' color='yellow' size='xl' radius='xs'>
            Role
          </Badge>
        </Flex>

        <Grid gutter={{ base: 8 }}>
          {[
            countData(companiesData, 'Companies', IconBuilding),
            countData(skillsData, 'Skills', IconSquareRoundedLetterS),
            countData(levelsData, 'Levels', IconChartArrowsVertical),
            countData(locationData, 'Locations', IconMapPin),
            countData(typesData, 'Job-type', IconFileTypography),
            countData(postsData, 'Post', IconInbox),
          ].map((item, idx) => {
            const { icon: Icon } = item || {};

            return (
              <Grid.Col key={idx} span={{ base: 12, xs: 12, lg: 4, sm: 6 }}>
                <Card
                  component='a'
                  // href={url}
                  shadow='sm'
                  padding='md'
                  radius='md'
                  withBorder
                  className='delay-50 hover:scale-102 flex cursor-pointer flex-row items-center justify-evenly gap-x-8 border-solid transition duration-300 ease-in-out hover:-translate-y-1 hover:border hover:bg-[#f2fbf6]'
                >
                  <Icon size={54} className='text-gray-400' />
                  <div className='flex flex-1 flex-col items-center gap-y-2'>
                    <CountUp key={idx} start={0} end={item.count} delay={0}>
                      {({ countUpRef }) => <span className='text-4xl font-bold' ref={countUpRef} />}
                    </CountUp>
                    <span className='text-base font-semibold uppercase text-gray-500'>{item.title}</span>
                  </div>
                </Card>
              </Grid.Col>
            );
          })}
        </Grid>

        <Accordion variant='contained' defaultValue={'item1'}>
          <Accordion.Item value='item1'>
            <Accordion.Control icon={<IconBrandDatabricks color='var(--mantine-color-blue-6)' />}>
              <Text tt='uppercase' fw={700}>
                TechStack - Libraries
              </Text>
            </Accordion.Control>
            <Accordion.Panel>
              <List
                icon={
                  <ThemeIcon color='teal' size={24} radius='xl'>
                    <IconCircleCheck style={{ width: rem(16), height: rem(16) }} />
                  </ThemeIcon>
                }
              >
                {listTech.map((item, idx) => (
                  <ListItem key={idx}>
                    {item.name} -{' '}
                    <Text component='a' href={item.link} td={'underline'} className='text-blue-500' target='_blank'>
                      {item.link}
                    </Text>
                  </ListItem>
                ))}
              </List>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>

        <Image
          fit='contain'
          radius='md'
          src='https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-10.png'
        />
      </Flex>
    </Box>
  );
};

export default AdminPage;
