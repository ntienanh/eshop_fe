import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Flex, Grid, Group, Stack, Text } from "@mantine/core";
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
    console.log("onSubmit", body);
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

        <Group>
          <Text fz={"1.5rem"} fw={600}>
            {isCreate ? "Create an entry" : data?.attributes?.name}
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
        </Group>

        <Grid mt={24} pl={8} pr={8}>
          <Grid.Col p={16} span={10}>
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
          </Grid.Col>

          <Grid.Col
            ml={24}
            p={0}
            span={2}
            //    sx={{ borderRadius: 4 }}
          >
            <Stack>
              <Group
                // position="center"
                p={12}
                // sx={{
                //   backgroundColor: isCreate ? "#EAFBE7" : "#EAF5FF",
                //   border: isCreate ? "2px solid #C6F0C2" : "2px solid #B8E1FF",
                //   borderRadius: 4,
                // }}
              >
                <Text color={isCreate ? "green" : "blue"}>
                  <strong>{isCreate ? "Create" : "Detail"} version</strong>
                </Text>
              </Group>
              <Box p={16} className="bg-white rounded">
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
              </Box>
            </Stack>
          </Grid.Col>
        </Grid>
      </Box>
    </form>
  );
};

export default SharedForm;
