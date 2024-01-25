"use client";

import MediaDetail from "@/components/sections/admin/MediaDetail";
import { useNProgress, useNProgressRouter } from "@/hooks/useNProgress";
import { serviceProcessor } from "@/services/servicesProcessor";
import { ServiceName } from "@/types/enum";
import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Card,
  Checkbox,
  CloseButton,
  Divider,
  Flex,
  Grid,
  Image,
  Input,
  Select,
  Text
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconFilter,
  IconPlus,
  IconSearch
} from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const MediaPage = () => {
  useNProgress();
  const router = useNProgressRouter();
  const [opened, { open, close }] = useDisclosure(false);
  const [img, setImg] = React.useState();

  // useQuery File
  const fileQuery = useQuery({
    queryKey: [ServiceName.File],
    queryFn: () =>
      serviceProcessor({
        serviceName: ServiceName.File,
      }),
    staleTime: 10 * 1000,
    // isPreviousData: true,
  });

  const result = fileQuery?.data || [];

  return (
    <Box px={56}>
      <Flex rowGap={8} direction={"column"} pt={12}>
        <Flex justify={"space-between"} align={"center"}>
          <Text className="text-3xl font-medium">Media Library</Text>
          <Button leftSection={<IconPlus size={20} />}>Add new assets</Button>
        </Flex>

        <Flex justify={"space-between"} w={"100%"} pt={20}>
          <Flex justify={"flex-start"} columnGap={8} align={"center"}>
            <ActionIcon variant="default" h={36} w={36}>
              <Checkbox />
            </ActionIcon>
            <Select
              data={[
                { label: "Most recent uploads", value: "1" },
                { label: "Oldest uploads", value: "2" },
                { label: "Name ( A to Z )", value: "3" },
                { label: "Name ( Z to A )", value: "4" },
                { label: "Most recent updates", value: "5" },
                { label: "Oldest updates", value: "6" },
              ]}
              defaultValue="1"
            />
            <Button variant="default" leftSection={<IconFilter size={20} />}>
              Filters
            </Button>
          </Flex>

          <Input
            w={250}
            leftSection={<IconSearch size={16} />}
            className="flex justify-end"
            placeholder="Search image..."
            rightSection={
              <CloseButton
                aria-label="Clear input"
                // onClick={() => setValue("")}
                // style={{ display: value ? undefined : "none" }}
              />
            }
          />
        </Flex>

        <MediaDetail close={close} opened={opened} img={img} />

        <Grid pt={20}>
          {result?.map((item: any, idx: any) => {
            const format = (item.name.split(".").pop() as string).toUpperCase();

            return (
              <Grid.Col key={idx} span={{ base: 12, xs: 12, lg: 3, sm: 6 }}>
                <Card shadow="sm" radius="md" withBorder>
                  <Card.Section className="relative">
                    <Box
                      className="bg-transparent flex justify-center items-center"
                      p={16}
                    >
                      <Checkbox className="absolute top-3 left-3" />
                      <Image
                      className="cursor-pointer"
                        onClick={() => {
                          open();
                          setImg(item);
                        }}
                        fit="contain"
                        src={`http://localhost:1337${item?.url}`}
                        h={142}
                        fallbackSrc="https://placehold.co/600x400?text=Placeholder"
                      />
                    </Box>
                  </Card.Section>
                  <Divider />
                  <Flex
                    pt={12}
                    justify={"space-between"}
                    columnGap={8}
                    align={"center"}
                    h={"100%"}
                  >
                    <Flex direction={"column"} rowGap={2}>
                      <Text size="sm">{item.name}</Text>
                      <Text size="sm">
                        {format} - {item.width}X{item.height}
                      </Text>
                    </Flex>
                    <Badge variant="light" color="gray" size="lg" radius="sm">
                      IMAGE
                    </Badge>
                  </Flex>
                </Card>
              </Grid.Col>
            );
          })}
        </Grid>
      </Flex>
    </Box>
  );
};

export default MediaPage;
