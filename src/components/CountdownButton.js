import * as React from 'react';
import { Button, Dialog, Grid, Typography } from '@mui/material';
import Countdown from './Countdown';

export default function CountdownButton(actiontype) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" sx={{ backgroundColor: "#013220", color: "#FFFFFF" }} onClick={handleClickOpen}>
        Start
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Grid container spacing={2} direction="column" alignItems="center"
        sx={{ paddingRight: "3rem", paddingLeft: "3rem", paddingBottom: "3rem", paddingTop: "3rem"}}>
          <Grid item>
            <Typography variant="h4">
              Starting In...
            </Typography>
          </Grid>
          <Grid item>
            <Countdown handleClose={handleClose} />
          </Grid>
        </Grid>
      </Dialog>
    </div>
  );
}
