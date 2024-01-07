"use client";
import { useNProgress, useNProgressRouter } from "@/hooks/useNProgress";
import {
  ActionIcon,
  Button,
  Group,
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
      <p className="text-3xl">Home</p>
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
          <IconMoonStars color='var(--mantine-color-blue-7)'/>
        ) : (
          <IconSun color="var(--mantine-color-yellow-4)" />
        )}
      </ActionIcon>
    </Group>
  );
}
