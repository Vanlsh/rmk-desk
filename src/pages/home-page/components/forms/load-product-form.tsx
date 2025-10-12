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
import { productFields } from "./constants";
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
import { productSchema, type ProductSchema } from "./schemas";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useState } from "react";

interface LoadProductFormProps {
  className?: string;
}
export const LoadProductForm = ({ className }: LoadProductFormProps) => {
  const { ip } = useIpStore();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ProductSchema>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      code: 23,
      name: "Молоко 2.5%",
      serial: "A123",
      barcode: "4820001234567",
      globalCode: "UA123456789",
      tax: 1,
      price: 32.5,
      isWeight: true,
      mrcPrice: 35.0,
      amount: 1.0,
      group: "Молочные продукты",
      uktzed: "0401201100",
      unit: "л",
    },
  });

  // const onClick = async () => {
  //   if (!ip) return showNoIpMessage();

  //   const response = await window.api.setArticles(ip, [
  //     {
  //       code: 1001,
  //       name: "Молоко 2.5%",
  //       serial: "A123",
  //       barcode: "4820001234567",
  //       globalCode: "UA123456789",
  //       tax: 1,
  //       price: 32.5,
  //       isWeight: false,
  //       mrcPrice: 35.0,
  //       amount: 1.0,
  //       group: "Молочные продукты",
  //       uktzed: "0401201100",
  //       unit: "л",
  //     },
  //   ]);

  //   if (response.error) return showIpNotRespondingMessage();
  //   console.log("🚀 ~ onClick ~ response:", response);
  // };

  const onSubmit = async (value: ProductSchema) => {
    console.log(value);
    if (!ip) return showNoIpMessage();
    setIsLoading(true);
    const response = await window.api.setArticles(ip, [value]);
    setIsLoading(false);
    if (response.error) return showIpNotRespondingMessage();
    if (response.data.success) {
      return toast.success(response.data.message);
    }
    toast.error(response.data.message);
  };

  console.log(productFields);
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
                            placeholder={productField.placeholder}
                            {...field}
                            value={
                              typeof field.value === "string"
                                ? field.value
                                : String(field.value)
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
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>
          <Button disabled={isLoading} className="ml-auto block">
            Завантажити товар
          </Button>
        </form>
      </Form>
    </>
  );
};
