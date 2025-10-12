import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoadProductForm } from "./components/forms/load-product-form";
import { Separator } from "@/components/ui/separator";
import { LoadFromXmlFile } from "./components/load-products-from-xml";
import { DeleteArticlesButton } from "./components/delete-articles-button";
import { GroupFrom } from "./components/forms/group-form";
import { LoadGroupsFromExcel } from "./components/load-groups-from-excel";
import { DeleteGroupButton } from "./components/delete-groups-button";
import { TaxForm } from "./components/forms/tax-form";
import { MessageCircleWarning } from "lucide-react";
import { LoadTaxFromExcel } from "./components/load-tax-from-excel";

export const HomePage = () => {
  return (
    <div className="flex w-full gap-2">
      <Card className="flex-1">
        <CardHeader>
          <CardTitle>Завантаження товару</CardTitle>
        </CardHeader>
        <CardFooter className="flex-col">
          <LoadProductForm className="w-full" />
          <Separator className="my-2" />
          <div className="flex justify-between w-full">
            <DeleteArticlesButton />
            <LoadFromXmlFile />
          </div>
        </CardFooter>
      </Card>

      <div className="flex-1 space-y-2">
        <Card>
          <CardHeader>
            <CardTitle>Завантаження груп товару</CardTitle>
          </CardHeader>
          <CardFooter className="flex-col">
            <GroupFrom className="w-full" />
            <Separator className="my-2" />
            <div className="flex justify-between w-full">
              <DeleteGroupButton />
              <LoadGroupsFromExcel />
            </div>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Завантаження податків</CardTitle>
            <CardDescription>
              <p className="flex gap-1 items-center">
                <MessageCircleWarning size={14} />
                Потрібно, якщо торговий додаток працює без ПРРО
              </p>
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex-col">
            <TaxForm className="w-full" />
            <Separator className="my-2" />
            <LoadTaxFromExcel className="ml-auto block" />
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
