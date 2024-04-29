// src/components/SubscribeModal.js
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  DialogActions,
} from "@mui/material";

function SubscribeModal({
  open,
  handleClose,
  email,
  setEmail,
  handleSubscribe,
}) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>E-Mail Benachrichtigungen</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="email"
          label="Email Address"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Abbrechen</Button>
        <Button onClick={handleSubscribe}>Abonnieren</Button>
      </DialogActions>
    </Dialog>
  );
}

export default SubscribeModal;
