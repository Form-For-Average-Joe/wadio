import React from 'react';
import { Typography, AppBar, Button, Card, CardActions, CardContent, CardMedia, CssBaseline, Grid, Toolbar, TextField, Container, requirePropFactory } from '@mui/material';

const StopButton = ({handleStop}) => {
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