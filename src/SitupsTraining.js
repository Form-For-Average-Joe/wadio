import React from 'react';
import {Card, CardMedia, Grid} from '@mui/material';
import useStyles from './components/styles';
import StartButton from './components/StartButton';
import StopButton from './components/StopButton';
import TimeInput from './components/TimeInput';
import DifficultyPanel from './components/DifficultyPanel';

const PushupsAssessment = () => {
  const classes = useStyles();

  return (
    <Grid container
          alignItems="center"
          justifyContent="center">
      <Grid item xs={9}>
        <Card className={classes.CameraFeedback}>
          <CardMedia
            image="https://flabfix.com/wp-content/uploads/2019/05/Sit-Ups.gif"
            title="pushups"
          />
          <Grid container spacing={4} justifyContent="center" style={{marginBottom: "0.5rem", marginTop: "0.5rem"}}>
            <Grid item>
              <TimeInput/>
            </Grid>
            <Grid item>
              <DifficultyPanel/>
            </Grid>
            <Grid item>
              <StartButton/>
            </Grid>
            <Grid item>
              <StopButton/>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
}

export default PushupsAssessment;