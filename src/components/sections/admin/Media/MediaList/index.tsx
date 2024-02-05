'use client';

interface IMediaListProps {
  //   data: IFile[];
  data: [];
  selectedData: any;
  onChange: (event: any) => void;
}
import { Grid } from '@mantine/core';
import MediaCard from '../MediaCard';

const MediaList = (props: IMediaListProps) => {
  const { data, onChange, selectedData } = props || {};

  if (!!selectedData.length) {
    return (
      <Grid>
        {data?.map((image: any) => {
          // const checked = selectedData?.includes(image.id);
          console.log(image.id);

          console.log('selectedData', selectedData);
          console.log('image.id', image.id);

          return (
            <Grid.Col span={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={image.id}>
              <MediaCard
                image={image}
                // checked={checked}
                // onCheckboxChange={() => {
                //   onChange(checked ? selectedData?.filter(val => val !== image.id) : [...selectedData, image.id]);
                // }}
              />
            </Grid.Col>
          );
        })}
      </Grid>
    );
  }

  return (
    <Grid pr={12}>
      {data?.map(image => {
        console.log('image', image);
        const checked: boolean = selectedData === image?.id;

        console.log('checked', checked);

        return (
          <Grid.Col span={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={image.id}>
            <MediaCard
              image={image}
              checked={checked}
              // onCheckboxChange={() => {
              //   onChange(checked ? selectedData?.filter(val => val !== image.id) : [...selectedData, image.id]);
              // }}
            />
          </Grid.Col>
        );
      })}
    </Grid>
  );
};

export default MediaList;
