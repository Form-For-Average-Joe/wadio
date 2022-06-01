import { Grid } from "@mui/material";
import DifficultyPanel from "../components/DifficultyPanel";
import TimeInput from "../components/TimeInput";
import CountdownButton from "../components/CountdownButton";
import LastAttemptStats from "./LastAttemptStats";

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
