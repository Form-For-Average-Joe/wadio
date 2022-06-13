import { Typography, Card, Grid } from '@mui/material';


const CaloriesBurnt = ({cal}) => {
    return (
        <Card>
            <Grid container justifyContent="center" alignItems="center">
                <Grid item style={{paddingTop: "1rem", paddingBottom: "1rem"}}>
                    <Typography variant="subtitle1" align="center">
                        Cumulative Calories Burnt:
                    </Typography>
                    <Typography variant="h2" align="center">
                        {cal}
                    </Typography>
                </Grid>
            </Grid>
        </Card>
    );
}

export default CaloriesBurnt;