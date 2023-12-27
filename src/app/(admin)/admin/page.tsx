"use client";
import { useNProgress, useNProgressRouter } from "@/hooks/useNProgress";
import {
  Badge,
  Box,
  Button,
  Card,
  Flex,
  Grid,
  Image,
  Text,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconBrandAmongUs, IconChessKing } from "@tabler/icons-react";
import React from "react";
import CountUp from "react-countup";

const AdminPage = () => {
  useNProgress();
  const router = useNProgressRouter();

  return (
    <Box>
      <Flex direction={"column"} rowGap={16}>
        <Flex align={"center"} columnGap={12}>
          <Text className="mb-4 text-4xl">👋 Chào mừng bạn `Admin`</Text>
          <Badge variant="light" color="yellow" size="lg" radius="xs">
            Role
          </Badge>
        </Flex>
        <Grid gutter={{ base: 8 }}>
          {["1", "2", "3", "4", "5", "6"].map((item, idx) => {
            return (
              <Grid.Col key={idx} span={{ base: 12, xs: 12, lg: 4, sm: 6 }}>
                <Card
                  component="a"
                  // href={url}
                  shadow="sm"
                  padding="md"
                  radius="md"
                  withBorder
                  className="hover:bg-[#f2fbf6] cursor-pointer hover:border border-solid flex gap-x-8 items-center justify-evenly flex-row"
                >
                  <IconBrandAmongUs size={54} />
                  <div className="flex gap-y-2 flex-col items-center flex-1">
                    <CountUp key={idx} start={0} end={100} delay={0}>
                      {({ countUpRef }) => (
                        <span className="text-4xl font-bold" ref={countUpRef} />
                      )}
                    </CountUp>
                    <span className="text-base font-semibold text-gray-500">
                      {item}
                    </span>
                  </div>
                </Card>
              </Grid.Col>
            );
          })}
        </Grid>

        <Button
          className="self-start"
          variant="light"
          onClick={() => router.back()}
        >
          Back
        </Button>

        <Image
          fit="contain"
          radius="md"
          // src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-7.png"
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-10.png"
        />
      </Flex>
    </Box>
  );
};

export default AdminPage;
