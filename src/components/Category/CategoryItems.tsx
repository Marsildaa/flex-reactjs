import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import FolderIcon from "@mui/icons-material/Folder";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { SelectedItemContext } from "../common/SelectedItemContext";

interface Props {
  refresh: boolean;
}

const CategoryItems = (props: Props) => {
  const [categoryData, setCategoryData] = useState<any>([]);
  const context = useContext(SelectedItemContext);

  const fetchData = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/category.json`)
      .then((response) => {
        setCategoryData(response.data);
      })
      .catch((error) => {
        console.log(error, "errorr");
      });
  };

  useEffect(() => {
    fetchData();
  }, [props.refresh, context.refreshAllCategories]);
  console.log(categoryData);

  return (
    <>
      {categoryData &&
        Object.values(categoryData).map((item: any, index: number) => (
          <Box pt={2}>
            <Button
              style={{
                background:
                  Object.keys(categoryData)[index] == context.selectedCategoryId
                    ? "#F8F8FA"
                    : "#1264A3",
                color:
                  Object.keys(categoryData)[index] == context.selectedCategoryId
                    ? "#323338"
                    : "white",
              }}
              variant="contained"
              key={index}
              fullWidth
              onClick={() =>
                context.updateState(Object.keys(categoryData)[index])
              }
            >
              <Typography>{`${item.name} (${
                item.notes ? item.notes.length : 0
              })`}</Typography>
            </Button>
          </Box>
        ))}
    </>
  );
};

export default CategoryItems;
