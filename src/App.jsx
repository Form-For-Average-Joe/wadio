import React from 'react';
import { Typography, AppBar, Button, Card, CardActions, CardContent, CardMedia, CssBaseline, Grid, Toolbar, TextField, Container, requirePropFactory } from '@material-ui/core';
import { FitnessCenter } from '@material-ui/icons';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import useStyles from './styles';

const App = () => {
    const classes = useStyles();

    return (
        <>
            <div className={classes.root}>
                <Container maxWidth="sm" style={{ marginTop: '0px' }} color={"primary"}>
                    <Typography align="center" variant="h2">
                        Form For The Average Joe
                    </Typography>

                </Container>
                <div>
                    <Grid container spacing={2} justify="center">
                        <Grid item>
                            <Button variant="contained" className={classes.buttons}>
                                Log In
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" className={classes.buttons}>
                                Sign Up
                            </Button>
                        </Grid>
                    </Grid>
                </div>
                <div>
                    <Container className={classes.container}>
                        <Card className={classes.card}>
                            <CardMedia
                                className={classes.cardMedia}
                                image="https://cdn.mos.cms.futurecdn.net/oYDbf5hQAePHEBNZTQMXRA-1280-80.jpg.webp"
                                title="pushups"
                            />
                            <CardContent className={classes.cardContent}>
                                <Typography gutterBottom variant="h5">
                                    Push Ups
                                </Typography>
                                <Typography>
                                    Choose Assessment for 1min IPPT Test and Custom Training for Training Mode where you can choose your own
                                    timings and difficulty.
                                </Typography>
                                <Grid container spacing={4} justify="center">
                                    <Grid item>
                                        <Button variant="contained" className={classes.buttons}>Assessment</Button>
                                    </Grid>
                                    <Grid item>
                                        <Button variant="contained" className={classes.buttons}>Custom Training</Button>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Container>
                </div>
            </div>
        </>
      );
}

export default App;