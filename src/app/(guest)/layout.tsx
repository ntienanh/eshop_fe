"use client";
import { useMantineTheme } from "@mantine/core";
import React from "react";
import  { Header } from "./home/Header/page";

const GuestLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      {children}
      <p>Footer</p>
    </>
  );
};

export default GuestLayout;
