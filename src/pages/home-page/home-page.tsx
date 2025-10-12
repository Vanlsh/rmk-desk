import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LoadProductForm } from "./components/forms/load-product-form";
import { Separator } from "@/components/ui/separator";
import { LoadFromXmlFile } from "./components/load-products-from-xml";
import { DeleteArticlesButton } from "./components/delete-articles-button";
import { GroupFrom } from "./components/forms/group-form";
import { LoadGroupsFromExcel } from "./components/load-groups-from-excel";
import { DeleteGroupButton } from "./components/delete-groups-button";

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

      <div className="flex-1">
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
      </div>
    </div>
  );
};
