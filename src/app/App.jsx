import React from 'react';
import {
    CssBaseline,
    Grid,
    Container,
    Box
} from '@mui/material';
import useStyles from '../Components/styles';
import PushupCard from '../Components/PushupCard';
import SitupCard from '../Components/SitupCard';
import GuestHeader from '../Components/GuestHeader';
import MemberHeader from '../Components/MemberHeader';

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

const App = () => {
    const classes = useStyles();

    return (
        <CssBaseline>
            <Box className={classes.root}>
                <GuestHeader />
                <Container className={classes.container}>
                    <ExerciseCards/>
                </Container>
            </Box>
        </CssBaseline>
    );
}

export default App;