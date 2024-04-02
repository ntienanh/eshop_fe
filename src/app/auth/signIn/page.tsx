import AuthForm from '@/components/elements/formElements/AuthForm';
import Image from 'next/image';
import React from 'react';

const Home = () => {
  return (
    <div className='flex flex-col gap-y-3 justify-center items-center h-lvh'>
      <Image alt='Logo' width={48} height={48} src={'/images/logo-mess.png'} />
      <h2 className='font-bold text-3xl'>Sign in to your account</h2>
      <AuthForm />
    </div>
  );
};

export default Home;
