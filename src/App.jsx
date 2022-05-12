import React from 'react';
import { Typography, AppBar, Button, Card, CardActions, CardContent, CardMedia, CssBaseline, Grid, Toolbar, TextField, Container } from '@material-ui/core';
import { FitnessCenter } from '@material-ui/icons';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import useStyles from './styles';

const App = () => {
    const classes = useStyles();

    return (
        <>
            <CssBaseline />
            <AppBar position="relative">
                <Toolbar>
                    <FitnessCenter className={classes.icon} />
                    <Typography variant="h6">Form For Average Joe</Typography>
                </Toolbar>
                <TextField id="outlined-basic" label="Search" variant="outlined"></TextField>
            </AppBar>
            <main>
                <div className={classes.container}>
                    <Container maxWidth="sm" style={{ marginTop: '70px' }}>
                        <Typography variant="h2" align="center" color="textPrimary" gutterBottom>
                            Exercises
                        </Typography>
                        <Typography variant='h5' align='center' color='textSecondary' paragraph>
                            Choose your preferred exercise below!
                        </Typography>
                        <div className={classes.buttons}>
                            <Grid container spacing={2} justify="center">
                                <Grid item>
                                    <Button variant="contained" color="primary">
                                        Click here!
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button variant="contained" color="primary">
                                        More!
                                    </Button>
                                </Grid>
                            </Grid>
                        </div>
                    </Container>
                </div>
            </main>
        </>
    );
}

export default App;