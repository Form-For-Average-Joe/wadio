import { Typography, Card, Grid } from '@mui/material';
import { useUser } from "reactfire";
import { fetchUserCumulativeCalories } from "../util";
import { useState, useEffect } from "react";

const CaloriesBurnt = ({ cal }) => {
    const { status, data: user } = useUser();
    //todo fix levelData formula
    const levelData = cal > 5000 ? 0 : 1000 - (cal % 1000);
    const [cumulativeCalories, setCumulativeCalories] = useState(0);

    useEffect(() => {
        fetchUserCumulativeCalories(user.uid, (data) => {
            setCumulativeCalories(data.toFixed(1));
        })
    })

    return (
        <Card sx={{paddingTop: "1rem"}}>
            <Grid container justifyContent="center" alignItems="center" direction="column">
                <Grid item style={{ paddingTop: "1rem" }}>
                    <Typography variant="subtitle1" align="center">
                        Cumulative Calories Burnt:
                    </Typography>
                    <Typography variant="h2" align="center">
                        {cumulativeCalories}
                    </Typography>
                </Grid>
                <Grid item style={{ paddingTop: "2rem" }}>
                    <Typography variant="subtitle1" align="center">
                        Calories required to reach next level:
                    </Typography>
                    <Typography variant="h2" align="center">
                        {levelData}
                    </Typography>
                </Grid>
            </Grid>
        </Card>
    );
}

export default CaloriesBurnt;