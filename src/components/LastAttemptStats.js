import React from 'react';
import { Typography, Card, Grid } from '@mui/material';
import {doc, getFirestore, getDoc} from 'firebase/firestore';
import {getAuth} from "firebase/auth";

const LastAttemptStats = ({stats}) => {
    const generateDisplayTimeString = (workoutTime) => Math.floor(workoutTime/60) + ' minutes ' + (workoutTime%60) + ' seconds'
    const [displayString, setDisplayString] = React.useState('No previous workout: let\'s get started!');
    const generateDisplayString = (workoutTime, repCount) => {
        const displayTimeString = generateDisplayTimeString(workoutTime);
        return 'Last Attempt: ' + repCount + ' reps in ' + displayTimeString + '.';
    }

    React.useEffect(() => {
        if (stats) {
            setDisplayString(generateDisplayString(stats.workoutTime, stats.repCount));
        }
        else {
            const firestore = getFirestore();
            const auth = getAuth();
            const user = auth.currentUser;
            const ref = doc(firestore, 'userStatistics', user.uid);

            const inner = async () => {
                return await getDoc(ref);
            };
            inner().then(res => {
                const data = res.data();
                if (data) {
                    setDisplayString(generateDisplayString(data.workoutTime, data.repCount));
                }
            });
        }
    }, []);

    return (
        <Card>
            <Grid container justifyContent="center" alignItems="center">
                <Grid item style={{paddingTop: "1rem", paddingBottom: "1rem"}}>
                    <Typography variant="subtitle1" align="center">
                        {displayString}
                    </Typography>
                </Grid>
            </Grid>
        </Card>
    );
}

export default LastAttemptStats;