import {Button, Grid} from "@mui/material";
import DifficultyPanel from "../components/DifficultyPanel";
import TimeInput from "../components/TimeInput";
import LastAttemptStats from "../components/LastAttemptStats";
import React from "react";
import {setExercise, setIsStarted} from "../features/exercise/exerciseSlice";
import {resetStageAndCount} from "../features/userValues/userValuesSlice";
import {resetUserTime} from "../features/userProfile/userProfileSlice";
import {useDispatch} from 'react-redux';

export default function AssessmentNotStarted() {
  const dispatch = useDispatch();

  function handleStart() {
    dispatch(setExercise('pushups'));
    dispatch(resetStageAndCount());
    dispatch(resetUserTime());
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
