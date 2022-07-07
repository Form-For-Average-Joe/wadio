import { Box, Card, CardContent, CardMedia, Container, Grid, Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useSigninCheck, useUser } from 'reactfire';
import cover from './assets/cover.jpeg';
import ExerciseInfo from './components/ExerciseInfo';
import GenericHeaderButton from './components/GenericHeaderButton';
import LoadingSpinner from "./components/LoadingSpinner";
import { checkUnlocked, exerciseInformation, fetchUserCumulativeCalories } from "./util";

const attemptButton = (link, unlock) => {
  return unlock ?
    <Grid item>
      <GenericHeaderButton variant="contained"
        style={{
          justifyContent: "center",
          backgroundColor: "#FFA500",
          color: "#000000"
        }}
        component={Link}
        to={unlock ? link : '/'}>Attempt</GenericHeaderButton> </Grid> : null
}

const ExerciseCards = () => {
  const { status, data: user } = useUser();
  const { status: signInCheckStatus, data: signInCheckData } = useSigninCheck();
  const [cumulativeCalories, setCumulativeCalories] = useState(0);

  useEffect(() => {
    if (user) {
      fetchUserCumulativeCalories(user.uid, (data) => {
        setCumulativeCalories(data.score);
      });
    }
  }, [user])

  if (status === 'loading' || signInCheckStatus === 'loading') {
    return <LoadingSpinner />;
  }

  return (
    <Grid container spacing={2}>
      {Object.keys(exerciseInformation).map(exerciseId => {
        const unlock = signInCheckData.signedIn && checkUnlocked(cumulativeCalories, exerciseId)
        const name = unlock ? exerciseId : "locked"
        return (
          <Grid key={exerciseId} item xs={12} sm={12} md={6} lg={6} xl={6}>
            <Card>
              <CardMedia
                image={unlock ? exerciseInformation[exerciseId].image : exerciseInformation[exerciseId].locked}
                title={exerciseId}
              />
              <CardContent>
                <Typography gutterBottom variant="h5">{exerciseInformation[exerciseId].exerciseDisplayName}</Typography>
                <Typography>
                  {unlock ? exerciseInformation[exerciseId].description : exerciseInformation[exerciseId].toUnlock}
                </Typography>
                <Grid container spacing={2} sx={{ paddingTop: 1 }}>
                  {attemptButton(exerciseInformation[exerciseId].to, unlock)}
                  <Grid item>
                    <ExerciseInfo exerciseName={name} />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        )
      })}
    </Grid>
  )
}

const Home = () => {
  return (
    <Box>
      <Paper
        component="img"
        src={cover}
        width="100%"
      />
      <Container sx={{ px: { xs: 4, sm: 4, md: 4, lg: 4, xl: 4 }, py: { xs: 1, sm: 2, md: 9, lg: 9, xl: 9 } }}>
        <ExerciseCards />
      </Container>
    </Box>
  )
}

export default Home;