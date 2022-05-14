import React from 'react';
import { Typography, AppBar, Button, Card, CardActions, CardContent, CardMedia, CssBaseline, Grid, Toolbar, TextField, Container, requirePropFactory } from '@material-ui/core';
import InputAdornment from '@mui/material/InputAdornment';
import useStyles from './styles';

const TimeInput = () => {
    const classes = useStyles();

    return (
        <TextField
            label="Time:"
            id="outlined-start-adornment"
            InputProps={{
                endAdornment: <InputAdornment position="start">s</InputAdornment>,
            }}
        />
    )
}

export default TimeInput;