import { Paper } from '@mui/material';
import { Typography, Grid } from '@mui/material';
import { CreateGroup } from './components/CreateGroup';
import JoinGroup from './components/JoinGroup';

const FriendsStuff = () => {
  return (
    <>
      <Paper variant="outlined"
        sx={{
          width: '100%', bgcolor: "#CCCCCC", maxWidth: { xs: '100vw', sm: '80vw', md: '70vw', lg: '60vw', xl: '60vw' },
          borderRadius: 3, borderColor: "#FFA500", borderWidth: 3, marginTop: "1rem"
        }}>
        <Typography align="center" variant="h4" sx={{ paddingTop: "2rem", color: "#000000" }}>Friends</Typography>
        <Grid container direction="row" justifyContent="space-evenly" spacing={12} sx={{ paddingLeft: "3rem", paddingRight: "3rem", paddingBottom: "2rem" }}>
          <Grid item>
            <JoinGroup />
          </Grid>
          <Grid item>
            <CreateGroup />
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}

const Home = () => {
  return (
    <>
      <Grid container justifyContent="center" sx={{ marginBottom: "2rem" }}>
        <Grid item>
          <FriendsStuff />
        </Grid>
      </Grid>
    </>
  )
}

export default Home;