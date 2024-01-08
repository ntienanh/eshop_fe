"use client";

import { useNProgress, useNProgressRouter } from "@/hooks/useNProgress";
import { ActionIcon, Box, Button, Flex, Text, Tooltip } from "@mantine/core";
import { modals } from "@mantine/modals";
import {
  IconArrowLeft,
  IconEdit,
  IconPlus,
  IconSend,
  IconTrash,
} from "@tabler/icons-react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
  MRT_Row,
  MRT_RowSelectionState,
} from "mantine-react-table";
import React from "react";

// render api fetching
const useGetProducts = ({
  columnFilterFns,
  columnFilters,
  globalFilter,
  sorting,
  pagination,
}: any) => {
  const fetchURL = new URL(
    "/api/products?populate=*",
    "http://192.168.1.169:1337"
  );

  return useQuery({
    queryKey: ["users", fetchURL.href], //refetch whenever the URL changes (columnFilters, globalFilter, sorting, pagination)
    queryFn: () => fetch(fetchURL.href).then((res) => res.json()),
    placeholderData: keepPreviousData, //useful for paginated queries by keeping data from previous pages on screen while fetching the next page
    staleTime: 30_000, //don't refetch previously viewed pages until cache is more than 30 seconds old
  });
};

const ProductPage = () => {
  useNProgress();
  const router = useNProgressRouter();
  const [rowSelection, setRowSelection] = React.useState<MRT_RowSelectionState>(
    {}
  );

  const columns = React.useMemo<MRT_ColumnDef<any>[]>(
    () => [
      { accessorKey: "id", header: "Id", maxSize: 60, enableHiding: false },
      { accessorKey: "name", header: "Name", size: 60, enableHiding: false },
      { accessorKey: "price", header: "Price", size: 50 },
      {
        accessorKey: "description",
        header: "Description",
        size: 300,
        maxSize: 400,
        Cell: ({ row }) => (
          <Text lineClamp={2}>{row.original.description}</Text>
        ),
      },
      {
        accessorKey: "createdAt",
        header: "Created At",
        Cell: ({ row }) => {
          const day = row.original.createdAt;
          return <Text>{dayjs(day).format("DD/MM/YYYY")}</Text>;
        },
        size: 120,
      },
      {
        accessorKey: "updatedAt",
        header: "Updated At",
        Cell: ({ row }) => {
          const day = row.original.createdAt;
          return <Text>{dayjs(day).format("DD/MM/YYYY")}</Text>;
        },
        size: 120,
      },
      {
        accessorKey: "publishedAt",
        header: "Published At",
        Cell: ({ row }) => {
          const day = row.original.createdAt;
          return <Text>{dayjs(day).format("DD/MM/YYYY")}</Text>;
        },
        size: 120,
      },
    ],
    []
  );

  // loading data
  const { data, isError, isFetching, isLoading, refetch } = useGetProducts({
    // globalFilter,
    // pagination,
    // sorting,
  });

  const fetchedUsers = data?.data ?? [];
  // const totalRowCount = data?.meta?.totalRowCount ?? 0;

  const productData = React.useMemo(() => {
    return fetchedUsers?.map((item: any) => {
      const { attributes, ...rest } = item || {};
      return { ...rest, ...attributes };
    });
  }, [fetchedUsers]);

  const table = useMantineReactTable({
    columns,
    data: productData,
    enableFullScreenToggle: false,
    // tắt DensityToggle và set init size md
    enableDensityToggle: false,
    enableSorting: true,
    initialState: { density: "md" },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    // add row actions for edit or del row
    enableRowActions: true,
    positionActionsColumn: "last",
    renderRowActions: ({ row, cell, table }) => (
      <Flex columnGap={8}>
        <Tooltip label="Update">
          <ActionIcon
            color="blue"
            onClick={() => router.push(`/admin/product/${row.original.id}`)}
          >
            <IconEdit />
          </ActionIcon>
        </Tooltip>

        <Tooltip label="Delete">
          <ActionIcon color="red" onClick={() => openDeleteConfirmModal(row)}>
            <IconTrash />
          </ActionIcon>
        </Tooltip>
      </Flex>
    ),
    enableColumnFilters: false,
    state: {
      isLoading,
      showAlertBanner: isError,
      showProgressBars: isFetching,
      rowSelection,
    },
  });

  const openDeleteConfirmModal = (row: MRT_Row<any>) =>
    modals.openConfirmModal({
      title: "Are you sure you want to delete this user?",
      children: (
        <Text>
          Are you sure you want to delete {row.original.firstName}{" "}
          {row.original.lastName}? This action cannot be undone.
        </Text>
      ),
      labels: { confirm: "Delete", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onConfirm: () => console.log("delete success"),
      centered: true,
    });

  return (
    <Box px={56}>
      <Flex rowGap={8} direction={"column"}>
        <Flex justify={"space-between"} align={"center"}>
          <Text className="text-3xl font-medium">Products</Text>
          <Button
            leftSection={<IconPlus size={20} />}
            onClick={() => router.push("/admin/product/create")}
          >
            Create new entry
          </Button>
        </Flex>

        <MantineReactTable table={table} />
      </Flex>
    </Box>
  );
};

export default ProductPage;
