import { Typography, Box } from '@mui/material';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from 'reactfire';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

const globalLeaderboardId = 'global';
const globalLeaderboardName = 'Global';

function createLeaderboardMenuItem(leaderboardId, leaderboardName) {
  return (
    <ListItem key={leaderboardId} disablePadding>
      <ListItemButton>
        <ListItemText primary={leaderboardName}/>
      </ListItemButton>
    </ListItem>
  )
}

const Leaderboard = () => {
  const { data: user } = useUser();
  const [leaderboards, setLeaderboards] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const firestore = getFirestore();
    const ref = doc(firestore, user.uid, 'groupCodes');
    getDoc(ref).then(async (docSnap) => {
      const groupCodes = docSnap.data();
      if (groupCodes?.codes) {
        const allGroupCodes = groupCodes.codes;
        setLeaderboards(await Promise.all(allGroupCodes.map(async groupCode => {
          const { data } = await axios.get('https://13.228.86.60/getLeaderboardName/' + groupCode);
          return { leaderboardName: data.leaderboardName, leaderboardId: groupCode };
        })));
      }
      else {
        navigate('/leaderboard/display', { state: { leaderboardId: globalLeaderboardId } });
      }
    })
  }, [user, navigate])

  return (
    <Box width="25vw" margin="auto" sx={{ paddingTop: "2rem" }}>
      <Typography variant="h5" align="center" sx={{ paddingBottom: "1rem" }}>
        Leaderboards
      </Typography>
      <List sx={{ backgroundColor: "#555555" }}>
        {createLeaderboardMenuItem(globalLeaderboardId, globalLeaderboardName)}
        {leaderboards.map(leaderboardObject => {
          return createLeaderboardMenuItem(leaderboardObject.leaderboardId, leaderboardObject.leaderboardName);
        })}
      </List>
    </Box>
  );
}

export default Leaderboard;