import { Grid } from "@mui/material";
import DifficultyPanel from "../components/DifficultyPanel";
import TimeInput from "../components/TimeInput";
import React from "react";
import CountdownButton from "../components/CountdownButton";
import LastAttemptStats from "../components/LastAttemptStats";

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
