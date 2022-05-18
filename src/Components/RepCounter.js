import React from 'react';
import { useState, useEffect } from 'react';
import { Typography, AppBar, Button, Card, CardActions, CardContent, CssBaseline, Grid, Toolbar, TextField, Container, requirePropFactory, FormControl } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import useStyles from './styles';
import values from '../poseDetection/values';

const RepCounter = () => {
    const classes = useStyles();
    const [reps, setReps] = useState(0);

    useEffect(() => {
        values.assess.count = reps;
    });

    function handleIncrease() {
        setReps(reps+1);
    }

    return (
        <Card>
            <Grid container spacing={1} direction="column" alignItems="center">
                <Grid item alignItems="center" style={{ marginTop: "1rem" }}>
                    <Typography variant="h1"> {reps} </Typography>
                </Grid>
                <Grid item>
                    <Grid container direction="row" spacing={2} style={{ marginBottom: "1rem" }}>
                        <Grid item>
                            <Button variant="contained" onClick={() => handleIncrease()}>Do a Push-Up!</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Card>
    )
}

export default RepCounter;