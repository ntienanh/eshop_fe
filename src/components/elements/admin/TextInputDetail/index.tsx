'use client';
import { TextInput } from '@mantine/core';
import {  useController } from 'react-hook-form';

interface ITextInputDetailProps {
  name: string;
  control: any;
  label: string;
  placeholder: string;
  disabled?: boolean;
  variant?: 'filled' | 'unstyled';
  withAsterisk?: boolean;
}

const TextInputDetail = (props: ITextInputDetailProps) => {
  const { name, disabled, label, placeholder, variant, withAsterisk, control } = props || {};

  const {
    field,
    fieldState: { error: fieldError },
  } = useController({ name, control });

  return (
    <TextInput
      {...field}
      placeholder={placeholder}
      label={label}
      error={!!fieldError}
      variant={variant}
      disabled={disabled}
      withAsterisk={withAsterisk}
      onChange={field.onChange}
      value={field.value || ''}
    />
  );
};

export default TextInputDetail;
