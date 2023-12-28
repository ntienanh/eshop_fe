"use client";

import { useNProgressRouter } from "@/hooks/useNProgress";
import { ActionIcon, Box, Button, Flex, Input, Text } from "@mantine/core";
import { useDebouncedState } from "@mantine/hooks";
import {
  IconArrowLeft,
  IconFilterPlus,
  IconPlus,
  IconSearch,
  IconSettings,
} from "@tabler/icons-react";
import React from "react";

const ProductPage = () => {
  const router = useNProgressRouter();
  const [searchOpened, setSearchOpened] = React.useState(false);
  const [debouncedSearchValue, setDebouncedSearchValue] = useDebouncedState('', 300);

  return (
    <Box px={56}>
      <Flex rowGap={8} direction={"column"}>
        <Button
          className="self-start"
          variant="light"
          leftSection={<IconArrowLeft size={20} />}
          onClick={() => router.back()}
        >
          Back
        </Button>

        <Flex justify={"space-between"} align={"center"}>
          <Text className="text-3xl font-medium">Product</Text>
          <Button leftSection={<IconPlus size={20} />}>Create new entry</Button>
        </Flex>
        <Text className="text-gray-600">1 entry found</Text>
        {/* Table tool bar */}
        <Flex justify={"space-between"}>
          <Flex className="flex-1" columnGap={8}>
            {!searchOpened ? (
              <ActionIcon
                variant="default"
                size={36}
                aria-label="Searchs"
                onClick={() => setSearchOpened(true)}
              >
                <IconSearch color="var(--mantine-color-gray-5)" size={20} />
              </ActionIcon>
            ) : (
              <Input
                onChange={(e) => setDebouncedSearchValue(e.target.value)}
                onCompositionEnd={() => setDebouncedSearchValue("")}
                color="#228BE6"
                leftSection={<IconSearch size={20} />}
                placeholder="Search..."
              />
            )}
            <Button
              leftSection={<IconFilterPlus size={20} />}
              variant="default"
            >
              Filters
            </Button>
          </Flex>
          <ActionIcon variant="default" size={36} aria-label="Settings">
            <IconSettings size={20} />
          </ActionIcon>
        </Flex>

        <Box bg={"var(--mantine-color-white)"} className="rounded-sm" px={24}>
          Box
        </Box>
      </Flex>
    </Box>
  );
};

export default ProductPage;
