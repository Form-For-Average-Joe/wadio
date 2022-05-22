import React from 'react';
import {
  Container, Grid,
} from '@mui/material';
import useStyles from "./components/styles";
import PushupCard from "./components/PushupCard";
import SitupCard from "./components/SitupCard";

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