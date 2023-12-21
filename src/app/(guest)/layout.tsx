import React from "react";

const GuestLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <p>Header</p>
      {children}
    <p>Footer</p>
    </>
  );
};

export default GuestLayout;
