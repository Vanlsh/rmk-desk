import z from "zod";

export const groupSchema = z.object({
  code: z.coerce
    .number<number>({
      message: "Код групи має бути числом",
    })
    .int({ message: "Код групи має бути цілим числом" })
    .min(1, { message: "Код групи не може бути менше 1" }),
  name: z.string().min(1, {
    message: "Назва групи є обов'язковою",
  }),
  isTaxes: z.boolean().optional().default(true),
  isBulk: z.boolean().optional().default(true),
});
export const taxSchema = z.object({
  code: z.coerce
    .number<number>({
      message: "Код групи має бути числом",
    })
    .int({ message: "Код групи має бути цілим числом" })
    .min(1, { message: "Код групи не може бути менше 1" }),
  name: z.string().min(1, {
    message: "Назва групи є обов'язковою",
  }),
});

export const productSchema = z.object({
  code: z.coerce
    .number<number>({
      message: "Код товару має бути числом",
    })
    .int({ message: "Код товару має бути цілим числом" })
    .min(1, { message: "Код товару не може бути менше 1" }),

  name: z.string().min(1, {
    message: "Назва товару є обов'язковою",
  }),

  barcode: z.string({
    message: "Штрихкод є обов'язковим",
  }),

  // globalCode: z.string({
  //   message: "Глобальний код є обов'язковим",
  // }),

  tax: z.coerce
    .number<number>({
      message: "Ставка ПДВ має бути числом",
    })
    .int({ message: "Ставка ПДВ має бути цілим числом" })
    .min(0, { message: "Ставка ПДВ не може бути від’ємною" }),

  price: z.coerce
    .number<number>({
      message: "Ціна є обов'язковою",
    })
    .min(0),

  // mrcPrice: z.coerce.number<number>({
  //   message: "МРЦ є обов'язковою",
  // }),

  amount: z.coerce.number<number>({
    message: "Кількість є обов'язковою",
  }),

  group: z.string({
    message: "Група товару є обов'язковою",
  }),

  uktzed: z.string({
    message: "Код УКТЗЕД є обов'язковим",
  }),

  unit: z.string({
    message: "Одиниця виміру є обов'язковою",
  }),

  isWeight: z.boolean({
    message: "Ознака вагового товару є обов'язковою",
  }),
  freePrice: z.boolean(),
});

export type ProductSchema = z.infer<typeof productSchema>;
export type GroupSchema = z.infer<typeof groupSchema>;
export type TaxSchema = z.infer<typeof taxSchema>;
