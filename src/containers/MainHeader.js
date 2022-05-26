import React from 'react';
import {Typography, AppBar, Box, Grid, Toolbar, Container, Avatar} from '@mui/material';
import LoginDialog from '../components/LoginDialog';
import SignupDialog from '../components/signupbutton';
import DashboardButton from '../components/DashboardButton';
import HomeButton from '../components/HomeButton';
import LogoutButton from '../components/LogoutButton'
import avatar from '../components/Media/cheeheng.jpg';
import logo from '../components/Media/OrbitalLogo.png';
import {useSigninCheck} from 'reactfire';

const Guest = () => {
  return (
    <LoginDialog/>
  )
}

const Member = () => {
  return (
    <Grid container spacing={3}>
      <Grid item>
        <HomeButton/>
      </Grid>
      <Grid item>
        <DashboardButton/>
      </Grid>
      <Grid item>
        <Avatar src={avatar}/>
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
  const guest = signedIn ? <Member user={user}/> : <Guest/>;

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