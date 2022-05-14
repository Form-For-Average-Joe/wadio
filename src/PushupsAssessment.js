import React from 'react';
import { Typography, AppBar, Button, Card, CardActions, CardContent, CardMedia, CssBaseline, Grid, Toolbar, TextField, Container, requirePropFactory } from '@material-ui/core';
import useStyles from './Components/styles';

const PushupsAssessment = () => {
  const classes = useStyles();
  
  return (
    <div className={classes.root}>
      <Container maxWidth="lg" style={{ marginTop: '0px' }} color={"primary"}>
        <Typography align="center" variant="h2">
          Form For The Average Joe
        </Typography>
      </Container>
      <Typography align="center" variant="h5">
          PushupsAssessment
      </Typography>
    </div>
  )
}

export default PushupsAssessment;