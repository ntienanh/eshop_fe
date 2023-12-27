"use client";
import { Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const AdminUserPage = () => {
  async function logMovies() {
    const res = await fetch("https://provinces.open-api.vn/api/?depth=2");
    const movies = await res.json();
    return movies;
  }
  const { isPending, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () => logMovies(),
  });

  if (isPending) return "Loading...";

  return (
    <>
      <Text>API GET data all VN's province</Text>
      {data.map((item: any, idx: string) => {
        return (
          <div key={idx}>
            <p>
              {item.code} - {item.name}
            </p>
            ================================
          </div>
        );
      })}
    </>
  );
};

export default AdminUserPage;
