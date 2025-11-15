import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useIpStore } from "@/store/ip";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { RefreshCw } from "lucide-react";
import { useProductStore } from "@/store/product";
const ipSchema = z.object({
  ip: z.ipv4(),
});

type IpSchema = z.infer<typeof ipSchema>;

export const IpForms = () => {
  const { ip, setIp } = useIpStore();
  const { fetchProduct } = useProductStore();

  const form = useForm<IpSchema>({
    resolver: zodResolver(ipSchema),
    defaultValues: {
      ip: ip || "",
    },
  });

  const onSubmit = (value: IpSchema) => {
    console.log(value);
    setIp(value.ip);
    form.reset(value);
    toast.success("Ip адрес збережено");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex gap-2 space-y-0"
      >
        <FormField
          control={form.control}
          name="ip"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="192.168.0.1" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-2">
          {form.formState.isDirty && <Button type="submit">Зберегти</Button>}
          {!form.formState.isDirty && ip && (
            <Button type="button" onClick={() => fetchProduct(ip)}>
              <RefreshCw />
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
};
