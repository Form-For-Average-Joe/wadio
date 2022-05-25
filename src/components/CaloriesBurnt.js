import React from 'react';
import { Typography, Card, Grid } from '@mui/material';

const CaloriesBurnt = () => {
    return (
        <Card>
            <Grid container justifyContent="center" alignItems="center">
                <Grid item style={{paddingTop: "1rem", paddingBottom: "1rem"}}>
                    <Typography variant="subtitle1" align="center">
                        Calories Burnt Today:
                    </Typography>
                    <Typography variant="h2" align="center">
                        960
                    </Typography>
                </Grid>
            </Grid>
        </Card>
    );
}

export default CaloriesBurnt;