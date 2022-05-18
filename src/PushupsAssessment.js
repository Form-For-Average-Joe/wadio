import React from 'react';
import { Box, Card, CardMedia, CssBaseline, Grid, Typography, Button } from '@mui/material';
import useStyles from './Components/styles';
import MemberHeader from './Components/MemberHeader';
import values from './poseDetection/values';
import webcam from './poseDetection/webcam.js'
import { useDispatch } from 'react-redux';
import { setExercise } from './features/exercise/exerciseSlice'
import Timer from './Components/Timer';
import DifficultyPanel from './Components/DifficultyPanel';
import TimeInput from './Components/TimeInput';
import LastAttemptStats from './Components/LastAttemptStats';
import RepCounter from './Components/RepCounter';

const PushupsAssessment = () => {
  const classes = useStyles();
  /*const dispatch = useDispatch();

  const [video, setVideo] = React.useState(false);
  const canvasRef = React.useRef(null);
  const [context, setContext] = React.useState(null);
  React.useEffect(() => {
    if (canvasRef.current) {
      const renderCtx = canvasRef.current.getContext('2d');

      if (renderCtx) {
        setContext(renderCtx);
        if (video) {
          webcam(context);
        }
      }
    }
  }, [video, context]);

  const handleStart = () => {
    dispatch(setExercise('pushups'))
    setVideo(true);
  };

  const handleStop = () => {
    setVideo(false);
  };

  const c = <CardMedia
    image="https://i0.wp.com/post.greatist.com/wp-content/uploads/sites/2/2019/05/PERFECT-PUSHUP.gif?w=1155&h=812"
    title="pushups"
  />;

  const d = <Box id="canvas-wrapper">
    <CardMedia
      id="video"
      component="video"
      src="" />
  </Box>;

  const cardMedia = video ? d : c;*/

  const [exerciseStatus, setExerciseStatus] = React.useState(false);

  function handleStart() {
    values.assess.count = 0;
    values.assess.minutes = 0;
    values.assess.seconds = 0;
    setExerciseStatus(true)
  }

  const started = <Grid container spacing={2} direction="column">
    <Grid item>
      <Timer />
    </Grid>
    <Grid item>
      <RepCounter />
    </Grid>
    <Grid item>
      <Button variant="contained"
        style={{ backgroundColor: "#8B0000", color: "#FFFFFF" }}
        onClick={() => setExerciseStatus(false)}>Stop</Button>
    </Grid>
  </Grid>

  const notStarted = <Grid container spacing={2} direction="column">
    <Grid item>
      <DifficultyPanel />
    </Grid>
    <Grid item>
      <TimeInput />
    </Grid>
    <Grid item>
      <LastAttemptStats />
    </Grid>
    <Grid item>
      <Button variant="contained"
        style={{ backgroundColor: "#013220", color: "#FFFFFF" }}
        onClick={() => handleStart()}>Start</Button>
    </Grid>
  </Grid>

  const sidebar = exerciseStatus ? started : notStarted;

  return (
    <CssBaseline>
      <div className={classes.root}>
        <MemberHeader />
        <Grid container
          justifyContent="center"
          style={{ marginTop: "8rem", marginBottom: "8rem" }}
          spacing={2}>
          <Grid item xs={6}>
            <CardMedia
              image="https://i0.wp.com/post.greatist.com/wp-content/uploads/sites/2/2019/05/PERFECT-PUSHUP.gif?w=1155&h=812"
              title="pushups"
            />
          </Grid>
          <Grid item xs={2}>
            {sidebar}
          </Grid>
        </Grid>
      </div>
    </CssBaseline>
  );
}

export default PushupsAssessment;