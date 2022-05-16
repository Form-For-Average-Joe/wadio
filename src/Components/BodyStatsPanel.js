import React from 'react';
import {
    Typography, AppBar, Button, Card, CardActions, CardContent, CardMedia, CssBaseline, Grid,
    List, ListItem, Toolbar, TextField, Container, requirePropFactory
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import useStyles from './styles';
import ScaleIcon from '@mui/icons-material/Scale';
import HeightIcon from '@mui/icons-material/Height';
import MonitorWeightIcon from '@mui/icons-material/MonitorWeight';


const BodyStatsPanel = () => {
    const classes = useStyles();

    return (
        <Card>
            <Typography variant="h6" align="center" style={{ paddingTop: "1rem" }}>
                Your Body Measurements
            </Typography>
            <Card item style={{ paddingLeft: "1rem" }}>
                <List>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <ScaleIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="34 Kg" secondary="Weight" />
                    </ListItem>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <HeightIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="130 cm" secondary="Height" />
                    </ListItem>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <MonitorWeightIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="18.1 BMI" secondary="Body Measurement Index" />
                    </ListItem>
                </List>
            </Card>
        </Card>
    );
}

export default BodyStatsPanel;