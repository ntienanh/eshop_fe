'use client';
import React from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import TextInputDetail from '../TextInputDetail';
import { Button, Divider, Flex, Text } from '@mantine/core';
import AuthSocialButton from '../AuthSocialButton';
import { BsGithub, BsGoogle } from 'react-icons/bs';

type Variant = 'LOGIN' | 'REGISTER';

const AuthForm = () => {
  const [variant, setVariant] = React.useState<Variant>('REGISTER');
  const [isLoading, setIsLoading] = React.useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = data => {
    setIsLoading(true);
    console.log(data);
  };

  const toggleVariant = React.useCallback(() => {
    if (variant === 'LOGIN') {
      setVariant('REGISTER');
    } else {
      setVariant('LOGIN');
    }
  }, [variant]);

  return (
    <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
      <div
        className='
      bg-white
        px-4
        py-8
        shadow
        sm:rounded-lg
        sm:px-10
      '
      >
        <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
          {variant === 'REGISTER' && (
            <TextInputDetail
              disabled={isLoading}
              control={control}
              name='name'
              label='Name'
              placeholder='Placeholder'
            />
          )}
          <TextInputDetail
            disabled={isLoading}
            control={control}
            name='email'
            label='Email address'
            placeholder='Placeholder'
          />
          <TextInputDetail
            disabled={isLoading}
            control={control}
            name='password'
            label='Password'
            placeholder='Placeholder'
          />
          <Button disabled={isLoading} type='submit' className='text-center w-full'>
            {variant}
          </Button>
          <Divider my='xs' label='Or continue with' labelPosition='center' className='pt-2' />

          <div className='flex gap-x-4'>
            <AuthSocialButton classNames={'w-full'} onClick={() => console.log('first')} icon={BsGithub} />
            <AuthSocialButton onClick={() => console.log('second')} icon={BsGoogle} />
          </div>

          <div
            className='
            flex 
            gap-2 
            justify-center 
            text-sm 
            mt-6 
            px-2 
            text-gray-500
          '
          >
            <div>{variant === 'LOGIN' ? 'New to Messenger?' : 'Already have an account?'}</div>
            <div onClick={toggleVariant} className='underline cursor-pointer'>
              {variant === 'LOGIN' ? 'Create an account' : 'Login'}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
