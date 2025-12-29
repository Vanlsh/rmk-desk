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

import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { groupSchema, type GroupSchema } from "@/pages/utils/schemas";
import { groupFields } from "@/pages/utils/constants";
import { useProductStore } from "@/store/product";
import { Checkbox } from "@/components/ui/checkbox";

interface GroupFromProps {
  className?: string;
}

export const GroupFrom = ({ className }: GroupFromProps) => {
  const { ip } = useIpStore();
  const { updateGroup, addGroup } = useProductStore();
  const [isLoading, startTransition] = useTransition();

  const form = useForm<GroupSchema>({
    resolver: zodResolver(groupSchema),
    defaultValues: {
      code: 0,
      name: "",
      isTaxes: false,
      isBulk: false,
    },
  });

  const onSubmit = (value: GroupSchema) => {
    if (!ip) return showNoIpMessage();

    startTransition(async () => {
      const response = await window.api.setGroups(ip, [value]);

      if (response.error) {
        showIpNotRespondingMessage();
        return;
      }

      if (response.data.success) {
        toast.success(response.data.message);
        form.reset();
        const { saved_groups, updated_groups } = response.data;

        updated_groups.forEach((group) =>
          updateGroup({ previousName: value.name, newName: group.name })
        );
        saved_groups.forEach((group) => addGroup(group.name));
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
          {groupFields.map((groupField) => (
            <FormField
              key={groupField.name}
              control={form.control}
              name={groupField.name}
              render={({ field }) => (
                <FormItem>
                  {groupField.type === "text" && (
                    <div className="space-y-2 items-center py-1 ">
                      <Label>{groupField.label}</Label>
                      <FormControl>
                        <Input
                          placeholder={groupField.placeholder}
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
                  {groupField.type === "checkbox" && (
                    <div className="flex gap-2 items-center py-1">
                      <FormControl>
                        <Checkbox
                          checked={Boolean(field.value)}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <Label>{groupField.label}</Label>
                    </div>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>
        <Button disabled={isLoading} className="ml-auto block">
          Завантажити групу
        </Button>
      </form>
    </Form>
  );
};
