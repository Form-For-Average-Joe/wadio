import {Button, Card, CardContent, CardMedia, Container, Grid, Typography} from '@mui/material';
import {Link} from "react-router-dom";

const exerciseInformation = [
  {
    image: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/full-length-of-male-athlete-doing-push-ups-in-gym-royalty-free-image-1606406029.',
    title: 'pushups',
    description: 'Choose Assessment for 1min IPPT Test and Training for Training Mode where you can customise timings and difficulty.',
    exercise: 'Push Ups',
    to: '/pushupsassessment'
  },
  {
    image: 'https://static.toiimg.com/photo/89485806.cms',
    title: 'situps',
    description: 'Choose Assessment for 1min IPPT Test and Training for Training Mode where you can customise timings and difficulty.',
    exercise: 'Sit Ups',
    to: '/situpsassessment'
  },
]

const ExerciseCards = () => {
  return (
    <Grid container spacing={2}>
      {exerciseInformation.map(exerciseInfo => {
        return (
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
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
                <Grid container spacing={4} justifyContent="center" style={{marginTop: "0.5rem"}}>
                  <Grid item>
                    <Button variant="contained" style={{backgroundColor: "#0F52BA", color: "#FFFFFF"}} component={Link}
                            to={exerciseInfo.to}>Attempt Now!</Button>
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
    <Container sx={{px:{xs:4, sm:4, md:4, lg:4, xl: 4}, py: {xs:1, sm:2, md:9, lg:9, xl: 9}}}>
      <ExerciseCards/>
    </Container>
  )
}

export default Home;