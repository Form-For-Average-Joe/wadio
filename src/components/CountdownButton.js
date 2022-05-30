import * as React from 'react';
import { Button, Dialog, Grid, Typography } from '@mui/material';
import Countdown from './Countdown';
import { setExercise, setIsStarted } from "../features/exercise/exerciseSlice";
import { resetStageAndCount } from "../features/userValues/userValuesSlice";
import { resetUserTime } from "../features/userProfile/userProfileSlice";
import { useDispatch } from 'react-redux';

export default function CountdownButton(actiontype) {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    dispatch(setExercise('pushups'));
    dispatch(resetStageAndCount());
    dispatch(resetUserTime());
    dispatch(setIsStarted(true));
    setOpen(false);
  };

  const handleSkip = () => {
    handleClose();
  }

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
          sx={{ paddingRight: "4rem", paddingLeft: "4rem", paddingBottom: "2rem", paddingTop: "2rem" }}>
          <Grid item>
            <Typography variant="h4">
              Starting In...
            </Typography>
          </Grid>
          <Grid item>
            <Countdown handleClose={handleClose} />
          </Grid>
          <Grid item sx={{paddingTop: "1rem"}}>
            <Button variant="contained" sx={{ backgroundColor: "#666666", color: "#FFFFFF"}} onClick={handleSkip}>
              Skip
            </Button>
          </Grid>
        </Grid>
      </Dialog>
    </div>
  );
}
