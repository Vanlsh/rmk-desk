import { DataTable } from "@/components/common/data-table";
import { Button } from "@/components/ui/button";
import type { Product } from "@/lib/types";
import { type ColumnDef } from "@tanstack/react-table";
import { NavLink } from "react-router-dom";
import DownloadProductButton from "./download-product-button";

// змініть шлях якщо інший

export function ProductTableWrapper({ products }: { products: Product[] }) {
  const columns: ColumnDef<Product>[] = [
    {
      header: "Назва",
      accessorKey: "name",
    },
    {
      header: "Ціна",
      accessorKey: "price",
      cell: ({ row }) => `${row.original.price.toFixed(2)} грн`,
    },
    {
      header: "Код податку",
      accessorKey: "tax",
      cell: ({ row }) => `${row.original.tax}`,
    },
    {
      header: "Група",
      accessorKey: "group",
    },
    {
      id: "actions",
      header: () => (
        <div className="flex justify-end">
          <DownloadProductButton />
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex justify-end">
          <Button variant="secondary" asChild>
            <NavLink to={`/edit-product/${row.original.code}`}>
              Редагувати
            </NavLink>
          </Button>
        </div>
      ),
    },
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderSubRow = (row: any) => {
    const item = row.original;

    return (
      <div className="grid grid-cols-2 gap-3 text-sm p-2">
        <div>
          <p>
            <strong>Код:</strong> {item.code}
          </p>
          <p>
            <strong>Серійний №:</strong> {item.serial}
          </p>
          <p>
            <strong>Штрихкод:</strong> {item.barcode}
          </p>
          <p>
            <strong>Глобальний код:</strong> {item.globalCode}
          </p>
        </div>
        <div>
          <p>
            <strong>Одиниця:</strong> {item.unit}
          </p>
          <p>
            <strong>Кількість:</strong> {item.amount}
          </p>
          <p>
            <strong>Ваговий товар:</strong> {item.isWeight ? "Так" : "Ні"}
          </p>
          <p>
            <strong>Вільна ціна:</strong> {item.freePrice ? "Так" : "Ні"}
          </p>
        </div>
      </div>
    );
  };

  return (
    <DataTable columns={columns} data={products} renderSubRow={renderSubRow} />
  );
}
