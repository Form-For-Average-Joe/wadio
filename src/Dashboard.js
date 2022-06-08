import { Typography, Grid, Container, Box } from '@mui/material';
import { Link } from "react-router-dom";
import BodyStatsPanel from './components/BodyStatsPanel';
import GenericProfileButton from "./components/GenericProfileButton";
import LastAttemptStats from './containers/LastAttemptStats';
import CaloriesBurnt from './components/CaloriesBurnt';
import { theme } from "./index";
import LogoutButton from './components/LogoutButton';
import { AuthWrapper } from "./components/AuthWrapper";
import { useUser } from 'reactfire';

const Dashboard = () => {
  const { status, data } = useUser();
  if (status === 'loading') {
    return (
      <div>Loading</div>
    )
  }

  return (
    <AuthWrapper fallback={
      <Box>
        <Typography sx={{ width: '100vw', height: '100vh' }} align='center' variant={"h1"}>Sign in to view this
          page!</Typography>
      </Box>
    }>
      <Grid>
        <Grid item>
          <Typography variant="h5" align="center" style={{ paddingTop: "2rem" }}>
            Welcome Back, {data?.displayName || data?.email.match(/.*(?=@)/ || 'Guest')}!
          </Typography>
        </Grid>
        <Grid container spacing={2} direction="row" justifyContent="center" paddingTop="1rem">
          <Grid item align="center" sx={{ paddingTop: "1rem" }}>
            <GenericProfileButton component={Link} to="/settings">Settings</GenericProfileButton>
          </Grid>
        </Grid>
      </Grid>
      <Container sx={{ px: theme.spacing(0), py: theme.spacing(3) }}>
        <Grid container spacing={3} justifyContent="center" style={{ marginBottom: "0.5rem" }}>
          <Grid item xs="10">
            <BodyStatsPanel />
          </Grid>
          <Grid item xs="10">
            <LastAttemptStats />
          </Grid>
          <Grid item xs="10">
            <CaloriesBurnt />
          </Grid>
        </Grid>
      </Container>
    </AuthWrapper>
  );
}

export default Dashboard;