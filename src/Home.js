import { Card, CardContent, CardMedia, Container, Grid, Stack, Typography, Box, Paper, tableSortLabelClasses } from '@mui/material';
import { Link } from "react-router-dom";
import cover from './assets/cover.jpeg';
import ExerciseInfo from './components/ExerciseInfo';
import GenericHeaderButton from './components/GenericHeaderButton';
import { useUser } from 'reactfire';
import { doc, getFirestore, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import pushups from './assets/pushups.jpeg';
import pushupsG from './assets/pushupsG.jpeg';
import situps from './assets/situps.png';
import situpsG from './assets/situpsG.jpeg';
import comingsoon from './assets/comingsoon.webp';

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

function checkUnlocked(cal, ex) {
  switch(ex) {
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
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (user) {
      const firestore = getFirestore();
      const ref = doc(firestore, user.uid, 'userData');
      getDoc(ref).then((docSnap) => {
        setUserProfileData(docSnap.data());
      })
      setLoggedIn(true);
    }
  }, [user])

  return (
    <Grid container spacing={2}>
      {exerciseInformation.map(exerciseInfo => {
        const unlock = loggedIn && checkUnlocked(userProfileData?.totalCal, exerciseInfo.title) ? true : false
        const name = unlock ? exerciseInfo.title : "locked"
        return (
          <Grid key={exerciseInfo.title} item xs={6} sm={6} md={6} lg={6} xl={6}>
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
                      style={{ justifyContent: "center" }}
                      component={Link}
                      to={unlock ? exerciseInfo.to : '/'}>Attempt</GenericHeaderButton>
                  </Grid>
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