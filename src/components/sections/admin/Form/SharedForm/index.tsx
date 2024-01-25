import { zodResolver } from "@hookform/resolvers/zod";
import {
  Badge,
  Box,
  Button,
  Card,
  Divider,
  Flex,
  Grid,
  Group,
  Stack,
  Text,
} from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import dayjs from "dayjs";
import { useParams } from "next/navigation";
import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { useNProgressRouter } from "@/hooks/useNProgress";
import TextInputDetail from "@/components/elements/formElements/TextInputDetail";
import MediaDetail from "@/components/elements/formElements/MediaDetail";
import DateInputDetail from "@/components/elements/formElements/DateInputDetail";
import SelectDetail from "@/components/elements/formElements/SelectDetail";
import MultiSelectDetail from "@/components/elements/formElements/MultiSelectDetail";
import { Language } from "@/types/enum";

const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

interface IStudentFormProps {
  data: any;
  onCreate: (body: any) => void;
  onUpdate: (body: any) => void;
  onDelete?: (slug: any) => void;
  isLoading?: boolean;
}

const validationSchema = z.object({
  name: z.string().min(2, { message: "Name should have at least 2 letters" }),
  price: z.any(),
  description: z.any(),
  fromDate: z.any(),
  toDate: z.any(),
  select: z.any(),
  multiSelect: z.any(),
});

interface IProductProps {
  name: string;
  price: number;
  description: string;
  fromDate: string;
  toDate: string;
  select: string;
  multiSelect: string[];
}

const SharedForm = (props: IStudentFormProps) => {
  const params: any = useParams();
  const router = useNProgressRouter();
  const { slug } = params || {};
  const isCreate = slug === "create";

  const { onCreate, onUpdate, onDelete, isLoading, data } = props || {};

  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { isValid, isDirty },
  } = useForm<IProductProps>({
    defaultValues: data || {},
    resolver: zodResolver(validationSchema),
    mode: "all",
  });

  const onSubmit = async (body: any) => {
    delete body.createdAt;
    delete body.updatedAt;
    delete body.createdBy;
    delete body.updatedBy;
    delete body.publishedAt;

    console.log("concarete", dayjs(body.fromDate).date);

    if (isCreate) return onCreate({ data: body });
    return onUpdate({ data: body });
  };

  React.useEffect(() => {
    if (data) {
      reset(data);
    }
  }, [data]);

  const valueFromDate = watch("fromDate");

  React.useEffect(() => {
    const valueToDate = watch("toDate");
    const from = dayjs(valueFromDate);
    const to = dayjs(valueToDate);

    if (from.isAfter(to)) {
      return setValue("toDate", valueFromDate);
    }
  }, [valueFromDate]);

  if (!data && !isCreate) {
    return null;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box>
        <Button
          variant="subtle"
          leftSection={<IconArrowLeft size={20} />}
          onClick={() => router.back()}
        >
          Back
        </Button>

        <Flex justify={"space-between"} align={"center"} columnGap={12}>
          <Text fz={"1.5rem"} fw={600} className="flex-1">
            {isCreate ? "Create an entry" : data?.name}
          </Text>

          <Group>
            <Button
              type="submit"
              color="green"
              loading={isLoading}
              disabled={!isDirty && isValid}
            >
              Save
            </Button>
            {!isCreate && !!onDelete && (
              <Button type="button" color="red" onClick={() => onDelete(slug)}>
                Delete
              </Button>
            )}
          </Group>
        </Flex>

        <Grid mt={24}>
          <Grid.Col span={9}>
            <Card>
              <Grid>
                <Grid.Col span={6}>
                  <TextInputDetail
                    name={"name"}
                    control={control}
                    withAsterisk
                    label="Name"
                    placeholder="Please enter your name"
                  />
                </Grid.Col>

                <Grid.Col span={6}>
                  <TextInputDetail
                    name={"price"}
                    control={control}
                    label="price"
                    placeholder="Please enter your name"
                  />
                </Grid.Col>

                <Grid.Col span={6}>
                  <DateInputDetail
                    name="fromDate"
                    control={control}
                    label="From Date"
                    placeholder="Input Date DD/MM/YYYY"
                  />
                </Grid.Col>

                <Grid.Col span={6}>
                  <DateInputDetail
                    name="toDate"
                    control={control}
                    label="To Date"
                    placeholder="Input Date DD/MM/YYYY"
                    minDate={new Date(valueFromDate)}
                  />
                </Grid.Col>

                <Grid.Col span={6}>
                  <SelectDetail
                    name="select"
                    control={control}
                    label="Select"
                    placeholder="Input Select"
                  />
                </Grid.Col>

                <Grid.Col span={6}>
                  <MultiSelectDetail
                    name="multiSelect"
                    control={control}
                    label="Multi Select"
                    placeholder="Input Select"
                    data={[
                      { label: Language.Angular, value: "Angular" },
                      { label: Language.Css, value: "Css" },
                      { label: Language.Html, value: "Html" },
                      { label: Language.React, value: "React" },
                      { label: Language.Vue, value: "Vue" },
                    ]}
                  />
                </Grid.Col>

                <Grid.Col span={6}>
                  <TextInputDetail
                    name={"description"}
                    control={control}
                    label="description"
                    placeholder="Please enter your name"
                  />
                </Grid.Col>

                <Grid.Col span={6}>
                  <MediaDetail name="logo" control={control} />
                </Grid.Col>
              </Grid>
            </Card>
          </Grid.Col>

          <Grid.Col span={3}>
            <Stack>
              <Card
                bg={
                  isCreate
                    ? "var(--mantine-color-green-1)"
                    : "var(--mantine-color-blue-1)"
                }
                withBorder
                className={
                  isCreate
                    ? "border-green-400 flex items-center"
                    : "border-blue-400 flex items-center"
                }
              >
                <Text
                  fw={700}
                  variant="gradient"
                  gradient={{
                    from: isCreate ? "lime" : "blue",
                    to: isCreate ? "green" : "cyan",
                    deg: 300,
                  }}
                >
                  {isCreate ? "Create" : "Detail"} version
                </Text>
              </Card>

              <Card>
                <Stack>
                  <Text fw={600}>INFORMATION</Text>
                  <Divider />
                  <Stack>
                    <Flex
                      justify={"space-between"}
                      align={"center"}
                      columnGap={8}
                    >
                      <Text fw={500}>Created</Text>
                      <Text>
                        {!isCreate && data
                          ? (dayjs(data?.createdAt) as any).fromNow()
                          : "-"}
                      </Text>
                    </Flex>

                    <Flex
                      justify={"space-between"}
                      align={"center"}
                      columnGap={8}
                    >
                      <Text fw={500}>Last update</Text>
                      {!isCreate && data
                        ? (dayjs(data?.updatedAt) as any).fromNow()
                        : "-"}
                    </Flex>

                    <Flex
                      justify={"space-between"}
                      align={"center"}
                      columnGap={8}
                    >
                      <Text fw={500}>Published At</Text>
                      {!isCreate && data
                        ? (dayjs(data?.publishedAt) as any).fromNow()
                        : "-"}
                    </Flex>
                  </Stack>
                </Stack>
              </Card>
            </Stack>
          </Grid.Col>
        </Grid>
      </Box>
    </form>
  );
};

export default SharedForm;
