import React from 'react';
import {Typography, AppBar, Box, Grid, Toolbar, Container, Avatar} from '@mui/material';
import LoginDialog from '../components/LoginDialog';
import DashboardButton from '../components/DashboardButton';
import HomeButton from '../components/HomeButton';
import logo from '../components/Media/OrbitalLogo.png';
import {useSigninCheck, useUser} from 'reactfire';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Guest = () => {
  return (
    <LoginDialog/>
  )
}

const Member = () => {
  const { data } = useUser();
  return (
    <Grid container spacing={3}>
      <Grid item>
        <HomeButton/>
      </Grid>
      <Grid item>
        <DashboardButton/>
      </Grid>
      <Grid item>
        {data.photoURL ? <Avatar src={data.photoURL}/> : <Avatar><AccountCircleIcon /></Avatar>}
      </Grid>
    </Grid>
  )
}

const MainHeader = () => {
  const {status, data} = useSigninCheck();
  if (status === 'loading') {
    return <p>Loading</p>
  }
  const {signedIn, user} = data;
  const guest = signedIn ? <Member /> : <Guest/>;

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar>
          <Avatar variant="rounded" src={logo}/>
          <Typography variant="h4" sx={{paddingLeft: "1rem"}}>
            Form For The Average Joe
          </Typography>
          <Box sx={{alignItems: 'center', textAlign: 'center'}} marginLeft="auto">
            {guest}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default MainHeader;