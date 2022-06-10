import { Typography, Card, Grid } from '@mui/material';

const caloriesburnttoday = 1000;

const CaloriesBurnt = () => {
    return (
        <Card>
            <Grid container justifyContent="center" alignItems="center">
                <Grid item style={{paddingTop: "1rem", paddingBottom: "1rem"}}>
                    <Typography variant="subtitle1" align="center">
                        Calories Burnt Today:
                    </Typography>
                    <Typography variant="h2" align="center">
                        {caloriesburnttoday}
                    </Typography>
                </Grid>
            </Grid>
        </Card>
    );
}

export default CaloriesBurnt;