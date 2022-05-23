import React from 'react';
import { Typography, Button, Card, Grid} from '@mui/material';
import {useDispatch, useSelector} from "react-redux";
import {selectDuration, setDuration} from "../features/userValues/userValuesSlice";

const TimeInput = () => {
    const dispatch = useDispatch();
    const duration = useSelector(selectDuration);

    const time = (Math.floor(duration / 60) < 10 ? '0' + Math.floor(duration / 60) : Math.floor(duration / 60))
        + ':' +
        ((duration % 60) < 10 ? '0' + (duration % 60) : (duration % 60));

    function handleIncrease() {
        if (duration >= 3590) {
            return;
        }
        dispatch(setDuration(duration + 10));
    }

    function handleDecrease() {
        if (duration <= 0) {
            return;
        }
        dispatch(setDuration(duration - 10));
    }

    return (
        <Card>
            <Grid container spacing={1} direction="column" alignItems="center">
                <Grid item alignItems="center" sx={{ marginTop: "1rem" }}>
                    <Typography variant="h3"> {time} </Typography>
                </Grid>
                <Grid item>
                    <Grid container direction="row" spacing={2} sx={{ marginBottom: "1rem" }}>
                        <Grid item>
                            <Button variant="contained" onClick={() => handleIncrease()}>Increase</Button>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" onClick={() => handleDecrease()}>Decrease</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Card>
    )
}

export default TimeInput;