import { Typography, Grid, Container, Box } from '@mui/material';
import BodyStatsPanel from './components/BodyStatsPanel';
import LastAttemptStats from './containers/LastAttemptStats';
import CaloriesBurnt from './components/CaloriesBurnt';
import { theme } from "./index";
import LogoutButton from './components/LogoutButton';
import SettingsButton from './components/SettingsButton';
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
        <Typography sx={{ width: '100vw', height: '100vw' }} align='center' variant={"h1"}>Sign in to view this page!</Typography>
      </Box>
    }>
      <Grid>
        <Grid item>
          <Typography variant="h5" align="center" style={{ paddingTop: "4rem" }}>
            Welcome Back, {data?.displayName || data?.email.match(/.*(?=@)/ || 'Guest')}!
          </Typography>
        </Grid>
        <Grid container spacing={2} direction="row" justifyContent="center" paddingTop="1rem">
          <Grid item align="center" sx={{ paddingTop: "1rem" }}>
            <SettingsButton />
          </Grid>
          <Grid item align="center" sx={{ paddingTop: "1rem" }}>
            <LogoutButton />
          </Grid>
        </Grid>
      </Grid>
      <Container sx={{ px: theme.spacing(0), py: theme.spacing(4) }}>
        <Grid container spacing={5} justifyContent="center" style={{ marginBottom: "0.5rem" }}>
          <Grid item xs={4}>
            <BodyStatsPanel />
          </Grid>
          <Grid item xs={4}>
            <Grid container spacing={2} direction="column">
              <Grid item>
                <LastAttemptStats />
              </Grid>
              <Grid item>
                <CaloriesBurnt />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </AuthWrapper>
  )
    ;
}

export default Dashboard;