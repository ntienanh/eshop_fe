"use client";

import { useNProgress, useNProgressRouter } from "@/hooks/useNProgress";
import { serviceProcessor } from "@/services/servicesProcessor";
import { HTTPMethod, ServiceName } from "@/types/enum";
import {
  ActionIcon,
  Box,
  Button,
  Flex,
  Stack,
  Text,
  Tooltip,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import {
  IconAlertCircle,
  IconCheck,
  IconEdit,
  IconPlus,
  IconTrash,
} from "@tabler/icons-react";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import dayjs from "dayjs";
import {
  MRT_RowSelectionState,
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
} from "mantine-react-table";
import React from "react";

// render api fetching
const useGetProducts = () => {
  const fetchURL = new URL(
    "/api/products?populate=*",
    "http://192.168.1.169:1337"
  );

  return useQuery({
    queryKey: [ServiceName.Product], //refetch whenever the URL changes (columnFilters, globalFilter, sorting, pagination)
    queryFn: () => fetch(fetchURL.href).then((res) => res.json()),
    placeholderData: keepPreviousData, //useful for paginated queries by keeping data from previous pages on screen while fetching the next page
  });
};

//DELETE hook (delete user in api)
function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [ServiceName.Product],
    mutationFn: async (productId: string) => {
      serviceProcessor({
        serviceName: ServiceName.Product,
        method: HTTPMethod.Delete,
        options: { params: { productId } },
      });
    },
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: [ServiceName.Product] }), //refetch users after mutation, disabled for demo
    onSuccess: (_, id) => {
      notifications.show({
        message: `Deleted (${id}) successfully!`,
        color: "green",
        icon: <IconCheck size="1.1rem" />,
      });
    },
  });
}

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
  const { data, isError, isFetching, isLoading } = useGetProducts();
  //call DELETE hook
  const { mutateAsync: deleteUser, isPending: isDeletingUser } =
    useDeleteUser();

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
    positionToolbarAlertBanner: "bottom",
    mantineTopToolbarProps: {
      px: 8,
    },
    renderTopToolbarCustomActions: ({ table }) => {
      const values: string[] = table
        .getSelectedRowModel()
        .flatRows.map((item) => item.id);
      if (!values.length) return null;

      const handleDeleteSelected = () =>
        values.map((value) => deleteUser(value));

      return (
        <Flex>
          <Tooltip label={`Delete ${values}`}>
            <Button
              onClick={handleDeleteSelected}
              leftSection={<IconTrash />}
              bg="var(--mantine-color-red-5)"
            >
              Delete {values.length}{" "}
              {values.length > 1 ? "products" : "product"}
            </Button>
          </Tooltip>
          <Flex pl={12} columnGap={8} align={"center"}>
            <Text>ID Selected:</Text>
            {values.map((value) => (
              <Button disabled>{value}</Button>
            ))}
          </Flex>
        </Flex>
      );
    },

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
            <ActionIcon
              color="red"
              onClick={() => openDeleteConfirmModal(row.original.id)}
            >
              <IconTrash />
            </ActionIcon>
          </Tooltip>
        </Flex>
      );
    },
    enableColumnFilters: false,
    // delete
    editDisplayMode: "modal", //default ('row', 'cell', 'table', and 'custom' are also available)
    enableEditing: true,
    getRowId: (row) => row.id,
    // positionPagination: "both",
    state: {
      isLoading,
      showAlertBanner: isError,
      showProgressBars: isFetching,
      rowSelection,
      isSaving: isDeletingUser,
    },
  });

  //DELETE action

  const openDeleteConfirmModal = (id: any) => {
    return modals.openConfirmModal({
      centered: true,
      title: "Confirmation",
      children: (
        <Stack
          h={140}
          justify="center"
          align="center"
          bg={"var(--mantine-color-gray-1)"}
          className="border-2"
          mb={12}
        >
          <IconAlertCircle color="red" size="2.5rem" />
          <Text>Are you sure you want to delete - {id}?</Text>
        </Stack>
      ),
      labels: { confirm: "Confirm", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onCancel: () => null,
      onConfirm: () => deleteUser(id),
    });
  };

  return (
    <Box px={56}>
      <Flex rowGap={8} direction={"column"}>
        <Flex justify={"space-between"} align={"center"} pb={16}>
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
