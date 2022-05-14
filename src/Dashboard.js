import React from 'react';
import { Typography, AppBar, Button, Card, CardActions, CardContent, CardMedia, CssBaseline, Grid, Toolbar, TextField, Container, requirePropFactory } from '@material-ui/core';
import useStyles from './Components/styles';
import GuestHeader from './Components/GuestHeader';
import MemberHeader from './Components/MemberHeader';

const PushupsAssessment = () => {
  const classes = useStyles();

  return (
    <CssBaseline>
      <div className={classes.root}>
        <MemberHeader />
      </div>
      <Typography>this is the dashboard</Typography>
    </CssBaseline>
  );
}

export default PushupsAssessment;