import {Typography, AppBar, Box, Grid, Toolbar, Container, Avatar, useScrollTrigger} from '@mui/material';
import {Link, NavLink, Outlet} from "react-router-dom";
import LoginDialog from '../components/LoginDialog';
import DashboardButton from '../components/DashboardButton';
import {useSigninCheck, useUser} from 'reactfire';
import logo from '../assets/OrbitalLogo.png';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PropTypes from 'prop-types';
import Slide from '@mui/material/Slide';

function HideOnScroll(props) {
  const {children} = props;
  const trigger = useScrollTrigger({threshold: 0});

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}


HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

const Member = () => {
  const {data} = useUser();
  return (
    <Grid container spacing={{xs: 8, sm: 6, md: 5, lg: 4, xl: 3}}>
      <Grid item xs={6}>
        <DashboardButton/>
      </Grid>
      <Grid item xs={6}>
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
    <>
      <HideOnScroll>
        <AppBar sx={{py: {xs: 1, sm: 3, md: 4, lg: 5, xl: 6}}} position="static">
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
      </HideOnScroll>
      <Outlet/>
    </>
  )
}

export default MainHeader;
