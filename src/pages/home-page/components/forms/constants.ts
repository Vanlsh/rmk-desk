export type ProductFieldType = "number" | "text" | "checkbox" | "select";
export type ProductFieldName =
  | "code"
  | "name"
  | "serial"
  | "barcode"
  | "globalCode"
  | "tax"
  | "price"
  | "isWeight"
  | "mrcPrice"
  | "amount"
  | "group"
  | "uktzed"
  | "unit";

export type ProductFieldLabel =
  | "Код"
  | "Назва"
  | "Серійний номер"
  | "Штрихкод"
  | "Глобальний код"
  | "Податок"
  | "Ціна"
  | "MRC Ціна"
  | "Кількість"
  | "Група"
  | "УКТЗЕД"
  | "Од. вим."
  | "Ваговий товар";

export const labelToNameMap: Record<ProductFieldLabel, ProductFieldName> = {
  Код: "code",
  Назва: "name",
  "Серійний номер": "serial",
  Штрихкод: "barcode",
  "Глобальний код": "globalCode",
  Податок: "tax",
  Ціна: "price",
  "Ваговий товар": "isWeight",
  "MRC Ціна": "mrcPrice",
  Кількість: "amount",
  Група: "group",
  УКТЗЕД: "uktzed",
  "Од. вим.": "unit",
};

export type ProductField = {
  label: string;
  name: ProductFieldName;
  placeholder: string;
  type: ProductFieldType;
  required: boolean;
  options?: readonly string[];
};

export const productFields = [
  {
    label: "Код",
    name: "code",
    placeholder: "Введіть код",
    type: "text",
    required: true,
  },
  {
    label: "Назва",
    name: "name",
    placeholder: "Введіть назву",
    type: "text",
    required: true,
  },
  {
    label: "Серійний номер",
    name: "serial",
    placeholder: "Введіть серійний номер",
    type: "text",
    required: true,
  },
  {
    label: "Штрихкод",
    name: "barcode",
    placeholder: "Введіть штрихкод",
    type: "text",
    required: true,
  },
  {
    label: "Глобальний код",
    name: "globalCode",
    placeholder: "Введіть глобальний код",
    type: "text",
    required: true,
  },
  {
    label: "Податок",
    name: "tax",
    placeholder: "Введіть податок",
    type: "text",
    required: true,
  },
  {
    label: "Ціна",
    name: "price",
    placeholder: "Введіть ціну",
    type: "text",
    required: true,
  },

  {
    label: "MRC Ціна",
    name: "mrcPrice",
    placeholder: "Введіть MRC ціну",
    type: "text",
    required: true,
  },
  {
    label: "Кількість",
    name: "amount",
    placeholder: "Введіть кількість",
    type: "text",
    required: true,
  },
  {
    label: "Група",
    name: "group",
    placeholder: "Введіть групу",
    type: "text",
    required: true,
  },
  {
    label: "УКТЗЕД",
    name: "uktzed",
    placeholder: "Введіть УКТЗЕД",
    type: "text",
    required: true,
  },
  {
    label: "Од. вим.",
    name: "unit",
    placeholder: "Введіть одиницю виміру",
    type: "select",
    options: ["кг", "шт", "л", "м2"],
    required: true,
  },
  {
    label: "Ваговий товар",
    name: "isWeight",
    placeholder: "",
    type: "checkbox",
    required: false,
  },
] satisfies ProductField[];

export const excelProductsTitle = {};
