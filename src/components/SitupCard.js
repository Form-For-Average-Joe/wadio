import React from 'react';
import { Typography, AppBar, Button, Card, CardActions, CardContent, CardMedia, CssBaseline, Grid, Toolbar, TextField, Container, requirePropFactory } from '@mui/material';
import { Link } from 'react-router-dom';
import useStyles from './styles';

const SitupCard = () => {
    const classes = useStyles();

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
                        <Button variant="contained" style={{backgroundColor: "#0F52BA", color: "#FFFFFF"}} component={Link} to="/situpsassessment">Assessment</Button>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" style={{backgroundColor: "#0F52BA", color: "#FFFFFF"}} component={Link} to="/situpstraining">Training</Button>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}

export default SitupCard;