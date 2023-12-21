import React from "react";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <p>Header Admin</p>
      {children}
      <p>Footer Admin</p>
    </>
  );
};

export default AdminLayout;
