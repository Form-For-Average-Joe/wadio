import React from 'react';
import { Typography, AppBar, Box, Grid, Toolbar, Container, Avatar } from '@mui/material';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import DashboardButton from './DashboardButton';
import HomeButton from './HomeButton';
import avatar from './Media/cheeheng.jpg'

const GuestHeader = () => {
    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar>
                    <FitnessCenterIcon fontSize="large" sx={{ display: { xs: 'none', md: 'flex' }, mr: 3 }} />
                    <Typography variant="h4">
                        Form For The Average Joe
                    </Typography>
                    <Box sx={{ alignItems: 'center', textAlign: 'center' }} marginLeft="auto">
                        <Grid container spacing={3}>
                            <Grid item>
                                <HomeButton />
                            </Grid>
                            <Grid item>
                                <DashboardButton />
                            </Grid>
                            <Grid item>
                                <Avatar src={avatar} />
                            </Grid>
                            <Grid item>
                            </Grid>
                        </Grid>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default GuestHeader;