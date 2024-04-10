'use client';

import MediaDetail from '@/components/sections/admin/Media/MediaDetail';
import ModalSelect from '@/components/sections/admin/Media/ModalSelect';
import {
  ActionIcon,
  Box,
  Card,
  Center,
  Divider,
  Flex,
  Group,
  Image,
  Modal,
  Tabs,
  Text,
  Tooltip,
  useMantineColorScheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPencil, IconPhotoPlus, IconPlus, IconTrash } from '@tabler/icons-react';
import { Control, useController } from 'react-hook-form';

interface IMediaDetailProps {
  name: string;
  control: Control<any, any>;

}

const MediaFormDetail = (props: IMediaDetailProps) => {
  const { control, name } = props || {};
  const [modalOpened, { open: modalOpen, close: modalClose }] = useDisclosure(false);
  const [imgDetailOpened, { open: detailOpen, close: detailClose }] = useDisclosure(false);
  const { field } = useController({ control, name });
  const { value, onChange } = field || {};
  const { colorScheme } = useMantineColorScheme();

  // useQuery File
  // const fileQuery = useQuery({
  //   queryKey: [ServiceName.File],
  //   queryFn: () =>
  //     serviceProcessor({
  //       serviceName: ServiceName.File,
  //     }),
  //   staleTime: 10 * 1000,
  //   isPreviousData: true,
  // });

  // const { results } = fileQuery?.data || {};

  return (
    <>
      {!value?.data ? (
        <Flex rowGap={2} direction={'column'} className='cursor-pointer' onClick={modalOpen}>
          <Text size='sm' fw={500} pt={3}>
            {name}
          </Text>
          <Card withBorder padding={'lg'} h={166} bg={'var(--mantine-color-gray-2)'}>
            <Flex direction={'column'} justify={'center'} h={'100%'} rowGap={12}>
              <Center>
                <IconPhotoPlus size='2rem' color='var(--mantine-color-green-8)' />
              </Center>

              <Center>
                <Text size='sm' fw={500} lineClamp={1}>
                  Click to add an asset or drag and drop one in this area
                </Text>
              </Center>
            </Flex>
          </Card>
        </Flex>
      ) : (
        <Box className='relative'>
          <Flex rowGap={2} direction={'column'}>
            <Text size='sm' fw={500} pt={3}>
              {name}
            </Text>
            <Card withBorder bg={'var(--mantine-color-gray-2)'} padding={'sm'} h={166}>
              <Center h={'100%'}>
                <Image
                  radius='md'
                  h={'100%'}
                  maw={'75%'}
                  fit='contain'
                  src={`http://localhost:1337${value?.data?.attributes.url}`}
                  fallbackSrc='https://placehold.co/600x400?text=Placeholder'
                />
              </Center>
            </Card>
          </Flex>

          <Group className='absolute bottom-3 flex justify-center w-full px-4'>
            <Tooltip label='Add'>
              <ActionIcon color='green' variant='filled' size={'md'} onClick={modalOpen}>
                <IconPlus />
              </ActionIcon>
            </Tooltip>

            <Tooltip label={`Delete`}>
              <ActionIcon color='red' variant='filled' size={'md'} onClick={() => onChange({})}>
                <IconTrash />
              </ActionIcon>
            </Tooltip>

            <Tooltip label={`Edit`}>
              <ActionIcon color='blue' variant='filled' size={'md'} onClick={detailOpen}>
                <IconPencil />
              </ActionIcon>
            </Tooltip>
          </Group>
        </Box>
      )}

      <ModalSelect control={control} data={field.value} opened={modalOpened} onClose={modalClose} />
      <MediaDetail control={control} close={detailClose} opened={imgDetailOpened} img={value?.data} />
    </>
  );
};

export default MediaFormDetail;
