import { Box, Typography } from "@mui/material";
import { Note } from "../common/Interfaces";
import "../style/General.css";

interface Props {
  notes: Array<Note>;
  searchValue: string;
  editNote: (id: string) => void;
  showCreateNote: boolean;
  editNoteId: string;
}

const NoteItems = (props: Props) => {
  return (
    <Box mt={1}>
      {props.notes.filter((el) =>
        el.title.toUpperCase().includes(props.searchValue.toUpperCase())
      ).length > 0 ? (
        props.notes
          .filter((el) =>
            el.title.toUpperCase().includes(props.searchValue.toUpperCase())
          )
          .map((note: Note) => (
            <Box
              sx={{
                cursor: props.showCreateNote ? "" : "pointer",
                background: props.editNoteId == note.id ? "#f0f0f0" : "",
                "&:hover": {
                  background: props.showCreateNote ? "" : "#f0f0f0",
                },
              }}
              p={2}
              onClick={() => {
                props.editNote(note.id);
              }}
            >
              <div style={{ fontWeight: "700" }}>{note?.title}</div>
              <div>{note?.message}</div>
              <hr className="hr" />
            </Box>
          ))
      ) : (
        <Typography variant="h6" component="div" align="center" p={20}>
          No notes available
        </Typography>
      )}
    </Box>
  );
};

export default NoteItems;
