import { Typography, Grid, Container, Box } from '@mui/material';
import { getIdToken } from "firebase/auth";
import LoadingSpinner from "./components/LoadingSpinner";
import BodyStatsPanel from './containers/BodyStatsPanel';
import CaloriesBurnt from './components/CaloriesBurnt';
import { theme } from "./index";
import LogoutButton from './components/LogoutButton';
import { useUser } from 'reactfire';
import { getFirestore } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import ProgressLine from './components/ProgressLine';
import { fetchUserCumulativeCalories, fetchUserData, getUserNickname, getLastAttemptStats } from './util';
import PastExerciseTable from './components/PastExerciseTable';

const Dashboard = () => {
  const { status, data: user } = useUser();
  const [userProfileData, setUserProfileData] = useState({});
  const [rows, setRows] = useState([{}]);
  const [cumulativeCalories, setCumulativeCalories] = useState(0);

  useEffect(() => {
    const firestore = getFirestore();
    if (user) {
      getIdToken(user, true).then((idToken) => {
        fetchUserData(idToken, (data) => {
          setUserProfileData(data);
        });
        fetchUserCumulativeCalories(user.uid, (data) => {
          setCumulativeCalories(data.score);
        });
        getLastAttemptStats(user.uid, firestore, (data) => {
          setRows(data);
        });
      });
    }
  }, [user])
  if (status === 'loading') {
    return <LoadingSpinner/>
  }

  return (
    <>
      <Grid>
        <Grid item>
          <Typography variant="h5" align="center" style={{ paddingTop: "2rem" }}>
            Welcome Back, {getUserNickname(user, userProfileData)}!
          </Typography>
        </Grid>
        <Grid container spacing={2} direction="row" justifyContent="center" paddingTop="1rem">
          <Grid item align="center" sx={{ paddingTop: "1rem" }}>
            <LogoutButton/>
          </Grid>
        </Grid>
      </Grid>
      <Container sx={{ px: theme.spacing(0), py: theme.spacing(3) }}>
        <Grid container spacing={3} justifyContent="center" style={{ marginBottom: "0.5rem" }}>
          <Grid item xs={10} sm={6} md={4}>
            <BodyStatsPanel stats={{ weight: userProfileData?.weight || 0, height: userProfileData?.height || 0 }}/>
          </Grid>
          <Grid item xs={10} sm={6} md={4}>
            <CaloriesBurnt cal={cumulativeCalories}/>
          </Grid>
        </Grid>
      </Container>
      <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
        <Grid container>
          <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
          </Grid>
          <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
            <ProgressLine cal={cumulativeCalories}/>
          </Grid>
        </Grid>
        <Typography variant="h6" align="center" sx={{ paddingTop: "2rem" }}>
          Your Exercise History
        </Typography>
        <Grid container sx={{ paddingTop: "1rem" }}>
          <Grid item margin="auto" xs={10} sm={10} md={7} lg={7} xl={7}>
            <PastExerciseTable rows={rows}/>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Dashboard;