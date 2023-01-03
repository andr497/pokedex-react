import React from "react";
import ReactDOM from "react-dom";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Divider } from "@mui/material";

const Modal = ({
  isShowing,
  hide,
  transformTitleCss = "none",
  title = "Filler message",
  content = "Content message",
}) =>
  isShowing
    ? ReactDOM.createPortal(
        <React.Fragment>
          <Dialog open={isShowing} onClose={hide}>
            <DialogTitle
              component="h2"
              sx={{ textTransform: transformTitleCss }}
            >
              {title}
            </DialogTitle>
            <Divider />
            <DialogContent>
              {typeof content === "function" ? (
                content()
              ) : (
                <DialogContentText>{content}</DialogContentText>
              )}
            </DialogContent>
            <Divider />
            <DialogActions>
              <Button onClick={hide}>Close</Button>
            </DialogActions>
          </Dialog>
        </React.Fragment>,
        document.body
      )
    : null;

export default Modal;
