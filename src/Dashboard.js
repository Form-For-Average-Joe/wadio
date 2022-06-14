import { Typography, Grid, Container, Box } from '@mui/material';
import BodyStatsPanel from './components/BodyStatsPanel';
import CaloriesBurnt from './components/CaloriesBurnt';
import { theme } from "./index";
import LogoutButton from './components/LogoutButton';
import { useUser, useFirestoreDocData } from 'reactfire';
import { doc, getFirestore, getDoc, collection, query, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import ProgressLine from './components/ProgressLine';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const Dashboard = () => {
  const { status, data: user } = useUser();
  const [userProfileData, setUserProfileData] = useState({});
  const [rows, setRows] = useState([{}]);

  function createData(TimeStamp, Exercise, Reps, Duration, Calories) {
    return { TimeStamp, Exercise, Reps, Duration, Calories };
  }


  async function getStats(firestore) {
    const temp = [];
    const q = query(collection(firestore, user.uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((document) => {
      if (document.id != "userData") {
        temp.unshift(createData(document.id,
          document.data().lastAttemptStats.nameOfExercise,
          document.data().lastAttemptStats.repCount,
          document.data().lastAttemptStats.workoutTime,
          document.data().lastAttemptStats.caloriesBurnt))
      }
    });
    setRows(temp);
  }

  useEffect(() => {
    const firestore = getFirestore();
    const ref = doc(firestore, user.uid, 'userData');
    getDoc(ref).then((docSnap) => {
      setUserProfileData(docSnap.data());
    })
    getStats(firestore);
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
            <LogoutButton />
          </Grid>
        </Grid>
      </Grid>
      <Container sx={{ px: theme.spacing(0), py: theme.spacing(3) }}>
        <Grid container spacing={3} justifyContent="center" style={{ marginBottom: "0.5rem" }}>
          <Grid item xs={10} sm={6} md={4}>
            <BodyStatsPanel stats={{ weight: userProfileData?.weight || 0, height: userProfileData?.height || 0 }} />
          </Grid>
          <Grid item xs={10} sm={6} md={4}>
            <CaloriesBurnt cal={userProfileData?.totalCal} />
          </Grid>
        </Grid>
      </Container>
      <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
        <Grid container>
          <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
          </Grid>
          <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
            <ProgressLine cal={userProfileData?.totalCal} />
          </Grid>
        </Grid>
        <Typography variant="h6" align="center" sx={{paddingTop: "2rem"}}>
            Your Exercise History
          </Typography>
        <Grid container sx={{paddingTop: "1rem"}}>
          <Grid item margin="auto" xs={10} sm={10} md={7} lg={7} xl={7}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>TimeStamp</TableCell>
                    <TableCell align="right">Exercise</TableCell>
                    <TableCell align="right">Reps</TableCell>
                    <TableCell align="right">Duration</TableCell>
                    <TableCell align="right">Calories</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.TimeStamp}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.TimeStamp}
                      </TableCell>
                      <TableCell align="right">{row.Exercise}</TableCell>
                      <TableCell align="right">{row.Reps}</TableCell>
                      <TableCell align="right">{row.Duration}</TableCell>
                      <TableCell align="right">{row.Calories}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Dashboard;