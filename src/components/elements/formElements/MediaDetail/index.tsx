import { serviceProcessor } from "@/services/servicesProcessor";
import { ServiceName } from "@/types/enum";
import { Card, Center, Flex, Image, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPhotoPlus } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Control, useController } from "react-hook-form";

interface IMediaDetailProps {
  name: string;
  control: Control<any, any>;
  // embla?: EmblaCarouselType;
  // setEmbla?: React.Dispatch<React.SetStateAction<EmblaCarouselType>>;
}

const MediaDetail = (props: IMediaDetailProps) => {
  const { control, name } = props || {};
  const [listOpened, { open: listOpen, close: onCancel }] =
    useDisclosure(false);
  const { field } = useController({ control, name });
  const { value, onChange } = field || {};

  // useQuery File
  // const fileQuery = useQuery({
  //   queryKey: [ServiceName.File],
  //   queryFn: () =>
  //     serviceProcessor({
  //       serviceName: ServiceName.File,
  //     }),
  //   staleTime: 10 * 1000,
  //   isPreviousData: true,
  // });

  // const { results } = fileQuery?.data || {};

  return (
    <div>
      {!value?.data ? (
        <Flex
          rowGap={2}
          direction={"column"}
          className="cursor-pointer"
          onClick={() => console.log("Click to dropzone")}
        >
          <Text size="sm" fw={500} pt={3}>
            {name}
          </Text>
          <Card withBorder bg={"#f6f6f9"} padding={"lg"} h={166}>
            <Flex
              direction={"column"}
              justify={"center"}
              h={"100%"}
              rowGap={12}
            >
              <Center>
                <IconPhotoPlus
                  size="2rem"
                  color="var(--mantine-color-green-8)"
                />
              </Center>

              <Center>
                <Text size="sm" fw={500} lineClamp={1}>
                  Click to add an asset or drag and drop one in this area
                </Text>
              </Center>
            </Flex>
          </Card>
        </Flex>
      ) : (
        <Flex
          rowGap={2}
          direction={"column"}
          className="cursor-pointer"
          onClick={() => console.log("Click to dropzone")}
        >
          <Text size="sm" fw={500} pt={3}>
            {name}
          </Text>
          <Card withBorder bg={"#f6f6f9"} padding={"sm"} h={166}>
            <Center h={"100%"}>
              <Image
                radius="md"
                h={"100%"}
                maw={"75%"}
                src={`http://localhost:1337${value?.data?.attributes.url}`}
                fallbackSrc="https://placehold.co/600x400?text=Placeholder"
              />
            </Center>
          </Card>
        </Flex>
      )}
    </div>
  );
};

export default MediaDetail;
