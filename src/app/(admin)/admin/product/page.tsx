"use client";

import { useNProgressRouter } from "@/hooks/useNProgress";
import { serviceProcessor } from "@/services/servicesProcessor";
import { ServiceName } from "@/types/enum";
import {
  ActionIcon,
  Box,
  Button,
  Card,
  Flex,
  Input,
  Text,
} from "@mantine/core";
import { useDebouncedState } from "@mantine/hooks";
import {
  IconArrowLeft,
  IconArrowsSort,
  IconEdit,
  IconFilterPlus,
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

const ProductPage = () => {
  const router = useNProgressRouter();
  const [searchOpened, setSearchOpened] = React.useState(false);
  const [debouncedSearchValue, setDebouncedSearchValue] = useDebouncedState(
    "",
    300
  );

  const productQuery = useQuery({
    queryKey: [ServiceName.Product],
    queryFn: () => serviceProcessor({ serviceName: ServiceName.Product }),
    staleTime: 10 * 1000,
  }) as any;

  const dataAttributes = Object.keys(
    productQuery?.data?.data?.[0]?.attributes || {}
  );
  const attributesKeys = ["id", ...dataAttributes];

  const createColumns = () => {
    // const { onEdit, onDelete } = props || {};
    const columnHelper = createColumnHelper<any>();

    return [
      columnHelper.accessor("name", {
        header: ({ column }) => {
          const SortIcon =
            (column.getIsSorted() === "desc" && IconSortDescending) ||
            (column.getIsSorted() === "asc" && IconSortAscending) ||
            IconArrowsSort;
          return (
            <TableHead>
              <button type="button" onClick={column.getToggleSortingHandler()}>
                <Text>name</Text>
                <SortIcon />
              </button>
            </TableHead>
          );
        },
        cell: ({ row }) => {
          return (
            <TableCell key={row.id}>
              {/* <ContentIcon type={row.getValue("type")} /> */}
              <Text variant="body-2">131</Text>
            </TableCell>
          );
        },
      }),
      columnHelper.accessor("1 dong attribie o day", {
        header: ({ column }) => {
          const SortIcon =
            (column.getIsSorted() === "desc" && IconSortDescending) ||
            (column.getIsSorted() === "asc" && IconSortAscending) ||
            IconArrowsSort;
          return (
            <TableHead>
              <button type="button" onClick={column.getToggleSortingHandler()}>
                <Text>type</Text>
                <SortIcon />
              </button>
            </TableHead>
          );
        },
        cell: ({ row }) => (
          <TableCell key={row.id}>
            <Text variant="body-2">123</Text>
          </TableCell>
        ),
      }),
      columnHelper.display({
        id: "_actions",
        header: () => (
          <TableHead>
            <Text>action</Text>
          </TableHead>
        ),
        cell: ({ column, row }) => (
          <TableCell key={column.id}>
            <div>
              <IconEdit />
              <IconTrashXFilled />
            </div>
          </TableCell>
        ),
      }),
    ];
  };

  const table = useReactTable({
    data: productQuery?.data?.data, // data
    columns: createColumns(), // col table
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
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
          <Text className="text-3xl font-medium">Product</Text>
          <Button leftSection={<IconPlus size={20} />}>Create new entry</Button>
        </Flex>
        <Text className="text-gray-600">1 entry found</Text>
        {/* Table tool bar */}
        <Flex justify={"space-between"}>
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
          <ActionIcon variant="default" size={36} aria-label="Settings">
            <IconSettings size={20} />
          </ActionIcon>
        </Flex>

        <Card>
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
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
              ))}
            </TableHeader>

            {/* <TableBody>
              {table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <React.Fragment key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </React.Fragment>
                  ))}
                </TableRow>
              ))}
            </TableBody> */}
          </Table>
        </Card>
      </Flex>
    </Box>
  );
};

export default ProductPage;
