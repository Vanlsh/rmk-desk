import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LoadProductForm } from "./components/forms/load-product-form";
import { Separator } from "@/components/ui/separator";
import { LoadFromXmlFile } from "./components/load-from-xml";
import { DeleteArticlesButton } from "./components/delete-articles-button";

export const HomePage = () => {
  return (
    <div>
      <Card className="max-w-2xl">
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
    </div>
  );
};
