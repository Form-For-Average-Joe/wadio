import React from 'react';
import { Typography, Card, Grid } from '@mui/material';
import values from '../poseDetection/values';
import {useSelector} from "react-redux";
import {selectCount, selectDuration} from '../features/userValues/userValuesSlice'
import {selectMinutes, selectSeconds} from '../features/userProfile/userProfileSlice';

const LastAttemptStats = () => {
    const count = useSelector(selectCount);
    const duration = useSelector(selectDuration);
    const minutes = useSelector(selectMinutes);
    const seconds = useSelector(selectSeconds);

    const t = (minutes*60 + seconds) === 0 ? 0 : duration - (minutes*60 + seconds);
    const time = Math.floor(t/60) + ' minutes ' + (t%60) + ' seconds'
    return (
        <Card>
            <Grid container justifyContent="center" alignItems="center">
                <Grid item style={{paddingTop: "1rem", paddingBottom: "1rem"}}>
                    <Typography variant="subtitle1" align="center">
                        Last Attempt: {count} reps in {time}.
                    </Typography>
                </Grid>
            </Grid>
        </Card>
    );
}

export default LastAttemptStats;