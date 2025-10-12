import {
  labelToNameMap,
  type ProductFieldLabel,
  type ProductFieldName,
} from "./constants";
import { productSchema, type ProductSchema } from "./schemas";

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

export const validateProducts = (
  normalizedData: Record<ProductFieldName, unknown>[]
) => {
  const valid: ProductSchema[] = [];
  const errors: {
    rowIndex: number;
    issues: { field: string; message: string }[];
  }[] = [];

  normalizedData.forEach((item, index) => {
    const parsed = productSchema.safeParse(item);
    if (parsed.success) {
      valid.push(parsed.data);
    } else {
      const issues = parsed.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      }));
      errors.push({ rowIndex: index + 1, issues });
    }
  });

  return { valid, errors };
};
