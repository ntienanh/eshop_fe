'use client'
import { useNProgress, useNProgressRouter } from "@/hooks/useNProgress";
import { Button } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import React from "react";

const AdminPage = () => {
  useNProgress();
  const router = useNProgressRouter();

  return (
    <div>
      <Button onClick={()=>router.back()}>Back</Button>
      AdminPage
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
    </div>
  );
};

export default AdminPage;
