"use client";

import { useNProgress, useNProgressRouter } from "@/hooks/useNProgress";
import { serviceProcessor } from "@/services/servicesProcessor";
import { ServiceName } from "@/types/enum";
import {
  ActionIcon,
  Box,
  Button,
  Card,
  Checkbox,
  Divider,
  Flex,
  Input,
  Popover,
  ScrollArea,
  Text,
  Tooltip,
} from "@mantine/core";
import { useDebouncedState } from "@mantine/hooks";
import {
  IconAlignLeft,
  IconArrowLeft,
  IconArrowsSort,
  IconEdit,
  IconFilterPlus,
  IconMenu2,
  IconPlus,
  IconRefresh,
  IconSearch,
  IconSend,
  IconSettings,
  IconSortAscending,
  IconSortDescending,
  IconTrash,
  IconTrashXFilled,
} from "@tabler/icons-react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import React from "react";
import {
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import TableHead from "@/components/elements/admin/TableHead";
import TableCell from "@/components/elements/admin/TableCell";
import Table from "@/components/elements/admin/Table";
import TableHeader from "@/components/elements/admin/TableHeader";
import TableRow from "@/components/elements/admin/TableRow";
import TableBody from "@/components/elements/admin/TableBody";
import { IconEye } from "@tabler/icons-react";
import TableCollection from "@/components/sections/admin/TableCollection";
import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
  type MRT_ColumnFiltersState,
  type MRT_PaginationState,
  type MRT_SortingState,
  MRT_GlobalFilterTextInput,
  MRT_TablePagination,
} from "mantine-react-table";

type Person = {
  name: string;
  createdAt: string;
  updatedAt: any;
  publishedAt: any;
  description: any;
  images: any;
  logo: any;
};

//custom react-query hook
const useGetUsers = ({
  columnFilterFns,
  columnFilters,
  globalFilter,
  sorting,
  pagination,
}: any) => {
  //build the URL (https://www.mantine-react-table.com/api/data?start=0&size=10&filters=[]&globalFilter=&sorting=[])
  const fetchURL = new URL(
    "/api/products?populate=*",
    "http://192.168.1.184:1337"
  );
  // fetchURL.searchParams.set(
  //   "start",
  //   `${pagination.pageIndex * pagination.pageSize}`
  // );
  // fetchURL.searchParams.set("size", `${pagination.pageSize}`);
  // fetchURL.searchParams.set("filters", JSON.stringify(columnFilters ?? []));
  // fetchURL.searchParams.set(
  //   "filterModes",
  //   JSON.stringify(columnFilterFns ?? {})
  // );
  // fetchURL.searchParams.set("globalFilter", globalFilter ?? "");
  // fetchURL.searchParams.set("sorting", JSON.stringify(sorting ?? []));

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
  const [columnFilters, setColumnFilters] = React.useState([]);
  const columns = React.useMemo<MRT_ColumnDef<any>[]>(
    () => [
      { accessorKey: "id", header: "Id" },
      { accessorKey: "name", header: "Name" },
      { accessorKey: "price", header: "Price" },
      { accessorKey: "description", header: "Description" },
      { accessorKey: "createdAt", header: "Created At" },
      { accessorKey: "updatedAt", header: "Updated At" },
      { accessorKey: "publishedAt", header: "Published At" },
    ],
    []
  );
  const [columnFilterFns, setColumnFilterFns] = React.useState(
    Object.fromEntries(
      columns.map(({ accessorKey }) => [accessorKey, "contains"])
    )
  ); //default to "contains" for all columns
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [sorting, setSorting] = React.useState([]);
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });

  // const productQuery = useQuery({
  //   queryKey: [ServiceName.Product],
  //   queryFn: async () =>
  //     await serviceProcessor({
  //       serviceName: ServiceName.Product,
  //       options: { querystring: "?populate=*" },
  //     }),
  //   staleTime: 10 * 1000,
  // });

  const { data, isError, isFetching, isLoading, refetch } = useGetUsers({
    columnFilterFns,
    columnFilters,
    globalFilter,
    pagination,
    sorting,
  });

  const fetchedUsers = data?.data ?? [];
  const totalRowCount = data?.meta?.totalRowCount ?? 0;

  const productData = React.useMemo(() => {
    return (fetchedUsers as any[])?.map((item) => {
      const { attributes, ...rest } = item || {};
      return { ...rest, ...attributes };
    });
  }, [fetchedUsers]);

  const table = useMantineReactTable({
    columns,
    data: productData,
    enableFullScreenToggle: false,
    // positionGlobalFilter: "left",
    // mantineSearchTextInputProps: {
    //   placeholder: "Search all data",
    //   variant: "filled",
    // },
    enableRowSelection: true,
    enableRowActions: true,
    positionActionsColumn: "last",
    renderRowActions: ({ row }) => (
      <Flex columnGap={8}>
        <ActionIcon color="blue" onClick={() => console.log("first")}>
          <IconSend />
        </ActionIcon>
        <ActionIcon
          color="orange"
          onClick={() => {
            table.setEditingRow(row);
          }}
        >
          <IconEdit />
        </ActionIcon>
        <ActionIcon color="red" onClick={() => console.log("first")}>
          <IconTrash />
        </ActionIcon>
      </Flex>
    ),
    mantinePaginationProps: {
      rowsPerPageOptions: ["5", "10", "15"],
    },
    enableColumnFilters: false,
    manualSorting: true,
    rowCount: totalRowCount,
    state: {
      columnFilterFns,
      columnFilters,
      globalFilter,
      isLoading,
      pagination,
      showAlertBanner: isError,
      showProgressBars: isFetching,
      sorting,
    },
  });

  return (
    <Box px={56}>
      <Flex rowGap={8} direction={"column"}>
        <Button
          className="self-start"
          variant="light"
          leftSection={<IconArrowLeft size={20} />}
          onClick={() => router.back()}
        >
          Back
        </Button>

        <Flex justify={"space-between"} align={"center"}>
          <Text className="text-3xl font-medium">Products</Text>
          <Button leftSection={<IconPlus size={20} />}>Create new entry</Button>
        </Flex>

        <MantineReactTable table={table} />
      </Flex>
    </Box>
  );
};

export default ProductPage;
