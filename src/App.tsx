import { BrowserRouter, Route, Routes } from "react-router-dom";
import CategoryPage from "./components/Category/CategoryPage";
import { useContext } from "react";
import CustomLoader from "./components/common/CustomLoader";
import SelectedItemProvider, {
  SelectedItemContext,
} from "./components/common/SelectedItemContext";
import ShowSnackbar from "./components/common/ShowSnackbar";
import { Box } from "@mui/material";

function App() {
  const Loader = () => {
    const context = useContext(SelectedItemContext);

    return <CustomLoader loading={context.loading} />;
  };

  return (
    <BrowserRouter>
      <Box p={2}>
        <SelectedItemProvider>
          <Routes>
            <Route path="/" element={<CategoryPage />} />
          </Routes>
          <Loader />
          <ShowSnackbar />
        </SelectedItemProvider>
      </Box>
    </BrowserRouter>
  );
}

export default App;
