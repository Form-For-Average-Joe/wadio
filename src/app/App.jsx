import React from 'react';
import {
  CssBaseline,
  Box
} from '@mui/material';
import useStyles from '../Components/styles';
import GuestHeader from '../Components/GuestHeader';
import {Outlet} from 'react-router-dom';
import MemberHeader from '../Components/MemberHeader';

const App = () => {
  const classes = useStyles();

  return (
    <CssBaseline>
      <Box className={classes.root}>
        <GuestHeader/>
        <Box>
          <Outlet/>
        </Box>
      </Box>
    </CssBaseline>
  );
}

export default App;