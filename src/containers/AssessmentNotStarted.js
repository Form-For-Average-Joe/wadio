import { Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import DifficultyPanel from "../components/DifficultyPanel";
import TimeInput from "../components/TimeInput";
import CountdownButton from "../components/CountdownButton";
import LastAttemptStats from "./LastAttemptStats";
import NewDifficultyPanel from "../components/NewDifficultyPanel";

export default function AssessmentNotStarted() {
  return (
    <Grid container spacing={2} direction="column">
      <Grid item>
        <NewDifficultyPanel />
      </Grid>
      <Grid item>
        <TimeInput />
      </Grid>
      <Grid item>
        <LastAttemptStats />
      </Grid>
      <Grid item margin="auto">
        <Grid container spacing={2} direction="row">
          <Grid item>
            <CountdownButton />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              component={Link} to="/"
            >
              Home
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
