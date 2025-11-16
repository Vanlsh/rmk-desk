import { NavLink } from "react-router-dom";
import { LoadProductForm } from "../components/load-product-form";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const NewProductPage = () => {
  return (
    <div className="space-y-3">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <NavLink to="/">Товари</NavLink>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Новий товар</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Card className="flex-1">
        <CardHeader>
          <CardTitle>Завантаження товару</CardTitle>
        </CardHeader>
        <CardFooter className="flex-col">
          <LoadProductForm className="w-full" shouldReset />
        </CardFooter>
      </Card>
    </div>
  );
};

export default NewProductPage;
