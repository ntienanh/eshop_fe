import { Select } from '@mantine/core';
import React from 'react';
import { Control, useController } from 'react-hook-form';

interface ISelectDetailProps {
  control: Control<any, any>;
  name: string;
  label: string;
  placeholder: string;
}

const SelectDetail = (props: ISelectDetailProps) => {
  const { control, label, name, placeholder } = props || {};
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  return (
    <Select
      {...field}
      label={label}
      placeholder={placeholder}
      data={['React', 'Angular', 'Vue', 'Svelte']}
      value={field.value ?? []}
      onChange={field.onChange}
    />
  );
};

export default SelectDetail;
