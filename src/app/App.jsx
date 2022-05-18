import React from 'react';
import { Typography, AppBar, Button, Card, CardActions, CardContent, CardMedia, CssBaseline, Grid, Toolbar, TextField, Container, requirePropFactory } from '@mui/material';
import { Link } from 'react-router-dom';
import useStyles from '../Components/styles';
import PushupCard from '../Components/PushupCard';
import SitupCard from '../Components/SitupCard';
import GuestHeader from '../Components/GuestHeader';
import MemberHeader from '../Components/MemberHeader';

const App = () => {
    const classes = useStyles();

    return (
        <CssBaseline>
            <div className={classes.root}>
                <GuestHeader />
                <Container className={classes.container}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <PushupCard />
                        </Grid>
                        <Grid item xs={6}>
                            <SitupCard />
                        </Grid>
                    </Grid>
                </Container>
            </div>
        </CssBaseline>
    );
}

export default App;