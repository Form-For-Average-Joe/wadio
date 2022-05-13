import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import useStyles from './styles';

export default function LoginDialog(actiontype) {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" className={classes.majorbuttons} onClick={handleClickOpen}>
        Login
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Login"}
        </DialogTitle>
        <DialogContent>
          <div>
            <TextField
              required
              id="filled-required"
              label="Username"
              variant="filled"
              fullWidth
              margin='dense'
            />
            <TextField
              required
              id="filled-required"
              label="Password"
              variant="filled"
              fullWidth
              margin='dense'
            />
          </div>
        </DialogContent>
        <DialogActions>
          <div style={{ paddingRight: "2rem", paddingBottom: "1rem" }}>
            <Button type="submit">
              Login
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
}
