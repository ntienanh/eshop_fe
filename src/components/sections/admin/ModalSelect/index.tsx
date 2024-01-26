'use client';

import { Button, Center, Divider, Flex, Modal, ScrollArea, Stack, Tabs, Text } from '@mantine/core';
import React from 'react';
import { Control } from 'react-hook-form';
import MediaList from '../MediaList';

interface IModalSelectProps {
  onClose?: any;
  control?: Control<any, any>;
  opened: boolean;
}

const ModalSelect = (props: IModalSelectProps) => {
  const { opened, control, onClose } = props || {};
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
            <Stack mih={700}>List media img</Stack>
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
