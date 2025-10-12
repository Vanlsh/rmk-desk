import { HashRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/home-page/home-page";
import { MainLayout } from "./layouts/main-layout";
import { CheckPate } from "./pages/check-page/check-page";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/check" element={<CheckPate />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
