import type { ColumnDef } from "@tanstack/react-table";
import type { Check, CheckDetail } from "@/lib/types";

export const columns: ColumnDef<Check>[] = [
  {
    accessorKey: "header.numCheck",
    header: "№ Чека",
  },
  {
    accessorKey: "header.date",
    header: "Дата",
    cell: ({ getValue }) => {
      const date = new Date(getValue<string>());
      return date.toLocaleString("uk-UA"); // localized date display
    },
  },
  {
    accessorKey: "header.totalSum",
    header: "Сума (грн)",
    cell: ({ getValue }) => getValue<number>().toFixed(2),
  },
  {
    accessorKey: "header.cardSum",
    header: "Карткою (грн)",
    cell: ({ getValue }) => getValue<number>().toFixed(2),
  },
  {
    accessorKey: "header.cashSum",
    header: "Готівкою (грн)",
    cell: ({ getValue }) => getValue<number>().toFixed(2),
  },
  {
    accessorKey: "header.isFiscal",
    header: "Фіскальний",
    cell: ({ getValue }) => (getValue<boolean>() ? "Так" : "Ні"),
  },
  {
    accessorKey: "header.typeCheck",
    header: "Тип чека",
    cell: ({ getValue }) => {
      const value = getValue<number>();
      switch (value) {
        case 1:
          return "Продаж";
        case 2:
          return "Повернення";
        default:
          return "Невідомо";
      }
    },
  },
];

export const detailColumns: ColumnDef<CheckDetail>[] = [
  { accessorKey: "code", header: "Код" },
  { accessorKey: "name", header: "Назва" },
  { accessorKey: "barcode", header: "Штрихкод" },
  { accessorKey: "serial", header: "Серійний номер" },
  {
    accessorKey: "price",
    header: "Ціна",
    cell: ({ getValue }) => getValue<number>().toFixed(2),
  },
  { accessorKey: "amount", header: "Кількість" },
  {
    accessorKey: "sum",
    header: "Сума",
    cell: ({ getValue }) => getValue<number>().toFixed(2),
  },
  { accessorKey: "tax", header: "Податок" },
  { accessorKey: "uktzed", header: "УКТЗЕД" },
];
