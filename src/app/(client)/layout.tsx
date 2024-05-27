import FooterGuest from '@/components/sections/client/Footer';
import HeaderGuest from '@/components/sections/client/Header';
import React from 'react';

const GuestLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <HeaderGuest />
      <main className='mx-auto max-w-[1536px]'>{children}</main>
      <FooterGuest />
    </>
  );
};

export default GuestLayout;
