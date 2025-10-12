import type { Check, CheckDetail } from "@/lib/types";
import { columns, detailColumns } from "./check-columns";
import { DataTable } from "./data-table";
import {
  Table as UITable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface CheckTableProps {
  checks: Check[];
}

export const CheckTable = ({ checks }: CheckTableProps) => {
  return (
    <DataTable
      data={checks}
      columns={columns}
      renderSubRow={(row) => {
        const check = row.original;

        return (
          <div className="p-2">
            <UITable>
              <TableHeader>
                <TableRow>
                  {detailColumns.map((col, i) => (
                    <TableHead key={i}>
                      {typeof col.header === "string"
                        ? col.header
                        : String(col.header)}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {check.details.map((item, i) => (
                  <TableRow key={i}>
                    {detailColumns.map((col, j) => {
                      // Only handle columns that have an accessorKey
                      if ("accessorKey" in col && col.accessorKey) {
                        const key = col.accessorKey as keyof CheckDetail;
                        const value = item[key];
                        return (
                          <TableCell key={j}>
                            {typeof value === "number"
                              ? value.toString()
                              : value ?? ""}
                          </TableCell>
                        );
                      }
                      return <TableCell key={j}>—</TableCell>;
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </UITable>
          </div>
        );
      }}
    />
  );
};
