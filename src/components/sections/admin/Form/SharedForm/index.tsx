import { zodResolver } from "@hookform/resolvers/zod";
import {
  Badge,
  Box,
  Button,
  Card,
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
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useNProgressRouter } from "@/hooks/useNProgress";
import TextInputDetail from "@/components/elements/admin/TextInputDetail";

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
  name: z
    .string()
    .nonempty("This field is required")
    .min(2, { message: "Name should have at least 2 letters" }),
  // mssv: z.string().max(10, 'Max 10 characters').min(10, { message: 'Name should have at least 10 letters' }),
});

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
    formState: { dirtyFields, isValid, isDirty },
  } = useForm<any>({
    defaultValues: data.attributes || {},
    resolver: zodResolver(validationSchema),
  });

  const onSubmit = async (body: any) => {
    delete body.createdAt;
    delete body.updatedAt;
    delete body.createdBy;
    delete body.updatedBy;
    delete body.publishedAt;

    if (isCreate) return onCreate(body);
    return onUpdate(body);
  };

  React.useEffect(() => {
    if (data) {
      reset(data, { keepValues: true });
    }
  }, [data]);

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
          <Grid.Col p={16} span={9}>
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
              </Grid>
            </Card>
          </Grid.Col>

          <Grid.Col span={3} pt={16}>
            <Stack>
              <Text
                className={`${
                  isCreate ? "bg-green-200" : "bg-blue-200"
                } w-full rounded-md p-3`}
              >
                <strong color="red">{isCreate ? "Create" : "Detail"} version</strong>
              </Text>

              <Card>
                <Stack>
                  <Text>INFORMATION</Text>
                  <Stack>
                    <Group>
                      <Text fw={500}>Created</Text>
                      <Text>
                        {!isCreate && data
                          ? (
                              dayjs(data?.attributes?.createdAt) as any
                            ).fromNow()
                          : "-"}
                      </Text>
                    </Group>

                    <Group>
                      <Text fw={500}>Last update</Text>
                      {!isCreate && data
                        ? (dayjs(data?.attributes?.updatedAt) as any).fromNow()
                        : "-"}
                    </Group>
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
