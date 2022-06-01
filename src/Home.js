import {Container, Grid} from '@mui/material';
import PushupCard from "./components/PushupCard";
import SitupCard from "./components/SitupCard";
import {theme} from "./index";

const ExerciseCards = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <PushupCard/>
      </Grid>
      <Grid item xs={6}>
        <SitupCard/>
      </Grid>
    </Grid>
  )
}

const Home = () => {
  return (
    <Container sx={{px: theme.spacing(0), py: theme.spacing(9)}}>
      <ExerciseCards/>
    </Container>
  )
}

export default Home;