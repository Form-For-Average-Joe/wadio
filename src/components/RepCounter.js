import { Button, Card, Grid, Typography } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { incrementCount, selectCount, selectDifficultyLevel } from '../features/userValues/userValuesSlice';
import { selectFeedback } from '../features/exercise/exerciseSlice';

function difficulty(e) {
    switch (e) {
        case 0:
            return "Hellish";
        case 1:
            return "IPPT";
        case 2:
            return "Heavenly";
        default:
            return "ERROR";
    }
}

    const RepCounter = () => {
        const count = useSelector(selectCount);
        const feedback = useSelector(selectFeedback);
        const difficultyIndex = useSelector(selectDifficultyLevel);

        // const dispatch = useDispatch();

        // function handleIncrease() {
        //     dispatch(incrementCount());
        // }

        return (
            <Card>
                <Typography variant="h1" align="center"> {count} </Typography>
                <Typography variant="h4" align="center"> {feedback} </Typography>
                <Typography variant="h4" align="center"> {difficulty(difficultyIndex)} </Typography>
            </Card>
            // <Card>
            //     <Grid container spacing={1} direction="column" alignItems="center">
            //         <Grid item alignItems="center" style={{ marginTop: "1rem" }}>
            //             <Typography variant="h1"> {count} </Typography>
            //         </Grid>
            //         <Grid item>
            //             <Grid container direction="row" spacing={2} style={{ marginBottom: "1rem" }}>
            //                 <Grid item>
            //                     <Button variant="contained" onClick={() => handleIncrease()}>Do a Push-Up!</Button>
            //                 </Grid>
            //             </Grid>
            //         </Grid>
            //     </Grid>
            // </Card>
        )
    }

    export default RepCounter;