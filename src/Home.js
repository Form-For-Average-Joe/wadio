import React from 'react';
import {Container, Grid} from '@mui/material';
import PushupCard from "./components/PushupCard";
import SitupCard from "./components/SitupCard";
import {theme} from "./index";
import {AuthWrapper} from "./components/AuthWrapper";

const ExerciseCards = () => {
  return (
    <Grid container spacing={2}>
       <Grid item xs={6}>
         <PushupCard/>
       </Grid>
       <Grid item xs={6}>
         <SitupCard/>
       </Grid>
     </Grid>
   )
}

const Home = () => {
  return (
    <AuthWrapper fallback={<span>Sign in to use this component</span>}>
      <Container sx={{px: theme.spacing(0), py: theme.spacing(9)}}>
        <ExerciseCards/>
      </Container>
    </AuthWrapper>
  )
}

export default Home;