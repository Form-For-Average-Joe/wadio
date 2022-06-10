import { Typography, Grid, Container, Box } from '@mui/material';
import BodyStatsPanel from './components/BodyStatsPanel';
import LastAttemptStats from './containers/LastAttemptStats';
import CaloriesBurnt from './components/CaloriesBurnt';
import { theme } from "./index";
import LogoutButton from './components/LogoutButton';
import { AuthWrapper } from "./components/AuthWrapper";
import { useUser } from 'reactfire';
import {doc, getFirestore, getDoc} from 'firebase/firestore';
import {getAuth} from "firebase/auth";
import { useSelector, setState } from "react-redux";
import { useState } from 'react';
import { selectNicknameR, selectAgeR, selectWeightR, selectHeightR } from './features/userProfile/userProfileSlice';

const Dashboard = () => {
  const { status, data } = useUser();
  const [nickname, setNickname] = useState((data?.displayName || data?.email.match(/.*(?=@)/ || 'Guest')));
  const [weight, setWeight] = useState("0");
  const [height, setHeight] = useState("0");

  const firestore = getFirestore();
  const auth = getAuth();
  const user = auth.currentUser;
  const ref = doc(firestore, 'userData', user.uid);

  const inner = async () => {
    return await getDoc(ref);
  };
  inner().then(res => {
    const data = res.data();
    if (data) { // not a first-time user
      setNickname(data.nickname);
      setWeight(data.weight);
      setHeight(data.height);
    }
  });

  //const nameCheck = useSelector(selectNicknameR);
  // const age = useSelector(selectAgeR);
  // const weight = useSelector(selectWeightR);
  // const height = useSelector(selectHeightR);

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
            Welcome Back, {nickname}!
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
            <BodyStatsPanel stats={{ weight, height }} />
          </Grid>
          <Grid item xs={10} sm={6} md={4}>
            <LastAttemptStats />
          </Grid>
          <Grid item xs={10} sm={6} md={4}>
            <CaloriesBurnt />
          </Grid>
        </Grid>
      </Container>
    </AuthWrapper>
  );
}

export default Dashboard;