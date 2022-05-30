import {Button, Card, CardContent, CardMedia, Grid, Typography} from '@mui/material';
import React from 'react';
import {Link} from 'react-router-dom';

const SitupCard = () => {
    return (
        <Card>
            <CardMedia
                image="https://static.toiimg.com/photo/89485806.cms"
                title="situps"
            />
            <CardContent>
                <Typography gutterBottom variant="h5">Sit Ups</Typography>
                <Typography>
                    Choose Assessment for 1min IPPT Test and Training for Training Mode where you can customise
                    timings and difficulty.
                </Typography>
                <Grid container spacing={4} justifyContent="center" style={{marginTop: "0.5rem"}}>
                    <Grid item>
                        <Button variant="contained" style={{backgroundColor: "#0F52BA", color: "#FFFFFF"}} component={Link} to="/situpsassessment">Attempt Now!</Button>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}

export default SitupCard;