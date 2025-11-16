import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { showIpNotRespondingMessage, showNoIpMessage } from "@/lib/messages";
import { useIpStore } from "@/store/ip";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useMemo, useState } from "react";
import { productSchema, type ProductSchema } from "@/pages/utils/schemas";
import { productFields } from "@/pages/utils/constants";
import { useProductStore } from "@/store/product";
import { ComboboxEditableBase } from "@/components/common/search-select";

interface LoadProductFormProps {
  className?: string;
  defaultValues?: ProductSchema;
  onHandleSuccess?: () => void;
  shouldReset?: true;
}
export const LoadProductForm = ({
  className,
  defaultValues,
  onHandleSuccess,
  shouldReset,
}: LoadProductFormProps) => {
  const { ip } = useIpStore();
  const [isLoading, setIsLoading] = useState(false);
  const { product, fetchProduct } = useProductStore();

  const groups = useMemo(
    () => [...new Set(product?.map((p) => p.group).filter(Boolean))],
    [product]
  );

  console.log(groups);
  const form = useForm<ProductSchema>({
    resolver: zodResolver(productSchema),
    defaultValues: defaultValues || {
      code: 0,
      name: "",
      serial: "",
      barcode: "",
      // globalCode: "",
      tax: 0,
      price: 0,
      isWeight: false,
      // mrcPrice: 0,
      amount: 0,
      group: "",
      uktzed: "",
      unit: "",
      freePrice: false,
    },
  });

  const onSubmit = async (value: ProductSchema) => {
    console.log(value);

    if (!ip) return showNoIpMessage();

    const isExist = product?.some((item) => value.code === item.code);

    if (isExist && !defaultValues) {
      const confirmed = confirm("Товар з таким кодом вже існує, оновити його?");
      if (!confirmed) return;
    }

    setIsLoading(true);
    const response = await window.api.setArticles(ip, [value]);
    console.log("🚀 ~ onSubmit ~ response:", response);
    setIsLoading(false);
    if (response.error) return showIpNotRespondingMessage();
    if (response.data.success) {
      toast.success(response.data.message);

      if (shouldReset) {
        form.reset();
      }
      fetchProduct(ip);
      return onHandleSuccess && onHandleSuccess();
    }
    toast.error(response.data.message);
  };

  return (
    <>
      <Form {...form}>
        <form
          className={cn("space-y-2", className)}
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="gap-2 grid grid-cols-2">
            {productFields.map((productField) => (
              <FormField
                key={productField.name}
                control={form.control}
                name={productField.name}
                render={({ field }) => (
                  <FormItem>
                    {productField.type === "text" && (
                      <div className="space-y-2 items-center py-1 ">
                        <Label>{productField.label}</Label>
                        <FormControl>
                          <Input
                            disabled={
                              defaultValues &&
                              productField.name === "code" &&
                              true
                            }
                            placeholder={productField.placeholder}
                            {...field}
                            value={
                              typeof field.value === "string"
                                ? field.value
                                : String(field.value === 0 ? "" : field.value)
                            }
                          />
                        </FormControl>
                      </div>
                    )}
                    {productField.type === "checkbox" && (
                      <div className="flex gap-2 items-center py-1">
                        <FormControl>
                          <Checkbox
                            checked={Boolean(field.value)}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <Label>{productField.label}</Label>
                      </div>
                    )}

                    {productField.type === "select" && (
                      <div className="space-y-2 items-center py-1">
                        <Label>{productField.label}</Label>
                        <FormControl>
                          <Select>
                            <SelectTrigger className="w-full">
                              <SelectValue
                                placeholder={productField.placeholder}
                              />
                            </SelectTrigger>
                            <SelectContent>
                              {productField?.options.map((options) => (
                                <SelectItem key={options} value={options}>
                                  {options}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </div>
                    )}
                    {productField.type === "search-select" && (
                      <div className="space-y-2 items-center py-1">
                        <Label>{productField.label}</Label>
                        <ComboboxEditableBase
                          value={field.value.toString()}
                          onChange={field.onChange}
                          items={groups}
                        />
                      </div>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>
          <Button disabled={isLoading} className="ml-auto block">
            {defaultValues ? "Оновити товар" : "Завантажити товар"}
          </Button>
        </form>
      </Form>
    </>
  );
};
