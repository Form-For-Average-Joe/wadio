import {Button, Grid} from "@mui/material";
import Timer from "../components/Timer";
import RepCounter from "../components/RepCounter";
import React from "react";
import {setIsStarted} from '../features/exercise/exerciseSlice';
import {useDispatch} from 'react-redux';

export default function AssessmentStart() {
  const dispatch = useDispatch();

  return (
    <Grid container spacing={2} direction="column">
      <Grid item>
        <Timer/>
      </Grid>
      <Grid item>
        <RepCounter/>
      </Grid>
      <Grid item>
        <Button variant="contained"
                style={{backgroundColor: "#8B0000", color: "#FFFFFF"}}
                onClick={() => dispatch(setIsStarted(false))}>Stop</Button>
      </Grid>
    </Grid>
  )
}