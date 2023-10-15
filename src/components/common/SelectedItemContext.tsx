import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import useToggle from "./useToggle";

export const SelectedItemContext = createContext<any>({
  selectedCategoryId: "",
  updateState: (id: string) => {},
  refreshAllCategories: false,
  setRefreshAllCategories: () => {},
});

const SelectedItemProvider = (props: any) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [refreshAllCategories, setRefreshAllCategories] = useToggle();

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
      }}
    >
      {props.children}
    </SelectedItemContext.Provider>
  );
};

export default SelectedItemProvider;
