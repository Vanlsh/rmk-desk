import { NavLink, useNavigate, useParams } from "react-router-dom";
import { LoadProductForm } from "../components/load-product-form";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useProductStore } from "@/store/product";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const EditProductPage = () => {
  const navigate = useNavigate();
  const { code } = useParams<{ code: string }>();
  const { product } = useProductStore();

  console.log("🚀 ~ EditProductPage ~ code:", code);

  const currentProduct = product?.find((item) => item.code === Number(code));
  console.log("🚀 ~ EditProductPage ~ currentProduct:", currentProduct);

  const handleSuccess = () => {
    navigate("/");
  };
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
            <BreadcrumbPage>{currentProduct?.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Card className="flex-1">
        <CardHeader>
          <CardTitle>Редагування товару</CardTitle>
        </CardHeader>

        <CardFooter className="flex-col">
          {currentProduct ? (
            <LoadProductForm
              defaultValues={currentProduct}
              className="w-full"
              onHandleSuccess={handleSuccess}
            ></LoadProductForm>
          ) : (
            <p>Товар не знайдено</p>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default EditProductPage;
