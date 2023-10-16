import Alert from "@mui/material/Alert";
import { Box, Collapse, IconButton } from "@mui/material";
import { useContext } from "react";
import { SelectedItemContext } from "./SelectedItemContext";
import CloseIcon from "@mui/icons-material/Close";
import SnackbarShowFunction from "./SnackbarShowFunction";

const ShowSnackbar = () => {
  const context = useContext(SelectedItemContext);
  const snackbar = SnackbarShowFunction();

  return (
    <Box>
      <Collapse in={context.snackbar.attributes.show}>
        <Alert
          severity={context.snackbar.attributes.type}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                snackbar.show(undefined, "", false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {context.snackbar.attributes.message}
        </Alert>
      </Collapse>
    </Box>
  );
};
export default ShowSnackbar;
