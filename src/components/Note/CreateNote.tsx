import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Grid,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { SelectedItemContext } from "../common/SelectedItemContext";
import { set, ref, push } from "firebase/database";
import { db } from "../../firebaseConfig";
import DoneIcon from "@mui/icons-material/Done";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { Note } from "../common/Interfaces";

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

  const handleChange = (e: any) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const newNote = () => {
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
      })
      .catch((error) => {
        console.error("Error updating data:", error);
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
    <Card>
      <CardContent>
        <TextField
          variant="standard"
          placeholder="Add a title"
          name="title"
          value={note.title}
          onChange={(event) => handleChange(event)}
          fullWidth
        />
        <TextField
          name="message"
          variant="standard"
          value={note.message}
          placeholder="Write your note here..."
          onChange={(event) => handleChange(event)}
          fullWidth
        />
        <Grid
          sx={{ marginTop: "20px" }}
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
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
      </CardContent>
    </Card>
  );
};

export default CreateNote;
