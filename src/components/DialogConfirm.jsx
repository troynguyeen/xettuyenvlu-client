import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogConfirm = ({ title, content, open, handleClose, onConfirm }) => {
  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle
          sx={{
            fontWeight: "bold",
            color: "red",
            display: " flex",
            alignItems: "center",
          }}
        >
          <WarningAmberIcon sx={{ marginRight: "5px" }} />
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-slide-description"
            sx={{ color: "#000" }}
          >
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ padding: "20px" }}>
          <Button variant="outlined" color="success" onClick={onConfirm}>
            Xác nhận
          </Button>
          <Button variant="outlined" color="error" onClick={handleClose}>
            Hủy
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DialogConfirm;
