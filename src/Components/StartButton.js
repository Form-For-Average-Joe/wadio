import React from 'react';
import { Typography, AppBar, Button, Card, CardActions, CardContent, CardMedia, CssBaseline, Grid, Toolbar, TextField, Container, requirePropFactory } from '@mui/material';
import { Link } from 'react-router-dom';
import useStyles from './styles';

const StartButton = ({handleStart}) => {
    const classes = useStyles();

    return (
        <Button
            variant="contained"
            style={{ backgroundColor: "#013220", color: "#FFFFFF" }}
            onClick={handleStart}
        >
            Start
        </Button>
    )
}

export default StartButton;