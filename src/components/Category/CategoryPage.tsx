import { Box, CardContent, Grid, Card } from "@mui/material";
import CategoryList from "./CategoryList";
import CreateNote from "../Note/CreateNote";
import { useState } from "react";
import useToggle from "../common/useToggle";
import NotePage from "../Note/NotePage";

const CategoryPage = () => {
  const [showNotes, setShowNotes] = useState<string>("");

  return (
    <Box p={2}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <CategoryList setShowNotes={setShowNotes} />
        </Grid>
        <Grid item xs={9}>
          {showNotes ? (
            <NotePage />
          ) : (
            <Card>
              <CardContent>
                <div>Select a category to add notes</div>
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default CategoryPage;
