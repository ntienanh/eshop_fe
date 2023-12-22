"use client";
import { Button } from "@mantine/core";
import { notifications } from "@mantine/notifications";

export default function Home() {
  return (
    <>
      <p className="text-3xl">Hoome</p>
      <Button variant="light">Button</Button>
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
    </>
  );
}
