import { HashRouter, Routes, Route } from "react-router-dom";
// import { HomePage } from "./pages/home-page/home-page";
import { MainLayout } from "./layouts/main-layout";
import { CheckPate } from "./pages/check-page/check-page";
import SettingLayout from "./layouts/setting-layout";
import ProductPage from "./pages/product-page/product-page";
import GroupPage from "./pages/group-page/group-page";
import TaxPage from "./pages/tax-page/tax-page";
import NewProductPage from "./pages/product-page/new-product-page/new-product-page";
import EditProductPage from "./pages/product-page/edit-product-page/edit-product-page";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route element={<SettingLayout />}>
            <Route index element={<ProductPage />} />
            <Route path="group" element={<GroupPage />} />
            <Route path="tax" element={<TaxPage />} />
          </Route>
          <Route path="new-product" element={<NewProductPage />} />
          <Route path="edit-product/:code" element={<EditProductPage />} />
          <Route path="/check" element={<CheckPate />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
