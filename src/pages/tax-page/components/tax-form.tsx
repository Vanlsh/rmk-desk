import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { showIpNotRespondingMessage, showNoIpMessage } from "@/lib/messages";
import { useIpStore } from "@/store/ip";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { taxSchema, type TaxSchema } from "../../../utils/schemas";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { taxFields } from "../../../utils/constants";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface TaxFormProps {
  className?: string;
}
export const TaxForm = ({ className }: TaxFormProps) => {
  const { ip } = useIpStore();
  const [isLoading, startTransition] = useTransition();

  const form = useForm<TaxSchema>({
    resolver: zodResolver(taxSchema),
    defaultValues: {
      code: 0,
      name: "",
    },
  });

  const onSubmit = (value: TaxSchema) => {
    if (!ip) return showNoIpMessage();

    startTransition(async () => {
      const response = await window.api.setTaxes(ip, [value]);

      if (response.error) {
        showIpNotRespondingMessage();
        return;
      }

      if (response.data.success) {
        toast.success(response.data.message);
        form.reset();
      } else {
        toast.error(response.data.message);
      }
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("space-y-2", className)}
      >
        <div className="gap-2 grid grid-cols-2">
          {taxFields.map((taxField) => (
            <FormField
              key={taxField.name}
              control={form.control}
              name={taxField.name}
              render={({ field }) => (
                <FormItem>
                  <div className="space-y-2 items-center py-1 ">
                    <Label>{taxField.label}</Label>
                    <FormControl>
                      <Input
                        placeholder={taxField.placeholder}
                        {...field}
                        value={
                          typeof field.value === "string"
                            ? field.value
                            : String(field.value)
                        }
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>
        <Button disabled={isLoading} className="ml-auto block">
          Завантажити податок
        </Button>
      </form>
    </Form>
  );
};
