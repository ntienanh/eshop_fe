'use client';

interface IMediaListProps {
  //   data: IFile[];
  data: any[];
  selectedData: any;
  onChange: (event: any) => void;
}
import { Grid } from '@mantine/core';
import MediaCard from '../MediaCard';

const MediaList = (props: IMediaListProps) => {
  const { data, onChange, selectedData } = props || {};

  console.log('data', data);
  console.log('selectedData', selectedData);
  if (Array.isArray(selectedData)) {
    return (
      <Grid pr={12}>
        {data?.map(image => {
          const checked: boolean = selectedData === image?.id;

          return (
            <Grid.Col span={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={image.id}>
              <MediaCard
                image={image}
                checked={checked}
                // onCheckboxChange={() => {
                //   onChange(checked ? selectedData?.filter(val => val !== image.id) : [...selectedData, image.id]);
                // }}
                // thay đổi giá trị selected trong RHF
                onCheckboxChange={() => {
                  // onChange(checked ?? selectedData === image.id);
                  console.log('onCheckboxChangeonCheckboxChange');
                  // onChange(selectedData === 1);
                }}
              />
            </Grid.Col>
          );
        })}
      </Grid>
    );
  }

  return (
    <Grid>
      {data?.map((image: any) => {
        return (
          <Grid.Col span={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={image.id}>
            <MediaCard
              image={image}
              checked={image.id === selectedData}
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
