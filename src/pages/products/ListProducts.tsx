import React, { useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ProductType } from "../qr/GenerateQr";
import api from "@/service/api";
import { toast } from "sonner";

const Products: React.FC = () => {
  const [products, setProducts] = useState<ProductType[]>([]);

  const fetchProducts = async () => {
    try {
      const response = await api.get("/product/getAll");
      setProducts(response.data.productData || []);
    } catch (error: any) {
      if (error.response?.data?.error) {
        toast.error("Failed to fetch data");
      }
      console.error(error);
    }
  };

  useEffect(() => {
    document.title = "Products List";
    fetchProducts();
  }, []);

  return (
    <div className="flex flex-col gap-3 ">
      <h2 className="text-start p-3 text-3xl font-semibold mt-3">
        Products Table
      </h2>
      <div className="p-3 border mx-10">
        {products.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product Name</TableHead>
                <TableHead>Color</TableHead>
                <TableHead>Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    {product.productName}
                  </TableCell>
                  <TableCell>{product.color}</TableCell>
                  <TableCell>{product.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className="text-center py-4">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default Products;
