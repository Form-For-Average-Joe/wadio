import React from 'react';
import { Typography, AppBar, Button, Card, CardActions, CardContent, CardMedia, CssBaseline, Grid, Toolbar, TextField, Container, requirePropFactory } from '@material-ui/core';
import { Link } from 'react-router-dom';
import useStyles from './styles';

const StopButton = ({handleStop}) => {
    const classes = useStyles();

    return (
        <Button
            variant="contained"
            style={{ backgroundColor: "#8B0000", color: "#FFFFFF" }}
            onClick={handleStop}
        >
            Stop
        </Button>
    )
}

export default StopButton;