import { Box, CardContent, Grid, Card, Typography } from "@mui/material";
import CategoryList from "./CategoryList";
import { useState } from "react";
import NotePage from "../Note/NotePage";
import "../style/General.css";

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
            <Card className="card">
              <CardContent>
                <Typography variant="h6" component="div" align="center" p={20}>
                  Select a category to add notes
                </Typography>
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default CategoryPage;
