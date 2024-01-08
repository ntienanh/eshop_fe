"use client";
import { useNProgress, useNProgressRouter } from "@/hooks/useNProgress";
import {
  Accordion,
  Badge,
  Box,
  Button,
  Card,
  Flex,
  Grid,
  Image,
  List,
  Text,
} from "@mantine/core";
import { IconBrandAmongUs, IconBrandDatabricks } from "@tabler/icons-react";
import CountUp from "react-countup";

const AdminPage = () => {
  useNProgress();
  const router = useNProgressRouter();
  // const productQuery = useQuery({
  //   queryKey: [ServiceName.Product],
  //   queryFn: async () =>
  //     await serviceProcessor({
  //       serviceName: ServiceName.Product,
  //       options: { querystring: "?populate=*" },
  //     }),
  //   staleTime: 10 * 1000,
  // });

  return (
    <Box className="w-4/5 mx-[auto] my-[0]">
      <Flex direction={"column"} rowGap={16}>
        <Flex align={"flex-end"} justify={"flex-start"} columnGap={12}>
          <Flex className="text-3xl font-semibold gap-x-3">
            👋
            <Text className="text-4xl font-semibold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              Chào mừng bạn `Admin`
            </Text>
          </Flex>
          <Badge variant="light" color="yellow" size="xl" radius="xs">
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
                  className="hover:bg-[#f2fbf6] transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-102 duration-300 cursor-pointer hover:border border-solid flex gap-x-8 items-center justify-evenly flex-row"
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

        <Accordion variant="contained" defaultValue={"item1"}>
          <Accordion.Item value="item1">
            <Accordion.Control
              icon={<IconBrandDatabricks color="var(--mantine-color-blue-6)" />}
            >
              Platform
            </Accordion.Control>
            <Accordion.Panel>
              <List>
                <List.Item>Liệt kê các tech stack tại đây</List.Item>
                <List.Item>Install dependencies with yarn</List.Item>
                <List.Item>
                  To start development server run npm start command
                </List.Item>
                <List.Item>
                  Run tests to make sure your changes do not break the build
                </List.Item>
                <List.Item>Submit a pull request once you are done</List.Item>
              </List>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>

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
