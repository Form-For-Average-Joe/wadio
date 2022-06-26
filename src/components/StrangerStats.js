import { Typography, Card, Grid } from '@mui/material';
import { findCurrentLevel, fetchUserCumulativeCalories } from '../util';
import { useEffect, useState } from "react";

const StrangerStats = ({ userUid }) => {
    const [cumulativeCalories, setCumulativeCalories] = useState(0);

    useEffect(() => {
        fetchUserCumulativeCalories(userUid, (data) => {
            setCumulativeCalories(data.score);
        })
    })

    return (
        <Card sx={{paddingTop: "1rem", paddingBottom: "1rem", width: "55vw"}}>
            <Grid container direction="row" justifyContent="space-evenly">
                <Grid item style={{ paddingTop: "1rem" }}>
                    <Typography variant="subtitle1" align="center">
                        Cumulative Calories Burnt:
                    </Typography>
                    <Typography variant="h2" align="center">
                        {cumulativeCalories?.toFixed(1)}
                    </Typography>
                </Grid>
                <Grid item style={{ paddingTop: "1rem", paddingBottom: "0.5rem" }}>
                    <Typography variant="subtitle1" align="center">
                        Current Level
                    </Typography>
                    <Typography variant="h3" align="center">
                        {findCurrentLevel(cumulativeCalories)}
                    </Typography>
                </Grid>
            </Grid>
        </Card>
    );
}

export default StrangerStats;