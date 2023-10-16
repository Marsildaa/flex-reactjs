import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Grid,
  TextareaAutosize,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { SelectedItemContext } from "../common/SelectedItemContext";
import DoneIcon from "@mui/icons-material/Done";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { Note } from "../common/Interfaces";
import "../style/General.css";
import SnackbarShowFunction from "../common/SnackbarShowFunction";

interface Props {
  notes: Array<Note>;
  editNoteId: string;
  onEditOrDelete: () => void;
}

const EditNote = (props: Props) => {
  const [editedNote, setEditedNote] = useState<any>({
    title: "",
    message: "",
  });

  const context = useContext(SelectedItemContext);
  const snackbar = SnackbarShowFunction();

  const handleChange = (e: any) => {
    setEditedNote({ ...editedNote, [e.target.name]: e.target.value });
  };

  const editNote = () => {
    context.setLoading(true);
    const id = context.selectedCategoryId;
    let noteList: Array<Note> = JSON.parse(JSON.stringify(props.notes));
    let updatedNoteList = noteList.map((note) => {
      if (note.id === props.editNoteId) {
        return { ...note, ...editedNote };
      } else {
        return note;
      }
    });
    axios
      .patch(`${process.env.REACT_APP_API_URL}/category/${id}.json`, {
        notes: updatedNoteList,
      })
      .then(() => {
        props.onEditOrDelete();
        context.setRefreshAllCategories();
        setEditedNote({ title: "", message: "" });
        context.setLoading(false);
        snackbar.show("success", "Note updated successfully!");
      })
      .catch((error) => {
        context.setLoading(false);
        snackbar.show("error", "Error updating note!");
      });
  };

  const deleteNote = () => {
    context.setLoading(true);
    const id = context.selectedCategoryId;
    let noteList: Array<Note> = JSON.parse(JSON.stringify(props.notes));
    const deletedElementIndex = noteList.findIndex(
      (el) => el.id == props.editNoteId
    );
    noteList.splice(deletedElementIndex, 1);
    axios
      .patch(`${process.env.REACT_APP_API_URL}/category/${id}.json`, {
        notes: noteList,
      })
      .then(() => {
        props.onEditOrDelete();
        context.setRefreshAllCategories();
        setEditedNote({ title: "", message: "" });
        context.setLoading(false);
        snackbar.show("success", "Note deleted successfully!");
      })
      .catch((error) => {
        console.error("Error updating data:", error);
        context.setLoading(false);
        snackbar.show("error", "Error deleting note!");
      });
  };

  useEffect(() => {
    let note: any = props.notes.find((el) => el.id == props.editNoteId);
    setEditedNote({
      title: note.title,
      message: note.message,
    });
  }, [props.editNoteId]);

  return (
    <Card className="card">
      <CardContent>
        <TextField
          variant="standard"
          placeholder="Add a title"
          name="title"
          value={editedNote.title}
          onChange={(event) => handleChange(event)}
          fullWidth
        />

        <TextareaAutosize
          minRows={40}
          maxRows={100}
          className="custom-textarea"
          style={{ width: "100%", border: "none" }}
          name="message"
          value={editedNote.message}
          placeholder="Write your note here..."
          onChange={(event) => handleChange(event)}
        />
        <Grid
          container
          mt={4}
          direction="row"
          justifyContent="space-between"
          alignItems="flex-end"
        >
          <Grid item>
            <Button
              variant="contained"
              color="error"
              fullWidth
              endIcon={<DeleteIcon />}
              onClick={deleteNote}
            >
              <Typography>Delete Note</Typography>
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="success"
              fullWidth
              endIcon={<DoneIcon />}
              disabled={!Object.values(editedNote).every((el) => el)}
              onClick={editNote}
            >
              <Typography>Save Changes</Typography>
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default EditNote;
