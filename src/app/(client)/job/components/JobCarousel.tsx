'use client';

import { Carousel } from '@mantine/carousel';
import Autoplay from 'embla-carousel-autoplay';
import React from 'react';

const JobCarousel = (props: any) => {
  const { children } = props;
  const autoplay = React.useRef(Autoplay({ delay: 3000 } as any));

  return (
    <Carousel
      loop
      slideSize={{ base: '100%', sm: '50%', md: '33.33333%', lg: '25%' }}
      align={'start'}
      plugins={[autoplay.current]}
      onMouseEnter={autoplay.current.stop}
      onMouseLeave={autoplay.current.reset}
      dragFree
      nextControlProps={{ 'aria-label': 'product next button' }}
      previousControlProps={{ 'aria-label': 'product prev button' }}
    >
      {children}
    </Carousel>
  );
};

export default JobCarousel;
