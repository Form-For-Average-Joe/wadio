import {Button, Card, Grid, Typography} from '@mui/material';
import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {incrementCount, selectCount} from '../features/userValues/userValuesSlice'


const RepCounter = () => {
    const count = useSelector(selectCount);
    const dispatch = useDispatch();

    function handleIncrease() {
        dispatch(incrementCount());
    }

    return (
        <Card>
            <Grid container spacing={1} direction="column" alignItems="center">
                <Grid item alignItems="center" style={{ marginTop: "1rem" }}>
                    <Typography variant="h1"> {count} </Typography>
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