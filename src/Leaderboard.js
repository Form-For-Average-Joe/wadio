import { Typography, Box, Paper } from '@mui/material';
import axios from "axios";
import { getIdToken } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from 'reactfire';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import LoadingSpinner from "./components/LoadingSpinner";

const globalLeaderboardId = 'global';
const globalLeaderboardName = 'Global';

function createLeaderboardMenuItem(leaderboardId, leaderboardName) {
  return (
    <ListItem key={leaderboardId} disablePadding>
      <ListItemButton component={Link} to={'/leaderboard/display'} state={{ leaderboardId, leaderboardName }}>
        <ListItemText primary={leaderboardName}/>
      </ListItemButton>
    </ListItem>
  )
}

const Leaderboard = () => {
  const { status, data: user } = useUser();
  const [leaderboards, setLeaderboards] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const firestore = getFirestore();
    const ref = doc(firestore, user.uid, 'groupCodes');
    getDoc(ref).then(async (docSnap) => {
      const groupCodes = docSnap.data();
      if (groupCodes?.codes && user) {
        const allGroupCodes = groupCodes.codes;
        setLeaderboards(await Promise.all(allGroupCodes.map(async groupCode => {
          const { data } = await getIdToken(user, true).then((idToken) => axios.get('https://13.228.86.60/getLeaderboardName/' + groupCode + '/' + idToken));
          return { leaderboardName: data.leaderboardName, leaderboardId: groupCode };
        })));
      } else {
        navigate('/leaderboard/display', {
          state: {
            leaderboardId: globalLeaderboardId,
            leaderboardName: globalLeaderboardName
          }
        });
      }
    })
  }, [user, navigate])

  if (status === 'loading') {
    return <LoadingSpinner/>;
  }

  return (
    <Box width="25vw" margin="auto" sx={{ paddingTop: "2rem" }}>
      <Typography variant="h5" align="center" sx={{ paddingBottom: "1rem" }}>
        Leaderboards
      </Typography>
      <Paper variant="outlined"
             sx={{
               width: '100%',
               bgcolor: "#CCCCCC",
               maxWidth: { xs: '100vw', sm: '80vw', md: '70vw', lg: '60vw', xl: '60vw' },
               borderRadius: 3,
               borderColor: "#FFA500",
               borderWidth: 3,
               marginTop: "1rem"
             }}>
        <List sx={{ backgroundColor: "#CCCCCC", borderRadius: 3, color: "#000000" }}>
          {createLeaderboardMenuItem(globalLeaderboardId, globalLeaderboardName)}
          {leaderboards.map(leaderboardObject => {
            return createLeaderboardMenuItem(leaderboardObject.leaderboardId, leaderboardObject.leaderboardName);
          })}
        </List>
      </Paper>
    </Box>
  );
}

export default Leaderboard;