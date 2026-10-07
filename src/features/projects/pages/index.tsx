import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import { ArrowUpDown, ChevronDown, Delete, Edit } from 'lucide-react'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

import MainDialog from '@/components/MainDialog'
import { useFormContext } from '@/context/form/formContext'
import { routes } from '@/routes_Apis'
import Snackbar from '@mui/joy/Snackbar'
import { useNavigate } from 'react-router'
import { IProject } from '../../../Model/IProject'
import { useDelete } from '../hooks/useDelete'
import { useProject } from '../hooks/useProject'

export default function Project() {
  const { setProject } = useFormContext()
  const navigate = useNavigate()
  const Project = useProject()
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState<string | null>(
    null
  )
  //
  const [hiddenRow, setHiddenRows] = React.useState<string[]>([])
  const filteredData = React.useMemo(() => {
    const rawData = Project.data?.data || []
    return rawData.filter(
      (item: IProject) => !hiddenRow.includes(item._id as string)
    )
  }, [Project.data?.data, hiddenRow])
  //

  const DeleteHook = useDelete({ setOpen: setDeleteDialogOpen, setHiddenRows })

  //
  const columns: ColumnDef<IProject>[] = [
    {
      accessorKey: '_id',
      header: 'ID'

      // cell: () => <div></div>
    },
    {
      accessorKey: 'name',
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Name
            <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => {
        const name = row.getValue('name') as string | undefined

        return <p className='lowercase'>{name}</p>
      }
    },
    {
      accessorKey: 'donor',
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Donor
            <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => {
        const donor = row.getValue('donor') as string | undefined

        return <p className='lowercase'>{donor}</p>
      }
    },
    {
      accessorKey: 'value',
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Value
            <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => {
        const value = row.getValue('value') as string | undefined

        return <p className='lowercase'>{value}</p>
      }
    },
    {
      accessorKey: 'startDate',
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Start Date
            <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => (
        <div className='lowercase'>{row.getValue('startDate')}</div>
      )
    },
    {
      accessorKey: 'endDate',
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            End Date
            <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => (
        <div className='lowercase'>{row.getValue('endDate')}</div>
      )
    },
    {
      accessorKey: 'projectType',
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            End Date
            <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => (
        <div className='lowercase'>{row.getValue('projectType')}</div>
      )
    },
    {
      accessorKey: 'name',
      header: () => {
        return <Button variant='ghost'>Actions</Button>
      },
      cell: ({ row }) => {
        const rowId = row.getValue('_id') as string
        const isOpen = deleteDialogOpen === rowId
        return (
          <div className='flex w-fit gap-2'>
            <button
              key={`${rowId}-btn`}
              type='button'
              onClick={() => {
                setProject(row.original)
                navigate(`${routes.update_project}`)
                return
              }}
              className={`flex items-center gap-2 rounded-md bg-blue-200/70 px-4 py-1 font-medium text-blue-800`}
            >
              <Edit key={`${rowId}-edit`} size={15} />
            </button>

            <MainDialog
              btnOptions={{
                text: `delete`,
                className: `flex items-center gap-2 rounded-md bg-red-200/70 px-4 py-1 font-medium text-red-800`,
                Icon: <Delete key={`-delete`} size={15} />,
                key: `${row.index}-${row.getValue('_id')}`
              }}
              dialogOptions={{
                key: `${row.index}-${row.getValue('_id')}`,
                open: isOpen,
                setOpen: open => setDeleteDialogOpen(open ? rowId : null),
                content: `Are you sure you want to delete this project`,

                title: `Delete Project`,
                Buttons: [
                  // { btnText: "yes, i' m sure", type: 'ok' },
                  {
                    btnText: 'Delete this project',
                    type: 'error',
                    onClick() {
                      DeleteHook.Delete(row.getValue('_id'))
                    },
                    loading: DeleteHook.loading
                  }
                ]
              }}
            />
          </div>
        )
      }
    }
  ]

  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data: filteredData || [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection
    }
  })

  return (
    <>
      {' '}
      <div className='w-full'>
        <div className='flex items-center py-4'>
          <Input
            placeholder='Search ...'
            value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
            onChange={event =>
              table.getColumn('name')?.setFilterValue(event.target.value)
            }
            className='max-w-sm'
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='outline' className='ml-auto'>
                Columns <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              {table
                .getAllColumns()
                .filter(column => column.getCanHide())
                .map(column => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className='capitalize'
                      checked={column.getIsVisible()}
                      onCheckedChange={value =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className='rounded-md border'>
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map(headerGroup => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map(header => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map(row => (
                  <TableRow
                    key={row.getValue('_id')}
                    data-state={row.getIsSelected() && 'selected'}
                  >
                    {row.getVisibleCells().map(cell => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className='h-24 text-center'
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        {/* pagination */}
        <div className='flex items-center justify-end space-x-2 py-4'>
          <div className='flex-1 text-sm text-muted-foreground'>
            {table.getFilteredSelectedRowModel().rows.length} of{' '}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className='space-x-2'>
            <Button
              variant='outline'
              size='sm'
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant='outline'
              size='sm'
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
      {Project.snackbarColor == 'danger' && (
        <Snackbar
          variant='outlined'
          color={Project.snackbarColor}
          autoHideDuration={4000}
          open={Project.snackbarOpen}
        >
          {Project.snackbarmsg}
        </Snackbar>
      )}
    </>
  )
}
