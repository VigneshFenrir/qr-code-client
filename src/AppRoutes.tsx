import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const AppRoutes: React.FC = () => {
  const GenerateQR = lazy(() => import("./pages/qr/GenerateQr"));
  const ReadQr = lazy(() => import("./pages/qr/ReadQr"));
  const Products = lazy(() => import("./pages/products/ListProducts"));
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/">
            <Route index element={<GenerateQR />} />
            <Route path="readQr" element={<ReadQr />} />
            <Route path="products" element={<Products />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
};

export default AppRoutes;
