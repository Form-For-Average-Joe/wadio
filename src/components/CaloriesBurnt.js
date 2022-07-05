import { Typography, Card, Grid } from '@mui/material';

const CaloriesBurnt = ({ cal }) => {
    //todo fix levelData formula
    const levelData = cal > 5000 ? 0 : 1000 - (cal % 1000);

    return (
        <Card sx={{paddingTop: "1rem"}}>
            <Grid container justifyContent="center" alignItems="center" direction="column">
                <Grid item style={{ paddingTop: "1rem" }}>
                    <Typography variant="subtitle1" align="center">
                        Cumulative Calories Burnt:
                    </Typography>
                    <Typography variant="h2" align="center">
                        {cal}
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