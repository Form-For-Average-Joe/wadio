import { Typography, Card, Grid } from '@mui/material';
import { findCurrentLevel } from '../util';

const StrangerStats = ({ cal }) => {
    return (
        <Card sx={{paddingTop: "1rem", paddingBottom: "1rem", width: "55vw"}}>
            <Grid container direction="row" justifyContent="space-evenly">
                <Grid item style={{ paddingTop: "1rem" }}>
                    <Typography variant="subtitle1" align="center">
                        Cumulative Calories Burnt:
                    </Typography>
                    <Typography variant="h2" align="center">
                        {cal}
                    </Typography>
                </Grid>
                <Grid item style={{ paddingTop: "1rem", paddingBottom: "0.5rem" }}>
                    <Typography variant="subtitle1" align="center">
                        Current Level
                    </Typography>
                    <Typography variant="h3" align="center">
                        {findCurrentLevel(cal)}
                    </Typography>
                </Grid>
            </Grid>
        </Card>
    );
}

export default StrangerStats;