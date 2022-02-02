import React, { useState } from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SimpleSnackbar({
  openSnackbar,
  handleCloseSnackbar,
  autoHideDuration,
  message,
  actionType,
  severity,
}) {
  const vertical = "top";
  const horizontal = "right";

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    handleCloseSnackbar();
  };
  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleCloseSnackbar}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={autoHideDuration}
        onClose={handleClose}
        message={message}
        action={severity === "info" ? null : action}
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert variant="filled" severity={severity} onClose={handleClose}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
