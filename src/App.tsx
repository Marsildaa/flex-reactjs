import { BrowserRouter, Route, Routes } from "react-router-dom";
import CategoryPage from "./components/Category/CategoryPage";
import SelectedItemProvider from "./components/common/SelectedItemContext";

function App() {
  return (
    <BrowserRouter>
      <SelectedItemProvider>
        <Routes>
          <Route path="/" element={<CategoryPage />} />
        </Routes>
      </SelectedItemProvider>
    </BrowserRouter>
  );
}

export default App;
