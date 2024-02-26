'use client';

import TextInputDetail from '@/components/elements/formElements/TextInputDetail';
import { ActionIcon, Button, Card, Flex, Image, Modal, Text, TextInput, Tooltip } from '@mantine/core';
import { useClipboard } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconClipboardCopy, IconLink, IconTrash } from '@tabler/icons-react';
import dayjs from 'dayjs';
import { Controller, useController, useForm } from 'react-hook-form';

interface IMediaDetailProps {
  opened: boolean;
  close: () => void;
  img: any;
  control?: any;
}

const MediaDetail = (props: IMediaDetailProps) => {
  const { close, opened, img } = props || {};
  const clipboard = useClipboard({ timeout: 500 });
  const { control, handleSubmit } = useForm({ defaultValues: img || {}, mode: 'all' });

  const isNew = !!img?.id;

  const onSubmit = (body: any) => {
    if (isNew) {
      console.log('có id > update');
    } else {
      console.log('ko có id > tạo mới');
    }
    console.log(isNew)
  };

  console.log('MediaDetail', img);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Modal opened={opened} onClose={close} title='Detail Image' centered size={'xl'}>
        <Flex columnGap={16}>
          <Flex direction={'column'} className='flex-1'>
            <Card withBorder>
              <Card.Section h={52} className='bg-gray-200'>
                <Flex justify={'flex-end'} pr={12} className='h-full items-center gap-x-3'>
                  <Tooltip label='Delete'>
                    <ActionIcon variant='default' size='lg'>
                      <IconTrash color='var(--mantine-color-gray-5)' />
                    </ActionIcon>
                  </Tooltip>
                  <Tooltip label='Copy url'>
                    <ActionIcon
                      variant='default'
                      size='lg'
                      onClick={() => {
                        clipboard.copy(`http://localhost:1337${img?.url || img?.attributes?.url}`);
                        notifications.show({
                          message: 'Copied in clipboard 🤥',
                          color: 'green',
                          icon: <IconCheck color='var(--mantine-color-green-4)' />,
                        });
                      }}
                    >
                      {clipboard.copied ? (
                        <IconCheck color='var(--mantine-color-green-4)' />
                      ) : (
                        <IconClipboardCopy color='var(--mantine-color-gray-5)' />
                      )}
                    </ActionIcon>
                  </Tooltip>
                  <Tooltip label='Open in new tab'>
                    <ActionIcon
                      variant='default'
                      size='lg'
                      component='a'
                      target='_blank'
                      href={`http://localhost:1337${img?.url || img?.attributes?.url}`}
                    >
                      <IconLink color='var(--mantine-color-gray-5)' />
                    </ActionIcon>
                  </Tooltip>
                </Flex>
              </Card.Section>
              <Card.Section inheritPadding px={12}>
                <Image
                  fit='contain'
                  src={`http://localhost:1337${img?.url || img?.attributes?.url}`}
                  h={122}
                  fallbackSrc='https://placehold.co/600x400?text=Placeholder'
                />
              </Card.Section>
              <Card.Section h={52} className='bg-gray-200' />
            </Card>
          </Flex>

          <Flex className='flex-1' direction={'column'} rowGap={12}>
            <Card withBorder p={'md'} bg={'#F6F6F9'}>
              <Flex direction={'column'} rowGap={12}>
                <Text size='xs' fw={500}>
                  ASSET ID : {img?.id}
                </Text>
                <Flex justify={'space-between'} columnGap={12}>
                  <Text className='flex-1 flex-col gap-x-[2px]'>
                    <Text size='xs' fw={500}>
                      SIZE
                    </Text>
                    <Text size='xs' fw={400}>
                      {img?.size}KB
                    </Text>
                  </Text>
                  <Text className='flex-1 items-start flex-col gap-x-[2px]'>
                    <Text size='xs' fw={500}>
                      DIMENSIONS
                    </Text>
                    <Text size='xs' fw={400}>
                      {img?.width}X{img?.height}
                    </Text>
                  </Text>
                </Flex>
                <Flex justify={'space-between'} columnGap={12}>
                  <Text className='flex-1 flex-col gap-x-[2px]'>
                    <Text size='xs' fw={500}>
                      DATE
                    </Text>
                    <Text size='xs' fw={400}>
                      {dayjs(img?.createdAt).format('DD/MM/YYYY')}
                    </Text>
                  </Text>
                  <Text className='flex-1 items-start flex-col gap-x-[2px]'>
                    <Text size='xs' fw={500}>
                      EXTENSION
                    </Text>
                    <Text size='xs' fw={400}>
                      {img?.ext}
                    </Text>
                  </Text>
                </Flex>
              </Flex>
            </Card>

            <TextInput value={img?.name} label='File name' placeholder='Please input placeholder' />
            <TextInput
              value={img?.alternativeText}
              label='Alternative text'
              placeholder='This text will be displayed if the asset cant be shown'
            />
            <TextInput value={img?.caption} label='Caption' placeholder='Caption' />
            {/* <TextInputDetail control={control} label='File name' placeholder='Please input placeholder' name={'name'} />
            <TextInputDetail
              control={control}
              label='Alternative text'
              placeholder='This text will be displayed if the asset cant be shown'
              name={'alternativeText'}
            />
            <TextInputDetail control={control} label='Caption' placeholder='Caption' name={'caption'} /> */}
          </Flex>
        </Flex>

        <Flex justify={'space-between'} pt={16} columnGap={12}>
          <Button variant='default'>Cancel</Button>
          <Button onClick={handleSubmit(onSubmit)}>Finish</Button>
        </Flex>
      </Modal>
    </form>
  );
};

export default MediaDetail;
