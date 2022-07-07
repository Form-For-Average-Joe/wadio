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
import bicepcurls from './assets/bicepcurls.png';
import bicepcurlsG from './assets/bicepcurlsG.jpeg';
import shoulderpress from './assets/shoulderpress.png';
import shoulderpressG from './assets/shoulderpressG.jpeg';
import comingsoon from './assets/comingsoon.png';
import LoadingSpinner from "./components/LoadingSpinner";
import { fetchUserCumulativeCalories, renameForTable, exerciseIds } from "./util";
//can use the require('./assets/profilePics/') syntax to import here, then map the exerciseInformation based on the exerciseId

const exerciseInformation = [
  {
    image: pushups,
    locked: pushupsG,
    title: exerciseIds[0],
    description: 'Choose your custom timings and difficulty',
    toUnlock: 'Login to Unlock!',
    exercise: renameForTable(exerciseIds[0]),
    to: '/exercise/' + exerciseIds[0]
  },
  {
    image: situps,
    locked: situpsG,
    title: exerciseIds[1],
    description: 'Choose your custom timings and difficulty',
    toUnlock: 'Reach 50 Calories to Unlock!',
    exercise: renameForTable(exerciseIds[1]),
    to: '/exercise/' + exerciseIds[1]
  },
  {
    image: bicepcurls,
    locked: bicepcurlsG,
    title: exerciseIds[2],
    description: 'Choose your custom timings and difficulty',
    toUnlock: 'Reach 300 Calories to Unlock',
    exercise: renameForTable(exerciseIds[2]),
    to: '/exercise/' + exerciseIds[2]
  },
  {
    image: shoulderpress,
    locked: shoulderpressG,
    title: exerciseIds[3],
    description: 'Choose your custom timings and difficulty',
    toUnlock: 'Reach 1000 Calories to Unlock',
    exercise: renameForTable(exerciseIds[3]),
    to: '/exercise/' + exerciseIds[3]
  },
  {
    image: comingsoon,
    locked: comingsoon,
    title: exerciseIds[4],
    description: 'Choose your custom timings and difficulty',
    toUnlock: 'Choose your custom timings and difficulty',
    exercise: 'Bench Press',
    to: '/'
  },
  {
    image: comingsoon,
    locked: comingsoon,
    title: exerciseIds[5],
    description: 'Choose your custom timings and difficulty',
    toUnlock: 'Choose your custom timings and difficulty',
    exercise: 'Leg Raisers',
    to: '/'
  },
]

export function checkUnlocked(cal, ex) {
  switch (ex) {
    case exerciseIds[0]:
      return true;
    case exerciseIds[1]:
      return cal >= 50;
    case exerciseIds[2]:
      return cal >= 300;
    case exerciseIds[3]:
      return cal >= 1000;
    default:
      return false;
  }
}

const attempButton = (link, unlock) => {
  return unlock ?
    <Grid item>
      <GenericHeaderButton variant="contained"
        style={{
          justifyContent: "center",
          backgroundColor: "#FA9C1B",
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
                  {attempButton(exerciseInfo.to, unlock)}
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