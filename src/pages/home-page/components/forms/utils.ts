import {
  labelToNameMap,
  labelToNameMapGroup,
  type GroupFieldName,
  type GroupFieldsLabel,
  type ProductFieldLabel,
  type ProductFieldName,
  type TaxFieldName,
  type TaxFieldsLabel,
} from "./constants";
import {
  groupSchema,
  productSchema,
  type GroupSchema,
  type ProductSchema,
  type TaxSchema,
} from "./schemas";

export function convertExcelData(
  excelData: Record<ProductFieldLabel, unknown>[]
): Record<ProductFieldName, unknown>[] {
  return excelData.map((item) => {
    const product: Record<ProductFieldName, unknown> = {} as Record<
      ProductFieldName,
      unknown
    >;

    for (const [label, value] of Object.entries(item)) {
      const key = labelToNameMap[label as ProductFieldLabel];
      if (key) {
        if (["code", "tax", "price", "mrcPrice", "amount"].includes(key)) {
          product[key] = Number(value);
        } else if (key === "isWeight") {
          product[key] = value === true || value === "true" || value === 1;
        } else {
          product[key] = value;
        }
      }
    }

    return product;
  });
}

export const convertExcelGroups = (
  excelData: Record<GroupFieldsLabel, unknown>[]
) => {
  return excelData.map((item) => {
    const group: Record<GroupFieldName, unknown> = {} as Record<
      GroupFieldName,
      unknown
    >;

    for (const [label, value] of Object.entries(item)) {
      const key = labelToNameMapGroup[label as GroupFieldsLabel];
      if (key) {
        group[key] = value;
      }
    }
    return group;
  });
};

export const convertExcelTax = (
  excelData: Record<TaxFieldsLabel, unknown>[]
) => {
  return excelData.map((item) => {
    const group: Record<TaxFieldName, unknown> = {} as Record<
      TaxFieldName,
      unknown
    >;

    for (const [label, value] of Object.entries(item)) {
      const key = labelToNameMapGroup[label as TaxFieldsLabel];
      if (key) {
        group[key] = value;
      }
    }
    return group;
  });
};

export const validateTax = (
  normalizedData: Record<TaxFieldName, unknown>[]
) => {
  const valid: TaxSchema[] = [];
  const errors: {
    row: Record<TaxFieldName, unknown>;
    issues: { field: string; message: string }[];
  }[] = [];

  normalizedData.forEach((item) => {
    const parsed = groupSchema.safeParse(item);
    if (parsed.success) {
      valid.push(parsed.data);
    } else {
      const issues = parsed.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      }));
      errors.push({ row: item, issues });
    }
  });
  return { valid, errors };
};

export const validateGroups = (
  normalizedData: Record<GroupFieldName, unknown>[]
) => {
  const valid: GroupSchema[] = [];
  const errors: {
    row: Record<GroupFieldName, unknown>;
    issues: { field: string; message: string }[];
  }[] = [];

  normalizedData.forEach((item) => {
    const parsed = groupSchema.safeParse(item);
    if (parsed.success) {
      valid.push(parsed.data);
    } else {
      const issues = parsed.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      }));
      errors.push({ row: item, issues });
    }
  });
  return { valid, errors };
};

export const validateProducts = (
  normalizedData: Record<ProductFieldName, unknown>[]
) => {
  const valid: ProductSchema[] = [];
  const errors: {
    row: Record<ProductFieldName, unknown>;
    issues: { field: string; message: string }[];
  }[] = [];

  normalizedData.forEach((item) => {
    const parsed = productSchema.safeParse(item);
    if (parsed.success) {
      valid.push(parsed.data);
    } else {
      const issues = parsed.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      }));
      errors.push({ row: item, issues });
    }
  });

  return { valid, errors };
};
