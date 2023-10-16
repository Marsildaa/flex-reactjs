import { createContext, useState } from "react";
import useToggle from "./useToggle";
import { AlertColor } from "@mui/material";

interface SnackbarType {
  attributes: {
    message?: string;
    type?: AlertColor;
    show: boolean;
  };
}

interface IContextOperation {
  selectedCategoryId: string;
  updateState: (id: string) => void;
  refreshAllCategories: boolean;
  setRefreshAllCategories: () => void;
  setLoading: (val: boolean) => void;
  loading: boolean;
  snackbar: SnackbarType;
  setSnackbar: (val: SnackbarType) => void;
}

export const SelectedItemContext = createContext<IContextOperation>({
  selectedCategoryId: "",
  updateState: (id: string) => {},
  refreshAllCategories: false,
  setRefreshAllCategories: () => {},
  setLoading: (val: boolean) => {},
  loading: false,
  snackbar: {
    attributes: {
      message: "Loading...",
      type: "success",
      show: false,
    },
  },
  setSnackbar: (val: SnackbarType) => {},
});

const SelectedItemProvider = (props: any) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [refreshAllCategories, setRefreshAllCategories] = useToggle();
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState<SnackbarType>({
    attributes: {
      message: "Loading...",
      type: "success",
      show: false,
    },
  });

  const updateState = (newState: string) => {
    setSelectedCategoryId(newState);
  };

  return (
    <SelectedItemContext.Provider
      value={{
        selectedCategoryId,
        updateState,
        refreshAllCategories,
        setRefreshAllCategories,
        setLoading,
        loading,
        snackbar,
        setSnackbar,
      }}
    >
      {props.children}
    </SelectedItemContext.Provider>
  );
};

export default SelectedItemProvider;
