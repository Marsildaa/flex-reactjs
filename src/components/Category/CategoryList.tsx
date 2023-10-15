import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import "../style/Category.css";
import AddIcon from "@mui/icons-material/Add";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";
import CategoryItems from "./CategoryItems";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { SelectedItemContext } from "../common/SelectedItemContext";
import useToggle from "../common/useToggle";

interface Props {
  setShowNotes: (val: string) => void;
}
const CategoryList = (props: Props) => {
  const context = useContext(SelectedItemContext);
  const [showCreateCategory, setShowCreateCategory] = useToggle();
  const [categoryName, setCategoryName] = useState<string>("");
  const [refreshCategoryList, setRefreshCategoryList] = useToggle();

  const newCategory = async () => {
    if (categoryName !== "") {
      await axios
        .post(`${process.env.REACT_APP_API_URL}/category.json`, {
          name: categoryName,
        })
        .then((response) => {
          setShowCreateCategory();
          setCategoryName("");
          setRefreshCategoryList();
        })
        .catch((error) => {
          console.log(error, "errorr");
        });
    }
  };

  useEffect(() => {
    props.setShowNotes(context.selectedCategoryId);
  }, [context.selectedCategoryId]);

  return (
    <Card>
      <CardContent>
        {showCreateCategory ? (
          <div style={{ display: "flex" }}>
            <TextField
              placeholder="Add a title..."
              variant="outlined"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target?.value)}
              fullWidth
            />
            <IconButton children={<DoneIcon />} onClick={newCategory} />
            <IconButton
              children={<ClearIcon />}
              onClick={setShowCreateCategory}
            />
          </div>
        ) : (
          <Button
            variant="contained"
            color="success"
            fullWidth
            endIcon={<AddIcon />}
            onClick={setShowCreateCategory}
          >
            <Typography>Create Category</Typography>
          </Button>
        )}

        <CategoryItems refresh={refreshCategoryList} />
      </CardContent>
    </Card>
  );
};

export default CategoryList;
