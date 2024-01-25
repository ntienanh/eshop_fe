'use client';
import { useNProgress, useNProgressRouter } from '@/hooks/useNProgress';
import {
  Accordion,
  Badge,
  Box,
  Button,
  Card,
  Flex,
  Grid,
  Image,
  List,
  ListItem,
  Text,
  ThemeIcon,
  rem,
} from '@mantine/core';
import { IconBrandAmongUs, IconBrandDatabricks, IconCircleCheck } from '@tabler/icons-react';
import CountUp from 'react-countup';

const AdminPage = () => {
  useNProgress();
  const router = useNProgressRouter();

  // const productQuery = useQuery({
  //   queryKey: [ServiceName.Product],
  //   queryFn: async () =>
  //     await serviceProcessor({
  //       serviceName: ServiceName.Product,
  //       options: { querystring: "?populate=*" },
  //     }),
  //   staleTime: 10 * 1000,
  // });
  const listTech = [
    { name: 'Nextjs 14 - App router', link: 'https://nextjs.org/docs' },
    { name: 'React 18', link: 'https://react.dev/learn' },
    { name: 'Mantine - V7', link: 'https://mantine.dev/' },
    { name: 'Tanstack - V5', link: 'https://tanstack.com/query/latest/docs/react/overview' },
    { name: 'Tailwindcss - V3', link: 'https://tailwindcss.com/docs/installation' },
    { name: 'clsx', link: 'https://www.npmjs.com/package/clsx' },
    { name: 'dayjs', link: 'https://www.npmjs.com/package/dayjs' },
    { name: 'mantine-react-table', link: 'https://v2.mantine-react-table.com/' },
    { name: 'rettier-plugin-organize-imports', link: 'https://www.npmjs.com/package/prettier-plugin-organize-imports' },
    { name: 'react-countup', link: 'https://www.npmjs.com/package/react-countup' },
    { name: 'zod', link: 'https://zod.dev/' },
    { name: 'react-hook-form - v7', link: 'https://react-hook-form.com/get-started' },
  ];

  return (
    <Box className='w-4/5 mx-[auto] my-[0]'>
      <Flex direction={'column'} rowGap={16}>
        <Flex align={'flex-end'} justify={'flex-start'} columnGap={12}>
          <Flex className='text-3xl font-semibold gap-x-3'>
            👋
            <Text className='text-4xl font-semibold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent'>
              Chào mừng bạn `Admin`
            </Text>
          </Flex>
          <Badge variant='light' color='yellow' size='xl' radius='xs'>
            Role
          </Badge>
        </Flex>
        <Grid gutter={{ base: 8 }}>
          {['1', '2', '3', '4', '5', '6'].map((item, idx) => {
            return (
              <Grid.Col key={idx} span={{ base: 12, xs: 12, lg: 4, sm: 6 }}>
                <Card
                  component='a'
                  // href={url}
                  shadow='sm'
                  padding='md'
                  radius='md'
                  withBorder
                  className='hover:bg-[#f2fbf6] transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-102 duration-300 cursor-pointer hover:border border-solid flex gap-x-8 items-center justify-evenly flex-row'
                >
                  <IconBrandAmongUs size={54} />
                  <div className='flex gap-y-2 flex-col items-center flex-1'>
                    <CountUp key={idx} start={0} end={100} delay={0}>
                      {({ countUpRef }) => <span className='text-4xl font-bold' ref={countUpRef} />}
                    </CountUp>
                    <span className='text-base font-semibold text-gray-500'>{item}</span>
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
