"use client";

import { useProductStore } from "@/store/product";

import { ProductTableWrapper } from "./components/product-table";
import { Card, CardContent } from "@/components/ui/card";
import { DeleteArticlesButton } from "../home-page/components/delete-articles-button";
import { LoadFromXmlFile } from "./components/load-products-from-xml";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";
import { newProductRoute } from "@/lib/constants";

export interface Product {
  code: number;
  name: string;
  serial: string;
  barcode: string;
  globalCode: string;
  tax: number;
  price: number;
  isWeight: boolean;
  mrcPrice: number;
  amount: number;
  group: string;
  uktzed: string;
  unit: string;
  freePrice: boolean;
}

const ProductPage = () => {
  const { product } = useProductStore();

  return (
    <div className="space-y-2 py-4">
      <Card className="py-2">
        <CardContent className="px-3">
          <div className="flex justify-between w-full">
            <LoadFromXmlFile />
            <div className="flex gap-1">
              <DeleteArticlesButton />
              <Button asChild>
                <NavLink to={newProductRoute.path}>
                  {newProductRoute.label}
                </NavLink>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      {product && <ProductTableWrapper products={product} />}
    </div>
  );
};

export default ProductPage;
