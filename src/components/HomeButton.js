import React from 'react';
import { Typography, AppBar, Button, Card, CardActions, CardContent, CardMedia, CssBaseline, Grid, Toolbar, TextField, Container, requirePropFactory } from '@mui/material';
import { Link } from 'react-router-dom';

const HomeButton = () => {
    return (
        <Button
            variant="contained"
            usage="header"
            component={Link} to="/"
        >
            Home
        </Button>
    )
}

export default HomeButton;