"use client";

import { useNProgress, useNProgressRouter } from "@/hooks/useNProgress";
import { serviceProcessor } from "@/services/servicesProcessor";
import { HTTPMethod, ServiceName } from "@/types/enum";
import { ActionIcon, Box, Button, Flex, Stack, Text, Tooltip } from "@mantine/core";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { IconAlertCircle, IconCheck } from "@tabler/icons-react";
import {
  IconArrowLeft,
  IconEdit,
  IconPlus,
  IconSend,
  IconTrash,
} from "@tabler/icons-react";
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
  MRT_Row,
  MRT_RowSelectionState,
} from "mantine-react-table";
import { useParams } from "next/navigation";
import React from "react";

// render api fetching
const useGetProducts = () => {
  const fetchURL = new URL(
    "/api/products?populate=*",
    "http://192.168.1.184:1337"
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
  const queryClient = useQueryClient();
  const params = useParams();
  const { slug } = params || {};
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
  const { data, isError, isFetching, isLoading } = useGetProducts();

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
    renderRowActions: ({ row }) => {
      return (
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
            <ActionIcon color="red" onClick={() => openDeleteConfirmModal(row.original.id)}>
              <IconTrash />
            </ActionIcon>
          </Tooltip>
        </Flex>
      );
    },
    enableColumnFilters: false,
    state: {
      isLoading,
      showAlertBanner: isError,
      showProgressBars: isFetching,
      rowSelection,
    },
  });


  const deleteMutation = useMutation({
    mutationKey: [ServiceName.Product],
    mutationFn: async () =>
      serviceProcessor({
        serviceName: ServiceName.Product,
        method: HTTPMethod.Delete,
        options: { params: { slug } },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ServiceName.Product] });
      notifications.show({
        message: `Deleted successfully!`,
        color: "green",
        icon: <IconCheck size="1.1rem" />,
      });
    },
  });

  const openDeleteConfirmModal = (id: any) => {
    return modals.openConfirmModal({
      centered: true,
      title: 'Confirmation',
      children: (
        <Stack h={140} justify='center' align='center' bg={'var(--mantine-color-gray-2)'} mb={12}>
          <IconAlertCircle color='red' size='2.5rem' />
          <Text>Are you sure you want to delete this?</Text>
        </Stack>
      ),
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      onCancel: () => null,
      onConfirm: () => deleteMutation.mutate(id),
    });
  };

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
