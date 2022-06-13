import { Typography, Grid, Container, Box } from '@mui/material';
import BodyStatsPanel from './components/BodyStatsPanel';
import LastAttemptStats from './containers/LastAttemptStats';
import CaloriesBurnt from './components/CaloriesBurnt';
import { theme } from "./index";
import LogoutButton from './components/LogoutButton';
import { AuthWrapper } from "./components/AuthWrapper";
import { useUser, useFirestoreDocData } from 'reactfire';
import {doc, getFirestore } from 'firebase/firestore';

const Dashboard = () => {
  const { status, data: user } = useUser();

  const firestore = getFirestore();
  const ref = doc(firestore, user.uid, 'userData');
  const { status: firestoreDataStatus, data: userProfileData } = useFirestoreDocData(ref);

  if (status === 'loading' || firestoreDataStatus === 'loading') {
    return <p>Loading</p>;
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
            Welcome Back, {userProfileData?.nickname || user?.displayName || user?.email.match(/.*(?=@)/) || 'Guest'}!
          </Typography>
        </Grid>
        <Grid container spacing={2} direction="row" justifyContent="center" paddingTop="1rem">
          <Grid item align="center" sx={{ paddingTop: "1rem" }}>
            <LogoutButton />
          </Grid>
        </Grid>
      </Grid>
      <Container sx={{ px: theme.spacing(0), py: theme.spacing(3) }}>
        <Grid container spacing={3} justifyContent="center" style={{ marginBottom: "0.5rem" }}>
          <Grid item xs={10} sm={6} md={4}>
            <BodyStatsPanel stats={{ weight: userProfileData?.weight || 0, height: userProfileData?.height || 0}} />
          </Grid>
          <Grid item xs={10} sm={6} md={4}>
            <CaloriesBurnt cal={userProfileData?.totalCal} />
          </Grid>
        </Grid>
      </Container>
    </AuthWrapper>
  );
}

export default Dashboard;