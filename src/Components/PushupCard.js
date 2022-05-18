import React from 'react';
import { Typography, AppBar, Button, Card, CardActions, CardContent, CardMedia, CssBaseline, Grid, Toolbar, TextField, Container, requirePropFactory } from '@mui/material';
import { Link } from 'react-router-dom';
import useStyles from './styles';

const PushupCard = () => {
    const classes = useStyles();

    return (
        <Card>
            <CardMedia
                className={classes.cardMedia}
                image="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/full-length-of-male-athlete-doing-push-ups-in-gym-royalty-free-image-1606406029."
                title="pushups"
            />
            <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5">Push Ups</Typography>
                <Typography>
                    Choose Assessment for 1min IPPT Test and Training for Training Mode where you can customise
                    timings and difficulty.
                </Typography>
                <Grid container spacing={4} justifyContent="center" style={{marginTop: "0.5rem"}}>
                    <Grid item>
                        <Button variant="contained" style={{backgroundColor: "#0F52BA", color: "#FFFFFF"}} component={Link} to="/pushupsassessment">Assessment</Button>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" style={{backgroundColor: "#0F52BA", color: "#FFFFFF"}} component={Link} to="/pushupstraining">Training</Button>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}

export default PushupCard;