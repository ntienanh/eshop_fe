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
  IconSearch,
  IconSettings,
  IconSortAscending,
  IconSortDescending,
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

type UserApiResponse = {
  data: Array<Person>;
  meta: {
    totalRowCount: number;
  };
};

const ProductPage = () => {
  useNProgress();
  const router = useNProgressRouter();
  const [data, setData] = React.useState<Person[]>([]);
  const [isError, setIsError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isRefetching, setIsRefetching] = React.useState(false);
  const [rowCount, setRowCount] = React.useState(0);

  //table state
  const [columnFilters, setColumnFilters] =
    React.useState<MRT_ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [sorting, setSorting] = React.useState<MRT_SortingState>([]);
  const [pagination, setPagination] = React.useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const productQuery = useQuery({
    queryKey: [ServiceName.Product],
    queryFn: async () =>
      await serviceProcessor({
        serviceName: ServiceName.Product,
        options: { querystring: "?populate=*" },
      }),
    staleTime: 10 * 1000,
  });

  // const dataAttributes = Object.keys(
  //   productQuery?.data?.data?.[0]?.attributes || {}
  // );
  // const attributesKeys = ["id", ...dataAttributes];
  // const productData: Person[] =
  //   ((productQuery?.data as any)?.data as any)?.map((item: any) => {
  //     const { attributes, ...rest } = item;
  //     return { ...rest, ...attributes };
  //   }) || [];

  React.useEffect(() => {
    const fetchData = async () => {
      if (!data.length) {
        setIsLoading(true);
      } else {
        setIsRefetching(true);
      }

      const url = new URL(
        "/api/data",
        process.env.NODE_ENV === "production"
          ? "http://localhost:1337/api/products?populate=*"
          : "http://localhost:3000"
      );
      url.searchParams.set(
        "start",
        `${pagination.pageIndex * pagination.pageSize}`
      );
      url.searchParams.set("size", `${pagination.pageSize}`);
      url.searchParams.set("filters", JSON.stringify(columnFilters ?? []));
      url.searchParams.set("globalFilter", globalFilter ?? "");
      url.searchParams.set("sorting", JSON.stringify(sorting ?? []));

      try {
        const response = await fetch(url.href);
        const json = (await response.json()) as UserApiResponse;
        setData(json.data);
        setRowCount(json.meta.totalRowCount);
      } catch (error) {
        setIsError(true);
        console.error(error);
        return;
      }
      setIsError(false);
      setIsLoading(false);
      setIsRefetching(false);
    };

    return useQuery({
      queryKey: [ServiceName.Product],
      queryFn: () =>
        serviceProcessor({
          serviceName: ServiceName.Product,
          options: { querystring: "?populate=*" },
        }),
      staleTime: 10 * 1000,
    });
  }, [
    columnFilters, //refetch when column filters change
    globalFilter, //refetch when global filter changes
    pagination.pageIndex, //refetch when page index changes
    pagination.pageSize, //refetch when page size changes
    sorting, //refetch when sorting changes
  ]);

  // const columns = React.useMemo<MRT_ColumnDef<Person>[]>(
  //   () => [
  //     { accessorKey: "name", header: "Name" },
  //     { accessorKey: "createdAt", header: "createdAt" },
  //     { accessorKey: "updatedAt", header: "updatedAt" },
  //     { accessorKey: "publishedAt", header: "publishedAt" },
  //     { accessorKey: "description", header: "description" },
  //     { accessorKey: "images", header: "images" },
  //     { accessorKey: "logo", header: "logo" },
  //   ],
  //   []
  // );

  const columns = React.useMemo<MRT_ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: "firstName",
        header: "First Name",
      },

      {
        accessorKey: "lastName",
        header: "Last Name",
      },
      {
        accessorKey: "address",
        header: "Address",
      },
      {
        accessorKey: "state",
        header: "State",
      },
      {
        accessorKey: "phoneNumber",
        header: "Phone Number",
      },
    ],
    []
  );

  const table = useMantineReactTable({
    columns,
    data,
    enableRowSelection: true,
    getRowId: (row) => row?.phoneNumber,
    initialState: { showColumnFilters: true },
    manualFiltering: true,
    manualPagination: true,
    manualSorting: true,
    rowCount,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    state: {
      columnFilters,
      globalFilter,
      isLoading,
      pagination,
      showAlertBanner: isError,
      showProgressBars: isRefetching,
      sorting,
    },
    mantineToolbarAlertBannerProps: isError
      ? { color: "red", children: "Error loading data" }
      : undefined,
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
        {/* <Text className="text-gray-600">{productData?.length} entry found</Text> */}
        {/* <Flex justify={"space-between"}>
          <Flex className="flex-1" columnGap={8}>
            {!searchOpened ? (
              <ActionIcon
                variant="default"
                size={36}
                aria-label="Searchs"
                onClick={() => setSearchOpened(true)}
              >
                <IconSearch color="var(--mantine-color-gray-5)" size={20} />
              </ActionIcon>
            ) : (
              <Input
                onChange={(e) => setDebouncedSearchValue(e.target.value)}
                onCompositionEnd={() => setDebouncedSearchValue("")}
                color="#228BE6"
                leftSection={<IconSearch size={20} />}
                placeholder="Search..."
              />
            )}
            <Button
              leftSection={<IconFilterPlus size={20} />}
              variant="default"
            >
              Filters
            </Button>
          </Flex>

          <Popover position="bottom-end" withArrow shadow="md" width={250}>
            <Popover.Target>
              <Tooltip label="View settings" onClick={(prev) => !prev}>
                <ActionIcon variant="default" size={36} aria-label="Settings">
                  <IconSettings size={20} />
                </ActionIcon>
              </Tooltip>
            </Popover.Target>
            <Popover.Dropdown>
              <Flex justify={"center"} direction={"column"} rowGap={12}>
                <Button
                  leftSection={<IconAlignLeft size={20} />}
                  variant="outline"
                >
                  Configure the view
                </Button>
                <Flex justify={"space-between"} align={"center"}>
                  <Text>Display Field</Text>
                  <Button
                    variant="light"
                    onClick={() => setColumnVisibility({})}
                  >
                    Reset
                  </Button>
                </Flex>
                <Divider />
              </Flex>
            </Popover.Dropdown>
          </Popover>
        </Flex> */}
        {/* {productData && <MantineReactTable table={table} />} */}
        <MantineReactTable table={table} />

        {/* <Card>
          {productQuery.isLoading ? (
            <p>Loading...</p>
          ) : (
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => {
                  return (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <React.Fragment key={header.id}>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </React.Fragment>
                      ))}
                    </TableRow>
                  );
                })}
              </TableHeader>

              <TableBody>
                {table.getRowModel().rows.map((row) => {
                  return (
                    <TableRow key={row.id}>
                      {row.getVisibleCells().map((cell) => {
                        console.log("cell", cell);
                        return (
                          <React.Fragment key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </React.Fragment>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </Card> */}

        {/* <Card>
          {productData?.map((product: any, idx: string) => {
            const { id } = product || {};

            return (
              <Button
                key={idx}
                onClick={() => router.push(`/admin/product/${id}`)}
                variant="light"
                className="self-start"
              >
                <Text>{id}</Text>
              </Button>
            );
          })}
        </Card> */}
      </Flex>
    </Box>
    // <TableCollection serviceName={ServiceName.Product} table={table}/>
  );
};

export default ProductPage;
