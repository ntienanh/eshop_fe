"use client";
import { useNProgress, useNProgressRouter } from "@/hooks/useNProgress";
import { Button } from "@mantine/core";
import { notifications } from "@mantine/notifications";

export default function Home() {
  useNProgress();
  const router = useNProgressRouter();
  
  return (
    <>
      <p className="text-3xl">Hoome</p>
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
    </>
  );
}
