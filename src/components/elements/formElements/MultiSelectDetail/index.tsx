import { MultiSelect, Select } from '@mantine/core';
import React from 'react';
import { Control, useController } from 'react-hook-form';

interface IMultiSelectDetailProps {
  control: Control<any, any>;
  name: string;
  label: string;
  placeholder: string;
  data: any[];
}

const MultiSelectDetail = (props: IMultiSelectDetailProps) => {
  const { control, label, name, placeholder, data } = props || {};
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  return (
    <MultiSelect
      {...field}
      label={label}
      placeholder={placeholder}
      data={data}
      value={field.value ?? []}
      onChange={field.onChange}
    />
  );
};

export default MultiSelectDetail;
