import {Button, Card, CardContent, CardMedia, Container, Grid, Stack, Typography} from '@mui/material';
import {Link} from "react-router-dom";
import pushups from './assets/pushups.jpeg';
import situps from './assets/situps.png';

const exerciseInformation = [
  {
    image: pushups,
    title: 'pushups',
    description: 'Choose your custom timings and difficulty',
    exercise: 'Push Ups',
    to: '/exercise/pushups'
  },
  {
    image: situps,
    title: 'situps',
    description: 'Choose your custom timings and difficulty',
    exercise: 'Sit Ups',
    to: '/exercise/situps'
  },
]

const ExerciseCards = () => {
  return (
    <Grid container spacing={2}>
      {exerciseInformation.map(exerciseInfo => {
        return (
          <Grid key={exerciseInfo.title} item xs={12} sm={12} md={6} lg={6} xl={6}>
            <Card>
              <CardMedia
                image={exerciseInfo.image}
                title={exerciseInfo.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h5">{exerciseInfo.exercise}</Typography>
                <Typography>
                  {exerciseInfo.description}
                </Typography>
                <Stack sx={{paddingTop: 1}}>
                  <Button variant="contained"
                          style={{backgroundColor: "#0F52BA", color: "#FFFFFF", justifyContent: "center"}}
                          component={Link}
                          to={exerciseInfo.to}>Attempt Now!</Button>
                </Stack>
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
    <Container sx={{px: {xs: 4, sm: 4, md: 4, lg: 4, xl: 4}, py: {xs: 1, sm: 2, md: 9, lg: 9, xl: 9}}}>
      <ExerciseCards/>
    </Container>
  )
}

export default Home;