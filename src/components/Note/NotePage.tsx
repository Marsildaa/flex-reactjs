import {
  Box,
  Typography,
  Grid,
  Button,
  CardContent,
  Card,
  TextField,
  InputAdornment,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import useToggle from "../common/useToggle";
import CreateNote from "./CreateNote";
import NoteItems from "./NoteItems";
import { useContext, useEffect, useState } from "react";
import { SelectedItemContext } from "../common/SelectedItemContext";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import EditNote from "./EditNote";
import { Note } from "../common/Interfaces";
import "../style/General.css";

const NotePage = () => {
  const [showCreateNote, setShowCreateNote] = useToggle();
  const [notes, setNotes] = useState<Array<Note>>([]);
  const context = useContext(SelectedItemContext);
  const [searchValue, setSearchValue] = useState<string>("");
  const [editNoteId, setEditNoteId] = useState<string>("");

  const getCategory = () => {
    context.setLoading(true);
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/category/${context.selectedCategoryId}.json`
      )
      .then((response) => {
        if (response.data?.notes) {
          setNotes(response.data.notes);
        } else {
          setNotes([]);
        }
        context.setLoading(false);
      });
  };

  useEffect(() => {
    setNotes([]);
    getCategory();
    setSearchValue("");
    setEditNoteId("");
    if (showCreateNote) setShowCreateNote();
  }, [context.selectedCategoryId, context.refreshAllCategories]);

  return (
    <Box sx={{ display: "flex", gap: "16px" }}>
      <Grid xs={showCreateNote || editNoteId ? 4 : 12}>
        <Card className="card">
          <CardContent>
            <Box sx={{ display: "flex", gap: 2, width: "75%" }}>
              <Button
                variant="contained"
                className={
                  showCreateNote || editNoteId != ""
                    ? "disabledButton"
                    : "createButton"
                }
                fullWidth
                disabled={editNoteId != "" || showCreateNote}
                onClick={() => {
                  setSearchValue("");
                  setShowCreateNote();
                }}
              >
                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Grid item xs={11}>
                    <Typography className="createNote">Create Note</Typography>
                  </Grid>
                  <Grid item xs={1} mt={1}>
                    <AddIcon />
                  </Grid>
                </Grid>
              </Button>

              {!showCreateNote && !editNoteId && (
                <TextField
                  placeholder="Search..."
                  variant="outlined"
                  fullWidth
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  InputProps={{
                    style: { height: "32px" },
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            </Box>

            {notes.length > 0 ? (
              <NoteItems
                notes={notes}
                searchValue={searchValue}
                editNote={(id) => (showCreateNote ? {} : setEditNoteId(id))}
                showCreateNote={showCreateNote}
                editNoteId={editNoteId}
              />
            ) : (
              <Typography variant="h6" component="div" align="center" p={20}>
                No notes available for selected category
              </Typography>
            )}
          </CardContent>
        </Card>
      </Grid>
      {showCreateNote && (
        <Grid xs={8}>
          <CreateNote setShowCreateNote={setShowCreateNote} notes={notes} />
        </Grid>
      )}
      {editNoteId && (
        <Grid xs={8}>
          <EditNote
            notes={notes}
            editNoteId={editNoteId}
            onEditOrDelete={() => setEditNoteId("")}
          />
        </Grid>
      )}
    </Box>
  );
};

export default NotePage;
