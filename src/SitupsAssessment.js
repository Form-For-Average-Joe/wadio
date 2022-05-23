import React from 'react';
import { Typography, AppBar, Button, Card, CardActions, CardContent, CardMedia, CssBaseline, Grid, Toolbar, TextField, Container, requirePropFactory } from '@mui/material';
import StartButton from './components/StartButton';
import StopButton from './components/StopButton';

const PushupsAssessment = () => {
  return (
        <Grid container
          alignItems="center"
          justifyContent="center">
          <Grid item xs={9}>
            <Card sx={{background: 'rgba(150, 150, 150, 1)'}}>
              <CardMedia
                image="https://flabfix.com/wp-content/uploads/2019/05/Sit-Ups.gif"
                title="pushups"
              />
              <Grid container spacing={4} justifyContent="center" style={{ marginBottom: "0.5rem", marginTop: "0.5rem" }}>
                <Grid item>
                  <StartButton />
                </Grid>
                <Grid item>
                  <StopButton />
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
  );
}

export default PushupsAssessment;