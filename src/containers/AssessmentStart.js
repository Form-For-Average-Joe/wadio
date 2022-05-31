import { Button, Grid, Card, Typography } from "@mui/material";
import Timer from "../components/Timer";
import RepCounter from "../components/RepCounter";
import React from "react";
import { setIsStarted } from '../features/exercise/exerciseSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsCalibrated } from "../features/userValues/userValuesSlice";

const DummyTimer = () => {
  return (
    <Card>
      <Grid container spacing={3} direction="column" alignItems="center">
        <Grid item alignItems="center" style={{ marginTop: "2rem", marginBottom: "2rem" }}>
          <Typography variant="h4" align="center">Just be BOLD and aim for GOLD!</Typography>
        </Grid>
      </Grid>
    </Card>
  )
}

export default function AssessmentStart({ setIsFinished }) {
  const dispatch = useDispatch();
  const calibrated = useSelector(selectIsCalibrated);

  const clock = calibrated ? <Timer setIsFinished={setIsFinished} /> : <DummyTimer />;
  return (
    <Grid container spacing={2} direction="column">
      <Grid item>
        {clock}
      </Grid>
      <Grid item>
        <RepCounter />
      </Grid>
      <Grid item>
        <Button variant="contained"
          style={{ backgroundColor: "#8B0000", color: "#FFFFFF" }}
          onClick={() => {
            dispatch(setIsStarted(false));
            setIsFinished(true);
          }}>Stop</Button>
      </Grid>
    </Grid>
  )
}