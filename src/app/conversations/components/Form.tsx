'use client';

import useConversation from '@/hooks/useConversation';
import { IconSend2 } from '@tabler/icons-react';
import axios from 'axios';
import clsx from 'clsx';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import MessageInput from './MessageInput';

const Form = (props: any) => {
  const { conversationId } = useConversation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: { message: '' },
  });

  const onSubmit: SubmitHandler<FieldValues> = data => {
    setValue('message', '', { shouldValidate: true });
    axios.post('/api/messages', { ...data, conversationId: conversationId });
  };

  const handleUpload = (result: any) => {
    const aaa = axios.post('/api/messages', {
      image: result.info.secure_url,
      conversationId: conversationId,
    });
  };

  return (
    <div className={clsx('flex items-center gap-x-4', props?.className)}>
      {/* Can upload but is block in chorme */}
      {/* <ButtonCld onClick={handleUpload} /> */}

      <form onSubmit={handleSubmit(onSubmit)} className='flex items-center gap-2 lg:gap-4 w-full'>
        <MessageInput
          className='flex-1'
          id='message'
          register={register}
          errors={errors}
          required
          placeholder='Write a message'
        />

        <button type='submit' className='rounded-full p-2 bg-sky-500 cursor-pointer hover:bg-sky-600 transition'>
          <IconSend2 color='var(--mantine-color-white)' />
        </button>
      </form>
    </div>
  );
};

export default Form;
