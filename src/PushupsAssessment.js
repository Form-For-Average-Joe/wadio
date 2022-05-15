import React from 'react';
import { Box, Card, CardMedia, CssBaseline, Grid } from '@material-ui/core';
import useStyles from './Components/styles';
import GuestHeader from './Components/GuestHeader';
import MemberHeader from './Components/MemberHeader';
import StartButton from './Components/StartButton';
import StopButton from './Components/StopButton';
import TimeInput from './Components/TimeInput';
import DifficultyInput from './Components/DifficultyInput';
import webcam from './temp/src/webcam.js'

const PushupsAssessment = () => {
  const classes = useStyles();
  const [video, setVideo] = React.useState(false);

  const handleStart = () => {
    setVideo(true);
  };

  const handleStop = () => {
    setVideo(false);
  };

  const c = <CardMedia
    className={classes.cardMedia}
    image="https://i0.wp.com/post.greatist.com/wp-content/uploads/sites/2/2019/05/PERFECT-PUSHUP.gif?w=1155&h=812"
    title="pushups"
  />;

  const d = <Box id="canvas-wrapper">
    <CardMedia
      id="video"
      className={classes.cardMedia}
      component="video"
      src=""
    />
    <canvas id="output"></canvas>
  </Box>;

  const cardMedia = video ? d : c;

  React.useEffect(()=>{
    if (video) {
      webcam();
    }
  },[video])

  return (
    <CssBaseline>
      <div className={classes.root}>
        <MemberHeader />
        <Grid container
          alignItems="center"
          justify="center">
          <Grid item xs={9}>
            <Card className={classes.CameraFeedback}>
              {cardMedia}
              <Grid container spacing={4} justify="center" style={{ marginBottom: "0.5rem", marginTop: "0.5rem" }}>
                <Grid item>
                  <StartButton handleStart={handleStart} />
                </Grid>
                <Grid item>
                  <StopButton handleStop={handleStop} />
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