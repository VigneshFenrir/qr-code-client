import React, { useEffect, useState } from "react";
import { BrowserQRCodeReader } from "@zxing/browser";
import { ProductType } from "./GenerateQr";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ReadQr: React.FC = () => {
  const [data, setData] = useState<ProductType | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setError(null);
    setData(null);

    const imageUrl = URL.createObjectURL(file);
    try {
      const codeReader = new BrowserQRCodeReader();
      const result = await codeReader.decodeFromImageUrl(imageUrl);
      const value = result.getText();

      if (value) {
        console.log(value);
        const valuesplitted = value.split("*");
        console.log(valuesplitted);
        const setvalue = valuesplitted.map((each) => each.split(":")).flat();
        console.log(setvalue);
        if (setvalue[0] !== "PRODUCTNAME") {
          return setError("INVALID QR CODE");
        }
        setData({
          productName: setvalue[1],
          color: setvalue[3],
          price: Number(setvalue[5]),
        });
      }else{      return setError("INVALID QR CODE")
}
    } catch (err) {
      console.error(err);
      setError("Failed to read QR code. Make sure it's clear and visible.");
      setData(null);
    }
  };
  useEffect(() => {
    document.title = "Read Qr Code";
  }, []);

  return (
    <main className="p-4 space-y-4">
      <h1 className="text-xl font-semibold">Read QR Code</h1>
      <div className="grid w-full max-w-sm items-center gap-1.5"></div>
      <Label htmlFor="qrCode">Upload Qr Code </Label>
      <Input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="block"
        id="qrCode"
      />

      {data && (
        <div className="p-2 bg-green-100 border border-green-400 rounded">
          <div className="flex flex-col gap-2">
            <h2 className="font-semibold text-4xl pb-2">Product Details</h2>
            <strong>Product Name:</strong> {data.productName}
            <strong>Product Color:</strong> {data.color}
            <strong>Product Price:</strong> {data.price}
          </div>
        </div>
      )}
      {error && (
        <div className="p-2 bg-red-100 border border-red-400 rounded">
          <strong>Error:</strong> {error}
        </div>
      )}
    </main>
  );
};

export default ReadQr;
