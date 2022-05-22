import React from 'react';
import { Typography, AppBar, Button, Card, CardActions, CardContent, CardMedia, CssBaseline, Grid, Toolbar, TextField, Container, requirePropFactory } from '@mui/material';
import useStyles from './components/styles';
import GuestHeader from './components/GuestHeader';
import MemberHeader from './components/MemberHeader';
import BodyStatsPanel from './components/BodyStatsPanel';
import ExerciseHistory from './components/ExerciseHistory';
import LastAttemptStats from './components/LastAttemptStats';

const username = 'Chee Heng';

const PushupsAssessment = () => {
  const classes = useStyles();

  return (
    <CssBaseline>
      <div className={classes.root}>
        <MemberHeader />
        <Typography variant="h5" align="center" style={{ paddingTop: "4rem" }}>
          Welcome Back {username}!
        </Typography>
        <Container className={classes.container}>
          <Grid container spacing={5} justifyContent="center" style={{ marginBottom: "0.5rem" }}>
            <Grid item xs={4}>
              <BodyStatsPanel />
            </Grid>
            <Grid item xs={4}>
              <LastAttemptStats />
            </Grid>
          </Grid>
        </Container>
      </div>
    </CssBaseline>
  );
}

export default PushupsAssessment;