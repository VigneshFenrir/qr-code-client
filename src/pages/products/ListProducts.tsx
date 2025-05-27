import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import api from "@/service/api";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";
type ProductType = {
  _id: string;
  productName: string;
  color: string;
  price: number | null;
  qrImage: string;
};

const Products: React.FC = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const handleToggle = (id: string) => {
    const updated = new Set(selected);
    updated.has(id) ? updated.delete(id) : updated.add(id);
    setSelected(updated);
  };
  const handlePrint = () => {
    window.print();
  };
  const allSelected = products.length > 0 && selected.size === products.length;
  const toggleSelectAll = () => {
    if (allSelected) {
      setSelected(new Set());
    } else {
      setSelected(new Set(products.map((p) => p._id)));
    }
  };
  const selectedProducts = products.filter((p) => selected.has(p._id));

  const deleteProduct = async (id: string) => {
    try {
      const response = await api.delete("/product/delete", { params: { id } });
      if (response.data.success) {
        toast.success(response.data.message);
      }
      fetchProducts();
    } catch (error: any) {
      if (error.response?.data?.error) {
        toast.error("Failed to delete data");
      }
      console.error(error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await api.get("/product/getAll");
      setProducts(response.data.productData || []);
      console.log(response);
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
    <div className="flex flex-col gap-3">
      <h2 className="text-start p-3 text-3xl font-semibold mt-3">
        Products Table
      </h2>
      <div className="px-10 flex justify-end">
        <Button onClick={handlePrint} disabled={selected.size === 0}>
          Print Selected
        </Button>
      </div>
      <div className="p-3 border mx-10">
        {products.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Checkbox
                    checked={allSelected}
                    onCheckedChange={toggleSelectAll}
                  />
                </TableHead>
                <TableHead>Product Name</TableHead>
                <TableHead>Color</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Checkbox
                      checked={selected.has(product._id)}
                      onCheckedChange={() => handleToggle(product._id)}
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    {product.productName}
                  </TableCell>
                  <TableCell>{product.color}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>
                    <div className="flex gap-2 items-center justify-center">
                      <Button
                        variant={"destructive"}
                        onClick={() => deleteProduct(product._id)}
                      >
                        <Trash2 size={24} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className="text-center py-4">No products found.</p>
        )}
      </div>
      {/* Print Section */}
      <div className="print-section hidden print:block p-6">
        {selectedProducts.map((product) => (
          <div
            key={product._id}
            className="flex border border-black p-4 mb-6 items-center gap-6 page-break"
          >
            <QRCodeCanvas
              value={`PRODUCTNAME:${product.productName.toUpperCase()}*COLOR:${product.color.toUpperCase()}*PRICE:${
                product.price
              }`}
              size={100}
              includeMargin
              className="w-32 h-32 border"
            />
            <div className="text-left text-lg">
              <p>
                <strong>Product Name:</strong> {product.productName}
              </p>
              <p>
                <strong>Color:</strong> {product.color}
              </p>
              <p>
                <strong>Price:</strong> ₹{product.price}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
