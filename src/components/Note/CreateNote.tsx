import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Grid,
  CardActions,
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
  setShowCreateNote: () => void;
  notes: Array<Note>;
}

const CreateNote = (props: Props) => {
  const [note, setNote] = useState<any>({
    title: "",
    message: "",
  });
  const context = useContext(SelectedItemContext);
  const snackbar = SnackbarShowFunction();

  const handleChange = (e: any) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const newNote = () => {
    context.setLoading(true);
    const id = context.selectedCategoryId;
    let noteList: Array<Note> = JSON.parse(JSON.stringify(props.notes));
    noteList.push({ ...note, id: generateId() });
    axios
      .patch(`${process.env.REACT_APP_API_URL}/category/${id}.json`, {
        notes: noteList,
      })
      .then(() => {
        setNote({ title: "", message: "" });
        props.setShowCreateNote();
        context.setRefreshAllCategories();
        context.setLoading(false);
        snackbar.show("success", "Note created successfully!");
      })
      .catch((error) => {
        context.setLoading(false);
        snackbar.show("error", "Error creating note!");
      });
  };

  const generateId = () => {
    return new Date().getTime() + Math.random().toString().substring(2, 9);
  };

  const deleteNote = () => {
    setNote({ title: "", message: "" });
    props.setShowCreateNote();
  };

  useEffect(() => {
    setNote({ title: "", message: "" });
  }, [context.selectedCategoryId]);

  return (
    <Card className="card">
      <CardContent>
        <TextField
          sx={{ mb: 2 }}
          variant="standard"
          placeholder="Add a title"
          name="title"
          value={note.title}
          onChange={(event) => handleChange(event)}
          fullWidth
        />
        <TextareaAutosize
          minRows={40}
          maxRows={100}
          className="custom-textarea"
          style={{ width: "100%", border: "none" }}
          name="message"
          value={note.message}
          placeholder="Write your note here..."
          onChange={(event) => handleChange(event)}
        />
      </CardContent>
      <CardActions>
        <Grid
          container
          mt={4}
          direction="row"
          className="cardButtons"
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
              disabled={!Object.values(note).every((el) => el)}
              onClick={newNote}
            >
              <Typography>Save Changes</Typography>
            </Button>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

export default CreateNote;
