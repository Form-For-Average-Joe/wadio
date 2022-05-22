import React from 'react';
import {
  CssBaseline,
  Box
} from '@mui/material';
import useStyles from '../components/styles';
import GuestHeader from '../components/GuestHeader';
import {Outlet} from 'react-router-dom';
import MemberHeader from '../components/MemberHeader';

const App = () => {
  const classes = useStyles();

  return (
    <CssBaseline>
      <Box className={classes.root}>
        <GuestHeader/>
        <Outlet/>
      </Box>
    </CssBaseline>
  );
}

export default App;