import TableCell from '@/components/elements/admin/TableCell';
import TableHead from '@/components/elements/admin/TableHead';
import { useNProgressRouter } from '@/hooks/useNProgress';
import { serviceProcessor } from '@/services/servicesProcessor';
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
} from '@mantine/core';
import { useDebouncedState } from '@mantine/hooks';
import { IconAlignLeft, IconArrowLeft, IconFilterPlus, IconPlus, IconTrashXFilled } from '@tabler/icons-react';
import { IconSearch } from '@tabler/icons-react';
import { IconSettings } from '@tabler/icons-react';
import { IconMenu2 } from '@tabler/icons-react';
import { IconEye } from '@tabler/icons-react';
import { IconArrowsSort } from '@tabler/icons-react';
import { IconSortAscending } from '@tabler/icons-react';
import { IconSortDescending } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { ColumnDef, Table, createColumnHelper, flexRender } from '@tanstack/react-table';
import React from 'react';

interface ITableCollectionProps {
  table: Table<any>;
  serviceName: any;
}

const TableCollection = (props: ITableCollectionProps) => {
  const router = useNProgressRouter();
  const { serviceName, table } = props || {};
  const [searchOpened, setSearchOpened] = React.useState(false);
  const [debouncedSearchValue, setDebouncedSearchValue] = useDebouncedState('', 300);
  const [columnVisibility, setColumnVisibility] = React.useState({});

  const entityQuery = useQuery({
    queryKey: [serviceName],
    queryFn: () => serviceProcessor({ serviceName: serviceName }),
    staleTime: 10 * 1000,
  }) as any;

  const dataAttributes = Object.keys(entityQuery?.data?.data?.[0]?.attributes || {});
  const attributesKeys = ['id', ...dataAttributes];
  const columnHelper = createColumnHelper<any>();

  const columns: ColumnDef<any>[] = [
    columnHelper.display({
      id: 'checkbox',
      header: ({ table }) => (
        <TableHead>
          <Checkbox
            // checked={table.getIsAllRowsSelected()}
            indeterminate={table.getIsSomeRowsSelected()}
            onChange={table.getToggleAllRowsSelectedHandler()}
          />
        </TableHead>
      ),
      cell: ({ row, cell }) => (
        <TableCell key={cell.id}>
          <Checkbox
            // checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
          />
        </TableCell>
      ),
    }),
    ...attributesKeys.map(attribute => {
      return columnHelper.accessor(attribute, {
        id: attribute,
        header: ({ column }) => {
          const SortIcon =
            (column.getIsSorted() === 'desc' && IconSortDescending) ||
            (column.getIsSorted() === 'asc' && IconSortAscending) ||
            IconArrowsSort;
          return (
            <TableHead>
              <button type='button' onClick={column.getToggleSortingHandler()}>
                {/* <Text className={classes.headerText}>{convertCamel(attribute)}</Text> */}
                <Text>{attribute}</Text>
                <SortIcon />
              </button>
            </TableHead>
          );
        },
        cell: ({ row }) => (
          <TableCell key={row.id}>
            <Text variant='body-2'>{attribute}</Text>
          </TableCell>
        ),
      });
    }),
    columnHelper.display({
      id: 'actions',
      header: ({ column }) => (
        <TableHead>
          <Text>{column.id}</Text>
        </TableHead>
      ),
      cell: ({ column }) => (
        <TableCell key={column.id}>
          <div>
            <IconTrashXFilled onClick={() => console.log('delete')} />
            <IconEye onClick={() => console.log('view')} />
            <IconMenu2 onClick={() => console.log('menu')} />
          </div>
        </TableCell>
      ),
    }),
  ];

  return (
    <Box px={56}>
      <Flex rowGap={8} direction={'column'}>
        <Button
          className='self-start'
          variant='light'
          leftSection={<IconArrowLeft size={20} />}
          onClick={() => router.back()}
        >
          Back
        </Button>

        <Flex justify={'space-between'} align={'center'}>
          <Text className='text-3xl font-medium'>Product</Text>
          <Button leftSection={<IconPlus size={20} />}>Create new entry</Button>
        </Flex>
        <Text className='text-gray-600'>1 entry found</Text>
        <Flex justify={'space-between'}>
          <Flex className='flex-1' columnGap={8}>
            {!searchOpened ? (
              <ActionIcon variant='default' size={36} aria-label='Searchs' onClick={() => setSearchOpened(true)}>
                <IconSearch color='var(--mantine-color-gray-5)' size={20} />
              </ActionIcon>
            ) : (
              <Input
                onChange={e => setDebouncedSearchValue(e.target.value)}
                onCompositionEnd={() => setDebouncedSearchValue('')}
                color='#228BE6'
                leftSection={<IconSearch size={20} />}
                placeholder='Search...'
              />
            )}
            <Button leftSection={<IconFilterPlus size={20} />} variant='default'>
              Filters
            </Button>
          </Flex>

          <Popover position='bottom-end' withArrow shadow='md' width={250}>
            <Popover.Target>
              <Tooltip label='View settings' onClick={prev => !prev}>
                <ActionIcon variant='default' size={36} aria-label='Settings'>
                  <IconSettings size={20} />
                </ActionIcon>
              </Tooltip>
            </Popover.Target>
            <Popover.Dropdown>
              <Flex justify={'center'} direction={'column'} rowGap={12}>
                <Button leftSection={<IconAlignLeft size={20} />} variant='outline'>
                  Configure the view
                </Button>
                <Flex justify={'space-between'} align={'center'}>
                  <Text>Display Field</Text>
                  <Button variant='light' onClick={() => setColumnVisibility({})}>
                    Reset
                  </Button>
                </Flex>
                <Divider />
                <ScrollArea h={150} scrollbars='y'>
                  {table.getAllLeafColumns().map(column => {
                    return (
                      <Flex
                        p={4}
                        key={column.id}
                        justify={'flex-start'}
                        columnGap={8}
                        align={'center'}
                        className='cursor-pointer hover:bg-gray-200 rounded-sm'
                        onClick={column.getToggleVisibilityHandler()}
                      >
                        <Checkbox checked={column.getIsVisible()} />
                        <Text>{column.id}</Text>
                      </Flex>
                    );
                  })}
                </ScrollArea>
              </Flex>
            </Popover.Dropdown>
          </Popover>
        </Flex>
        <Card>
          <table className='border-solid bottom-1 border-gray-200'>
            <thead>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      className='px-1 py-0.5 border-r-[lightgray] border-b-[lightgray] border-b border-solid border-r'
                    >
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className='border-b-[lightgray] border-b border-solid'>
              {table.getRowModel().rows.map(row => (
                <tr key={row.id}>
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </Flex>
    </Box>
  );
};

export default TableCollection;
