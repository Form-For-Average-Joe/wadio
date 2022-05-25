import React from 'react';
import {Typography, Grid, Container} from '@mui/material';
import BodyStatsPanel from './components/BodyStatsPanel';
import LastAttemptStats from './components/LastAttemptStats';
import CaloriesBurnt from './components/CaloriesBurnt';
import {theme} from "./index";

const username = 'Chee Heng';

const Dashboard = () => {
  return (
    <>
      <Typography variant="h5" align="center" style={{paddingTop: "4rem"}}>
        Welcome Back {username}!
      </Typography>
      <Container sx={{px: theme.spacing(0), py: theme.spacing(9)}}>
        <Grid container spacing={5} justifyContent="center" style={{marginBottom: "0.5rem"}}>
          <Grid item xs={4}>
            <BodyStatsPanel/>
          </Grid>
          <Grid item xs={4}>
            <Grid container spacing={2} direction= "column">
              <Grid item>
                <LastAttemptStats />
              </Grid>
              <Grid item>
                <CaloriesBurnt />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Dashboard;