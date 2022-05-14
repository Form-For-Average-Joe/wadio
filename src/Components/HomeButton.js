import React from 'react';
import { Typography, AppBar, Button, Card, CardActions, CardContent, CardMedia, CssBaseline, Grid, Toolbar, TextField, Container, requirePropFactory } from '@material-ui/core';
import { Link } from 'react-router-dom';
import useStyles from './styles';

const HomeButton = () => {
    const classes = useStyles();

    return (
        <Button
            variant="contained"
            style={{ backgroundColor: "#666666", color: "#FFFFFF" }}
            component={Link} to="/"
        >
            Home
        </Button>
    )
}

export default HomeButton;