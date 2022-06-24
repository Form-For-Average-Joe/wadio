import { Typography, Box } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { useUser } from 'reactfire';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

const globalLeaderboard = {
  id: "global",
  name: "Global"
};

function createLeaderboardMenuItem(leaderboardName) {
  return (
    <ListItem key={leaderboardName.id} disablePadding>
      <ListItemButton>
        <ListItemText primary={leaderboardName.name}/>
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
    getDoc(ref).then((docSnap) => {
      const groupCodes = docSnap.data();
      if (groupCodes) {
        setLeaderboards(groupCodes.codes);
      }
      else {
        navigate('/leaderboard/display', { replace: true, state: { leaderboardId: globalLeaderboard.id } });
      }
    })
  }, [user, navigate])

  return (
    <Box width="25vw" margin="auto" sx={{ paddingTop: "2rem" }}>
      <Typography variant="h5" align="center" sx={{ paddingBottom: "1rem" }}>
        Leaderboards
      </Typography>
      <List sx={{ backgroundColor: "#555555" }}>
        {createLeaderboardMenuItem(globalLeaderboard)}
        {leaderboards.map(leaderboardName => {
          return createLeaderboardMenuItem(leaderboardName);
        })}
      </List>
    </Box>
  );
}

export default Leaderboard;