import { Typography, Grid, Container, Box } from '@mui/material';
import { useParams } from "react-router-dom";
import { theme } from "./index";
import { getFirestore, collection, query, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { createData, fetchUserData, getUserNickname, renameForTable, } from './util';
import PastExerciseTable from './components/PastExerciseTable';
import StrangerStats from './components/StrangerStats';

const MinorProfile = () => {
    let { userUid } = useParams();
    const [userProfileData, setUserProfileData] = useState({});
    const [rows, setRows] = useState([{}]);

    useEffect(() => {
        async function getStats(firestore) {
            const temp = [];
            const q = query(collection(firestore, userUid));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((document) => {
                if (document.id !== "userData") {
                    temp.unshift(createData(
                      document.data().lastAttemptStats.date,
                      document.data().lastAttemptStats.time,
                      renameForTable(document.data().lastAttemptStats.nameOfExercise),
                      document.data().lastAttemptStats.repCount,
                      document.data().lastAttemptStats.workoutTime,
                      document.data().lastAttemptStats.caloriesBurnt))
                }
            });
            setRows(temp);
        }
        const firestore = getFirestore();
        fetchUserData(userUid, (data) => {
            setUserProfileData(data);
        })
        getStats(firestore);
    }, [userUid])

    return (
        <>
            <Grid>
                <Grid item>
                    <Typography variant="h5" align="center" style={{ paddingTop: "2rem" }}>
                        {/*we can leave it as undefined, because for their stats to show up on the leaderboard, their
                           data would have to be on Redis, which is fetched and stored in userProfileData*/}
                        {getUserNickname(undefined, userProfileData)}'s Profile
                    </Typography>
                </Grid>
            </Grid>
            <Container sx={{ px: theme.spacing(0), py: theme.spacing(3) }}>
                <Grid container justifyContent="center">
                    <Grid item>
                        <StrangerStats userUid={userUid}/>
                    </Grid>
                </Grid>
            </Container>
            <Box sx={{ display: { xs: 'none', sm: 'block', paddingBottom: "1rem" } }}>
                <Typography variant="h6" align="center">
                    Exercise History
                </Typography>
                <Grid container sx={{ paddingTop: "1rem" }}>
                    <Grid item margin="auto" xs={10} sm={10} md={7} lg={7} xl={7}>
                        <PastExerciseTable rows={rows} />
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}

export default MinorProfile;