import React from "react";

const GuestLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <p className="text-red-500">Header 1</p>
      {children}
      <p>Footer</p>
    </>
  );
};

export default GuestLayout;
