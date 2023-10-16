import { Box, Button, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import FolderIcon from "@mui/icons-material/Folder";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { SelectedItemContext } from "../common/SelectedItemContext";
import "../style/General.css";

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

  return (
    <>
      {categoryData &&
        Object.values(categoryData).map((item: any, index: number) => (
          <Box pt={2}>
            <Button
              style={{
                display: "flex",
                justifyContent: "space-between",
                borderRadius: "5px",
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
              className="categoryItem"
              onClick={() =>
                context.updateState(Object.keys(categoryData)[index])
              }
            >
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <Grid
                  item
                  container
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                  gap={1}
                  xs={11}
                >
                  <Grid item>
                    <FolderIcon sx={{ width: "30px", height: "22px" }} />
                  </Grid>
                  <Grid item>
                    <Typography variant="body1" textTransform="none">
                      {`${item.name} (${item.notes ? item.notes.length : 0})`}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item xs={1} mt={0.5}>
                  <ArrowDropDownIcon />
                </Grid>
              </Grid>
            </Button>
          </Box>
        ))}
    </>
  );
};

export default CategoryItems;
