import React from 'react';
import { Typography, Card, Grid } from '@mui/material';
import {doc, getFirestore, getDoc} from 'firebase/firestore';
import {getAuth} from "firebase/auth";

const LastAttemptStats = ({stats}) => {
    const generateDisplayTimeString = (workoutTime) => Math.floor(workoutTime/60) + ' minutes ' + (workoutTime%60) + ' seconds'

    const [count, setCount] = React.useState(0);
    const [displayTimeString, setDisplayTimeString] = React.useState('');

    React.useEffect(() => {
        if (stats) {
            setCount(stats.repCount);
            setDisplayTimeString(generateDisplayTimeString(stats.workoutTime));
        }
        else {
            const firestore = getFirestore();
            const auth = getAuth();
            const user = auth.currentUser;
            const ref = doc(firestore, 'userStatistics', user.uid);

            const inner = async () => {
                return await getDoc(ref);
            }
            inner().then((res) => {
                const data = res.data();
                setDisplayTimeString(generateDisplayTimeString(data.workoutTime));
                setCount(data.repCount);
            })
        }
    }, [count, displayTimeString]);

    return (
        <Card>
            <Grid container justifyContent="center" alignItems="center">
                <Grid item style={{paddingTop: "1rem", paddingBottom: "1rem"}}>
                    <Typography variant="subtitle1" align="center">
                        Last Attempt: {count} reps in {displayTimeString}.
                    </Typography>
                </Grid>
            </Grid>
        </Card>
    );
}

export default LastAttemptStats;