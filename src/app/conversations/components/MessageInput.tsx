'use client';

import React from 'react';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
interface MessageInputProps {
  placeholder?: string;
  id: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  className?: string;
}

const MessageInput = (props: MessageInputProps) => {
  const { errors, id, register, placeholder, required, type, className } = props || {};

  return (
    <div className={className}>
      <input
        id={id}
        type={type}
        autoComplete={id}
        {...register(id, { required })}
        placeholder={placeholder}
        className='
          text-black
          font-light
          py-2
          px-4
          bg-neutral-100 
          w-full 
          rounded-full
          focus:outline-none
        '
      />
    </div>
  );
};

export default MessageInput;
