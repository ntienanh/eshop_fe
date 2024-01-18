"use client";

import Navbar from "@/components/sections/admin/Navbar";
import { useNProgressRouter } from "@/hooks/useNProgress";
import { spotlightActions } from "@/jsons/spotlight";
import {
  ActionIcon,
  AppShell,
  Avatar,
  Badge,
  Burger,
  Flex,
  Group,
  Input,
  Kbd,
  Modal,
  Popover,
  Stack,
  Text,
  Tooltip,
  rem,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { Spotlight, spotlight } from "@mantine/spotlight";
import { MantineLogo } from "@mantinex/mantine-logo";
import {
  IconCheck,
  IconCurrentLocation,
  IconLogout,
  IconSearch,
} from "@tabler/icons-react";
import React from "react";
import classes from "./admin.module.css";
import Error from "./admin/error";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const [opened, { toggle }] = useDisclosure();
  const [changePassOpened, { open: changePassOpen, close: changePassClose }] =
    useDisclosure();
  const [popoverOpened, { toggle: popoverToggle, close: popoverClose }] =
    useDisclosure();
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
              <Modal
                opened={changePassOpened}
                onClose={changePassClose}
                title="Change password"
              >
                123
              </Modal>

              <Popover
                opened={popoverOpened}
                onClose={popoverClose}
                width={200}
                position="bottom-end"
                withArrow
                shadow="md"
              >
                <Popover.Target>
                  <Avatar
                    color="cyan"
                    radius="xl"
                    className="cursor-pointer"
                    onClick={popoverToggle}
                  >
                    <Text>Ad</Text>
                  </Avatar>
                </Popover.Target>
                <Popover.Dropdown>
                  <Stack gap={"sm"}>
                    <Text className="cursor-pointer hover:bg-slate-200 rounded p-2">
                      Profile
                    </Text>

                    <Text
                      onClick={() => {
                        changePassOpen();
                        popoverClose();
                      }}
                      className="cursor-pointer hover:bg-slate-200 rounded p-2"
                    >
                      Change Password
                    </Text>

                    <Group
                      className="cursor-pointer hover:bg-slate-200 rounded p-2 justify-between"
                      onClick={() => {
                        // signOut();
                        notifications.show({
                          message: `Logout successfully`,
                          color: "green",
                          icon: <IconCheck size="1.1rem" />,
                        });
                      }}
                    >
                      <Text c="var(--mantine-color-red-7)">Logout</Text>
                      <IconLogout color="var(--mantine-color-red-7)" />
                    </Group>
                  </Stack>
                </Popover.Dropdown>
              </Popover>
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
        <Navbar />
      </AppShell.Navbar>

      <AppShell.Main className={classes.main}>{children}</AppShell.Main>
    </AppShell>
  );
};

export default AdminLayout;
