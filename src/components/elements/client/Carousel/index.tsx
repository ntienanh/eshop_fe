'use client';
import { Carousel } from '@mantine/carousel';
import React from 'react';
import Autoplay from 'embla-carousel-autoplay';

interface ICarouselBaseProps {
  content: any;
}

const CarouselBase = (props: ICarouselBaseProps) => {
  const { content } = props || {};
  const autoplay = React.useRef(Autoplay({ delay: 2000 }));

  return (
    <Carousel
      slideSize='33%'
      slideGap='xl'
      align='start'
      loop
      withIndicators
      mx={'auto'}
      slidesToScroll={4}
      plugins={[autoplay?.current]}
      onMouseEnter={autoplay?.current?.stop}
      onMouseLeave={autoplay?.current?.reset}
    >
      {content}
    </Carousel>
  );
};

export default CarouselBase;
