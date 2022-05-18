import React from 'react';
import { Typography, AppBar, Button, Card, CardActions, CardContent, CardMedia, CssBaseline, Grid, Toolbar, TextField, Container, requirePropFactory } from '@mui/material';
import useStyles from './Components/styles';
import GuestHeader from './Components/GuestHeader';
import MemberHeader from './Components/MemberHeader';
import StartButton from './Components/StartButton';
import StopButton from './Components/StopButton';
import TimeInput from './Components/TimeInput';
import DifficultyPanel from './Components/DifficultyPanel';

const PushupsAssessment = () => {
  const classes = useStyles();

  return (
    <CssBaseline>
      <div className={classes.root}>
        <MemberHeader />
        <Grid container
          alignItems="center"
          justifyContent="center">
          <Grid item xs={9}>
            <Card className={classes.CameraFeedback}>
              <CardMedia
                className={classes.cardMedia}
                image="https://i0.wp.com/post.greatist.com/wp-content/uploads/sites/2/2019/05/PERFECT-PUSHUP.gif?w=1155&h=812"
                title="pushups"
              />
              <Grid container spacing={4} justifyContent="center" style={{ marginBottom: "0.5rem", marginTop: "0.5rem" }}>
                <Grid item>
                  <TimeInput />
                </Grid>
                <Grid item>
                  <DifficultyPanel />
                </Grid>
                <Grid item>
                  <StartButton />
                </Grid>
                <Grid item>
                  <StopButton />
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </div>
    </CssBaseline>
  );
}

export default PushupsAssessment;