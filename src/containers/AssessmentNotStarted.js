import { Grid } from "@mui/material";
import DifficultyPanel from "../components/DifficultyPanel";
import TimeInput from "../components/TimeInput";
import LastAttemptStats from "../components/LastAttemptStats";
import React from "react";
import {setExercise, setIsStarted} from "../features/exercise/exerciseSlice";
import {resetStageAndCount} from "../features/userValues/userValuesSlice";
import {resetUserTime} from "../features/userProfile/userProfileSlice";
import {useDispatch} from 'react-redux';
import CountdownButton from "../components/CountdownButton";

export default function AssessmentNotStarted() {
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
        <CountdownButton />
      </Grid>
    </Grid>
  )
}
