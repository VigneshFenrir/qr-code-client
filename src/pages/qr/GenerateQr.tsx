import React, { useEffect, useRef, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import api from "@/service/api";
import { toast } from "sonner";

export type ProductType = {
  productName: string;
  color: string;
  price: number|string;
};

const GenerateQR: React.FC = () => {
  const qrRef = useRef<HTMLDivElement | null>(null);
  const [productData, setProductData] = useState<ProductType>({
    productName: "",
    color: "",
    price: "", 
  });
  const [error, setError] = useState<string>("");
  const [qrValue, setQrvalue] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);

  const handleDownloadQr = () => {
    const canvas = qrRef.current?.querySelector("canvas");
    if (!canvas) return;

    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    const downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "qr-code.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const handlePrintQr = () => {
    window.print();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    
    setProductData((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value): value,
    }));
  };

  const handleSubmit = async () => {
    if (!productData.productName || !productData.color || !productData.price) {
      setError("Please fill in all fields before generating QR.");
      return;
    }

    setLoading(true);
    try {
      await api.post("/product/create", productData);
      toast.success("QR generated successfully");
      setError("");
      setQrvalue(
        `PRODUCTNAME:${productData.productName.toUpperCase()}*COLOR:${productData.color.toUpperCase()}*PRICE:${
          productData.price
        }` || ""
      );
    } catch (error: any) {
      console.log(error);
      const errormessage = error.response?.data?.error;
      setError(
        errormessage || "Error in generating Qr...Please try again later"
      );
      setQrvalue("");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = "Generate Qr Code";
  }, []);
  useEffect(() => {
    setQrvalue("");
    setError("");
  }, [productData.productName, productData.color, productData.price]);
  return (
    <main className="p-4 space-y-4">
      <Label>Product Name</Label>
      <Input
        type="text"
        onChange={handleChange}
        value={productData.productName}
        placeholder="Enter Product Name"
        name="productName"
      />
      <Label>Product Color</Label>

      <Input
        type="text"
        onChange={handleChange}
        value={productData.color}
        placeholder="Enter Product Color"
        name="color"
      />
      <Label>Product Price</Label>

      <Input
        type="number"
        onChange={handleChange}
        value={productData.price}
        placeholder="Enter Product Price"
        name="price"
      />
      {error && <p className="text-red-500 font-semibold">{error}</p>}
      <div className="flex justify-center gap-4 items-center">
        <Button
          variant={"success"}
          onClick={handleSubmit}
          disabled={isLoading || !!qrValue}
        >
          {isLoading ? (
            <>
              {" "}
              <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-[spin_1s_linear_infinite]"></div>
              <span className="text-white">Generating</span>
            </>
          ) : (
            "Generate QR"
          )}
        </Button>
      </div>
      {qrValue && (
        <div className="flex flex-col items-center gap-4 ">
          <div ref={qrRef}>
            <QRCodeCanvas value={qrValue} size={256} includeMargin />
          </div>
          <div className="flex gap-2">
            <Button onClick={handleDownloadQr}>Download</Button>
            <Button onClick={handlePrintQr}>Print</Button>
          </div>
        </div>
      )}
      {/* Print Section */}
      <div className="print-section hidden print:block p-6">
        <div className="flex border border-black p-4 mb-6 items-center gap-6 page-break">
          <QRCodeCanvas
            value={`PRODUCTNAME:${productData.productName.toUpperCase()}*COLOR:${productData.color.toUpperCase()}*PRICE:${
              productData.price
            }`}
            size={100}
            includeMargin
            className="w-32 h-32 border"
          />
          <div className="text-left text-lg">
            <p>
              <strong>Product Name:</strong> {productData.productName}
            </p>
            <p>
              <strong>Color:</strong> {productData.color}
            </p>
            <p>
              <strong>Price:</strong> ₹{productData.price}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default GenerateQR;
