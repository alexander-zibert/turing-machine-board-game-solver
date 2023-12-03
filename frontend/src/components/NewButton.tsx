import IconButton from "@mui/material/IconButton";
import ContentIcon from "@mui/icons-material/ContentPasteRounded";
import Box from "@mui/material/Box";
import EraseIcon from "@mui/icons-material/AutoFixHighRounded";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { usePaletteMode } from "hooks/usePaletteMode";
import { useCanBeSaved } from "hooks/useCanBeSaved";
import { useAppDispatch } from "hooks/useAppDispatch";
import { registrationActions } from "store/slices/registrationSlice";
import { useAppSelector } from "hooks/useAppSelector";
import { useState } from "react";

export function NewButton() {
  const { theme } = usePaletteMode();
  const dispatch = useAppDispatch();
  const canBeSaved = useCanBeSaved();
  const state = useAppSelector((state) => state);

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleClickOpen = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  const handleConfirm = () => {
    dispatch(registrationActions.reset());
    setDialogOpen(false);
  };

  return (
    <>
      <IconButton
        aria-label="new"
        disabled={state.registration.status !== "ready"}
        color="primary"
        sx={{ position: "relative" }}
        onClick={canBeSaved ? handleClickOpen : handleConfirm}
      >
        <ContentIcon />
        <Box
          sx={{
            background: theme.palette.background.default,
            width: theme.spacing(2),
            height: theme.spacing(2),
            bottom: 8,
            position: "absolute",
            right: 8,
          }}
        >
          <EraseIcon
            fontSize="small"
            sx={{
              position: "absolute",
              right: -4,
              bottom: -3,
              fontSize: 18,
            }}
          />
        </Box>
      </IconButton>
      <Dialog
        open={dialogOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Reset Game?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Your game is not saved! Do you really want to create a new game.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Cancel
          </Button>
          <Button onClick={handleConfirm}>Reset Game</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
