import { Typography, Grid, Container, Box } from '@mui/material';
import { useParams } from "react-router-dom";
import { theme } from "./index";
import { getFirestore } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { fetchMinorProfileUserData, getLastAttemptStats, getUserNickname } from './util';
import PastExerciseTable from './components/PastExerciseTable';
import StrangerStats from './components/StrangerStats';

const MinorProfile = () => {
    let { userUid } = useParams();
    const [userProfileData, setUserProfileData] = useState({});
    const [rows, setRows] = useState([{}]);

    useEffect(() => {
        const firestore = getFirestore();
        fetchMinorProfileUserData(userUid, (data) => {
            setUserProfileData(data);
        })
        getLastAttemptStats(userUid, firestore, (data) => {
            setRows(data);
        });
    }, [userUid])

    return (
        <>
            <Grid>
                <Grid item>
                    <Typography variant="h5" align="center" style={{ paddingTop: "2rem" }}>
                        {/*we can leave firebaseUserData as undefined, because for their stats to show up on the leaderboard, their
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