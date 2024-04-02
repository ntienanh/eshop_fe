import FooterGuest from '@/components/sections/client/Footer';
import HeaderGuest from '@/components/sections/client/Header';
import React from 'react';

const ChatLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div>Left section</div>
      <main>{children}</main>
      <div>Right section</div>
    </>
  );
};

export default ChatLayout;
