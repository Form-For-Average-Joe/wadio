import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import {AppBar, Avatar, Box, Toolbar, useScrollTrigger} from '@mui/material';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItemButton from '@mui/material/ListItemButton';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import GroupsIcon from '@mui/icons-material/Groups';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Slide from '@mui/material/Slide';
import PropTypes from 'prop-types';
import {useState, useEffect} from 'react';
import {Link, NavLink, Outlet} from "react-router-dom";
import {useSigninCheck, useUser} from 'reactfire';
import logo from '../assets/logo.png';
import GenericHeaderButton from "../components/GenericHeaderButton";
import LoginDialog from '../components/LoginDialog';
import { fetchUserPhotoURL } from "../util";

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
};

const Member = () => {
  const {data: user} = useUser();
  const [photoURL, setPhotoURL] = useState(user.photoURL);
  useEffect(() => {
    fetchUserPhotoURL(user.uid, (userAddedPhotoURL) => {
        setPhotoURL(userAddedPhotoURL);
    });
  })
  // const matches = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  return photoURL ? <Avatar src={photoURL}/> : <Avatar><AccountCircleIcon/></Avatar>;
}

const drawerWidth = 240;
const navigationItems = {
  home: {
    icon: <HomeIcon/>,
    displayName: 'Home',
    to: '/'
  },
  leaderboard: {
    icon: <LeaderboardIcon/>,
    displayName: 'Leaderboard',
    to: '/leaderboard',
  },
  friends: {
    icon: <GroupsIcon/>,
    displayName: 'Friends',
    to: '/friends',
  },
  profile: {
    icon: <AnalyticsIcon/>,
    displayName: 'Profile',
    to: '/dashboard'
  },
  settings: {
    icon: <SettingsApplicationsIcon/>,
    displayName: 'Settings',
    to: '/settings'
  }
}

function MainHeader() {
  const {status, data} = useSigninCheck();

  const [mobileOpen, setMobileOpen] = useState(false);

  if (status === 'loading') {
    return <p>Loading</p>
  }

  const {signedIn} = data;
  const authenticatedHeader = signedIn ? <Member/> : <LoginDialog/>;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box>
      <Box sx={{  display: 'flex',
        alignItems: 'center',
        // padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        // ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
        py: {xs: 1, sm: 2, md: 2, lg: 2, xl: 2},
        x: {xs: 0, sm: 2, md: 2, lg: 2, xl: 2}}}>
          <IconButton onClick={() => setMobileOpen(false)}>
            <ChevronLeftIcon />
          </IconButton>
      </Box>
      <Divider/>
      <List>
        {Object.values(navigationItems).map(value =>
          <ListItem key={value.displayName} disablePadding>
            <ListItemButton component={Link} to={value.to} onClick={() => setMobileOpen(false)}>
              <ListItemIcon>
                {value.icon}
              </ListItemIcon>
              <ListItemText primary={value.displayName}/>
            </ListItemButton>
          </ListItem>)}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window.document.body : undefined;

  return (
    <Box sx={{display: 'flex'}}>
      <HideOnScroll>
        <AppBar sx={{
          py: {xs: 1, sm: 2, md: 2, lg: 2, xl: 2},
          x: {xs: 0, sm: 2, md: 2, lg: 2, xl: 2}
        }}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{mr: 2, display: {sm: 'none'}}}
            >
              <MenuIcon/>
            </IconButton>
            {/* <Link to="/">
              <Avatar sx={{display: {xs: 'none', sm: 'block'}}} variant="rounded" src={logo}/>
            </Link> */}
            <Box component={NavLink} to={'/'} sx={{ flexGrow: 1, textDecoration: 'none', color: 'unset'}}>
              <img src={logo} alt={''}/>
            </Box>
            {signedIn && <Box sx={{display: {xs: 'none', sm: 'inline'}, px: 1}}>
              <Box sx={{display: 'flex'}}>
                <GenericHeaderButton component={Link}
                                     to={navigationItems.leaderboard.to}>{navigationItems.leaderboard.displayName}</GenericHeaderButton>
                <GenericHeaderButton component={Link}
                                     to={navigationItems.friends.to}>{navigationItems.friends.displayName}</GenericHeaderButton>
                <GenericHeaderButton component={Link}
                                     to={navigationItems.profile.to}>{navigationItems.profile.displayName}</GenericHeaderButton>
                <GenericHeaderButton component={Link}
                                     to={navigationItems.settings.to}>{navigationItems.settings.displayName}</GenericHeaderButton>
              </Box>
            </Box>}
            <Box sx={{alignItems: 'center', textAlign: 'center'}}>
              {authenticatedHeader}
            </Box>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Box
        component="nav"
        sx={{flexShrink: {sm: 0}}}
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: {xs: 'block', sm: 'none'},
            '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: {sm: `calc(100% - ${drawerWidth}px)`}
        }} //todo why do we need to specify width here? original code did, because there was a permanent drawer
      >
        <Toolbar/>
        <Outlet/>
      </Box>
    </Box>
  );
}

export default MainHeader;
