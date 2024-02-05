'use client';

import { Button, Center, Divider, Flex, Modal, Pagination, ScrollArea, Stack, Tabs, Text } from '@mantine/core';
import React from 'react';
import { Control } from 'react-hook-form';
import MediaList from '../MediaList';
import { useQuery } from '@tanstack/react-query';
import { ServiceName } from '@/types/enum';

interface IModalSelectProps {
  onClose?: any;
  control?: Control<any, any>;
  opened: boolean;
  data: any[];
}

const ModalSelect = (props: IModalSelectProps) => {
  const { opened, control, onClose,data } = props || {};
  const [activePage, setActivePage] = React.useState(1);

  const fileApiEndPoint = `${process.env.NEXT_PUBLIC_API_URL}upload/files?pagination[page]=${activePage}&populate=*`;

  // useQuery File
  const fileQuery = useQuery({
    queryKey: [ServiceName.File, activePage],
    queryFn: () => fetch(fileApiEndPoint).then(res => res.json()),
    staleTime: 10 * 1000,
  });
  const result = fileQuery?.data;

  // console.log('ModalSelect all data', result);
  // console.log(' ModalSelect data selected', data);

  // console.log(data)

  return (
    <Modal size={830} opened={opened} onClose={onClose} title='Add new assets' centered>
      <Tabs defaultValue='browse'>
        <Flex justify={'space-between'} align={'center'}>
          <Tabs.List>
            <Tabs.Tab value='browse'>First tab</Tabs.Tab>
            <Tabs.Tab value='selected'>Second tab</Tabs.Tab>
          </Tabs.List>
          <Button>Add new assets</Button>
        </Flex>

        <Tabs.Panel pt={24} value='browse'>
          <ScrollArea.Autosize mah={640} type='always' offsetScrollbars>
            <Stack mih={700}>
              <MediaList onChange={() => null} selectedData={data?.data?.id} data={result?.data} />
              <Pagination
                className='flex flex-1 justify-end'
                total={result?.meta?.pagination?.pageCount}
                value={activePage}
                onChange={setActivePage}
              />
            </Stack>
          </ScrollArea.Autosize>
        </Tabs.Panel>
        <Tabs.Panel pt={24} value='selected'>
          <ScrollArea.Autosize mah={640} type='always' offsetScrollbars>
            <Stack>
              <Text fz={14}>
                {/* {value?.length} */}
                <strong>asset ready to upload</strong> Manage the assets before adding them to the Media Library
              </Text>
              {/* <MediaList onChange={onChange} selectedData={data?.map(item => item.id)} data={data} /> */}
              <MediaList onChange={() => null} selectedData={[]} data={[]} />
            </Stack>
          </ScrollArea.Autosize>
        </Tabs.Panel>
      </Tabs>
    </Modal>
  );
};

export default ModalSelect;
