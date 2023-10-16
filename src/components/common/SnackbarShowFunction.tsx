import { AlertColor } from "@mui/material";
import { useContext } from "react";
import { SelectedItemContext } from "./SelectedItemContext";

interface SnackbarOptions {
  show: boolean;
}

const initialOptions: SnackbarOptions = {
  show: true,
};

const SnackbarShowFunction = (options: SnackbarOptions = initialOptions) => {
  const context = useContext(SelectedItemContext);

  const show = (type?: AlertColor, message?: string, showAlert?: boolean) =>
    context.setSnackbar({
      attributes: {
        message: message,
        type: type,
        show: showAlert == false ? showAlert : options.show,
      },
    });

  return {
    show,
  };
};

export default SnackbarShowFunction;
