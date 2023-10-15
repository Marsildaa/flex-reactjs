import Alert from "@mui/material/Alert";
import { Snackbar } from "@mui/material";

interface Props {
  openSnackbar: boolean;
  setOpenSnackbar: (val: boolean) => void;
  type: "error" | "warning" | "info" | "success";
  message: string;
}

const ShowSnackbar = (props: Props) => {
  return (
    <Snackbar
      open={props.openSnackbar}
      autoHideDuration={6000}
      onClose={() => props.setOpenSnackbar(false)}
    >
      <Alert onClose={() => props.setOpenSnackbar(false)} severity={props.type}>
        {props.message}
      </Alert>
    </Snackbar>
  );
};
export default ShowSnackbar;
