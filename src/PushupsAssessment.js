import React from 'react';
import {CardMedia, CssBaseline, Grid, Button} from '@mui/material';
import useStyles from './Components/styles';
import MemberHeader from './Components/MemberHeader';
import values from './poseDetection/values';
import webcam from './poseDetection/webcam.js'
import {useDispatch} from 'react-redux';
import {setExercise} from './features/exercise/exerciseSlice'
import Timer from './Components/Timer';
import DifficultyPanel from './Components/DifficultyPanel';
import TimeInput from './Components/TimeInput';
import LastAttemptStats from './Components/LastAttemptStats';
import RepCounter from './Components/RepCounter';

const PushupsAssessment = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const styles = {
    video: {
      '-webkit-transform': "scaleX(-1)",
      transform: "scaleX(-1)",
    }
  };

  const [exerciseStatus, setExerciseStatus] = React.useState(false);

  React.useEffect(() => {
    webcam(exerciseStatus);
  }, [exerciseStatus])

  function handleStart() {
    dispatch(setExercise('pushups'))
    values.assess.count = 0;
    values.assess.minutes = 0;
    values.assess.seconds = 0;
    setExerciseStatus(true)
  }

  const started = <Grid container spacing={2} direction="column">
    <Grid item>
      <Timer/>
    </Grid>
    <Grid item>
      <RepCounter/>
    </Grid>
    <Grid item>
      <Button variant="contained"
              style={{backgroundColor: "#8B0000", color: "#FFFFFF"}}
              onClick={() => setExerciseStatus(false)}>Stop</Button>
    </Grid>
  </Grid>

  const notStarted = <Grid container spacing={2} direction="column">
    <Grid item>
      <DifficultyPanel/>
    </Grid>
    <Grid item>
      <TimeInput/>
    </Grid>
    <Grid item>
      <LastAttemptStats/>
    </Grid>
    <Grid item>
      <Button variant="contained"
              style={{backgroundColor: "#013220", color: "#FFFFFF"}}
              onClick={() => handleStart()}>Start</Button>
    </Grid>
  </Grid>

  const sidebar = exerciseStatus ? started : notStarted;

  return (
    <CssBaseline>
      <div className={classes.root}>
        <MemberHeader/>
        <Grid container
              justifyContent="center"
              style={{marginTop: "8rem", marginBottom: "8rem"}}
              spacing={2}>
          <Grid item xs={6} hii={"tt"}>
            <CardMedia
              style={styles.video}
              id="video"
              component="video"
              src=""/>
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