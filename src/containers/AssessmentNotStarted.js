import {Button, Grid} from "@mui/material";
import DifficultyPanel from "../components/DifficultyPanel";
import TimeInput from "../components/TimeInput";
import LastAttemptStats from "../components/LastAttemptStats";
import React from "react";
import {setExercise, setIsStarted} from "../features/exercise/exerciseSlice";
import {useDispatch} from 'react-redux';
import values from '../poseDetection/values';

export default function AssessmentNotStarted() {
  const dispatch = useDispatch();

  function handleStart() {
    dispatch(setExercise('pushups'));
    values.assess.count = 0;
    values.assess.minutes = 0;
    values.assess.seconds = 0;
    dispatch(setIsStarted(true));
  }

  return (
    <Grid container spacing={2} direction="column">
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
  )
}