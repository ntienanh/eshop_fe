'use client';

import MediaDetail from '@/components/sections/admin/MediaDetail';
import { useNProgress, useNProgressRouter } from '@/hooks/useNProgress';
import { ServiceName } from '@/types/enum';
import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Card,
  Checkbox,
  Divider,
  Flex,
  Grid,
  Group,
  Image,
  LoadingOverlay,
  Pagination,
  Popover,
  Select,
  Stack,
  Text,
  TextInput
} from '@mantine/core';
import { useDebouncedState, useDisclosure, useLocalStorage } from '@mantine/hooks';
import { IconCaretDownFilled, IconFilter, IconPlus, IconSearch } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

const MediaPage = () => {
  useNProgress();
  const router = useNProgressRouter();
  const [opened, { open, close }] = useDisclosure(false);
  const [img, setImg] = React.useState();
  const [activePage, setActivePage] = React.useState(1);
  const [sort, setSort] = React.useState<string>('createdAt:DESC');
  const [popOpened, setPopOpened] = React.useState(false);
  const [pageSize, setPageSize] = useLocalStorage({
    key: 'pageSize',
    defaultValue: 8,
  });
  const [debouncedSearchValue, setDebouncedSearchValue] = useDebouncedState('', 400);

  const onSearching = !!debouncedSearchValue ? `&_q=${debouncedSearchValue}` : '';
  const onSort = sort ? `&sort=${sort}` : '';
  const fileApiEndPoint = `${process.env.NEXT_PUBLIC_API_URL}upload/files?pagination[page]=${activePage}&pagination[pageSize]=${pageSize}${onSearching}${onSort}&populate=*`;

  // useQuery File
  const fileQuery = useQuery({
    queryKey: [ServiceName.File, activePage, pageSize, debouncedSearchValue, sort],
    queryFn: () => fetch(fileApiEndPoint).then(res => res.json()),
    staleTime: 10 * 1000,
  });
  const result = fileQuery?.data;

  return (
    <Box px={56}>
      <LoadingOverlay
        visible={fileQuery.isFetching || fileQuery.isPending || fileQuery.isLoading || fileQuery.isRefetching}
        zIndex={1000}
        loaderProps={{ color: 'pink', type: 'bars' }}
        transitionProps={{
          transition: 'fade',
        }}
      />
      <Flex rowGap={16} direction={'column'} pt={8}>
        <Flex justify={'space-between'} align={'center'}>
          <Text className='text-3xl font-medium'>Media Library</Text>
          <Button leftSection={<IconPlus size={20} />}>Add new assets</Button>
        </Flex>

        <Flex justify={'space-between'} w={'100%'}>
          <Flex justify={'flex-start'} columnGap={8} align={'center'}>
            <ActionIcon variant='default' h={36} w={36}>
              <Checkbox />
            </ActionIcon>
            <Select
              data={[
                { label: 'Most recent uploads', value: 'createdAt:DESC' },
                { label: 'Oldest uploads', value: 'createdAt:ASC' },
                { label: 'Name ( A to Z )', value: 'name:ASC' },
                { label: 'Name ( Z to A )', value: 'name:DESC' },
                { label: 'Most recent updates', value: 'updatedAt:DESC' },
                { label: 'Oldest updates', value: 'updatedAt:ASC' },
              ]}
              defaultValue={'createdAt:DESC'}
              onChange={data => {
                setSort(data || sort);
              }}
            />
            <Button variant='default' leftSection={<IconFilter size={20} />}>
              Filters
            </Button>
          </Flex>

          <TextInput
            onChange={e => setDebouncedSearchValue(e.target.value)}
            w={250}
            leftSection={<IconSearch size={16} />}
            className='flex justify-end'
            placeholder='Search image...'
          />
        </Flex>
        <MediaDetail close={close} opened={opened} img={img} />
        <Pagination
          className='flex flex-1 justify-end'
          total={result?.meta?.pagination?.pageCount}
          value={activePage}
          onChange={setActivePage}
        />

        {fileQuery.isLoading ? (
          'Loading Skeleton'
        ) : (
          <Grid>
            {result?.data?.map((item: any, idx: any) => {
              const format = (item.name.split('.').pop() as string).toUpperCase();

              return (
                <Grid.Col key={idx} span={{ base: 12, xs: 12, lg: 3, sm: 6 }}>
                  <Card shadow='sm' radius='md' withBorder>
                    <Card.Section className='relative'>
                      <Box className='bg-transparent flex justify-center items-center' p={16}>
                        <Checkbox className='absolute top-3 left-3' />
                        <Image
                          className='cursor-pointer'
                          onClick={() => {
                            open();
                            setImg(item);
                          }}
                          fit='contain'
                          src={`http://localhost:1337${item?.url}`}
                          h={90}
                          mah={90}
                          fallbackSrc='https://placehold.co/600x400?text=Placeholder'
                        />
                      </Box>
                    </Card.Section>
                    <Divider />
                    <Flex pt={12} justify={'space-between'} columnGap={8} align={'center'} h={'100%'}>
                      <Flex direction={'column'} rowGap={2}>
                        <Text size='sm' lineClamp={1}>
                          {item.name}
                        </Text>
                        <Text size='sm' lineClamp={1}>
                          {format} - {item.width}X{item.height}
                        </Text>
                      </Flex>
                      <Badge variant='light' color='gray' size='lg' radius='sm'>
                        IMAGE
                      </Badge>
                    </Flex>
                  </Card>
                </Grid.Col>
              );
            })}
          </Grid>
        )}

        {result?.data?.length === 0 && (
          <Text tt={'uppercase'} size='lg' className='flex justify-center'>
            No image found
          </Text>
        )}

        <Flex>
          {result?.data?.length > 0 && (
            <Group>
              <Popover width={90} opened={popOpened} onClose={() => setPopOpened(false)}>
                <Popover.Target>
                  <Button
                    onClick={() => setPopOpened(true)}
                    variant='outline'
                    rightSection={<IconCaretDownFilled color='white' size='1.2rem' style={{ cursor: 'pointer' }} />}
                  >
                    {pageSize}
                  </Button>
                </Popover.Target>
                <Popover.Dropdown>
                  <Stack>
                    {[4, 8, 12].map(item => {
                      return (
                        <Button
                          key={item}
                          variant='light'
                          onClick={() => {
                            setPopOpened(false);
                            setPageSize(item);
                          }}
                        >
                          {item}
                        </Button>
                      );
                    })}
                  </Stack>
                </Popover.Dropdown>
              </Popover>
              <Text>Entries per page</Text>
            </Group>
          )}
          <Pagination
            className='flex flex-1 justify-end'
            total={result?.meta?.pagination?.pageCount}
            value={activePage}
            onChange={setActivePage}
          />
        </Flex>
      </Flex>
    </Box>
  );
};

export default MediaPage;
