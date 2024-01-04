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
    "http://192.168.1.169:1337"
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
      { accessorKey: "createdAt", header: "createdAt" },
      { accessorKey: "id", header: "id" },
      { accessorKey: "description", header: "description" },
      { accessorKey: "price", header: "price" },
      { accessorKey: "name", header: "Name" },
      { accessorKey: "updatedAt", header: "updatedAt" },
      { accessorKey: "publishedAt", header: "publishedAt" },
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

  const {
    data: theData,
    isError,
    isFetching,
    isLoading,
    refetch,
  } = useGetUsers({
    columnFilterFns,
    columnFilters,
    globalFilter,
    pagination,
    sorting,
  });

  // const productData: Person[] =
  //   data?.map((item: any) => {
  //     const { attributes, ...rest } = item;
  //     return { ...rest, ...attributes };
  //   }) || [];

  const data = React.useMemo(() => {
    return Array.isArray(theData?.data) ? theData?.data : [];
  }, [ServiceName.Product]);

  // const dataAttributes = Object.keys(
  //   productQuery?.data?.data?.[0]?.attributes || {}
  // );
  // const attributesKeys = ["id", ...dataAttributes];

  // console.log("productData", productData);
  // console.log("data", data);
  // console.log("theData", theData);
  // React.useEffect(() => {
  //   const fetchData = async () => {
  //     if (!data.length) {
  //       setIsLoading(true);
  //     } else {
  //       setIsRefetching(true);
  //     }

  //     const url = new URL(
  //       "/api/data",
  //       process.env.NODE_ENV === "production"
  //         ? "http://localhost:1337/api/products?populate=*"
  //         : "http://localhost:3000"
  //     );
  //     url.searchParams.set(
  //       "start",
  //       `${pagination.pageIndex * pagination.pageSize}`
  //     );
  //     url.searchParams.set("size", `${pagination.pageSize}`);
  //     url.searchParams.set("filters", JSON.stringify(columnFilters ?? []));
  //     url.searchParams.set("globalFilter", globalFilter ?? "");
  //     url.searchParams.set("sorting", JSON.stringify(sorting ?? []));

  //     try {
  //       const response = await fetch(url.href);
  //       const json = (await response.json()) as UserApiResponse;
  //       setData(json.data);
  //       setRowCount(json.meta.totalRowCount);
  //     } catch (error) {
  //       setIsError(true);
  //       console.error(error);
  //       return;
  //     }
  //     setIsError(false);
  //     setIsLoading(false);
  //     setIsRefetching(false);
  //   };

  //   return useQuery({
  //     queryKey: [ServiceName.Product],
  //     queryFn: () =>
  //       serviceProcessor({
  //         serviceName: ServiceName.Product,
  //         options: { querystring: "?populate=*" },
  //       }),
  //     staleTime: 10 * 1000,
  //   });
  // }, [
  //   columnFilters, //refetch when column filters change
  //   globalFilter, //refetch when global filter changes
  //   pagination.pageIndex, //refetch when page index changes
  //   pagination.pageSize, //refetch when page size changes
  //   sorting, //refetch when sorting changes
  // ]);

  // console.log("useGetUsers", data);
  //this will depend on your API response shape
  const fetchedUsers = theData?.data ?? [];
  const totalRowCount = data?.meta?.totalRowCount ?? 0;

  const productData = (fetchedUsers as any[])?.map((item) => {
    const { attributes, ...rest } = item || {};
    return { ...rest, ...attributes };
  });

  console.log("productData", productData);
  console.log("columns", columns);

  // const aa = [
  //   {
  //     name: "string1",
  //     createdAt: "string",
  //     updatedAt: "anystring",
  //     publishedAt: "anystring",
  //     description: "anystring",
  //     images: "anystring",
  //     logo: "anystring",
  //   },
  //   {
  //     name: "string2",
  //     createdAt: "string",
  //     updatedAt: "anystring",
  //     publishedAt: "anystring",
  //     description: "anystring",
  //     images: "anystring",
  //     logo: "anystring",
  //   },
  //   {
  //     name: "string2",
  //     createdAt: "string",
  //     updatedAt: "anystring",
  //     publishedAt: "anystring",
  //     description: "anystring",
  //     images: "anystring",
  //     logo: "anystring",
  //   },
  // ];

  const table = useMantineReactTable({
    columns,
    data: productData,
    // enableColumnFilterModes: true,
    enableFullScreenToggle: false,
    enableColumnFilters: false,
    // manualPagination: true,
    manualSorting: true,
    mantineToolbarAlertBannerProps: isError
      ? { color: "red", children: "Error loading data" }
      : undefined,
    // onColumnFilterFnsChange: setColumnFilterFns,
    // onColumnFiltersChange: setColumnFilters,
    // onGlobalFilterChange: setGlobalFilter,
    // onPaginationChange: setPagination,
    // onSortingChange: setSorting,
    // renderTopToolbarCustomActions: () => (
    //   <Tooltip label="Refresh Data">
    //     <ActionIcon onClick={() => refetch()}>
    //       <IconRefresh />
    //     </ActionIcon>
    //   </Tooltip>
    // ),
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
