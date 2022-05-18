import React from 'react';
import { Typography, AppBar, Button, Box, Card, CardActions, CardContent, CardMedia, CssBaseline, Grid, Toolbar, TextField, Container, requirePropFactory, Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
import useStyles from './styles';
import LoginDialog from './loginbutton';
import SignupDialog from './signupbutton';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

const GuestHeader = () => {
    const classes = useStyles();

    return (
        <AppBar position="static" className={classes.root} style={{backgroundColor: "#333333", paddingTop: "2rem"}}>
            <Container maxWidth="xl">
                <Toolbar>
                    <FitnessCenterIcon fontSize="large" sx={{ display: { xs: 'none', md: 'flex' }, mr: 3 }} />
                    <Typography variant="h4">
                        Form For The Average Joe
                    </Typography>
                    <Box sx={{ alignItems: 'center', textAlign: 'center' }} marginLeft="auto">
                        <Grid container spacing={3}>
                            <Grid item>
                                <LoginDialog/>
                            </Grid>
                            <Grid item>
                                <SignupDialog/>
                            </Grid>
                            <Grid item>
                            </Grid>
                        </Grid>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default GuestHeader;