import { Typography, Grid, Container, Box } from '@mui/material';
import BodyStatsPanel from './components/BodyStatsPanel';
import CaloriesBurnt from './components/CaloriesBurnt';
import { theme } from "./index";
import LogoutButton from './components/LogoutButton';
import { useUser, useFirestoreDocData } from 'reactfire';
import { doc, getFirestore, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import ProgressLine from './components/ProgressLine';


const Dashboard = () => {
  const { status, data: user } = useUser();
  const [userProfileData, setUserProfileData] = useState({});

  useEffect(() => {
    const firestore = getFirestore();
    const ref = doc(firestore, user.uid, 'userData');
    getDoc(ref).then((docSnap) => {
      setUserProfileData(docSnap.data());
    })
    // const { status: firestoreDataStatus, data: userProfileData } = useFirestoreDocData(ref);
  }, [user])

  if (status === 'loading') {
    return <p>Loading</p>;
  }

  return (
    <>
      <Grid>
        <Grid item>
          <Typography variant="h5" align="center" style={{ paddingTop: "2rem" }}>
            Welcome Back, {userProfileData?.nickname || user?.displayName || user?.email.match(/.*(?=@)/) || 'Guest'}!
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
            <CaloriesBurnt cal={userProfileData?.totalCal}/>
          </Grid>
        </Grid>
      </Container>
      <Box sx={{display: {xs: 'none', sm: 'block'}}}>
      <Grid container>
        <Grid item xs={1} sm={1} xs={1}>
        </Grid>
        <Grid item xs={10} sm={10} xs={10}>
          <ProgressLine cal={userProfileData?.totalCal}/>
        </Grid>
      </Grid>
      </Box>
    </>
  );
}

export default Dashboard;