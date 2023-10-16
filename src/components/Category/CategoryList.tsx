import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";
import CategoryItems from "./CategoryItems";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { SelectedItemContext } from "../common/SelectedItemContext";
import useToggle from "../common/useToggle";
import "../style/General.css";
import SnackbarShowFunction from "../common/SnackbarShowFunction";

interface Props {
  setShowNotes: (val: string) => void;
}
const CategoryList = (props: Props) => {
  const context = useContext(SelectedItemContext);
  const [showCreateCategory, setShowCreateCategory] = useToggle();
  const [categoryName, setCategoryName] = useState<string>("");
  const [refreshCategoryList, setRefreshCategoryList] = useToggle();
  const snackbar = SnackbarShowFunction();

  const newCategory = async () => {
    if (categoryName !== "") {
      context.setLoading(true);
      await axios
        .post(`${process.env.REACT_APP_API_URL}/category.json`, {
          name: categoryName,
        })
        .then((response) => {
          setShowCreateCategory();
          setCategoryName("");
          setRefreshCategoryList();
          context.setLoading(false);
          snackbar.show("success", "Category created successfully!");
        })
        .catch((error) => {
          context.setLoading(false);
          snackbar.show("error", "Error creating category!");
        });
    }
  };

  useEffect(() => {
    props.setShowNotes(context.selectedCategoryId);
  }, [context.selectedCategoryId]);

  return (
    <Card className="card">
      <CardContent>
        {showCreateCategory ? (
          <div style={{ display: "flex", gap: 3 }}>
            <TextField
              placeholder="Add a title..."
              variant="outlined"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target?.value)}
              fullWidth
              InputProps={{
                style: { height: "32px" },
              }}
            />
            <Button
              variant="contained"
              onClick={newCategory}
              className="createButton"
            >
              <DoneIcon />
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                setShowCreateCategory();
                setCategoryName("");
              }}
              className="deleteButton"
            >
              <ClearIcon />
            </Button>
          </div>
        ) : (
          <Button
            variant="contained"
            className="createButton"
            fullWidth
            onClick={setShowCreateCategory}
          >
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <Grid item xs={11}>
                <Typography className="textButton">Create Category</Typography>
              </Grid>
              <Grid item xs={1} mt={1}>
                <AddIcon />
              </Grid>
            </Grid>
          </Button>
        )}

        <CategoryItems refresh={refreshCategoryList} />
      </CardContent>
    </Card>
  );
};

export default CategoryList;
