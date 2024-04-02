'use client';

import React from 'react';
import axios from 'axios';
import { signIn, useSession } from 'next-auth/react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import TextInputDetail from '../TextInputDetail';
import { Button, Divider, Flex, Text } from '@mantine/core';
import AuthSocialButton from '../AuthSocialButton';
import { BsGithub, BsGoogle } from 'react-icons/bs';
import { useRouter } from 'next/navigation';
import { notifications } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';

type Variant = 'LOGIN' | 'REGISTER';

const AuthForm = () => {
  const router = useRouter();
  const [variant, setVariant] = React.useState<Variant>('LOGIN');
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

    if (variant === 'REGISTER') {
      axios
        .post('/api/register', data)
        .then(() =>
          signIn('credentials', {
            ...data,
            redirect: false,
          }),
        )
        .then(callback => {
          if (callback?.error) {
            notifications.show({
              message: `Account created fail!`,
              color: 'red',
              icon: <IconCheck size='1.1rem' />,
            });
          }

          if (callback?.ok) {
            notifications.show({
              message: `Account created successfully!`,
              color: 'green',
              icon: <IconCheck size='1.1rem' />,
            });
            router.push('/admin');
          }
        })
        .finally(() => setIsLoading(false));
    }

    if (variant === 'LOGIN') {
      signIn('credentials', {
        ...data,
        redirect: false,
      })
        .then(callback => {
          if (callback?.error) {
            notifications.show({
              message: `Account or password was wrong!`,
              color: 'red',
              icon: <IconCheck size='1.1rem' />,
            });
          }

          if (callback?.ok) {
            notifications.show({
              message: `Loggin successfully!`,
              color: 'green',
              icon: <IconCheck size='1.1rem' />,
            });
            router.push('/admin');
          }
        })
        .finally(() => setIsLoading(false));
    }
  };

  const toggleVariant = React.useCallback(() => {
    if (variant === 'LOGIN') {
      setVariant('REGISTER');
    } else {
      setVariant('LOGIN');
    }
  }, [variant]);

  const socialAction = (action: string) => {
    console.log('loggin with social');
    setIsLoading(true);
    signIn(action, {
      redirect: true,
      // Check role rồi redirect tới đâu đó
      callbackUrl: '/admin',
    })
      .then(callback => {
        if (callback?.error) {
          notifications.show({
            message: `Loggin with ${action} was wrong!`,
            color: 'red',
            icon: <IconCheck size='1.1rem' />,
          });
          router.push('/');
        }

        if (callback?.ok && !callback?.error) {
          console.log('login social success');
          notifications.show({
            message: `Loggin with ${action} successfully!`,
            color: 'green',
            icon: <IconCheck size='1.1rem' />,
          });
          router.push('/admin');
        }
      })
      .finally(() => setIsLoading(false));
  };

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
            <AuthSocialButton classNames={'w-full'} onClick={() => socialAction('github')} icon={BsGithub} />
            <AuthSocialButton onClick={() => socialAction('google')} icon={BsGoogle} />
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
