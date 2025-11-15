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
  | "amount"
  | "group"
  | "uktzed"
  | "unit"
  | "freePrice";

export type ProductFieldLabel =
  | "Код"
  | "Назва"
  | "Серійний номер"
  | "Штрихкод"
  | "Глобальний код"
  | "Податок"
  | "Ціна"
  | "Кількість"
  | "Група"
  | "УКТЗЕД"
  | "Од. вим."
  | "Ваговий товар"
  | "Довільна ціна";

export type GroupFieldsLabel = "Код" | "Назва";
export type GroupFieldName = "code" | "name";
export type TaxFieldsLabel = "Код" | "Назва";
export type TaxFieldName = "code" | "name";

export const labelToNameMapGroup: Record<GroupFieldsLabel, GroupFieldName> = {
  Код: "code",
  Назва: "name",
};
export const taxToNameMapGroup: Record<TaxFieldsLabel, TaxFieldName> = {
  Код: "code",
  Назва: "name",
};

export const labelToNameMap: Record<ProductFieldLabel, ProductFieldName> = {
  Код: "code",
  Назва: "name",
  "Серійний номер": "serial",
  Штрихкод: "barcode",
  "Глобальний код": "globalCode",
  Податок: "tax",
  Ціна: "price",
  "Ваговий товар": "isWeight",
  Кількість: "amount",
  Група: "group",
  УКТЗЕД: "uktzed",
  "Од. вим.": "unit",
  "Довільна ціна": "freePrice",
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

  // {
  //   label: "MRC Ціна",
  //   name: "mrcPrice",
  //   placeholder: "Введіть MRC ціну",
  //   type: "text",
  //   required: true,
  // },
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
  {
    label: "Довільна ціна",
    name: "freePrice",
    placeholder: "",
    type: "checkbox",
    required: false,
  },
] satisfies ProductField[];

export const groupFields = [
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
] as const;

export const taxFields = [
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
] as const;
