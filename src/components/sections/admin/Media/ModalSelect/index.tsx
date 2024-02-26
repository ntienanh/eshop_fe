'use client';

import { ServiceName } from '@/types/enum';
import { Button, Flex, Modal, Pagination, ScrollArea, Stack, Tabs, Text } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Control, useController } from 'react-hook-form';
import MediaList from '../MediaList';

interface IModalSelectProps {
  onClose?: any;
  control?: Control<any, any>;
  opened: boolean;
  data: any[];
}

const ModalSelect = (props: IModalSelectProps) => {
  const { opened, control, onClose, data } = props || {};
  const [activePage, setActivePage] = React.useState(1);
  const { field } = useController({ control, name: 'logo' });
  const { value, onChange } = field || {};

  const fileApiEndPoint = `${process.env.NEXT_PUBLIC_API_URL}upload/files?pagination[page]=${activePage}&populate=*`;

  // useQuery File
  const fileQuery = useQuery({
    queryKey: [ServiceName.File, activePage],
    queryFn: () => fetch(fileApiEndPoint).then(res => res.json()),
    staleTime: 10 * 1000,
  });
  const result = fileQuery?.data;

  console.log('sêlecetlele', value);

  return (
    <Modal size={840} opened={opened} onClose={onClose} title='Add new assets' centered>
      <Tabs defaultValue='browse'>
        <Flex justify={'space-between'} align={'center'}>
          <Tabs.List>
            <Tabs.Tab tt={'uppercase'} value='browse'>
              Browse
            </Tabs.Tab>
            <Tabs.Tab tt={'uppercase'} value='selected'>
              Selected files
            </Tabs.Tab>
          </Tabs.List>
          <Button>Add new assets</Button>
        </Flex>

        <Tabs.Panel pt={24} value='browse'>
          <ScrollArea.Autosize mah={640} type='always' offsetScrollbars>
            <Stack mih={540}>
              <MediaList onChange={onChange} selectedData={data?.data?.id} data={result?.data} />
            </Stack>

            <Pagination
              className='flex flex-1 justify-end pt-4'
              total={result?.meta?.pagination?.pageCount}
              value={activePage}
              onChange={setActivePage}
            />
          </ScrollArea.Autosize>
        </Tabs.Panel>
        <Tabs.Panel pt={24} value='selected'>
          <ScrollArea.Autosize mah={640} type='always' offsetScrollbars>
            <Stack>
              <Text fz={14}>
                <strong>{!Array.isArray(value) ? '01' : value?.length} &nbsp;asset ready to upload</strong> Manage the
                assets before adding them to the Media Library
              </Text>
              <MediaList
                onChange={onChange}
                selectedData={data?.data?.id}
                data={result?.data?.filter(item => item.id === data?.data?.id)}
              />
            </Stack>
          </ScrollArea.Autosize>
        </Tabs.Panel>
      </Tabs>
    </Modal>
  );
};

export default ModalSelect;
