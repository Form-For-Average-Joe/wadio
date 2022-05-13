import React from 'react';
import { useState } from 'react';
import { Typography, AppBar, Button, Card, CardActions, CardContent, CardMedia, CssBaseline, Grid, Toolbar, TextField, Container, requirePropFactory } from '@material-ui/core';
import { LocalGasStation, Update } from '@material-ui/icons';
import useStyles from './styles';
import { createTheme } from '@material-ui/core';
import CustomizedDialogs from './loginbutton';
import AlertDialog from './loginbutton';
import LoginDialog from './loginbutton';
import SignupDialog from './signupbutton';

const App = () => {
    const classes = useStyles();

    return (
        <CssBaseline>
            <div className={classes.root}>
                <Container maxWidth="sm" style={{ marginTop: '0px' }} color={"primary"}>
                    <Typography align="center" variant="h2">
                        Form For The Average Joe
                    </Typography>

                </Container>
                <div>
                    <Grid container spacing={2} justify="center">
                        <Grid item style={{marginTop: "40px"}}>
                            <LoginDialog/>
                        </Grid>
                        <Grid item style={{marginTop: "40px"}}>
                            <SignupDialog/>
                        </Grid>
                    </Grid>
                </div>
                    <Container className={classes.container}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Card className={classes.card}>
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
                                        <Grid container spacing={4} justify="center">
                                            <Grid item>
                                                <Button variant="contained" className={classes.buttons}>Assessment</Button>
                                            </Grid>
                                            <Grid item>
                                                <Button variant="contained" className={classes.buttons}>Training</Button>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={6}>
                                <Card className={classes.card}>
                                    <CardMedia
                                        className={classes.cardMedia}
                                        image="https://static.toiimg.com/photo/89485806.cms"
                                        title="situps"
                                    />
                                    <CardContent className={classes.cardContent}>
                                        <Typography gutterBottom variant="h5">Sit Ups</Typography>
                                        <Typography>
                                            Choose Assessment for 1min IPPT Test and Training for Training Mode where you can customise
                                            timings and difficulty.
                                        </Typography>
                                        <Grid container spacing={4} justify="center">
                                            <Grid item>
                                                <Button variant="contained" className={classes.buttons}>Assessment</Button>
                                            </Grid>
                                            <Grid item>
                                                <Button variant="contained" className={classes.buttons}>Training</Button>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </Container>
                </div>
        </CssBaseline>
      );
}

export default App;