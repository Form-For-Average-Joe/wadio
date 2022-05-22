import React from 'react';
import {Card, CardMedia, Grid} from '@mui/material';
import StartButton from './components/StartButton';
import StopButton from './components/StopButton';
import DifficultyPanel from './components/DifficultyPanel';

const PushupsAssessment = () => {
  return (
    <Grid container
          alignItems="center"
          justifyContent="center">
      <Grid item xs={9}>
        <Card sx={{background: 'rgba(150, 150, 150, 1)'}}>
          <CardMedia
            image="https://i0.wp.com/post.greatist.com/wp-content/uploads/sites/2/2019/05/PERFECT-PUSHUP.gif?w=1155&h=812"
            title="pushups"
          />
          <Grid container spacing={4} justifyContent="center" style={{marginBottom: "0.5rem", marginTop: "0.5rem"}}>
            <Grid item>
              <DifficultyPanel/>
            </Grid>
            <Grid item>
              <StartButton/>
            </Grid>
            <Grid item>
              <StopButton/>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
}

export default PushupsAssessment;