import React from 'react';
import { Typography, AppBar, Button, Card, CardActions, CardContent, CardMedia, CssBaseline, Grid, Toolbar, TextField, Container, requirePropFactory } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import useStyles from './styles';
import values from '../poseDetection/values';

const LastAttemptStats = () => {
    const classes = useStyles();
    const t = (values.assess.minutes*60 + values.assess.seconds) == 0 ? 0 : values.assess.duration - (values.assess.minutes*60 + values.assess.seconds);
    const time = Math.floor(t/60) + ' minutes ' + (t%60) + ' seconds'

    return (
        <Card>
            <Grid container justifyContent="center" alignItems="center">
                <Grid item style={{paddingTop: "1rem", paddingBottom: "1rem"}}>
                    <Typography variant="subtitle1" align="center">
                        Last Attempt: {values.assess.count} reps in {time}.
                    </Typography>
                </Grid>
            </Grid>
        </Card>
    );
}

export default LastAttemptStats;