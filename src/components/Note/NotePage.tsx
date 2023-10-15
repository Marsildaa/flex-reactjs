import {
  Box,
  Typography,
  Grid,
  Button,
  CardContent,
  Card,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import useToggle from "../common/useToggle";
import CreateNote from "./CreateNote";
import NoteItems from "./NoteItems";
import { useContext, useEffect, useState } from "react";
import { SelectedItemContext } from "../common/SelectedItemContext";
import axios from "axios";
import EditNote from "./EditNote";
import { Note } from "../common/Interfaces";

const NotePage = () => {
  const [showCreateNote, setShowCreateNote] = useToggle();
  const [refresNotePage, setRefresNotePage] = useToggle();
  const [notes, setNotes] = useState<Array<Note>>([]);
  const context = useContext(SelectedItemContext);
  const [searchValue, setSearchValue] = useState<string>("");
  const [editNoteId, setEditNoteId] = useState<string>("");

  const getCategory = () => {
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
      });
  };

  useEffect(() => {
    setNotes([]);
    getCategory();
    setSearchValue("");
    setEditNoteId("");
  }, [context.selectedCategoryId, context.refreshAllCategories]);

  return (
    <Box sx={{ display: "flex", gap: "16px" }}>
      <Grid xs={showCreateNote || editNoteId ? 4 : 12}>
        <Card>
          <CardContent>
            <Box sx={{ display: "flex", gap: 2, width: "75%" }}>
              <Button
                variant="contained"
                color="success"
                fullWidth
                endIcon={<AddIcon />}
                disabled={editNoteId != ""}
                onClick={() => {
                  setSearchValue("");
                  setShowCreateNote();
                }}
              >
                <Typography>Create Note</Typography>
              </Button>

              {!showCreateNote && !editNoteId && (
                <TextField
                  placeholder="Search"
                  variant="outlined"
                  fullWidth
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
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
              <div>No notes available for selected category</div>
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
