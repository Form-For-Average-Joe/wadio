import { Typography, Box } from '@mui/material';
import { useUser } from 'reactfire';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

const NavLeaderboard = () => {
    const { data: user } = useUser();
    const [leaderboards, setLeaderboards] = useState([]);

    useEffect(() => {
        const firestore = getFirestore();
        const ref = doc(firestore, user.uid, 'leaderboards');
        getDoc(ref).then((docSnap) => {
            setLeaderboards(docSnap.data().leaderboards);
        })
    }, [user])

    return (
        <Box width="25vw" margin="auto" sx={{ paddingTop: "2rem" }}>
            <Typography variant="h5" align="center" sx={{ paddingBottom: "1rem" }}>
                Leaderboards
            </Typography>
            <List sx={{ backgroundColor: "#555555" }}>
                {leaderboards.map(leaderboardName => {
                    return (
                        <ListItem disablePadding>
                            <ListItemButton >
                                <ListItemText primary={leaderboardName.name} />
                            </ListItemButton>
                        </ListItem>
                    )
                })}
            </List>
        </Box>
    );
}

export default NavLeaderboard;