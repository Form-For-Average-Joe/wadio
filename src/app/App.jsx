import React from 'react';
import {CssBaseline, Box} from '@mui/material';
import GuestHeader from '../components/GuestHeader';
import {Outlet} from 'react-router-dom';

const App = () => {
  return (
    <CssBaseline>
      <Box sx={{
        height: '100%',
        color: 'white',
        background: 'rgba(0, 0, 0, 1)',
      }}>
        <GuestHeader/>
        <Outlet/>
      </Box>
    </CssBaseline>
  );
}

export default App;