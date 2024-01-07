"use client";
import { useMantineTheme } from "@mantine/core";
import React from "react";
import { HeaderTabs } from "./home/Header/page";

const GuestLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <HeaderTabs />
    </>
  );
};

export default GuestLayout;
