import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MessageCircleWarning } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { TaxForm } from "./components/tax-form";
import { LoadTaxFromExcel } from "./components/load-tax-from-excel";

const TaxPage = () => {
  return (
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
        <LoadTaxFromExcel className="ml-auto " />
      </CardFooter>
    </Card>
  );
};

export default TaxPage;
