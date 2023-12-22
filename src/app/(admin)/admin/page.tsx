'use client'
import { Button } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import React from "react";

const AdminPage = () => {
  return (
    <div>
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
