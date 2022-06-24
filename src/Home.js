import { Card, CardContent, CardMedia, Container, Grid, Typography, Box, Paper } from '@mui/material';
import { Link } from "react-router-dom";
import cover from './assets/cover.jpeg';
import ExerciseInfo from './components/ExerciseInfo';
import GenericHeaderButton from './components/GenericHeaderButton';
import { useUser, useSigninCheck } from 'reactfire';
import { useEffect, useState } from 'react';
import pushups from './assets/pushups.png';
import pushupsG from './assets/pushupsG.jpeg';
import situps from './assets/situps.png';
import situpsG from './assets/situpsG.jpeg';
import comingsoon from './assets/comingsoon.png';
import { fetchUserCumulativeCalories, fetchUserData } from "./util";

const exerciseInformation = [
  {
    image: pushups,
    locked: pushupsG,
    title: 'pushups',
    description: 'Choose your custom timings and difficulty',
    toUnlock: 'Login to Unlock!',
    exercise: 'Push-Ups',
    to: '/exercise/pushups'
  },
  {
    image: situps,
    locked: situpsG,
    title: 'situps',
    description: 'Choose your custom timings and difficulty',
    toUnlock: 'Reach 50 Calories to Unlock!',
    exercise: 'Sit-Ups',
    to: '/exercise/situps'
  },
  {
    image: comingsoon,
    locked: comingsoon,
    title: 'bicepcurls',
    description: 'Choose your custom timings and difficulty',
    toUnlock: 'Choose your custom timings and difficulty',
    exercise: 'Bicep Curls',
    to: '/'
  },
  {
    image: comingsoon,
    locked: comingsoon,
    title: 'shoulderpress',
    description: 'Choose your custom timings and difficulty',
    toUnlock: 'Choose your custom timings and difficulty',
    exercise: 'Shoulder Press',
    to: '/'
  },
]

export function checkUnlocked(cal, ex) {
  switch (ex) {
    case 'pushups':
      return true;
    case 'situps':
      return cal >= 50;
    default:
      return false;
  }
}

const ExerciseCards = () => {
  const { status, data: user } = useUser();
  const [userProfileData, setUserProfileData] = useState({});
  const { status: signInCheckStatus, data: signInCheckData } = useSigninCheck();
  const [cumulativeCalories, setCumulativeCalories] = useState(0);

  useEffect(() => {
    if (user) {
      fetchUserData(user.uid, (data) => {
        setUserProfileData(data);
      });
      fetchUserCumulativeCalories(user.uid, (data) => {
        setCumulativeCalories(data.score);
      });
    }
  }, [user])

  if (status === 'loading' || signInCheckStatus === 'loading') {
    return <p>Loading</p>;
  }

  return (
    <Grid container spacing={2}>
      {exerciseInformation.map(exerciseInfo => {
        const unlock = signInCheckData.signedIn && checkUnlocked(cumulativeCalories, exerciseInfo.title)
        const name = unlock ? exerciseInfo.title : "locked"
        return (
          <Grid key={exerciseInfo.title} item xs={12} sm={12} md={6} lg={6} xl={6}>
            <Card>
              <CardMedia
                image={unlock ? exerciseInfo.image : exerciseInfo.locked}
                title={exerciseInfo.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h5">{exerciseInfo.exercise}</Typography>
                <Typography>
                  {unlock ? exerciseInfo.description : exerciseInfo.toUnlock}
                </Typography>
                <Grid container spacing={2} sx={{ paddingTop: 1 }}>
                  <Grid item>
                    <GenericHeaderButton variant="contained"
                                         style={{
                                           justifyContent: "center",
                                           backgroundColor: "#FA9C1B",
                                           color: "#000000"
                                         }}
                                         component={Link}
                                         to={unlock ? exerciseInfo.to : '/'}>Attempt</GenericHeaderButton>
                  </Grid>
                  <Grid item>
                    <ExerciseInfo exerciseName={name}/>
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
        <ExerciseCards/>
      </Container>
    </Box>
  )
}

export default Home;