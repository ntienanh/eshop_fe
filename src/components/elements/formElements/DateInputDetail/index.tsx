import { DateInput, DateInputProps, DateValue } from "@mantine/dates";
import dayjs from "dayjs";
import { RSC_ACTION_VALIDATE_ALIAS } from "next/dist/lib/constants";
import React from "react";
import { Control, useController } from "react-hook-form";

interface IDateInputDetailProps {
  name: string;
  control: Control<any, any>;
  label: string;
  placeholder: string;
  disabled?: boolean;
  variant?: "filled" | "unstyled";
  withAsterisk?: boolean;
  minDate?: Date;
}

const DateInputDetail = (props: IDateInputDetailProps) => {
  const {
    control,
    label,
    name,
    placeholder,
    disabled,
    variant,
    withAsterisk,
    minDate,
  } = props || {};

  const {
    field,
    fieldState: { error },
  } = useController({ name, control });
  const value = field.value ? new Date(field.value) : null;

  return (
    <DateInput
      {...field}
      label={label}
      placeholder={placeholder}
      error={!!error?.message}
      variant={variant}
      disabled={disabled}
      withAsterisk={withAsterisk}
      valueFormat="DD/MM/YYYY"
      onChange={field.onChange}
      onBlur={field.onBlur}
      value={value}
      minDate={minDate}
    />
  );
};

export default DateInputDetail;
