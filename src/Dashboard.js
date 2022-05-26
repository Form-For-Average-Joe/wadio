import React from 'react';
import {Typography, Grid, Container} from '@mui/material';
import BodyStatsPanel from './components/BodyStatsPanel';
import LastAttemptStats from './components/LastAttemptStats';
import CaloriesBurnt from './components/CaloriesBurnt';
import {theme} from "./index";
import LogoutButton from './components/LogoutButton';

const username = 'Chee Heng';

const Dashboard = () => {
  return (
    <>
    <Grid>
      <Grid item>
      <Typography variant="h5" align="center" style={{paddingTop: "4rem"}}>
        Welcome Back {username}!
      </Typography>
      </Grid>
      <Grid item align="center" sx={{paddingTop: "1rem"}}>
        <LogoutButton />
      </Grid>
    </Grid>
      <Container sx={{px: theme.spacing(0), py: theme.spacing(4)}}>
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