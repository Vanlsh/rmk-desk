import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  type Row,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  renderSubRow?: (row: Row<TData>) => React.ReactNode;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  renderSubRow,
}: DataTableProps<TData, TValue>) {
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const toggleExpand = (rowId: string) => {
    setExpandedRows((prev) => ({ ...prev, [rowId]: !prev[rowId] }));
  };

  return (
    <div className="overflow-hidden rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {renderSubRow && <TableHead />} {/* extra column for toggle */}
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <>
                <TableRow key={row.id}>
                  {renderSubRow && (
                    <TableCell
                      className="w-10 cursor-pointer"
                      onClick={() => toggleExpand(row.id)}
                    >
                      {expandedRows[row.id] ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </TableCell>
                  )}

                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>

                {expandedRows[row.id] && renderSubRow && (
                  <TableRow>
                    <TableCell
                      colSpan={row.getVisibleCells().length + 1}
                      className="bg-muted/30"
                    >
                      {renderSubRow(row)}
                    </TableCell>
                  </TableRow>
                )}
              </>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length + (renderSubRow ? 1 : 0)}
                className="h-24 text-center"
              >
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {/* Pagination controls */}
      <div className="flex items-center justify-between p-2">
        <div className="text-sm text-muted-foreground">
          Сторінка {table.getState().pagination.pageIndex + 1} з{" "}
          {table.getPageCount()}
        </div>
        <div className="space-x-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Попередня
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Наступна
          </Button>
        </div>
      </div>
    </div>
  );
}
