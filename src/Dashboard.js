import React from 'react';
import { Typography, AppBar, Button, Card, CardActions, CardContent, CardMedia, CssBaseline, Grid, Toolbar, TextField, Container, requirePropFactory } from '@material-ui/core';
import useStyles from './Components/styles';
import GuestHeader from './Components/GuestHeader';
import MemberHeader from './Components/MemberHeader';
import BodyStatsPanel from './Components/BodyStatsPanel';
import ExerciseHistory from './Components/ExerciseHistory';
import Timer from './Components/Timer';

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
          <Grid container spacing={5} justify="center" style={{ marginBottom: "0.5rem" }}>
            <Grid item xs={4}>
              <BodyStatsPanel />
            </Grid>
            <Grid item xs={4}>
            </Grid>
          </Grid>
        </Container>
      </div>
    </CssBaseline>
  );
}

export default PushupsAssessment;