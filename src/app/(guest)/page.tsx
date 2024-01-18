"use client";
import { useNProgress, useNProgressRouter } from "@/hooks/useNProgress";
import {
  ActionIcon,
  Button,
  Grid,
  Group,
  Image,
  useComputedColorScheme,
  useMantineColorScheme,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconSun, IconMoonStars } from "@tabler/icons-react";

export default function Home() {
  useNProgress();
  const router = useNProgressRouter();
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  return (
    <Group>
      <p className="text-4xl text-red-700">Hoome</p>
      <Image
        radius="md"
        h={200}
        src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-10.png"
      />
      <Image
        radius="md"
        h={200}
        src="https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg"
      />
      <Button variant="light" onClick={() => router.push("/admin")}>
        move to admin
      </Button>
      <Button
        onClick={() =>
          notifications.show({
            title: "Default notification",
            message: "Hey there, your code is awesome! 🤥",
          })
        }
      >
        Show notification
      </Button>
      <ActionIcon
        onClick={() =>
          setColorScheme(computedColorScheme === "light" ? "dark" : "light")
        }
        variant="default"
        size="lg"
        aria-label="Toggle color scheme"
      >
        {colorScheme === "light" ? (
          <IconMoonStars color="var(--mantine-color-blue-7)" />
        ) : (
          <IconSun color="var(--mantine-color-yellow-4)" />
        )}
      </ActionIcon>
    </Group>
  );
}
