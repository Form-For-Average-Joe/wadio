import {Typography, AppBar, Box, Grid, Toolbar, Container, Avatar} from '@mui/material';
import {Link, NavLink} from "react-router-dom";
import LoginDialog from '../components/LoginDialog';
import DashboardButton from '../components/DashboardButton';
import {useSigninCheck, useUser} from 'reactfire';
import logo from '../assets/OrbitalLogo.png';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Member = () => {
  const {data} = useUser();
  return (
    <Grid container spacing={3}>
      <Grid item>
        <DashboardButton/>
      </Grid>
      <Grid item>
        {data.photoURL ? <Avatar src={data.photoURL}/> : <Avatar><AccountCircleIcon/></Avatar>}
      </Grid>
    </Grid>
  )
}

const MainHeader = () => {
  const {status, data} = useSigninCheck();
  if (status === 'loading') {
    return <p>Loading</p>
  }
  const {signedIn} = data;
  const guest = signedIn ? <Member/> : <LoginDialog/>;

  return (
    <AppBar position="static">
      <Toolbar>
        <Link to="/">
          <Avatar variant="rounded" src={logo}/>
        </Link>
        <Box component={NavLink} to={'/'} style={{flexGrow: 1, textDecoration: 'none', color: 'unset'}}>
          <Typography variant="h4" sx={{paddingLeft: "1rem"}}>
            Form For the Average Joe
          </Typography>
        </Box>
        <Box sx={{alignItems: 'center', textAlign: 'center'}}>
          {guest}
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default MainHeader;