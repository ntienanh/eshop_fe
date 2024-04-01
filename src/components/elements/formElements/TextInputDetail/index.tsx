'use client';
import { TextInput, TextInputProps } from '@mantine/core';
import { useController } from 'react-hook-form';

interface ITextInputDetailProps extends TextInputProps {
  name: string;
  control: any;
}

const TextInputDetail = (props: ITextInputDetailProps) => {
  const { name, control, ...rest } = props || {};

  const {
    field,
    fieldState: { error: fieldError },
  } = useController({ name, control });

  return <TextInput {...field} {...rest} error={!!fieldError} onChange={field.onChange} value={field.value || ''} />;
};

export default TextInputDetail;
