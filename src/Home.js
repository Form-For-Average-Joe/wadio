import React from 'react';
import {
  Container, Grid,
} from '@mui/material';
import useStyles from "./Components/styles";
import PushupCard from "./Components/PushupCard";
import SitupCard from "./Components/SitupCard";

const ExerciseCards = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <PushupCard />
      </Grid>
      <Grid item xs={6}>
        <SitupCard />
      </Grid>
    </Grid>
  )
}

const Home = () => {
  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <ExerciseCards/>
    </Container>)
}
export default Home;