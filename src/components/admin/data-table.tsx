"use client";

import { useMemo, useState } from "react";
import { flexRender, type RowData } from "@tanstack/react-table";
import {
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useLegacyTable,
  type LegacyColumn,
  type LegacyColumnDef,
  type LegacyRow,
} from "@tanstack/react-table/legacy";
import { ArrowDown, ArrowUp, ArrowUpDown, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

export type DataTableColumn<TData extends RowData> = LegacyColumnDef<TData>;
export type DataTableCellProps<TData extends RowData> = { row: LegacyRow<TData> };

export function sortableHeader<TData extends RowData>(title: string) {
  return function Header({ column }: { column: LegacyColumn<TData, unknown> }) {
    const sorted = column.getIsSorted();
    return (
      <Button
        type="button"
        variant="ghost"
        className="-ml-3 h-8 px-2"
        onClick={() => column.toggleSorting(sorted === "asc")}
      >
        {title}
        {sorted === "asc" ? (
          <ArrowUp className="ml-1 size-3.5" />
        ) : sorted === "desc" ? (
          <ArrowDown className="ml-1 size-3.5" />
        ) : (
          <ArrowUpDown className="ml-1 size-3.5 opacity-50" />
        )}
      </Button>
    );
  };
}

export function DataTable<TData extends RowData>({
  columns,
  data,
  searchPlaceholder = "Search…",
  searchKey,
  filterColumn,
  filterTitle = "Filter",
  loading = false,
  emptyMessage = "No records found.",
  pageSize = 10,
  showToolbar = true,
}: {
  columns: DataTableColumn<TData>[];
  data: TData[];
  searchPlaceholder?: string;
  searchKey?: string;
  filterColumn?: string;
  filterTitle?: string;
  loading?: boolean;
  emptyMessage?: string;
  pageSize?: number;
  showToolbar?: boolean;
}) {
  const [globalFilter, setGlobalFilter] = useState("");
  const tableColumns = useMemo(() => columns, [columns]);

  const table = useLegacyTable({
    data,
    columns: tableColumns,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    globalFilterFn: "includesString",
    initialState: {
      pagination: { pageIndex: 0, pageSize },
    },
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    getRowId: (row: TData, index: number) => {
      if (row && typeof row === "object" && "id" in row) {
        return String((row as { id: string | number }).id);
      }
      return String(index);
    },
  });

  const filterValues = filterColumn
    ? Array.from(table.getColumn(filterColumn)?.getFacetedUniqueValues()?.keys() ?? [])
        .map((value) => String(value))
        .filter((value) => value.length > 0 && value !== "undefined")
        .sort()
    : [];

  const filteredCount = table.getFilteredRowModel().rows.length;
  const pageIndex = table.getState().pagination.pageIndex;
  const currentPageSize = table.getState().pagination.pageSize;
  const from = filteredCount === 0 ? 0 : pageIndex * currentPageSize + 1;
  const to = Math.min(filteredCount, (pageIndex + 1) * currentPageSize);

  return (
    <div className="space-y-4">
      {showToolbar ? (
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={searchKey ? String(table.getColumn(searchKey)?.getFilterValue() ?? "") : globalFilter}
            onChange={(event) => {
              const value = event.target.value;
              if (searchKey) {
                table.getColumn(searchKey)?.setFilterValue(value);
                return;
              }
              setGlobalFilter(value);
            }}
            placeholder={searchPlaceholder}
            className="pl-9"
          />
        </div>
        {filterColumn ? (
          <Select
            value={String(table.getColumn(filterColumn)?.getFilterValue() ?? "all")}
            onValueChange={(value) =>
              table.getColumn(filterColumn)?.setFilterValue(value === "all" ? undefined : value)
            }
          >
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder={filterTitle} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All {filterTitle.toLowerCase()}</SelectItem>
              {filterValues.map((value) => (
                <SelectItem key={value} value={value}>
                  {value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : null}
      </div>
      ) : null}

      <div className="overflow-hidden rounded-lg border bg-card">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {loading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={`skeleton-${index}`}>
                  {tableColumns.map((_, columnIndex) => (
                    <TableCell key={columnIndex}>
                      <Skeleton className="h-4 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="whitespace-normal">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={tableColumns.length} className="h-24 text-center text-muted-foreground">
                  {emptyMessage}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          {filteredCount === 0 ? "No results" : `Showing ${from}–${to} of ${filteredCount}`}
        </p>
        <div className="flex items-center gap-2">
          <Select
            value={String(currentPageSize)}
            onValueChange={(value) => table.setPageSize(Number(value))}
          >
            <SelectTrigger className="w-[110px]" size="sm">
              <SelectValue placeholder="Rows" />
            </SelectTrigger>
            <SelectContent>
              {[10, 20, 50].map((size) => (
                <SelectItem key={size} value={String(size)}>
                  {size} / page
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
