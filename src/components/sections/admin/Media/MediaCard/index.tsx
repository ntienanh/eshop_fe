'use client';

import { Box, Card, Checkbox, Divider, Flex, Image, Text } from '@mantine/core';
import React from 'react';

interface IMediaCardProps {
  image?: any;
  onDelete?: () => void;
  onCheckboxChange?: any;
  checked?: boolean;
  disabled?: boolean;
}

const MediaCard = (props: IMediaCardProps) => {
  const { url, name, width, height, checked } = props?.image || {};
  console.log('checked', checked);

  return (
    <Card shadow='sm' radius='md' withBorder>
      <Card.Section className='relative'>
        <Box className='bg-transparent flex justify-center items-center' p={16}>
          <Checkbox className='absolute top-3 left-3' checked={false} />
          <Image
            className='cursor-pointer'
            // onClick={() => {
            //   // open();
            //   // setImg(item);
            // }}
            fit='contain'
            src={`http://localhost:1337${url}`}
            h={60}
            mah={60}
            fallbackSrc='https://placehold.co/600x400?text=Placeholder'
          />
        </Box>
      </Card.Section>
      <Divider />
      <Flex pt={12} justify={'space-between'} columnGap={8} align={'center'} h={'100%'}>
        <Flex direction={'column'} rowGap={2}>
          <Text size='sm' lineClamp={1} w={150}>
            {name}
          </Text>
          <Text size='sm' lineClamp={1}>
            {width}X{height}
          </Text>
        </Flex>
      </Flex>
    </Card>
  );
};

export default MediaCard;
