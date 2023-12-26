"use client";

import AdminNavbar from "@/components/sections/admin/Navbar";
import { useNProgressRouter } from "@/hooks/useNProgress";
import { spotlightActions } from "@/jsons/spotlight";
import {
  ActionIcon,
  AppShell,
  Avatar,
  Badge,
  Burger,
  Button,
  Flex,
  Group,
  Input,
  Kbd,
  Skeleton,
  Text,
  Tooltip,
  rem,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Spotlight, spotlight } from "@mantine/spotlight";
import { MantineLogo } from "@mantinex/mantine-logo";
import { IconSearch, IconCurrentLocation } from "@tabler/icons-react";
import React from "react";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const [opened, { toggle }] = useDisclosure();
  const router = useNProgressRouter();
  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Flex px="md" h={"100%"} align={"center"}>
          <Group h="100%" px="md">
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
            <MantineLogo size={30} />
            <Badge radius="sm" size="lg" color="var(--mantine-color-blue-7)">
              ADMIN
            </Badge>
            <Tooltip label="Mở website">
              <ActionIcon variant="subtle" onClick={() => router.push("/")}>
                <IconCurrentLocation stroke={1.5} />
              </ActionIcon>
            </Tooltip>
          </Group>

          <Flex justify={"flex-end"} className="flex-1">
            <Group>
              <Input
                readOnly
                onClick={spotlight.open}
                w={200}
                leftSection={<IconSearch size={16} />}
                placeholder="Tìm kiếm..."
                rightSectionWidth={60}
                rightSection={
                  <>
                    <Kbd>⌘</Kbd>+ <Kbd>K</Kbd>
                  </>
                }
              />
              <Avatar color="cyan" radius="xl">
                <Text>Ad</Text>
              </Avatar>
            </Group>
          </Flex>
        </Flex>
        <Spotlight
          actions={spotlightActions}
          nothingFound="Nothing found..."
          highlightQuery
          limit={7}
          searchProps={{
            leftSection: (
              <IconSearch
                style={{ width: rem(20), height: rem(20) }}
                stroke={1.5}
              />
            ),
            placeholder: "Search...",
          }}
        />
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <AdminNavbar />
        {/* {Array(10)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} h={28} mt="sm" animate={false} />
          ))} */}
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
};

export default AdminLayout;
